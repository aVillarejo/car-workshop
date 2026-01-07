import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { useOrdersStore, useOrdersActions } from '@/features/orders/stores/useOrdersStore'
import { useCustomersStore } from '@/shared/stores/useCustomersStore'
import { OrderBusinessLogic } from '@/features/orders/services/orderBusinessLogic'
import { OrderStatus } from '@/features/orders/types'
import type { Service } from '@/features/orders/types'

export function useWorkshopOrderDetail(id: string | undefined) {
  const navigate = useNavigate()
  const { updateOrder } = useOrdersActions()

  const order = useOrdersStore((state) => (id ? state.orders.find((o) => o.id === id) : null))
  const customer = useCustomersStore((state) =>
    order ? state.customers.find((customer) => customer.id === order.customerId) : null
  )
  const vehicle = useCustomersStore((state) =>
    order ? state.vehicles.find((vehicle) => vehicle.id === order.vehicleId) : null
  )

  const [isAddingService, setIsAddingService] = useState(false)
  const [isEditingService, setIsEditingService] = useState(false)

  const [isReauthorizing, setIsReauthorizing] = useState(false)

  const [isAddingComponent, setIsAddingComponent] = useState(false)
  const [isEditingComponent, setIsEditingComponent] = useState(false)

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null)
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null)

  const [newService, setNewService] = useState({
    name: '',
    description: '',
    laborEstimated: 0,
    laborReal: 0,
  })
  const [newComponent, setNewComponent] = useState({
    name: '',
    description: '',
    estimated: 0,
    real: 0,
  })
  const [reauthorAmount, setReauthorAmount] = useState('')

  const [errorAlert, setErrorAlert] = useState<{ title: string; message: string } | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    title: string
    message: string
    onConfirm: () => void
  } | null>(null)

  // Validar si la orden existe
  useEffect(() => {
    if (!id) return

    if (!order) {
      navigate('/taller')
    }
  }, [id, order, navigate])


  const canModifyServices = order ? OrderBusinessLogic.canModifyServices(order).valid : false

  const overcostLimit = order && order.authorizedAmount > 0 
    ? OrderBusinessLogic.calculateOvercostLimit(order.authorizedAmount) 
    : 0

  const availableTransitions = order ? OrderBusinessLogic.getValidTransitions(order) : []


  const handleBack = useCallback(() => {
    navigate('/taller/ordenes')
  }, [navigate])

  const handleTransition = useCallback(
    (newStatus: OrderStatus) => {
      if (!order) return

      const result = OrderBusinessLogic.transitionOrder(order, newStatus)

      if (result.success) {
        updateOrder(order.id, result.order)
      } else {
        setErrorAlert({
          title: 'Error al cambiar estado',
          message: result.errors.map((e) => e.message).join(', '),
        })
      }
    },
    [order, updateOrder]
  )

  const handleAddService = useCallback(() => {
    if (!order) return

    const newServices = [
      ...order.services,
      {
        id: `svc-${Date.now()}`,
        orderId: order.id,
        ...newService,
        components: [],
      },
    ]

    const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(newServices)
    const realTotal = OrderBusinessLogic.calculateRealTotal(newServices)

    updateOrder(order.id, {
      services: newServices,
      subtotalEstimated,
      realTotal,
      updatedAt: new Date().toISOString(),
    })

    setIsAddingService(false)
    setNewService({ name: '', description: '', laborEstimated: 0, laborReal: 0 })
  }, [order, newService, updateOrder])

  const handleEditService = useCallback(() => {
    if (!order || !selectedServiceId) return

    const updatedServices = order.services.map((service) => {
      if (service.id === selectedServiceId) {
        return {
          ...service,
          ...newService,
        }
      }
      return service
    })

    const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(updatedServices)
    const realTotal = OrderBusinessLogic.calculateRealTotal(updatedServices)

    updateOrder(order.id, {
      services: updatedServices,
      subtotalEstimated,
      realTotal,
      updatedAt: new Date().toISOString(),
    })

    setIsEditingService(false)
    setSelectedServiceId(null)
    setNewService({ name: '', description: '', laborEstimated: 0, laborReal: 0 })
  }, [order, newService, selectedServiceId, updateOrder])

  const handleDeleteService = useCallback(
    (serviceId: string) => {
      if (!order) return

      setConfirmDialog({
        title: 'Eliminar servicio',
        message: '¿Estás seguro de eliminar este servicio? Esta acción no se puede deshacer.',
        onConfirm: () => {
          const updatedServices = order.services.filter((service) => service.id !== serviceId)

          const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(updatedServices)
          const realTotal = OrderBusinessLogic.calculateRealTotal(updatedServices)

          updateOrder(order.id, {
            services: updatedServices,
            subtotalEstimated,
            realTotal,
            updatedAt: new Date().toISOString(),
          })

          setConfirmDialog(null)
        },
      })
    },
    [order, updateOrder]
  )

  const handleOpenAddComponent = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId)
    setIsAddingComponent(true)
  }, [])

  const handleOpenEditService = useCallback((service: Service) => {
    setSelectedServiceId(service.id)
    setNewService({
      name: service.name,
      description: service.description || '',
      laborEstimated: service.laborEstimated,
      laborReal: service.laborReal,
    })
    setIsEditingService(true)
  }, [])

  const handleOpenEditComponent = useCallback((service: Service, componentId: string) => {
    const component = service.components.find((c) => c.id === componentId)
    if (!component) return

    setSelectedServiceId(service.id)
    setSelectedComponentId(componentId)
    setNewComponent({
      name: component.name,
      description: component.description || '',
      estimated: component.estimated,
      real: component.real,
    })
    setIsEditingComponent(true)
  }, [])

  const handleAddComponent = useCallback(() => {
    if (!order || !selectedServiceId) return

    const updatedServices = order.services.map((service) => {
      if (service.id === selectedServiceId) {
        return {
          ...service,
          components: [
            ...service.components,
            {
              id: `cmp-${Date.now()}`,
              serviceId: service.id,
              ...newComponent,
            },
          ],
        }
      }
      return service
    })

    const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(updatedServices)
    const realTotal = OrderBusinessLogic.calculateRealTotal(updatedServices)

    updateOrder(order.id, {
      services: updatedServices,
      subtotalEstimated,
      realTotal,
      updatedAt: new Date().toISOString(),
    })

    setIsAddingComponent(false)
    setSelectedServiceId(null)
    setNewComponent({ name: '', description: '', estimated: 0, real: 0 })
  }, [order, newComponent, selectedServiceId, updateOrder])

  const handleEditComponent = useCallback(() => {
    if (!order || !selectedServiceId || !selectedComponentId) return

    const updatedServices = order.services.map((service) => {
      if (service.id === selectedServiceId) {
        return {
          ...service,
          components: service.components.map((comp) => {
            if (comp.id === selectedComponentId) {
              return {
                ...comp,
                ...newComponent,
              }
            }
            return comp
          }),
        }
      }
      return service
    })

    const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(updatedServices)
    const realTotal = OrderBusinessLogic.calculateRealTotal(updatedServices)

    updateOrder(order.id, {
      services: updatedServices,
      subtotalEstimated,
      realTotal,
      updatedAt: new Date().toISOString(),
    })

    setIsEditingComponent(false)
    setSelectedServiceId(null)
    setSelectedComponentId(null)
    setNewComponent({ name: '', description: '', estimated: 0, real: 0 })
  }, [order, newComponent, selectedServiceId, selectedComponentId, updateOrder])

  const handleDeleteComponent = useCallback(
    (serviceId: string, componentId: string) => {
      if (!order) return

      setConfirmDialog({
        title: 'Eliminar refacción',
        message: '¿Estás seguro de eliminar esta refacción? Esta acción no se puede deshacer.',
        onConfirm: () => {
          const updatedServices = order.services.map((service) => {
            if (service.id === serviceId) {
              return {
                ...service,
                components: service.components.filter((component) => component.id !== componentId),
              }
            }
            return service
          })

          const subtotalEstimated = OrderBusinessLogic.calculateSubtotalEstimated(updatedServices)
          const realTotal = OrderBusinessLogic.calculateRealTotal(updatedServices)

          updateOrder(order.id, {
            services: updatedServices,
            subtotalEstimated,
            realTotal,
            updatedAt: new Date().toISOString(),
          })

          setConfirmDialog(null)
        },
      })
    },
    [order, updateOrder]
  )

  const handleReauthorize = useCallback(() => {
    if (!order) return

    const amount = Number.parseFloat(reauthorAmount)
    const reauthorizedOrder = OrderBusinessLogic.reauthorizeOrder(order, amount, 'Reautorización desde taller')

    updateOrder(order.id, reauthorizedOrder)

    setIsReauthorizing(false)
    setReauthorAmount('')
  }, [order, reauthorAmount, updateOrder])

  return {
    // Data
    order,
    customer,
    vehicle,
    canModifyServices,
    overcostLimit,
    availableTransitions,

    // Dialog states
    isAddingService,
    setIsAddingService,
    isEditingService,
    setIsEditingService,
    isReauthorizing,
    setIsReauthorizing,
    isAddingComponent,
    setIsAddingComponent,
    isEditingComponent,
    setIsEditingComponent,

    // Form states
    newService,
    setNewService,
    newComponent,
    setNewComponent,
    reauthorAmount,
    setReauthorAmount,

    // Alert states
    errorAlert,
    setErrorAlert,
    confirmDialog,
    setConfirmDialog,

    // Handlers
    handleBack,
    handleTransition,
    handleAddService,
    handleEditService,
    handleDeleteService,
    handleOpenAddComponent,
    handleOpenEditService,
    handleOpenEditComponent,
    handleAddComponent,
    handleEditComponent,
    handleDeleteComponent,
    handleReauthorize,
  }
}
