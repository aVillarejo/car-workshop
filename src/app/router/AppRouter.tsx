import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { PageLoader } from '@/shared/components/ui/PageLoader';

const AppRouter = () => {
  const isAuthenticated = false

  const LoginPage = lazy(() => import('@/features/auth/pages/Login'))
  const WorkShopDashboard = lazy(() => import('@/features/workshop/pages/Dashboard'))
  const ClientDashboard = lazy(() => import('@/features/client/pages/Dashboard'))



  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/taller" replace /> : <LoginPage />}
          />
          <Route path="/taller" element={<WorkShopDashboard />} />
          <Route path="/cliente" element={<ClientDashboard />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export { AppRouter }