// Supabase Edge Function: stripe-webhook
// Percorso nel progetto: supabase/functions/stripe-webhook/index.ts
//
// Cosa fa: riceve la notifica da Stripe quando un pagamento va a buon
// fine e aggiorna l'ordine nel database Supabase.
//
// Deploy: supabase functions deploy stripe-webhook --no-verify-jwt
// Poi su dashboard.stripe.com -> Sviluppatori -> Webhook, aggiungi
// l'URL della function come endpoint e copia il "signing secret"
// che Stripe ti da, salvandolo con:
//   supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_...

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

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

  // Il pagamento e' andato a buon fine
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    // Usa la service role key per scrivere nel database senza restrizioni RLS
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Adatta questa parte alla tua tabella ordini reale
    const { error } = await supabase
      .from("orders")
      .update({ status: "paid", stripe_session_id: session.id })
      .eq("stripe_session_id", session.id);

    if (error) {
      console.error("Errore aggiornamento ordine:", error);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
