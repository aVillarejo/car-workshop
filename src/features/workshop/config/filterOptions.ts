import { OrderStatus } from '@/features/orders/types'
import type { FilterOption } from '@/features/orders/components/shared'

export const WORKSHOP_FILTER_OPTIONS: FilterOption[] = [
  { value: 'ALL', label: 'Todos los estados' },
  { value: OrderStatus.CREATED, label: 'Creada' },
  { value: OrderStatus.DIAGNOSED, label: 'Diagnosticada' },
  { value: OrderStatus.AUTHORIZED, label: 'Autorizada' },
  { value: OrderStatus.IN_PROGRESS, label: 'En Progreso' },
  { value: OrderStatus.WAITING_FOR_APPROVAL, label: 'Esperando Aprobación' },
  { value: OrderStatus.COMPLETED, label: 'Completada' },
  { value: OrderStatus.DELIVERED, label: 'Entregada' },
  { value: OrderStatus.CANCELLED, label: 'Cancelada' },
]
