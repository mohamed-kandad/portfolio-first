import { z } from "zod";
export const makeContactSchema = (
  messages = {
    name: "Please enter at least 2 characters.",
    email: "Please enter a valid email address.",
    message: "Please write at least 20 characters.",
  },
) =>
  z.object({
    name: z.string().trim().min(2, messages.name).max(100),
    email: z.string().trim().email(messages.email).max(254),
    message: z.string().trim().min(20, messages.message).max(5000),
    website: z.string().max(0).optional(),
  });
export const contactSchema = makeContactSchema();
export type ContactInput = z.infer<typeof contactSchema>;
