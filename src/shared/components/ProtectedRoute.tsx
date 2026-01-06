import { Navigate, Outlet } from 'react-router'
import { useIsAuthenticated, useUser, type UserRole } from '@/shared/stores/useAuthStore'

interface ProtectedRouteProps {
  requiredRole?: UserRole
}


export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const isAuthenticated = useIsAuthenticated()
  const user = useUser()

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  if (requiredRole && user?.role !== requiredRole) {
    const redirectPath = user?.role === 'TALLER' ? '/taller' : '/cliente'
    return <Navigate to={redirectPath} replace />
  }

  return <Outlet />
}
