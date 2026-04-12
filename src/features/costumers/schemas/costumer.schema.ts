import { z } from 'zod'

export const costumerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  document: z.string().min(1, 'Document is required'),
})

export type CostumerFormData = z.infer<typeof costumerSchema>
