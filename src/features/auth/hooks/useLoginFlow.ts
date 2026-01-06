import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useAuthActions, type UserRole } from '@/shared/stores/useAuthStore'

const MOCK_CUSTOMERS = [
  {
    id: 'cust-001',
    name: 'Juan Pérez García',
    phone: '55-1234-5678',
    email: 'juan.perez@email.com',
  },
  {
    id: 'cust-002',
    name: 'María González López',
    phone: '55-8765-4321',
    email: 'maria.gonzalez@email.com',
  },
]

export function useLoginFlow() {
  const navigate = useNavigate()
  const { login } = useAuthActions()
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('')

  const customers = useMemo(() => MOCK_CUSTOMERS, [])

  const handleRoleSelection = useCallback((role: UserRole) => {
    setSelectedRole(role)

    if (role === 'TALLER') {
      login({
        id: 'taller-001',
        name: 'Peter Parker',
        role: 'TALLER',
      })
      navigate('/taller')
    }
  }, [login, navigate])

  const handleClientLogin = useCallback(() => {
    if (!selectedCustomerId) return

    const customer = customers.find(c => c.id === selectedCustomerId)
    if (!customer) return

    login({
      id: `user-${customer.id}`,
      name: customer.name,
      role: 'CLIENTE',
      customerId: customer.id,
    })
    navigate('/cliente')
  }, [selectedCustomerId, customers, login, navigate])

  const handleBackToRoleSelection = useCallback(() => {
    setSelectedRole(null)
    setSelectedCustomerId('')
  }, [])

  return {
    selectedRole,
    selectedCustomerId,
    customers,
    handleRoleSelection,
    handleClientLogin,
    handleBackToRoleSelection,
    setSelectedCustomerId,
  }
}