
export enum OrderStatus {
  CREATED = 'CREATED',
  DIAGNOSED = 'DIAGNOSED',
  AUTHORIZED = 'AUTHORIZED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING_FOR_APPROVAL = 'WAITING_FOR_APPROVAL',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum EventType {
  ORDEN_CREADA = 'ORDEN_CREADA',
  ORDEN_DIAGNOSTICADA = 'ORDEN_DIAGNOSTICADA',
  ORDEN_AUTORIZADA = 'ORDEN_AUTORIZADA',
  ORDEN_INICIADA = 'ORDEN_INICIADA',
  ORDEN_REAUTORIZADA = 'ORDEN_REAUTORIZADA',
  ORDEN_COMPLETADA = 'ORDEN_COMPLETADA',
  ORDEN_ENTREGADA = 'ORDEN_ENTREGADA',
  ORDEN_CANCELADA = 'ORDEN_CANCELADA',
  RECHAZO_CLIENTE = 'RECHAZO_CLIENTE',
  SOLICITUD_ACLARACION = 'SOLICITUD_ACLARACION',
}

export enum BusinessErrorType {
  NO_SERVICES = 'NO_SERVICES',
  REQUIRES_REAUTH = 'REQUIRES_REAUTH',
  NOT_ALLOWED_AFTER_AUTHORIZATION = 'NOT_ALLOWED_AFTER_AUTHORIZATION',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
  INVALID_TRANSITION = 'INVALID_TRANSITION',
}

export enum OrderSource {
  TALLER = 'TALLER',
  CLIENTE = 'CLIENTE',
}

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
}

export interface Vehicle {
  id: string
  plate: string
  model: string
  customerId: string
}

export interface Component {
  id: string
  serviceId: string
  name: string
  description?: string
  estimated: number
  real: number
}

export interface Service {
  id: string
  orderId: string
  name: string
  description?: string
  laborEstimated: number
  laborReal: number
  components: Component[]
}

export interface Authorization {
  id: string
  orderId: string
  amount: number
  createdAt: string
  comment?: string
}

export interface Event {
  id: string
  orderId: string
  type: EventType
  fromStatus?: OrderStatus
  toStatus?: OrderStatus
  timestamp: string
  comment?: string //addicional
}

export interface BusinessError {
  id: string
  orderId: string
  type: BusinessErrorType
  message: string
  timestamp: string
}

export interface RepairOrder {
  id: string
  orderId: string
  customerId: string
  vehicleId: string
  status: OrderStatus
  subtotalEstimated: number
  authorizedAmount: number
  realTotal: number
  authorizations: Authorization[]
  services: Service[]
  events: Event[]
  errors: BusinessError[]
  source: OrderSource
  createdAt: string //addicional
  updatedAt: string //addicional
}

export interface CreateOrderDTO {
  customerName: string
  customerPhone: string
  customerEmail?: string
  vehiclePlate: string
  vehicleModel: string
  source: OrderSource
  description?: string
}

export interface CreateServiceDTO {
  name: string
  description?: string
  laborEstimated: number
  laborReal: number
}

export interface CreateComponentDTO {
  name: string
  description?: string
  estimated: number
  real: number
}

export interface ValidationResult {
  valid: boolean
  errors: BusinessErrorType[]
  message?: string
}
