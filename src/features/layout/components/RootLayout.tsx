import { Outlet } from 'react-router'
import { Footer } from '@/features/layout/components/Footer'
import { Toaster } from '@/shared/components/ui/sonner'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Outlet />
      <Footer />
      <Toaster position="top-center" expand={true} richColors />
    </div>
  )
}
