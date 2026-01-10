import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import { useCustomerId } from '@/shared/stores/useAuthStore'
import { useCustomersStore, type Vehicle } from '@/shared/stores/useCustomersStore'
import { useOrdersStore } from '@/features/orders/stores/useOrdersStore'
import { OrderStatus, OrderSource, EventType } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'

export function useNewOrder() {
  const navigate = useNavigate()
  const customerId = useCustomerId()

  const allVehicles = useCustomersStore((state) => state.vehicles)
  const allOrders = useOrdersStore((state) => state.orders)
  const addVehicle = useCustomersStore((state) => state.addVehicle)
  const addOrder = useOrdersStore((state) => state.addOrder)

  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [selectedVehicle, setSelectedVehicle] = useState<string>('')
  const [isNewVehicle, setIsNewVehicle] = useState(false)
  const [newPlate, setNewPlate] = useState('')
  const [newModel, setNewModel] = useState('')
  const [description, setDescription] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (!customerId) {
      navigate('/cliente/ordenes')
      return
    }

    const customerVehicles = allVehicles.filter((v) => v.customerId === customerId)
    setVehicles(customerVehicles)
  }, [customerId, navigate, allVehicles])

  const validate = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (isNewVehicle) {
      if (!newPlate.trim()) {
        newErrors['newPlate'] = 'Las placas son requeridas'
      }
      if (!newModel.trim()) {
        newErrors['newModel'] = 'El modelo es requerido'
      }
    } else {
      if (!selectedVehicle) {
        newErrors['selectedVehicle'] = 'Selecciona un vehículo'
      }
    }

    if (!description.trim()) {
      newErrors['description'] = 'La descripción del problema es requerida'
    } else if (description.trim().length < 10) {
      newErrors['description'] = 'La descripción debe tener al menos 10 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [isNewVehicle, newPlate, newModel, selectedVehicle, description])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validate() || !customerId) return

      setIsLoading(true)

      try {
        let vehicleId = selectedVehicle

        if (isNewVehicle) {
          const existingVehicle = allVehicles.find(
            (v) => v.plate.toUpperCase() === newPlate.toUpperCase()
          )

          if (existingVehicle) {
            vehicleId = existingVehicle.id
          } else {
            const newVehicleData: Vehicle = {
              id: uuidv4(),
              plate: newPlate.toUpperCase(),
              model: newModel,
              customerId,
            }
            addVehicle(newVehicleData)
            vehicleId = newVehicleData.id
          }
        }

        const orderNumber = allOrders.length + 1
        const orderId = `RO-${orderNumber.toString().padStart(3, '0')}`

        const newOrder: RepairOrder = {
          id: uuidv4(),
          orderId,
          customerId,
          vehicleId,
          status: OrderStatus.CREATED,
          source: OrderSource.CLIENTE,
          services: [],
          authorizations: [],
          events: [
            {
              id: uuidv4(),
              orderId,
              type: EventType.ORDEN_CREADA,
              timestamp: new Date().toISOString(),
              comment: `Cliente solicitó reparación: ${description}`,
            },
          ],
          errors: [],
          subtotalEstimated: 0,
          realTotal: 0,
          authorizedAmount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        addOrder(newOrder)

        setSuccessDialogOpen(true)
      } catch (error) {
        console.error('Error al crear orden:', error)
        setErrorMessage('Error al enviar la solicitud. Intenta nuevamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [validate, customerId, selectedVehicle, isNewVehicle, allVehicles, newPlate, newModel, description, allOrders, addVehicle, addOrder]
  )

  const handleSuccessClose = useCallback(() => {
    setSuccessDialogOpen(false)
    navigate('/cliente/ordenes')
  }, [navigate])

  const handleErrorClose = useCallback(() => {
    setErrorMessage('')
  }, [])

  const handleToggleVehicleMode = useCallback((isNew: boolean) => {
    setIsNewVehicle(isNew)
    setErrors({})
  }, [])

  const handleSelectVehicle = useCallback((vehicleId: string) => {
    setSelectedVehicle(vehicleId)
    setErrors({})
  }, [])

  const handleBack = useCallback(() => {
    navigate('/cliente/ordenes')
  }, [navigate])

  return {
    // Data
    vehicles,
    customerId,
    isLoading,
    errors,

    // Vehicle form state
    selectedVehicle,
    isNewVehicle,
    newPlate,
    newModel,
    description,

    // Dialog states
    successDialogOpen,
    errorMessage,

    // Setters
    setSelectedVehicle,
    setIsNewVehicle,
    setNewPlate,
    setNewModel,
    setDescription,
    setErrors,

    // Handlers
    handleSubmit,
    handleToggleVehicleMode,
    handleSelectVehicle,
    handleBack,
    handleSuccessClose,
    handleErrorClose,
  }
}
