// Supabase Edge Function: stripe-webhook
// Percorso nel progetto: supabase/functions/stripe-webhook/index.ts
//
// Cosa fa: riceve la notifica da Stripe quando un pagamento va a buon
// fine, aggiorna l'ordine nel database (stato: 'pagato') e SOLO A QUEL
// PUNTO invia le due email (notifica al negozio + conferma al cliente).
//
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
// Poi su dashboard.stripe.com -> Sviluppatori -> Webhook, aggiungi
// l'URL della function come endpoint (evento: checkout.session.completed)
// e copia il "signing secret" che Stripe ti dà, salvandolo con:
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...
//
// Richiede anche (oltre ai secret già esistenti):
//   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
//   supabase secrets set RESEND_FROM_EMAIL="PitStore <supporto@pitstore.it>"
//
// Attenzione: quando passerai a chiavi live, Stripe ti farà creare un
// SECONDO endpoint webhook (quello live) con un signing secret DIVERSO
// da quello di test. Vanno configurati entrambi separatamente.

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  sendOrderEmail,
  sendOrderConfirmationEmail,
  type OrderEmailData,
} from "../_shared/order-email.ts";

serve(async (req) => {
  const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
    apiVersion: "2024-06-20",
    httpClient: Stripe.createFetchHttpClient(),
  });

  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature!,
      Deno.env.get("STRIPE_WEBHOOK_SECRET")!,
    );
  } catch (err) {
    console.error("Firma webhook non valida:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    // Per sicurezza: aggiorniamo l'ordine solo se Stripe conferma che il
    // pagamento è effettivamente incassato (per alcuni metodi il
    // pagamento può restare "unpaid" anche a sessione completata).
    if (session.payment_status !== "paid") {
      return new Response(JSON.stringify({ received: true, skipped: "payment_status non paid" }), {
        headers: { "Content-Type": "application/json" },
      });
    }

    const numero_ordine: string | null = session.client_reference_id ?? null;

    if (!numero_ordine) {
      console.error("checkout.session.completed senza client_reference_id, session:", session.id);
    } else {
      const supabase = createClient(
        Deno.env.get("SUPABASE_URL")!,
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      );

      // .select().single() invece di un update "cieco": ci serve la riga
      // completa dell'ordine per costruire le email.
      const { data: order, error } = await supabase
        .from("orders")
        .update({ stato: "pagato", stripe_session_id: session.id })
        .eq("numero_ordine", numero_ordine)
        // Evita di rimandare le email se il webhook arriva più di una
        // volta per lo stesso ordine (Stripe può ritentare la consegna).
        .neq("stato", "pagato")
        .select(
          "numero_ordine, email, nome, cognome, telefono, indirizzo, civico, citta, cap, provincia, metodo_pagamento, items, subtotale, spedizione, totale",
        )
        .single();

      if (error) {
        console.error("Errore aggiornamento ordine:", error);
      } else if (order) {
        const results = await Promise.allSettled([
          sendOrderEmail(order as OrderEmailData),
          sendOrderConfirmationEmail(order as OrderEmailData),
        ]);
        results.forEach((r, i) => {
          if (r.status === "rejected") {
            const label = i === 0 ? "notifica negozio" : "conferma cliente";
            console.error(`[stripe-webhook] email (${label}) fallita`, r.reason);
          }
        });
      }
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
