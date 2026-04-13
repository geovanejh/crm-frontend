export interface Costumer {
  id: string
  type: 'PF' | 'PJ'
  name?: string
  nomeFantasia?: string
  razaoSocial?: string
  document: string
  birthDate?: string
  gender?: string
  maritalStatus?: string
  nationality?: string
  email: string
  phone: string
  cep: string
  street: string
  number: string
  complement?: string
  neighborhood: string
  city: string
  state: string
  plan: string
  startDate: string
  endDate: string
  notes?: string
}
