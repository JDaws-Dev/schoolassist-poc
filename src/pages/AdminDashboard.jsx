import { useState } from 'react'
import { useNavigate, Routes, Route, NavLink } from 'react-router-dom'
import {
  Bell,
  Megaphone,
  Bot,
  BarChart3,
  LogOut,
  Menu,
  X,
  Home
} from 'lucide-react'
import NotificationsPanel from '../components/admin/NotificationsPanel'
import AnnouncementsPanel from '../components/admin/AnnouncementsPanel'
import AISettingsPanel from '../components/admin/AISettingsPanel'
import AnalyticsPanel from '../components/admin/AnalyticsPanel'

const navItems = [
  { path: 'notifications', label: 'Notifications', icon: Bell },
  { path: 'announcements', label: 'Announcements', icon: Megaphone },
  { path: 'ai-settings', label: 'AI Settings', icon: Bot },
  { path: 'analytics', label: 'Analytics', icon: BarChart3 },
]

function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn')
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-40 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <span className="font-semibold text-slate-800">Admin Dashboard</span>
        <button
          onClick={handleLogout}
          className="p-2 -mr-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-slate-200 z-50
          transform transition-transform duration-200 ease-in-out
          lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Sidebar header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="font-semibold text-slate-800">Artios Connect</h1>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200">
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors mb-2"
          >
            <Home className="w-5 h-5" />
            Parent Portal
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-72 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/dashboard" element={<DashboardHome />} />
            <Route path="/notifications" element={<NotificationsPanel />} />
            <Route path="/announcements" element={<AnnouncementsPanel />} />
            <Route path="/ai-settings" element={<AISettingsPanel />} />
            <Route path="/analytics" element={<AnalyticsPanel />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

// Dashboard home/overview
function DashboardHome() {
  const navigate = useNavigate()

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">
        Welcome to Admin Dashboard
      </h1>
      <p className="text-slate-600 mb-8">
        Manage notifications, announcements, AI settings, and view analytics.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(`/admin/${item.path}`)}
            className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all text-left group"
          >
            <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-100 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <item.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="font-semibold text-slate-800 mb-1">{item.label}</h2>
            <p className="text-sm text-slate-500">
              {item.path === 'notifications' && 'Create and manage alert banners'}
              {item.path === 'announcements' && 'Post news and updates'}
              {item.path === 'ai-settings' && 'Configure AI assistant'}
              {item.path === 'analytics' && 'View usage statistics'}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
