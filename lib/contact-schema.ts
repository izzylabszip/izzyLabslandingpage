import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name needs at least 2 characters").max(80),
  email: z.email("Enter a valid email address").max(120),
  brief: z
    .string()
    .trim()
    .min(20, "Tell us a little more (20+ characters)")
    .max(4000),
  /** Honeypot. Humans never see or fill this; the API silently drops non-empty values. */
  company: z.string().max(200).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
