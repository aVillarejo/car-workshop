import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useCustomerId } from '@/shared/stores/useAuthStore'
import { useCustomerOrders } from '@/features/orders/stores/useOrdersStore'
import { useVehicles } from '@/shared/stores/useCustomersStore'
import { useOrderStats } from '@/features/orders/hooks/useOrderStats'
import { OrderStatus } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'
import type { StatItem } from '@/features/orders/components/shared'

export function useClientDashboard() {
  const navigate = useNavigate()
  const customerId = useCustomerId()
  
  const orders = useCustomerOrders(customerId)
  const vehicles = useVehicles()


  const stats = useOrderStats(orders)

  const getVehicleInfo = useCallback(
    (vehicleId: string) => {
      const vehicle = vehicles.find((v) => v.id === vehicleId)
      return vehicle ? `${vehicle.plate} - ${vehicle.model}` : 'N/A'
    },
    [vehicles]
  )

  const requiresAction = useCallback((order: RepairOrder) => {
    return (
      order.status === OrderStatus.DIAGNOSED ||
      order.status === OrderStatus.WAITING_FOR_APPROVAL
    )
  }, [])

  const statsData: StatItem[] = [
    { label: 'Total', value: stats.total, color: 'default' },
    { label: 'Requieren Acción', value: stats.pending + stats.waitingApproval, color: 'yellow' },
    { label: 'En Progreso', value: stats.inProgress + stats.authorized, color: 'blue' },
    { label: 'Completadas', value: stats.completed + stats.delivered, color: 'green' },
  ]

  const handleLogout = useCallback(() => {
    navigate('/')
  }, [navigate])

  const handleCreateOrder = useCallback(() => {
    navigate('/cliente/ordenes/solicitar')
  }, [navigate])

  const handleViewDetail = useCallback(
    (orderId: string) => {
      navigate(`/cliente/ordenes/${orderId}`)
    },
    [navigate]
  )

  return {
    orders,
    vehicles,
    statsData,
    getVehicleInfo,
    requiresAction,
    handleLogout,
    handleCreateOrder,
    handleViewDetail,
  }
}
