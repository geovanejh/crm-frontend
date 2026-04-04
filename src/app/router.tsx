import { createBrowserRouter } from 'react-router'
import { RootLayout } from '@/features/layout/components/RootLayout'
import { HomePage } from '@/features/home/pages/HomePage'
import { NotFoundPage } from '@/shared/components/NotFoundPage'
import { RouteErrorPage } from '@/shared/components/RouteErrorPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <NotFoundPage /> },
      { path: '/login', element: <LoginPage /> },
    ],
  },
])
