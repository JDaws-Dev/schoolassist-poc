import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'

// Initialize Convex client
const convexUrl = import.meta.env.VITE_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

// Admin authentication check component
function RequireAdminAuth({ children }) {
  const isAdminLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true'

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}

// Wrapper component for Convex - only wraps if Convex is configured
function ConvexWrapper({ children }) {
  if (!convex) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md text-center shadow-lg">
          <h1 className="text-xl font-bold text-slate-800 mb-2">
            Convex Not Configured
          </h1>
          <p className="text-slate-600 mb-4">
            Please set VITE_CONVEX_URL in your environment variables.
          </p>
          <code className="text-sm bg-slate-100 px-3 py-1.5 rounded-lg text-slate-700">
            npx convex dev
          </code>
        </div>
      </div>
    )
  }

  return <ConvexProvider client={convex}>{children}</ConvexProvider>
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin login - doesn't need Convex */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin dashboard - needs Convex */}
        <Route
          path="/admin/*"
          element={
            <RequireAdminAuth>
              <ConvexWrapper>
                <AdminDashboard />
              </ConvexWrapper>
            </RequireAdminAuth>
          }
        />

        {/* Redirect /admin to dashboard or login */}
        <Route
          path="/admin"
          element={
            <Navigate
              to={
                sessionStorage.getItem('adminLoggedIn') === 'true'
                  ? '/admin/dashboard'
                  : '/admin/login'
              }
              replace
            />
          }
        />

        {/* Default placeholder for parent portal */}
        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
              <div className="text-center max-w-md">
                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-white text-3xl font-bold">A</span>
                </div>
                <h1 className="text-3xl font-bold text-slate-800 mb-2">
                  Artios Connect
                </h1>
                <p className="text-slate-600 mb-8">
                  Parent portal coming soon...
                </p>
                <a
                  href="/admin"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                >
                  Admin Dashboard
                </a>
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
