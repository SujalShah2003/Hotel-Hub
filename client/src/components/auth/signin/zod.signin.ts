import { z } from "zod";

export const signInInitialValues: SignInFormType = {
  email: "",
  password: "",
};

export const signInSchema = z.object({
  email: z
    .string({ error: "Email is required" })
    .email("Please enter a valid email"),

  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password can't exceed 50 characters"),

});

export type SignInFormType = z.infer<typeof signInSchema>;
