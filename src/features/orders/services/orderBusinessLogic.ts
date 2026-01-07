import { v4 as uuidv4 } from 'uuid'

import type {
  RepairOrder,
  Service,
  Authorization,
  Event,
  BusinessError,
  ValidationResult,
} from '../types'
import { OrderStatus, EventType, BusinessErrorType } from '../types'

const OVERCOST_LIMIT = 1.10 // todo: environment variable


const VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  [OrderStatus.CREATED]: [OrderStatus.DIAGNOSED, OrderStatus.CANCELLED],
  [OrderStatus.DIAGNOSED]: [OrderStatus.AUTHORIZED, OrderStatus.CANCELLED],
  [OrderStatus.AUTHORIZED]: [OrderStatus.IN_PROGRESS, OrderStatus.CANCELLED],
  [OrderStatus.IN_PROGRESS]: [OrderStatus.COMPLETED, OrderStatus.WAITING_FOR_APPROVAL, OrderStatus.CANCELLED],
  [OrderStatus.WAITING_FOR_APPROVAL]: [OrderStatus.AUTHORIZED, OrderStatus.CANCELLED],
  [OrderStatus.COMPLETED]: [OrderStatus.DELIVERED, OrderStatus.CANCELLED],
  [OrderStatus.DELIVERED]: [],
  [OrderStatus.CANCELLED]: [],
}


const STATES_ALLOWING_MODIFICATIONS: OrderStatus[] = [
  OrderStatus.CREATED,
  OrderStatus.DIAGNOSED,
]


export class OrderBusinessLogic {

  static isValidTransition(
    from: OrderStatus,
    to: OrderStatus
  ): ValidationResult {
    const validNextStates = VALID_TRANSITIONS[from]

    if (!validNextStates.includes(to)) {
      return {
        valid: false,
        errors: [BusinessErrorType.INVALID_TRANSITION],
        message: `No se puede pasar de ${from} a ${to}`,
      }
    }

    return { valid: true, errors: [] }
  }

  static calculateSubtotalEstimated(services: Service[]): number {
    return services.reduce((total, service) => {
      const laborCost = service.laborEstimated
      const componentsCost = service.components.reduce(
        (sum, component) => sum + component.estimated,
        0
      )
      return total + laborCost + componentsCost
    }, 0)
  }

  static calculateRealTotal(services: Service[]): number {
    return services.reduce((total, service) => {
      const laborCost = service.laborReal
      const componentsCost = service.components.reduce(
        (sum, component) => sum + component.real,
        0
      )
      return total + laborCost + componentsCost
    }, 0)
  }

  static calculateAuthorizedAmount(subtotalEstimated: number): number {
    return Math.round(subtotalEstimated * 100) / 100
  }

  static calculateOvercostLimit(authorizedAmount: number): number {
    return Math.round(authorizedAmount * OVERCOST_LIMIT * 100) / 100
  }


  static validateAuthorization(order: RepairOrder): ValidationResult {
    if (order.services.length === 0) {
      return {
        valid: false,
        errors: [BusinessErrorType.NO_SERVICES],
        message: 'No se puede autorizar una orden sin servicios',
      }
    }

    return { valid: true, errors: [] }
  }


  static checkOvercost(
    realTotal: number,
    authorizedAmount: number
  ): { exceeded: boolean; limit: number } {
    const limit = this.calculateOvercostLimit(authorizedAmount)
    const exceeded = realTotal > limit

    return { exceeded, limit }
  }


  static canModifyServices(order: RepairOrder): ValidationResult {
    if (order.status === OrderStatus.CANCELLED) {
      return {
        valid: false,
        errors: [BusinessErrorType.ORDER_CANCELLED],
        message: 'No se puede modificar una orden cancelada',
      }
    }

    if (!STATES_ALLOWING_MODIFICATIONS.includes(order.status)) {
      return {
        valid: false,
        errors: [BusinessErrorType.NOT_ALLOWED_AFTER_AUTHORIZATION],
        message:
          'No se pueden modificar servicios después de la autorización',
      }
    }

    return { valid: true, errors: [] }
  }


  static createEvent(
    orderId: string,
    type: EventType,
    fromStatus?: OrderStatus,
    toStatus?: OrderStatus,
    comment?: string
  ): Event {
    return {
      id: uuidv4(),
      orderId,
      type,
      fromStatus,
      toStatus,
      timestamp: new Date().toISOString(),
      comment,
    }
  }

  static createBusinessError(
    orderId: string,
    type: BusinessErrorType,
    message: string
  ): BusinessError {
    return {
      id: uuidv4(),
      orderId,
      type,
      message,
      timestamp: new Date().toISOString(),
    }
  }


  // * Transiciona una orden a un nuevo estado
  static transitionOrder(
    order: RepairOrder,
    newStatus: OrderStatus
  ): {
    order: RepairOrder
    success: boolean
    errors: BusinessError[]
  } {
    const errors: BusinessError[] = []

    //  Validar transición
    const transitionValidation = this.isValidTransition(
      order.status,
      newStatus
    )
    if (!transitionValidation.valid) {
      const error = this.createBusinessError(
        order.id,
        BusinessErrorType.INVALID_TRANSITION,
        transitionValidation.message || 'Transición de estado inválida'
      )
      errors.push(error)
      return {
        order: { ...order, errors: [...order.errors, error] },
        success: false,
        errors,
      }
    }

    // Validaciones específicas según el estado destino
    if (newStatus === OrderStatus.AUTHORIZED) {
      const authValidation = this.validateAuthorization(order)
      if (!authValidation.valid) {
        const error = this.createBusinessError(
          order.id,
          BusinessErrorType.NO_SERVICES,
          authValidation.message || 'No se puede autorizar sin servicios'
        )
        errors.push(error)
        return {
          order: { ...order, errors: [...order.errors, error] },
          success: false,
          errors,
        }
      }

      // Calcular subtotal y monto autorizado
      const subtotal = this.calculateSubtotalEstimated(order.services)
      const authorizedAmount = this.calculateAuthorizedAmount(subtotal)

      // Crear autorización
      const authorization: Authorization = {
        id: uuidv4(),
        orderId: order.id,
        amount: authorizedAmount,
        createdAt: new Date().toISOString(),
        comment: 'Autorización inicial',
      }

      // Crear evento
      const event = this.createEvent(
        order.id,
        EventType.ORDEN_AUTORIZADA,
        order.status,
        newStatus
      )

      return {
        order: {
          ...order,
          status: newStatus,
          subtotalEstimated: subtotal,
          authorizedAmount,
          authorizations: [...order.authorizations, authorization],
          events: [...order.events, event],
          updatedAt: new Date().toISOString(),
        },
        success: true,
        errors: [],
      }
    }

    // Verificar sobrecosto al completar
    if (newStatus === OrderStatus.COMPLETED || newStatus === OrderStatus.IN_PROGRESS) {
      const realTotal = this.calculateRealTotal(order.services)
      const { exceeded, limit } = this.checkOvercost(
        realTotal,
        order.authorizedAmount
      )

      if (exceeded) {
        // Transicionar a WAITING_FOR_APPROVAL
        const error = this.createBusinessError(
          order.id,
          BusinessErrorType.REQUIRES_REAUTH,
          `El costo real ($${realTotal.toFixed(2)}) excede el límite autorizado ($${limit.toFixed(2)})`
        )

        const event = this.createEvent(
          order.id,
          EventType.ORDEN_REAUTORIZADA,
          order.status,
          OrderStatus.WAITING_FOR_APPROVAL,
          'Requiere reautorización por sobrecosto'
        )

        return {
          order: {
            ...order,
            status: OrderStatus.WAITING_FOR_APPROVAL,
            realTotal,
            errors: [...order.errors, error],
            events: [...order.events, event],
            updatedAt: new Date().toISOString(),
          },
          success: false,
          errors: [error],
        }
      }

      // Actualizar el costo real
      const event = this.createEvent(
        order.id,
        newStatus === OrderStatus.COMPLETED
          ? EventType.ORDEN_COMPLETADA
          : EventType.ORDEN_INICIADA,
        order.status,
        newStatus
      )

      return {
        order: {
          ...order,
          status: newStatus,
          realTotal,
          events: [...order.events, event],
          updatedAt: new Date().toISOString(),
        },
        success: true,
        errors: [],
      }
    }

    // * Transición genérica
    const eventTypeMap: Record<OrderStatus, EventType> = {
      [OrderStatus.CREATED]: EventType.ORDEN_CREADA,
      [OrderStatus.DIAGNOSED]: EventType.ORDEN_DIAGNOSTICADA,
      [OrderStatus.AUTHORIZED]: EventType.ORDEN_AUTORIZADA,
      [OrderStatus.IN_PROGRESS]: EventType.ORDEN_INICIADA,
      [OrderStatus.WAITING_FOR_APPROVAL]: EventType.ORDEN_REAUTORIZADA,
      [OrderStatus.COMPLETED]: EventType.ORDEN_COMPLETADA,
      [OrderStatus.DELIVERED]: EventType.ORDEN_ENTREGADA,
      [OrderStatus.CANCELLED]: EventType.ORDEN_CANCELADA,
    }

    const event = this.createEvent(
      order.id,
      eventTypeMap[newStatus],
      order.status,
      newStatus
    )

    return {
      order: {
        ...order,
        status: newStatus,
        events: [...order.events, event],
        updatedAt: new Date().toISOString(),
      },
      success: true,
      errors: [],
    }
  }


  // * Registra una reautorización
  static reauthorizeOrder(
    order: RepairOrder,
    newAmount: number,
    comment?: string
  ): RepairOrder {
    const authorization: Authorization = {
      id: uuidv4(),
      orderId: order.id,
      amount: newAmount,
      createdAt: new Date().toISOString(),
      comment: comment || 'Reautorización por sobrecosto',
    }

    const event = this.createEvent(
      order.id,
      EventType.ORDEN_REAUTORIZADA,
      order.status,
      OrderStatus.AUTHORIZED,
      comment
    )

    return {
      ...order,
      status: OrderStatus.AUTHORIZED,
      authorizedAmount: newAmount,
      authorizations: [...order.authorizations, authorization],
      events: [...order.events, event],
      updatedAt: new Date().toISOString(),
    }
  }

  // * Registra un rechazo del cliente
  static rejectOrder(order: RepairOrder, comment?: string): RepairOrder {
    const event = this.createEvent(
      order.id,
      EventType.RECHAZO_CLIENTE,
      order.status,
      order.status,
      comment || 'Cliente rechazó la propuesta'
    )

    return {
      ...order,
      events: [...order.events, event],
      updatedAt: new Date().toISOString(),
    }
  }

}
