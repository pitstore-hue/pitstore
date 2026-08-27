// Supabase Edge Function (condiviso): _shared/order-email.ts
// Percorso nel progetto: supabase/functions/_shared/order-email.ts
//
// Versione Deno delle email d'ordine, usata da stripe-webhook e
// capture-paypal-order — cioè inviata SOLO dopo che il pagamento è
// confermato, non al momento della creazione dell'ordine.
//
// Richiede il secret RESEND_API_KEY sul progetto Supabase:
//   supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx
// Opzionale, mittente personalizzato (altrimenti usa il dominio di test):
//   supabase secrets set RESEND_FROM_EMAIL="PitStore <supporto@pitstore.it>"

export const SHOP_NOTIFICATION_EMAIL = "pitstorechat@gmail.com";

export type OrderItem = {
  prodotto: string;
  variante?: string | null;
  quantita: number;
  prezzo: number;
};

export type OrderEmailData = {
  numero_ordine: string;
  email: string;
  nome: string;
  cognome: string;
  telefono: string;
  indirizzo: string;
  civico?: string | null;
  citta: string;
  cap: string;
  provincia: string;
  metodo_pagamento: string;
  items: OrderItem[];
  subtotale: number;
  spedizione: number;
  totale: number;
};

const eur = (n: number) => `${n.toFixed(2).replace(".", ",")} €`;

function buildOrderSummary(o: OrderEmailData): string {
  const righe = o.items
    .map(
      (i) =>
        `- ${i.prodotto}${i.variante ? ` (${i.variante})` : ""} x${i.quantita} — ${eur(
          i.prezzo * i.quantita,
        )}`,
    )
    .join("\n");

  return [
    `Ordine pagato ${o.numero_ordine}`,
    "",
    `Cliente: ${o.nome} ${o.cognome}`,
    `Email: ${o.email}`,
    `Telefono: ${o.telefono}`,
    `Indirizzo: ${o.indirizzo}${o.civico ? ` ${o.civico}` : ""}, ${o.cap} ${o.citta} (${o.provincia})`,
    `Pagamento: ${o.metodo_pagamento}`,
    "",
    "Prodotti:",
    righe,
    "",
    `Subtotale: ${eur(o.subtotale)}`,
    `Spedizione: ${o.spedizione === 0 ? "Gratuita" : eur(o.spedizione)}`,
    `Totale: ${eur(o.totale)}`,
  ].join("\n");
}

function toHtml(text: string): string {
  return `<html><body style="font-family: Arial, sans-serif; line-height: 1.5; color: #111;">${text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>")}</body></html>`;
}

async function sendResendEmail({
  to,
  subject,
  text,
}: {
  to: string | string[];
  subject: string;
  text: string;
}): Promise<void> {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.warn("[order-email] RESEND_API_KEY non configurata — email non inviata");
    return;
  }

  const from = Deno.env.get("RESEND_FROM_EMAIL") || "PitStore <onboarding@resend.dev>";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      text,
      html: toHtml(text),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    console.error(`[order-email] Resend error [${response.status}]: ${body}`);
    return;
  }

  console.info("[order-email] inviata a", to);
}

/** Notifica al negozio: da chiamare SOLO dopo conferma pagamento. */
export async function sendOrderEmail(order: OrderEmailData): Promise<void> {
  await sendResendEmail({
    to: SHOP_NOTIFICATION_EMAIL,
    subject: `Ordine pagato ${order.numero_ordine}`,
    text: buildOrderSummary(order),
  });
}

/** Conferma al cliente: da chiamare SOLO dopo conferma pagamento. */
export async function sendOrderConfirmationEmail(order: OrderEmailData): Promise<void> {
  const summary = buildOrderSummary(order);
  await sendResendEmail({
    to: order.email,
    subject: `Conferma ordine ${order.numero_ordine} — PitStore`,
    text: [
      `Grazie per il tuo ordine, ${order.nome}!`,
      "",
      `Il pagamento è stato ricevuto con successo.`,
      `Numero ordine: ${order.numero_ordine}`,
      "",
      "Ecco il riepilogo:",
      summary.replace(`Ordine pagato ${order.numero_ordine}\n`, ""),
      "",
      "Ti contatteremo appena l'ordine verrà spedito.",
      "",
      "Il team PitStore",
    ].join("\n"),
  });
}
