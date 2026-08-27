// Percorso nel progetto: src/routes/pagamento-paypal.tsx
// (adatta il path "/pagamento-paypal" e la posizione del file alla tua
// convenzione di routing, se diversa — deve però coincidere con il
// return_url impostato in create-paypal-order/index.ts)
//
// Cosa fa: PayPal reindirizza qui il cliente dopo che ha approvato il
// pagamento nel popup/pagina PayPal. L'approvazione da sola NON è un
// pagamento incassato: questa pagina chiama capture-paypal-order per
// catturare davvero i soldi, poi porta alla pagina di conferma ordine.

import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const searchSchema = z.object({
  numero: z.string().optional(),
  token: z.string().optional(), // impostato da PayPal stesso nell'URL di ritorno
  PayerID: z.string().optional(),
});

export const Route = createFileRoute("/pagamento-paypal")({
  validateSearch: searchSchema,
  component: PagamentoPaypal,
});

function PagamentoPaypal() {
  const search = useSearch({ from: "/pagamento-paypal" });
  const navigate = useNavigate();
  const [status, setStatus] = useState<"in_corso" | "errore">("in_corso");

  useEffect(() => {
    async function run() {
      if (!search.token) {
        setStatus("errore");
        return;
      }
      const { data, error } = await supabase.functions.invoke("capture-paypal-order", {
        body: { token: search.token },
      });
      if (error || !data?.success) {
        console.error(error ?? data);
        setStatus("errore");
        return;
      }
      navigate({ to: "/ordine-confermato", search: { numero: data.numero_ordine } });
    }
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.token]);

  if (status === "errore") {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="text-3xl">Non siamo riusciti a confermare il pagamento</h1>
        <p className="mt-2 text-muted-foreground">
          Se hai già completato il pagamento su PayPal, contattaci indicando il numero
          ordine {search.numero ?? "—"}. Altrimenti puoi riprovare dal checkout.
        </p>
      </div>
    );
  }

  return (
    <div className="container-page py-24 text-center">
      <h1 className="text-3xl">Stiamo confermando il pagamento…</h1>
      <p className="mt-2 text-muted-foreground">Non chiudere questa pagina.</p>
    </div>
  );
}
