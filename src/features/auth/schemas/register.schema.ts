import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'Name is required').refine((val) => val.includes(' '), 'Full name is required'),
    phone: z.string().min(1, 'Phone number is required'),
    email: z.email('Invalid email').min(1, 'Email is required'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>
