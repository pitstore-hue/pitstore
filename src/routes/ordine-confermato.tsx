import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/ordine-confermato")({
  validateSearch: (search: Record<string, unknown>) => ({
    numero: typeof search["numero"] === "string" ? search["numero"] : "NT-000000",
  }),
  head: () => ({
    meta: [
      { title: "Ordine confermato — PitStore" },
      { name: "description", content: "Grazie! Il tuo ordine è stato registrato." },
      { property: "og:title", content: "Ordine confermato — PitStore" },
      { property: "og:description", content: "Il tuo ordine è stato registrato." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Confermato,
});

function Confermato() {
  const { numero } = Route.useSearch();
  return (
    <div className="container-page py-24 text-center">
      <CheckCircle2 className="mx-auto size-12 text-primary" />
      <h1 className="mt-6 text-4xl">Grazie per il tuo ordine!</h1>
      <p className="mt-3 text-muted-foreground">
        Numero ordine <span className="text-foreground">{numero}</span>. Ti abbiamo inviato una
        email di conferma con i dettagli della spedizione.
      </p>
      <Link to="/catalogo" className="btn-base btn-primary mt-8">
        Continua lo shopping
      </Link>
    </div>
  );
}
