import { z } from "zod"

export const emailSchema = z.string().email({
  message: "Please enter a valid email address.",
})

export const passwordSchema = z.string().min(6, {
  message: "Password must be at least 6 characters.",
})

export const nameSchema = z.string().min(2, {
  message: "Name must be at least 2 characters.",
})

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
})

export const signupFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

// signup API schema (without confirmPassword)
export const signupSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupFormSchema>
export type SignupApiData = z.infer<typeof signupSchema>
