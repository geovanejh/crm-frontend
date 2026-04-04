import { httpClient } from '@/shared/lib/httpClient'
import type { User } from '@/features/user/types/api'

export const userService = {
  getAll: () => httpClient.get<User[]>('/users'),
  getById: (id: string) => httpClient.get<User>(`/users/${id}`),
}
