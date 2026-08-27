// Supabase Edge Function: create-checkout-session
// Percorso nel progetto: supabase/functions/create-checkout-session/index.ts
//
// Cosa fa: riceve dal frontend gli articoli dell'ordine + il numero_ordine
// già creato (via createOrder) e crea una sessione di pagamento Stripe,
// collegandola all'ordine tramite client_reference_id. Questo è il pezzo
// che mancava: prima l'ordine e la sessione Stripe non erano collegati,
// quindi il webhook non riusciva mai ad aggiornare l'ordine giusto.
//
// Deploy: supabase functions deploy create-checkout-session
// Secret richiesto (non va nel .env del frontend):
//   supabase secrets set STRIPE_SECRET_KEY=sk_test_...

import Stripe from "https://esm.sh/stripe@14?target=deno";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
      apiVersion: "2024-06-20",
      httpClient: Stripe.createFetchHttpClient(),
    });

    // Payload atteso dal frontend:
    // { numero_ordine: "ORD-0001", items: [{ name, price (centesimi), quantity }] }
    const { items, numero_ordine } = await req.json();

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

    const line_items = items.map((item: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name },
        unit_amount: item.price, // in centesimi
      },
      quantity: item.quantity || 1,
    }));

    const origin = req.headers.get("origin") ?? "";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      // Questo è il collegamento con la nostra tabella orders: il webhook
      // lo userà per trovare e aggiornare l'ordine giusto.
      client_reference_id: numero_ordine,
      metadata: { numero_ordine },
      success_url: `${origin}/ordine-confermato?numero=${encodeURIComponent(numero_ordine)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?pagamento=annullato`,
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Errore creazione sessione Stripe:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
