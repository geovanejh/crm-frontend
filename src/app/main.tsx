import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'
import { Toaster } from '@/shared/components/ui/sonner'
import { router } from '@/app/router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
      <Toaster position="top-center" expand={true} richColors />
    </ErrorBoundary>
  </StrictMode>,
)
