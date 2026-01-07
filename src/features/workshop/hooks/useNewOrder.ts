import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid'

import { useCustomersStore } from '@/shared/stores/useCustomersStore'
import { useOrdersStore, useOrdersActions } from '@/features/orders/stores/useOrdersStore'
import { OrderStatus, OrderSource, EventType } from '@/features/orders/types'
import type { RepairOrder, Customer, Vehicle } from '@/features/orders/types'

type CustomerMode = 'existing' | 'new'
type VehicleMode = 'existing' | 'new'

interface NewCustomerData {
  name: string
  phone: string
  email: string
}

interface NewVehicleData {
  plate: string
  model: string
}

export function useNewOrder() {
  const navigate = useNavigate()

  const customers = useCustomersStore((state) => state.customers)
  const vehicles = useCustomersStore((state) => state.vehicles)
  const orders = useOrdersStore((state) => state.orders)
  const addCustomer = useCustomersStore((state) => state.addCustomer)
  const addVehicle = useCustomersStore((state) => state.addVehicle)
  const { addOrder } = useOrdersActions()

  const [step, setStep] = useState<1 | 2>(1)
  const [isLoading, setIsLoading] = useState(false)

  const [customerMode, setCustomerMode] = useState<CustomerMode>('existing')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('')
  const [searchTerm, setSearchTerm] = useState('')
  const [newCustomer, setNewCustomer] = useState<NewCustomerData>({
    name: '',
    phone: '',
    email: '',
  })

  const [vehicleMode, setVehicleMode] = useState<VehicleMode>('existing')
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('')
  const [newVehicle, setNewVehicle] = useState<NewVehicleData>({
    plate: '',
    model: '',
  })
  const [description, setDescription] = useState('')

  const [errors, setErrors] = useState<Record<string, string>>({})

  const filteredCustomers = useMemo(() => {
    if (!searchTerm) return customers
    const term = searchTerm.toLowerCase()
    return customers.filter(
      (customer) =>
        customer.name.toLowerCase().includes(term) ||
        customer.phone.includes(term) ||
        customer.email?.toLowerCase().includes(term)
    )
  }, [customers, searchTerm])

  const customerVehicles = useMemo(() => {
    if (!selectedCustomerId) return []
    return vehicles.filter((v) => v.customerId === selectedCustomerId)
  }, [vehicles, selectedCustomerId])

  const selectedCustomer = useMemo<Customer | undefined>(() => {
    return customers.find((c) => c.id === selectedCustomerId)
  }, [customers, selectedCustomerId])

  const selectedVehicle = useMemo<Vehicle | undefined>(() => {
    return vehicles.find((v) => v.id === selectedVehicleId)
  }, [vehicles, selectedVehicleId])

  const validateStep1 = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (customerMode === 'existing') {
      if (!selectedCustomerId) {
        newErrors['customer'] = 'Selecciona un cliente'
      }
    } else {
      if (!newCustomer.name.trim()) {
        newErrors['name'] = 'El nombre es requerido'
      }
      if (!newCustomer.phone.trim()) {
        newErrors['phone'] = 'El teléfono es requerido'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [customerMode, selectedCustomerId, newCustomer])

  const validateStep2 = useCallback(() => {
    const newErrors: Record<string, string> = {}

    if (vehicleMode === 'existing') {
      if (!selectedVehicleId) {
        newErrors['vehicle'] = 'Selecciona un vehículo'
      }
    } else {
      if (!newVehicle.plate.trim()) {
        newErrors['plate'] = 'Las placas son requeridas'
      }
      if (!newVehicle.model.trim()) {
        newErrors['model'] = 'El modelo es requerido'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [vehicleMode, selectedVehicleId, newVehicle])

  const handleBack = useCallback(() => {
    navigate('/taller/ordenes')
  }, [navigate])

  const handleNext = useCallback(() => {
    if (step === 1) {
      if (validateStep1()) {
        setStep(2)
        if (customerMode === 'new' || (customerMode === 'existing' && customerVehicles.length === 0)) {
          setVehicleMode('new')
        }
      }
    }
  }, [step, validateStep1, customerMode, customerVehicles.length])

  const handlePrevious = useCallback(() => {
    if (step === 2) {
      setStep(1)
      setErrors({})
    }
  }, [step])

  const handleCustomerModeChange = useCallback((mode: CustomerMode) => {
    setCustomerMode(mode)
    setErrors({})
  }, [])

  const handleVehicleModeChange = useCallback((mode: VehicleMode) => {
    setVehicleMode(mode)
    setErrors({})
  }, [])

  const handleSelectCustomer = useCallback((customerId: string) => {
    setSelectedCustomerId(customerId)
    setErrors({})
  }, [])

  const handleSelectVehicle = useCallback((vehicleId: string) => {
    setSelectedVehicleId(vehicleId)
    setErrors({})
  }, [])

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()

      if (!validateStep2()) return

      setIsLoading(true)

      try {
        let finalCustomerId = selectedCustomerId
        let finalVehicleId = selectedVehicleId

        if (customerMode === 'new') {
          const customer: Customer = {
            id: uuidv4(),
            name: newCustomer.name.trim(),
            phone: newCustomer.phone.trim(),
            email: newCustomer.email.trim() || undefined,
          }
          addCustomer(customer)
          finalCustomerId = customer.id
        }

        if (vehicleMode === 'new') {
          const vehicle: Vehicle = {
            id: uuidv4(),
            plate: newVehicle.plate.toUpperCase(),
            model: newVehicle.model.trim(),
            customerId: finalCustomerId,
          }
          addVehicle(vehicle)
          finalVehicleId = vehicle.id
        }

        const orderNumber = orders.length + 1
        const orderId = `RO-${orderNumber.toString().padStart(3, '0')}`

        const newOrder: RepairOrder = {
          id: uuidv4(),
          orderId,
          customerId: finalCustomerId,
          vehicleId: finalVehicleId,
          status: OrderStatus.CREATED,
          subtotalEstimated: 0,
          authorizedAmount: 0,
          realTotal: 0,
          authorizations: [],
          services: [],
          events: [
            {
              id: uuidv4(),
              orderId: uuidv4(),
              type: EventType.ORDEN_CREADA,
              toStatus: OrderStatus.CREATED,
              timestamp: new Date().toISOString(),
              comment: description.trim() || undefined,
            },
          ],
          errors: [],
          source: OrderSource.TALLER,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        addOrder(newOrder)
        navigate(`/taller/ordenes/${newOrder.id}`)
      } catch (error) {
        console.error('Error al crear orden:', error)
        alert('Error al crear la orden. Intenta nuevamente.')
      } finally {
        setIsLoading(false)
      }
    },
    [
      validateStep2,
      selectedCustomerId,
      selectedVehicleId,
      customerMode,
      vehicleMode,
      newCustomer,
      newVehicle,
      description,
      orders.length,
      addCustomer,
      addVehicle,
      addOrder,
      navigate,
    ]
  )

  return {
    // Data
    customers,
    filteredCustomers,
    customerVehicles,
    selectedCustomer,
    selectedVehicle,

    // State
    step,
    isLoading,
    customerMode,
    vehicleMode,
    selectedCustomerId,
    selectedVehicleId,
    searchTerm,
    newCustomer,
    newVehicle,
    description,
    errors,

    // Setters
    setSearchTerm,
    setNewCustomer,
    setNewVehicle,
    setDescription,

    // Handlers
    handleBack,
    handleNext,
    handlePrevious,
    handleCustomerModeChange,
    handleVehicleModeChange,
    handleSelectCustomer,
    handleSelectVehicle,
    handleSubmit,
  }
}
