import { useMemo } from 'react'

import { OrderStatus } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'

export function useOrderStats(orders: RepairOrder[]) {
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === OrderStatus.DIAGNOSED).length,
      inProgress: orders.filter((o) => o.status === OrderStatus.IN_PROGRESS).length,
      waitingApproval: orders.filter((o) => o.status === OrderStatus.WAITING_FOR_APPROVAL).length,
    }
  }, [orders])

  return stats
}
