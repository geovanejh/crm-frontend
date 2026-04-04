import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/features/layout/components/RootLayout'
import { HomePage } from '@/features/home/pages/HomePage'
import { NotFoundPage } from '@/shared/components/NotFoundPage'
import { RouteErrorPage } from '@/shared/components/RouteErrorPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { PrivateRoute } from '@/features/auth/components/PrivateRoute'
import { PublicRoute } from '@/features/auth/components/PublicRoute'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      // Public routes (redirect to / if authenticated)
      {
        element: <PublicRoute />,
        children: [
          { path: '/login', element: <LoginPage /> },
        ],
      },

      // Private routes (redirect to /login if not authenticated)
      {
        element: <PrivateRoute />,
        children: [
          { index: true, element: <HomePage /> },
        ],
      },

      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
