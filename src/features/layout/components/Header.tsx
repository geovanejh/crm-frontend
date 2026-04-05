import { Link } from 'react-router'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'

export function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <SidebarTrigger />
        <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
          CRM Frontend
        </Link>
        <nav className="flex gap-4">

        </nav>
      </div>
    </header>
  )
}
