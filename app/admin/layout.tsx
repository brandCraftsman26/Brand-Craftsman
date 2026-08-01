import Link from "next/link"
import { ReactNode } from "react"
import { FaTachometerAlt, FaUsers, FaPaintBrush, FaRobot, FaMoneyBillWave, FaCog } from "react-icons/fa"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
            Brand Craftsman
          </h2>
          <span className="text-xs text-neutral-400 font-mono tracking-widest uppercase">Admin Panel</span>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            <li>
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaTachometerAlt className="text-blue-500" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaUsers className="text-purple-500" />
                <span>Users & Plans</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/builder" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaPaintBrush className="text-pink-500" />
                <span>Website Builder</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/ai-tools" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaRobot className="text-green-500" />
                <span>AI Tools Config</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/billing" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaMoneyBillWave className="text-yellow-500" />
                <span>Billing & Revenue</span>
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded-lg text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors">
                <FaCog className="text-gray-400" />
                <span>Global Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-neutral-800">
          <Link href="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
            &larr; Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-neutral-900">
        <header className="h-16 border-b border-neutral-800 flex items-center justify-between px-8 bg-neutral-900/50 backdrop-blur-md">
          <h1 className="text-lg font-semibold text-neutral-200">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </header>
        
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
