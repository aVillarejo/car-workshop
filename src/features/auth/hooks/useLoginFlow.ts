import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useAuthActions, type UserRole } from '@/shared/stores/useAuthStore'

import { useOrdersActions, useOrders } from '@/features/orders/stores/useOrdersStore'
import { useCustomersActions, useVehiclesActions, useCustomers, useVehicles } from '@/shared/stores/useCustomersStore'
import { mockCustomers, mockVehicles, mockOrders } from '@/features/orders/services/mockData'

export function useLoginFlow() {
  const navigate = useNavigate()
  const { login } = useAuthActions()
  const { setOrders } = useOrdersActions()
  const { setCustomers } = useCustomersActions()
  const { setVehicles } = useVehiclesActions()

  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('')

  const customers = useCustomers()
  const vehicles = useVehicles()
  const orders = useOrders()

  // Inicializar datos mock si los stores están vacíos (primera carga)
  useEffect(() => {
    const isFirstLoad = customers.length === 0 && vehicles.length === 0 && orders.length === 0
    
    if (isFirstLoad) {
      // Inicializar stores con mock data (persist middleware guarda automáticamente)
      setCustomers(mockCustomers)
      setVehicles(mockVehicles)
      setOrders(mockOrders)
    }
  }, [customers.length, vehicles.length, orders.length, setOrders, setCustomers, setVehicles])


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

    const customer = customers.find(customer => customer.id === selectedCustomerId)
    if (!customer) return

    login({
      id: customer.id,
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