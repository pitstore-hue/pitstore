// Supabase Edge Function: capture-paypal-order
// Percorso nel progetto: supabase/functions/capture-paypal-order/index.ts
//
// Cosa fa: chiamata dalla pagina di ritorno dopo che il cliente ha
// approvato il pagamento su PayPal. Cattura davvero i soldi (senza
// questa chiamata PayPal NON addebita nulla, l'approvazione da sola
// non basta), aggiorna l'ordine nel database e SOLO A QUEL PUNTO invia
// le due email (notifica al negozio + conferma al cliente).
//
// Deploy: supabase functions deploy capture-paypal-order
// Richiede gli stessi secrets di create-paypal-order, più:
//   supabase secrets set SUPABASE_URL=...
//   supabase secrets set SUPABASE_SERVICE_ROLE_KEY=...
//   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
//   supabase secrets set RESEND_FROM_EMAIL="PitStore <supporto@pitstore.it>"

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  sendOrderEmail,
  sendOrderConfirmationEmail,
  type OrderEmailData,
} from "../_shared/order-email.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

function paypalBase(): string {
  const env = Deno.env.get("PAYPAL_ENV") ?? "sandbox";
  return env === "live" ? "https://api-m.paypal.com" : "https://api-m.sandbox.paypal.com";
}

async function getAccessToken(): Promise<string> {
  const clientId = Deno.env.get("PAYPAL_CLIENT_ID")!;
  const secret = Deno.env.get("PAYPAL_CLIENT_SECRET")!;
  const basic = btoa(`${clientId}:${secret}`);
  const res = await fetch(`${paypalBase()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("Impossibile autenticarsi con PayPal");
  const json = await res.json();
  return json.access_token as string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // "token" è l'id ordine PayPal, arriva come query param ?token=...
    // nella pagina di ritorno impostata in create-paypal-order.
    const { token } = await req.json();

    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({ error: "Token PayPal mancante" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const accessToken = await getAccessToken();

    const captureRes = await fetch(`${paypalBase()}/v2/checkout/orders/${token}/capture`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const captureJson = await captureRes.json();

    if (!captureRes.ok || captureJson.status !== "COMPLETED") {
      console.error("Cattura PayPal non riuscita:", captureJson);
      return new Response(
        JSON.stringify({ error: "Pagamento PayPal non completato" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const numero_ordine: string | undefined =
      captureJson.purchase_units?.[0]?.reference_id ??
      captureJson.purchase_units?.[0]?.invoice_id;

    if (!numero_ordine) {
      console.error("Cattura riuscita ma senza reference_id/invoice_id:", captureJson);
      return new Response(
        JSON.stringify({ error: "Ordine non identificabile" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // .select().single() invece di un update "cieco": ci serve la riga
    // completa dell'ordine per costruire le email. Il filtro .neq('stato',
    // 'pagato') evita di rimandare le email se questa function viene
    // richiamata più di una volta per lo stesso ordine.
    const { data: order, error } = await supabase
      .from("orders")
      .update({ stato: "pagato", paypal_order_id: token })
      .eq("numero_ordine", numero_ordine)
      .neq("stato", "pagato")
      .select(
        "numero_ordine, email, nome, cognome, telefono, indirizzo, civico, citta, cap, provincia, metodo_pagamento, items, subtotale, spedizione, totale",
      )
      .single();

    if (error) {
      console.error("Errore aggiornamento ordine PayPal:", error);
    } else if (order) {
      const results = await Promise.allSettled([
        sendOrderEmail(order as OrderEmailData),
        sendOrderConfirmationEmail(order as OrderEmailData),
      ]);
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          const label = i === 0 ? "notifica negozio" : "conferma cliente";
          console.error(`[capture-paypal-order] email (${label}) fallita`, r.reason);
        }
      });
    }

    return new Response(JSON.stringify({ success: true, numero_ordine }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Errore capture-paypal-order:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
