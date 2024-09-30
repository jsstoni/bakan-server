import { z } from "zod";

const emailSchema = z
  .string({ message: "Email is required" })
  .email({ message: "Email is invalid" });

const passwordSchema = z
  .string({ message: "Password is required" })
  .min(6, { message: "Password must be at least 6 characters" });

export const validate_register = z.object({
  name: z.string({ message: "Username is required" }),
  email: emailSchema,
  password: passwordSchema,
  repassword: z.string({ message: "Repeat password is required" }).min(6),
});

export const validate_login = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const validate_snippet = z.object({
  title: z.string({ message: "Title is required" }),
  lang: z.string({ message: "Language is required" }),
  code: z.string({ message: "Code is required" }),
  token: z.string().optional(),
});
