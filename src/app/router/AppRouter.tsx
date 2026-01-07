import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

import { useIsAuthenticated } from '@/shared/stores/useAuthStore'
import { PageLoader } from '@/shared/components/ui/PageLoader';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';

const LoginPage = lazy(() => import('@/features/auth/pages/Login'))

const WorkShopDashboard = lazy(() => import('@/features/workshop/pages/Dashboard'))
const WorkShopOrderDetail = lazy(() => import('@/features/workshop/pages/OderDetail'))
const WorkShopNewOrder = lazy(() => import('@/features/workshop/pages/NewOrder.tsx'))

const ClientDashboard = lazy(() => import('@/features/client/pages/Dashboard'))

const AppRouter = () => {
  const isAuthenticated = useIsAuthenticated()

  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/taller" replace /> : <LoginPage />}
          />

          <Route path="/taller" element={<ProtectedRoute requiredRole="TALLER" />}>
            <Route index element={<Navigate to="ordenes" replace />} />
            <Route path='ordenes' index element={<WorkShopDashboard  />} />
            <Route path="ordenes/nueva" element={<WorkShopNewOrder  />} />
            <Route path="ordenes/:id" element={<WorkShopOrderDetail  />} />
            
          </Route>

          <Route path="/cliente" element={<ProtectedRoute requiredRole="CLIENTE" />}>
            <Route index element={<Navigate to="ordenes" replace />} />
            <Route path="ordenes" element={<ClientDashboard />} />
            <Route path="ordenes/:id" element={<ClientDashboard />} />
            <Route path="solicitar" element={<ClientDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export { AppRouter }