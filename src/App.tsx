import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { RequireParentAuth } from '@/components/auth/RequireParentAuth'
import { ParentLayout } from '@/components/layout/ParentLayout'
import Admin from '@/pages/Admin'
import Calendar from '@/pages/Calendar'
import Chat from '@/pages/Chat'
import Community from '@/pages/Community'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Resources from '@/pages/Resources'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/"
          element={
            <RequireParentAuth>
              <ParentLayout />
            </RequireParentAuth>
          }
        >
          <Route index element={<Home />} />
          <Route path="chat" element={<Chat />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="resources" element={<Resources />} />
          <Route path="community" element={<Community />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
