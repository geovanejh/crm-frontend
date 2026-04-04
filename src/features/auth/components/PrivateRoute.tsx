import { Navigate, Outlet } from 'react-router'
import { useAuthStore } from '@/features/auth/stores/authStore'

export function PrivateRoute() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
