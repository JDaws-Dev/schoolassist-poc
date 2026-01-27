import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import Home from './pages/Home'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Calendar from './pages/Calendar'
import Resources from './pages/Resources'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import BottomNav from './components/BottomNav'

// Initialize Convex client
const convexUrl = import.meta.env.VITE_CONVEX_URL
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null

// Parent authentication check
function RequireParentAuth({ children }) {
  const isParentLoggedIn = sessionStorage.getItem('parentLoggedIn') === 'true'

  if (!isParentLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}

// Admin authentication check
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

// Layout with bottom navigation for parent views
function ParentLayout({ children }) {
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ConvexWrapper>
        <Routes>
          {/* Public: Login */}
          <Route path="/login" element={<Login />} />

          {/* Parent routes - require auth */}
          <Route
            path="/"
            element={
              <RequireParentAuth>
                <ParentLayout>
                  <Home />
                </ParentLayout>
              </RequireParentAuth>
            }
          />
          <Route
            path="/chat"
            element={
              <RequireParentAuth>
                <Chat />
              </RequireParentAuth>
            }
          />
          <Route
            path="/calendar"
            element={
              <RequireParentAuth>
                <ParentLayout>
                  <Calendar />
                </ParentLayout>
              </RequireParentAuth>
            }
          />
          <Route
            path="/resources"
            element={
              <RequireParentAuth>
                <ParentLayout>
                  <Resources />
                </ParentLayout>
              </RequireParentAuth>
            }
          />

          {/* Admin login - public */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin dashboard - requires admin auth */}
          <Route
            path="/admin/*"
            element={
              <RequireAdminAuth>
                <AdminDashboard />
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

          {/* Catch-all: redirect to home or login */}
          <Route
            path="*"
            element={
              <Navigate
                to={
                  sessionStorage.getItem('parentLoggedIn') === 'true'
                    ? '/'
                    : '/login'
                }
                replace
              />
            }
          />
        </Routes>
      </ConvexWrapper>
    </BrowserRouter>
  )
}

export default App
