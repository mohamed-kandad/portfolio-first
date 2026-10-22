import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter at least 2 characters.")
    .max(100),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(254),
  message: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(5000),
  website: z.string().max(0).optional(),
});
export type ContactInput = z.infer<typeof contactSchema>;
