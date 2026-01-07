import { useState, useMemo } from 'react'

import { useDebounce } from '@/shared/hooks/useDebounce'
import { OrderStatus } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'
import type { Customer } from '@/shared/stores/useCustomersStore'

interface UseOrderFiltersProps {
  orders: RepairOrder[]
  customers: Customer[]
}

export function useOrderFilters({ orders, customers }: UseOrderFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'ALL'>('ALL')
  const debouncedSearch = useDebounce(searchTerm, 300)

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {

      if (statusFilter !== 'ALL' && order.status !== statusFilter) {
        return false
      }

      if (debouncedSearch) {
        const searchLower = debouncedSearch.toLowerCase()
        const customer = customers.find((c) => c.id === order.customerId)
        const customerName = customer?.name?.toLowerCase() || ''
        const orderId = order.orderId.toLowerCase()
        return orderId.includes(searchLower) || customerName.includes(searchLower)
      }

      return true
    })
  }, [orders, statusFilter, debouncedSearch, customers])

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    filteredOrders,
  }
}
