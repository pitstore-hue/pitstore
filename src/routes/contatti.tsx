import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { sendContactMessage } from "@/lib/contact.functions";

export const Route = createFileRoute("/contatti")({
  head: () => ({
    meta: [
      { title: "Contatti — PitStore lampade da comodino" },
      {
        name: "description",
        content:
          "Scrivici per consigli sull'illuminazione, ordini, spedizioni o resi. Rispondiamo entro 24 ore lavorative.",
      },
      { property: "og:title", content: "Contatti — PitStore" },
      { property: "og:description", content: "Assistenza e consulenza sulle lampade da PitStore." },
    ],
  }),
  component: Contatti,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Inserisci il tuo nome").max(80),
  email: z.string().trim().email("Email non valida").max(255),
  messaggio: z.string().trim().min(10, "Scrivi almeno 10 caratteri").max(1000),
});

function Contatti() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const send = useServerFn(sendContactMessage);

  return (
    <div className="container-page py-14">
      <h1 className="text-4xl">Contatti</h1>
      <p className="mt-2 max-w-lg text-muted-foreground">
        Domande su un modello, un ordine o una spedizione?
        <br /> 
        Rispondiamo il più presto possibile.
      </p>

      <div className="mx-auto mt-10 max-w-xl">
        <div className="surface-card space-y-5 p-8 text-center">
          <p className="font-display text-2xl text-foreground">Per contattarci scrivi a:</p>
          <a
            href="mailto:pitstorechat@gmail.com"
            className="block text-xl font-semibold text-primary hover:underline"
          >
            pitstorechat@gmail.com
          </a>

          <div className="flex items-center gap-4 pt-2">
            <span className="h-px flex-1 bg-border" />
            <span className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
              oppure
            </span>
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>

        <form
          className="surface-card mt-6 space-y-4 p-6"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            const parsed = schema.safeParse({
              nome: fd.get("nome"),
              email: fd.get("email"),
              messaggio: fd.get("messaggio"),
            });
            if (!parsed.success) {
              const next: Record<string, string> = {};
              for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
              setErrors(next);
              return;
            }
            setErrors({});
            setSending(true);
            try {
              await send({ data: parsed.data });
              form.reset();
              toast.success("Messaggio inviato! Ti rispondiamo al più presto.");
            } catch {
              toast.error("Invio non riuscito. Riprova tra poco.");
            } finally {
              setSending(false);
            }
          }}
        >
          <div>
            <label htmlFor="nome" className="text-sm">
              Nome
            </label>
            <input id="nome" name="nome" className="field-input mt-1" maxLength={80} />
            {errors["nome"] && <p className="mt-1 text-xs text-destructive">{errors["nome"]}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input id="email" name="email" className="field-input mt-1" maxLength={255} />
            {errors["email"] && <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>}
          </div>
          <div>
            <label htmlFor="messaggio" className="text-sm">
              Messaggio
            </label>
            <textarea
              id="messaggio"
              name="messaggio"
              rows={5}
              maxLength={1000}
              className="field-input mt-1"
            />
            {errors["messaggio"] && (
              <p className="mt-1 text-xs text-destructive">{errors["messaggio"]}</p>
            )}
          </div>
          <button type="submit" className="btn-base btn-primary w-full" disabled={sending}>
            {sending ? "Invio in corso…" : "Invia messaggio"}
          </button>
        </form>
      </div>
    </div>
  );
}
