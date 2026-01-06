
import { EventType, OrderStatus } from './domain.types'

type BadgeVariant = 'default' | 'gray' | 'blue' | 'green' | 'yellow' | 'red' | 'purple'

export const EVENT_LABELS: Record<EventType, string> = {
  [EventType.ORDEN_CREADA]: 'Orden creada',
  [EventType.ORDEN_DIAGNOSTICADA]: 'Orden diagnosticada',
  [EventType.ORDEN_AUTORIZADA]: 'Orden autorizada',
  [EventType.ORDEN_INICIADA]: 'Orden iniciada',
  [EventType.ORDEN_REAUTORIZADA]: 'Orden reautorizada',
  [EventType.ORDEN_COMPLETADA]: 'Orden completada',
  [EventType.ORDEN_ENTREGADA]: 'Orden entregada',
  [EventType.ORDEN_CANCELADA]: 'Orden cancelada',
  [EventType.RECHAZO_CLIENTE]: 'Cliente rechazó propuesta',
  [EventType.SOLICITUD_ACLARACION]: 'Solicitud de aclaración',
}

export const ORDER_STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; color: BadgeVariant }
> = {
  [OrderStatus.CREATED]: { label: 'Creada', color: 'gray' },
  [OrderStatus.DIAGNOSED]: { label: 'Diagnosticada', color: 'blue' },
  [OrderStatus.AUTHORIZED]: { label: 'Autorizada', color: 'green' },
  [OrderStatus.IN_PROGRESS]: { label: 'En Progreso', color: 'blue' },
  [OrderStatus.WAITING_FOR_APPROVAL]: { label: 'Esperando Aprobación', color: 'yellow' },
  [OrderStatus.COMPLETED]: { label: 'Completada', color: 'green' },
  [OrderStatus.DELIVERED]: { label: 'Entregada', color: 'green' },
  [OrderStatus.CANCELLED]: { label: 'Cancelada', color: 'red' },
}

export const getEventLabel = (eventType: EventType): string => {
  return EVENT_LABELS[eventType] || eventType
}

export const getStatusLabel = (status: OrderStatus): string => {
  return ORDER_STATUS_CONFIG[status]?.label || status
}

export const getStatusColor = (status: OrderStatus): BadgeVariant => {
  return ORDER_STATUS_CONFIG[status]?.color || 'gray'
}
