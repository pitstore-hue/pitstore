// Supabase Edge Function: create-paypal-order
// Percorso nel progetto: supabase/functions/create-paypal-order/index.ts
//
// Cosa fa: crea un vero ordine PayPal (Orders API v2) e restituisce il
// link a cui reindirizzare il cliente per approvare il pagamento.
// Equivalente PayPal di create-checkout-session per Stripe.
//
// Deploy: supabase functions deploy create-paypal-order
// Secrets richiesti (li trovi su developer.paypal.com dopo aver creato
// un'app REST — vedi CHECKLIST-pubblicazione.md):
//   supabase secrets set PAYPAL_CLIENT_ID=...
//   supabase secrets set PAYPAL_CLIENT_SECRET=...
//   supabase secrets set PAYPAL_ENV=sandbox   # poi "live" quando sei pronto

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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
    // Payload atteso: { numero_ordine, totale, items }
    const { items, numero_ordine, totale } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return new Response(
        JSON.stringify({ error: "Nessun articolo nel carrello" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!numero_ordine || typeof numero_ordine !== "string") {
      return new Response(
        JSON.stringify({ error: "Numero ordine mancante" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (typeof totale !== "number" || totale <= 0) {
      return new Response(
        JSON.stringify({ error: "Totale non valido" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const accessToken = await getAccessToken();
    const origin = req.headers.get("origin") ?? "";
    const value = totale.toFixed(2);

    const orderRes = await fetch(`${paypalBase()}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            // Usati per ritrovare l'ordine nel nostro DB dopo la cattura.
            reference_id: numero_ordine,
            invoice_id: numero_ordine,
            amount: { currency_code: "EUR", value },
          },
        ],
        application_context: {
          brand_name: "PitStore",
          user_action: "PAY_NOW",
          return_url: `${origin}/pagamento-paypal?numero=${encodeURIComponent(numero_ordine)}`,
          cancel_url: `${origin}/checkout?pagamento=annullato`,
        },
      }),
    });

    const orderJson = await orderRes.json();

    if (!orderRes.ok) {
      console.error("Errore creazione ordine PayPal:", orderJson);
      return new Response(
        JSON.stringify({ error: "Impossibile creare l'ordine PayPal" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const approveLink = (orderJson.links ?? []).find((l: any) => l.rel === "approve")?.href;
    if (!approveLink) {
      return new Response(
        JSON.stringify({ error: "Link di approvazione PayPal mancante" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ url: approveLink, paypal_order_id: orderJson.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error("Errore create-paypal-order:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
