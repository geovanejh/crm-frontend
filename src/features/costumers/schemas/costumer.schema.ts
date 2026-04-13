import { z } from 'zod'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  document: z.string().min(1, 'Document is required'),
  birthDate: z.string().min(1, 'Birth date is required'),
})

export const contactInfoSchema = z.object({
  email: z.email('Invalid email'),
  phone: z.string().min(1, 'Phone is required'),
})

export const accountDetailsSchema = z.object({
  notes: z.string().optional(),
})

export const costumerSchema = personalInfoSchema
  .extend(contactInfoSchema.shape)
  .extend(accountDetailsSchema.shape)

export type CostumerFormData = z.infer<typeof costumerSchema>

export const personalInfoFields: (keyof z.infer<typeof personalInfoSchema>)[] =
  ['name', 'document', 'birthDate']

export const contactInfoFields: (keyof z.infer<typeof contactInfoSchema>)[] =
  ['email', 'phone']

export const accountDetailsFields: (keyof z.infer<typeof accountDetailsSchema>)[] =
  ['notes']
