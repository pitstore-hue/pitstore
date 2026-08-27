// Componente frontend: pulsante "Acquista" che avvia il checkout Stripe
// Percorso suggerito nel progetto: src/components/CheckoutButton.tsx
//
// Uso:
//   <CheckoutButton items={[{ name: "Prodotto A", price: 1999, quantity: 1 }]} />
//   (price in centesimi: 1999 = 19,99€)

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
);

type CartItem = {
  name: string;
  price: number; // in centesimi
  quantity: number;
};

export default function CheckoutButton({ items }: { items: CartItem[] }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "create-checkout-session",
        { body: { items } },
      );

      if (fnError) throw fnError;
      if (data?.url) {
        window.location.href = data.url; // reindirizza a Stripe Checkout
      } else {
        throw new Error("Nessun URL di checkout ricevuto");
      }
    } catch (err: any) {
      console.error("Errore checkout:", err);
      setError("Non è stato possibile avviare il pagamento. Riprova.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? "Attendere..." : "Acquista ora"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
