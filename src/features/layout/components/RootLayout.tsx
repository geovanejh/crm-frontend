import { Outlet } from 'react-router'
import { Header } from '@/features/layout/components/Header'
import { Footer } from '@/features/layout/components/Footer'
import { Toaster } from '@/shared/components/ui/sonner'

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      <Header />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8">
        <Outlet />
      </main>
      <Footer />
      <Toaster position="top-center" expand={true} richColors/>
    </div>
  )
}
