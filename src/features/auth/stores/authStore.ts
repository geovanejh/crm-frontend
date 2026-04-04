import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { authService } from '@/features/auth/services/authService'
import type { LoginRequest } from '@/features/auth/types/auth.types'

interface AuthState {
  token: string | null
  email: string | null
  activated: boolean
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(devtools((set) => ({
  token: localStorage.getItem('token'),
  email: localStorage.getItem('email'),
  activated: localStorage.getItem('activated') === 'true',
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  login: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const response = await authService.login(data)
      localStorage.setItem('token', response.token)
      localStorage.setItem('email', response.email)
      localStorage.setItem('activated', String(response.activated))
      set({
        token: response.token,
        email: response.email,
        activated: response.activated,
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Login failed'
      set({ error: message, isLoading: false })
      throw err
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('activated')
    set({
      token: null,
      email: null,
      activated: false,
      isAuthenticated: false,
      error: null,
    })
  },
}), { name: 'auth-store' }))
