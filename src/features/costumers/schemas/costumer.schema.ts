import { z } from 'zod'
import { unmask } from '@/shared/lib/masks'

export const personalInfoSchema = z
  .object({
    type: z.enum(['PF', 'PJ'], { message: 'Tipo de pessoa é obrigatório' }),
    // PF fields
    name: z.string().optional(),
    birthDate: z.string().optional(),
    gender: z.string().optional(),
    maritalStatus: z.string().optional(),
    nationality: z.string().optional(),
    // PJ fields
    nomeFantasia: z.string().optional(),
    razaoSocial: z.string().optional(),
    // Shared
    document: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === 'PF') {
      if (!data.name) {
        ctx.addIssue({ code: 'custom', message: 'Nome completo é obrigatório', path: ['name'] })
      }
      if (!data.document || unmask(data.document).length !== 11) {
        ctx.addIssue({ code: 'custom', message: 'CPF inválido', path: ['document'] })
      }
      if (!data.birthDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Data de nascimento é obrigatória',
          path: ['birthDate'],
        })
      }
    }

    if (data.type === 'PJ') {
      if (!data.nomeFantasia) {
        ctx.addIssue({ code: 'custom', message: 'Nome fantasia é obrigatório', path: ['nomeFantasia'] })
      }
      if (!data.razaoSocial) {
        ctx.addIssue({ code: 'custom', message: 'Razão social é obrigatória', path: ['razaoSocial'] })
      }
      if (!data.document || unmask(data.document).length !== 14) {
        ctx.addIssue({ code: 'custom', message: 'CNPJ inválido', path: ['document'] })
      }
    }
  })

export const contactInfoSchema = z.object({
  email: z.email('Email inválido'),
  phone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine((val) => unmask(val).length >= 10, 'Telefone inválido'),
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .refine((val) => unmask(val).length === 8, 'CEP inválido'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Bairro é obrigatório'),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
})

export const accountDetailsSchema = z.object({
  plan: z.string().min(1, 'Tipo de plano é obrigatório'),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  notes: z.string().optional(),
})

export const costumerSchema = personalInfoSchema
  .and(contactInfoSchema)
  .and(accountDetailsSchema)

export type CostumerFormData = z.infer<typeof costumerSchema>

export const getPersonalInfoFields = (type: 'PF' | 'PJ') =>
  type === 'PF'
    ? (['type', 'name', 'document', 'birthDate', 'gender', 'maritalStatus', 'nationality'] as const)
    : (['type', 'nomeFantasia', 'razaoSocial', 'document'] as const)

export const contactInfoFields: (keyof z.infer<typeof contactInfoSchema>)[] = [
  'email',
  'phone',
  'cep',
  'street',
  'number',
  'complement',
  'neighborhood',
  'city',
  'state',
]

export const accountDetailsFields: (keyof z.infer<typeof accountDetailsSchema>)[] = ['plan', 'notes']
