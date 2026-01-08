import { useCallback } from 'react'
import { useNavigate } from 'react-router'

import { useOrders } from '@/features/orders/stores/useOrdersStore'
import { useCustomers, useVehicles } from '@/shared/stores/useCustomersStore'
import { useFormatters } from '@/shared/lib/formatters'
import { useOrderStats } from '@/features/orders/hooks/useOrderStats'

import { useOrderFilters } from './useOrderFilters'
import { useOrderHelpers } from './useOrderHelpers'
import type { StatItem } from '@/features/orders/components/shared'

export function useWorkshopDashboard() {
  const navigate = useNavigate()
  const orders = useOrders()
  const customers = useCustomers()
  const vehicles = useVehicles()
  const { formatCurrency } = useFormatters()


  const { searchTerm, setSearchTerm, statusFilter, setStatusFilter, filteredOrders } =
    useOrderFilters({ orders, customers })
  const stats = useOrderStats(orders)
  const { getCustomerName, getVehicleInfo } = useOrderHelpers({ customers, vehicles })

  const statsData: StatItem[] = [
    { label: 'Total', value: stats.total, color: 'default' },
    { label: 'Pendientes Autorización', value: stats.pending, color: 'blue' },
    { label: 'En Progreso', value: stats.inProgress, color: 'green' },
    { label: 'Esperando Aprobación', value: stats.waitingApproval, color: 'yellow' },
  ]

  const handleCreateOrder = useCallback(() => {
    navigate('/taller/ordenes/nueva')
  }, [navigate])

  const handleViewDetail = useCallback(
    (orderId: string) => {
      navigate(`/taller/ordenes/${orderId}`)
    },
    [navigate]
  )

  const handleLogout = useCallback(() => {
    navigate('/')
  }, [navigate])

  return {
    orders,
    filteredOrders,
    statsData,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    getCustomerName,
    getVehicleInfo,
    formatCurrency,
    handleCreateOrder,
    handleViewDetail,
    handleLogout,
  }
}
