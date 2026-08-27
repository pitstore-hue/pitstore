import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  nome: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(255),
  messaggio: z.string().trim().min(10).max(1000),
});

export type ContactInput = z.input<typeof contactSchema>;

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { sendContactEmail } = await import("./order-email.server");
    await sendContactEmail(data);
    return { ok: true };
  });
