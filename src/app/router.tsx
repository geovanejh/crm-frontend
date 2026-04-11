import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/features/layout/components/RootLayout'
import { AuthenticatedLayout } from '@/features/layout/components/AuthenticatedLayout'
import { RouteErrorPage } from '@/shared/components/RouteErrorPage'
import { PrivateRoute } from '@/features/auth/components/PrivateRoute'
import { PublicRoute } from '@/features/auth/components/PublicRoute'
import { lazyRoute } from '@/shared/lib/lazyLoad'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      // Public routes (redirect to / if authenticated)
      {
        element: <PublicRoute />,
        children: [
          { path: '/login', lazy: lazyRoute(() => import('@/features/auth/pages/LoginPage'), 'LoginPage') },
          { path: '/register', lazy: lazyRoute(() => import('@/features/auth/pages/RegisterPage'), 'RegisterPage') },
          {
            path: '/verify-email',
            lazy: async () => {
              const { mailVerificationLoader } = await import(
                '@/features/auth/pages/mailVerificationLoader'
              )
              return { loader: mailVerificationLoader }
            },
          },
        ],
      },

      // Private routes (redirect to /login if not authenticated)
      {
        element: <PrivateRoute />,
        children: [
          {
            element: <AuthenticatedLayout />,
            children: [{ index: true, lazy: lazyRoute(() => import('@/features/home/pages/HomePage'), 'HomePage') }],
          },
        ],
      },

      { path: '*', lazy: lazyRoute(() => import('@/shared/components/NotFoundPage'), 'NotFoundPage') },
    ],
  },
])
