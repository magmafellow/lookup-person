import { z } from 'zod'

export const SignupFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(20, { message: 'Name must be max 20 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .max(20, { message: 'Password must be max 20 characters long.' })
    .trim(),
})

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(20, { message: 'Name must be max 20 characters long.' })
    .trim(),
  password: z
    .string()
    .min(4, { message: 'Be at least 4 characters long' })
    .max(20, { message: 'Password must be max 20 characters long.' })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const CreateChatSchema = z.object({
  chatname: z
    .string()
    .min(2, { message: 'name should consist of at least 2 characters' })
    .max(20, { message: 'name must be max 20 characters long.' })
    .trim(),
})

export type roleEntry = {
  role_id: number
  name: string
  description: string
}

export const InviteFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(20, { message: 'Name must be max 20 characters long.' }),
  role: z
    .number()
    .min(1)
    .max(3)
})
