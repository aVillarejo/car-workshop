import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useOrdersStore, useOrdersActions } from '@/features/orders/stores/useOrdersStore'
import { useCustomersStore } from '@/shared/stores/useCustomersStore'
import { useCustomerId } from '@/shared/stores/useAuthStore'
import { OrderBusinessLogic } from '@/features/orders/services/orderBusinessLogic'
import { OrderStatus, EventType } from '@/features/orders/types'
import { useFormatters } from '@/shared/lib/formatters'

export function useClientOrderDetail(id: string | undefined) {
  const navigate = useNavigate()
  const customerId = useCustomerId()
  const { updateOrder } = useOrdersActions()
  const { formatCurrency } = useFormatters()

  const order = useOrdersStore((state) => (id ? state.orders.find((order) => order.id === id) : null))
  
  const getCustomerById = useCustomersStore((state) => state.getCustomerById)
  const getVehicleById = useCustomersStore((state) => state.getVehicleById)
  
  const customer = order ? getCustomerById(order.customerId) : null
  const vehicle = order ? getVehicleById(order.vehicleId) : null
  
  const [rejectionReason, setRejectionReason] = useState('')
  const [clarificationRequest, setClarificationRequest] = useState('')

  const [errorAlert, setErrorAlert] = useState<{ title: string; message: string } | null>(null)
  const [isShowingRejectForm, setIsShowingRejectForm] = useState(false)
  const [isAproving, setIsApproving] = useState(false)
  const [isReauthorizing, setIsReauthorizing] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('')
  const [dialogMessage, setDialogMessage] = useState('')
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null)

  useEffect(() => {
    if (!id) return
    if (order?.customerId !== customerId || order === undefined) {
      navigate('/cliente/ordenes')
    }
  }, [id, order, customerId, navigate])

  // Estados derivados para control de acciones disponibles
  const canApprove = order?.status === OrderStatus.DIAGNOSED
  const canReauthorize = order?.status === OrderStatus.WAITING_FOR_APPROVAL
  const isActionRequired = canApprove || canReauthorize

  const getVehicleInfo = useCallback(() => {
    if (!vehicle) return 'N/A'
    return `${vehicle.plate} - ${vehicle.model}`
  }, [vehicle])

  

  const handleBack = useCallback(() => {
    navigate('/cliente/ordenes')
  }, [navigate])

  const handleAcceptProposal = useCallback(() => {
    if (!order) return

    setDialogTitle('Confirmar Autorización')
    setDialogMessage(`¿Autorizar la reparación por ${formatCurrency(order.subtotalEstimated)}? Esto permitirá al taller proceder con los trabajos propuestos.`)
    setDialogAction(() => () => {
      const result = OrderBusinessLogic.transitionOrder(order, OrderStatus.AUTHORIZED)

      if (result.success) {
        updateOrder(order.id, result.order)
        setIsApproving(false)
        setDialogAction(null)
      } else {
        setErrorAlert({
          title: 'Error al autorizar',
          message: result.errors.map((e) => e.message).join(', '),
        })
      }
    })
    setIsApproving(true)
  }, [order, updateOrder, formatCurrency])

  const handleAcceptReauthorization = useCallback(() => {
    if (!order) return

    const additionalAmount = order.realTotal - order.authorizedAmount
    setDialogTitle('Confirmar Reautorización')
    setDialogMessage(`¿Autorizar el monto adicional de ${formatCurrency(additionalAmount)}? El nuevo total será ${formatCurrency(order.realTotal)}.`)
    setDialogAction(() => () => {
      const reauthorizedOrder = OrderBusinessLogic.reauthorizeOrder(
        order,
        order.realTotal,
        'Reautorización aceptada por el cliente'
      )

      updateOrder(order.id, reauthorizedOrder)
      setIsReauthorizing(false)
      setDialogAction(null)
    })
    setIsReauthorizing(true)
  }, [order, updateOrder, formatCurrency])

  const handleRejectProposal = useCallback(() => {
    if (!order || !rejectionReason.trim()) {
      setErrorAlert({
        title: 'Error',
        message: 'Por favor ingresa un motivo de rechazo',
      })
      return
    }

    const event = {
      id: `evt-${Date.now()}`,
      orderId: order.id,
      type: EventType.RECHAZO_CLIENTE,
      timestamp: new Date().toISOString(),
      comment: `Cliente rechazó la propuesta: ${rejectionReason}`,
    }

    updateOrder(order.id, {
      events: [...order.events, event],
      updatedAt: new Date().toISOString(),
    })

    setRejectionReason('')
    setIsShowingRejectForm(false)
  }, [order, rejectionReason, updateOrder])

  const handleOpenRejectForm = useCallback(() => {
    setIsShowingRejectForm(true)
  }, [])

  const hasClientRejected = useCallback(() => {
    if (!order) return false
    return order.events.some((event) => event.type === EventType.RECHAZO_CLIENTE)
  }, [order])

  const handleRequestClarification = useCallback(() => {
    if (!order || !clarificationRequest.trim()) {
      setErrorAlert({
        title: 'Error',
        message: 'Por favor ingresa tu solicitud de aclaración',
      })
      return
    }

    const event = {
      id: `evt-${Date.now()}`,
      orderId: order.id,
      type: EventType.SOLICITUD_ACLARACION,
      timestamp: new Date().toISOString(),
      comment: `Cliente solicitó aclaración: ${clarificationRequest}`,
    }

    updateOrder(order.id, {
      events: [...order.events, event],
      updatedAt: new Date().toISOString(),
    })

    setClarificationRequest('')
  }, [order, clarificationRequest, updateOrder])

  return {
    // Data
    order,
    customer,
    vehicle,
    canApprove,
    canReauthorize,
    isActionRequired,
    
    // Form states
    rejectionReason,
    setRejectionReason,
    clarificationRequest,
    setClarificationRequest,

    // Alert states
    errorAlert,
    setErrorAlert,
    
    // Dialog states
    isShowingRejectForm,
    setIsShowingRejectForm,
    isAproving,
    setIsApproving,
    isReauthorizing,
    setIsReauthorizing,
    dialogTitle,
    dialogMessage,
    dialogAction,
    setDialogAction,

    // Handlers
    handleBack,
    handleOpenRejectForm,
    handleAcceptProposal,
    handleAcceptReauthorization,
    handleRejectProposal,
    handleRequestClarification,

    // Helpers
    getVehicleInfo,
    hasClientRejected,
  }
}

