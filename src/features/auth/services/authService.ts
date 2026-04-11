import { httpClient } from '@/shared/lib/httpClient'
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '@/features/auth/types/auth.types'

export const authService = {
  login: (data: LoginRequest) => httpClient.post<LoginResponse>('/login', data),
  register: (data: RegisterRequest) => httpClient.post('/register', data),
  verifyEmail: (token: string) => httpClient.post('/verify-email', { token }),
}