import { httpClient } from '@/shared/lib/httpClient'
import type { LoginRequest, LoginResponse } from '@/features/auth/types/auth.types'

export const authService = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>('/login', data),
}
