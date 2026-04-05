import { Outlet } from 'react-router'
import { Suspense } from 'react'
import { SidebarProvider } from '@/shared/components/ui/sidebar'
import { Header } from '@/features/layout/components/Header'
import { Spinner } from '@/shared/components/ui/spinner'
import { AppSidebar } from './Sidebar/AppSidebar'

export function AuthenticatedLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Header />
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8">
          <Suspense fallback={<Spinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </SidebarProvider>
  )
}
