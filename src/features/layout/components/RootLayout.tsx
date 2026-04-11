import { Outlet } from 'react-router'
import { Footer } from '@/features/layout/components/Footer'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Outlet />
      <Footer />
    </div>
  )
}
