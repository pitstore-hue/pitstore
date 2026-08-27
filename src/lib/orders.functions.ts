import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const LETTERS_ONLY = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'’.-]+$/;
const CIVICO_OK = /^[A-Za-z0-9/\s.-]+$/;

const itemSchema = z.object({
  prodotto: z.string().max(200),
  variante: z.string().max(100).nullable().optional(),
  quantita: z.number().int().min(1).max(999),
  prezzo: z.number().min(0).max(100000),
});

// IMPORTANTE: queste regole vanno rivalidate lato server perché il client
// non è mai attendibile (un utente può bypassare i controlli del browser).
const orderSchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .email(),
    nome: z.string().trim().min(1).max(80).regex(LETTERS_ONLY),
    cognome: z.string().trim().min(1).max(80).regex(LETTERS_ONLY),
    telefono: z
      .string()
      .trim()
      .min(6)
      .max(25)
      .refine((v) => {
        try {
          return isValidPhoneNumber(v, "IT");
        } catch {
          return false;
        }
      }, "Numero di telefono non valido"),
    indirizzo: z.string().trim().min(2).max(160),
    civico: z.string().trim().min(1).max(20).regex(CIVICO_OK),
    citta: z.string().trim().min(2).max(80).regex(LETTERS_ONLY),
    cap: z.string().trim().min(1).max(12),
    provincia: z.string().trim().max(40).optional().default(""),
    paese: z.string().trim().min(2).max(80).default("Italia"),
    metodo_pagamento: z.enum(["carta", "paypal"]),
    items: z.array(itemSchema).min(1).max(50),
    subtotale: z.number().min(0),
    spedizione: z.number().min(0),
    totale: z.number().min(0),
  })
  .superRefine((val, ctx) => {
    const isItalia = val.paese.trim().toLowerCase() === "italia";
    if (isItalia) {
      if (!val.provincia.trim()) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["provincia"], message: "Provincia obbligatoria per città italiane" });
      }
      if (!/^\d{5}$/.test(val.cap.trim())) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["cap"], message: "CAP italiano non valido" });
      }
    }
  });

export type OrderInput = z.input<typeof orderSchema>;

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => orderSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: numero, error: seqError } = await supabaseAdmin.rpc("next_order_number");
    if (seqError || !numero) {
      console.error("[orders] numero ordine failed", seqError?.message);
      throw new Error("Impossibile creare l'ordine. Riprova.");
    }
    const numero_ordine = numero as string;

    // .select() aggiunto: ci serve l'id per riferimento interno; il
    // numero_ordine (già presente prima) resta il riferimento usato per
    // collegare l'ordine al pagamento Stripe/PayPal.
    const { data: inserted, error } = await supabaseAdmin
      .from("orders")
      .insert({
        numero_ordine,
        email: data.email,
        nome: data.nome,
        cognome: data.cognome,
        telefono: data.telefono,
        indirizzo: data.indirizzo,
        civico: data.civico || null,
        citta: data.citta,
        cap: data.cap,
        provincia: data.provincia || null,
        paese: data.paese,
        metodo_pagamento: data.metodo_pagamento,
        items: data.items,
        subtotale: data.subtotale,
        spedizione: data.spedizione,
        totale: data.totale,
      })
      .select("id, numero_ordine")
      .single();

    if (error || !inserted) {
      console.error("[orders] insert failed", error?.message);
      throw new Error("Impossibile salvare l'ordine. Riprova.");
    }

    // Le email di conferma NON partono qui: l'ordine a questo punto non è
    // ancora pagato (il cliente sta per essere reindirizzato a Stripe/
    // PayPal). Le due email (notifica negozio + conferma cliente) vengono
    // inviate più avanti, da stripe-webhook o capture-paypal-order, solo
    // quando il pagamento è davvero confermato.

    return { id: inserted.id, numero_ordine };
  });
