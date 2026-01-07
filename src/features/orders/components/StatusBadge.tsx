import { OrderStatus, getStatusLabel, getStatusColor } from '@/features/orders/types'
import { Badge } from '@/shared/components/ui/badge'

interface StatusBadgeProps {
  status: OrderStatus
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = getStatusLabel(status)
  const color = getStatusColor(status)

  return <Badge variant={color} color={color}>{label}</Badge>
}
