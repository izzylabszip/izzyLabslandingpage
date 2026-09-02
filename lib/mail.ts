import { Resend } from "resend";
import type { ContactInput } from "./contact-schema";

/**
 * Mail transport for the contact form. Isolated so a Railway-hosted backend
 * (or any other transport) can replace it without touching the UI or route.
 */
export async function sendContactEmail(input: ContactInput): Promise<{ delivered: boolean }> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "izzylabs <onboarding@resend.dev>";

  if (!apiKey || !to) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Mail transport not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL");
    }
    console.info("[contact] dev mode, message logged but not delivered:", {
      name: input.name,
      email: input.email,
      brief: input.brief,
    });
    return { delivered: false };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: input.email,
    subject: `[izzylabs] New brief from ${input.name}`,
    text: [
      `NAME_: ${input.name}`,
      `EMAIL_: ${input.email}`,
      "",
      "PROJECT_BRIEF_:",
      input.brief,
    ].join("\n"),
  });

  if (error) throw new Error(error.message);
  return { delivered: true };
}
