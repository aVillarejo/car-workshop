import { Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

const AppRouter = () => {
  const isAuthenticated = false

  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/taller" replace /> : <div>Login Page</div>}
          />
          <Route path="/taller" element={<div>Taller Dashboard</div>} />
          <Route path="/cliente" element={<div>Taller Dashboard</div>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export { AppRouter }