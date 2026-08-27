// Server-only: email del form Contatti (Node/Vite server functions).
//
// NOTA: le email di conferma ordine NON vivono più qui. Ora partono solo
// dopo che il pagamento è confermato, da dentro le Supabase Edge Function
// stripe-webhook / capture-paypal-order (runtime Deno), che usano la loro
// versione in supabase/functions/_shared/order-email.ts.
export const SHOP_NOTIFICATION_EMAIL = "pitstorechat@gmail.com";

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
  replyTo,
}: {
  to: string | string[];
  subject: string;
  text: string;
  replyTo?: string | undefined;
}) {
  const RESEND_API_KEY = process.env["RESEND_API_KEY"];
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY non configurata — email non inviata");
    return;
  }

  // In sviluppo (senza dominio verificato su Resend) usa il mittente di
  // test onboarding@resend.dev. Quando pubblichi il sito con un dominio
  // vero, verificalo su Resend e imposta RESEND_FROM_EMAIL, es:
  // RESEND_FROM_EMAIL="PitStore <supporto@pitstore.it>"
  const from = process.env["RESEND_FROM_EMAIL"] || "PitStore <onboarding@resend.dev>";

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
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Resend error [${response.status}]: ${body}`);
  }

  const data = await response.json();
  console.info("[email] inviata", data);
}

export type ContactEmailData = { nome: string; email: string; messaggio: string };

export function buildContactSummary(c: ContactEmailData): string {
  return [
    "Nuovo messaggio dal form Contatti",
    "",
    `Nome: ${c.nome}`,
    `Email: ${c.email}`,
    "",
    "Messaggio:",
    c.messaggio,
  ].join("\n");
}

export async function sendContactEmail(contact: ContactEmailData): Promise<void> {
  await sendResendEmail({
    to: SHOP_NOTIFICATION_EMAIL,
    subject: contact.nome,
    text: buildContactSummary(contact),
    // Rispondendo a questa email dalla tua casella, la risposta va
    // direttamente all'indirizzo del cliente, non a te stesso.
    replyTo: contact.email,
  });
}
