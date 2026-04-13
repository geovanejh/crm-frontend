import { httpClient } from '@/shared/lib/httpClient'
import type { Costumer } from '../types/costumer.types'
import type { CostumerFormData } from '../schemas/costumer.schema'

export const costumerService = {
  list: () => httpClient.get<Costumer[]>('/costumers'),
  getById: (id: string) => httpClient.get<Costumer>(`/costumers/${id}`),
  create: (data: CostumerFormData) => httpClient.post<Costumer>('/costumers', data),
  update: (id: string, data: Partial<CostumerFormData>) =>
    httpClient.put<Costumer>(`/costumers/${id}`, data),
  delete: (id: string) => httpClient.delete<void>(`/costumers/${id}`),
}
