import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
}

export interface Vehicle {
  id: string
  customerId: string
  plate: string
  model: string
}

interface CustomersState {
  customers: Customer[]
  vehicles: Vehicle[]
  isLoading: boolean
}

interface CustomersActions {
  addCustomer: (customer: Customer) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  deleteCustomer: (id: string) => void
  getCustomerById: (id: string) => Customer | undefined

  addVehicle: (vehicle: Vehicle) => void
  updateVehicle: (id: string, updates: Partial<Vehicle>) => void
  deleteVehicle: (id: string) => void
  getVehicleById: (id: string) => Vehicle | undefined
  getVehiclesByCustomer: (customerId: string) => Vehicle[]
  
  setCustomers: (customers: Customer[]) => void
  setVehicles: (vehicles: Vehicle[]) => void
}

type CustomersStore = CustomersState & CustomersActions

const initialState: CustomersState = {
  customers: [],
  vehicles: [],
  isLoading: false,
}


export const useCustomersStore = create<CustomersStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        addCustomer: (customer) => {
          set(
            (state) => ({ customers: [...state.customers, customer] }),
            false,
            'customers/add'
          )
        },
        updateCustomer: (id, updates) => {
          set(
            (state) => ({
              customers: state.customers.map((customer) =>
                customer.id === id ? { ...customer, ...updates } : customer
              ),
            }),
            false,
            'customers/update'
          )
        },
        deleteCustomer: (id) => {
          set(
            (state) => ({
              customers: state.customers.filter((customer) => customer.id !== id),
            }),
            false,
            'customers/delete'
          )
        },
        getCustomerById: (id) => {
          return get().customers.find((customer) => customer.id === id)
        },

        addVehicle: (vehicle) => {
          set(
            (state) => ({ vehicles: [...state.vehicles, vehicle] }),
            false,
            'vehicles/add'
          )
        },
        updateVehicle: (id, updates) => {
          set(
            (state) => ({
              vehicles: state.vehicles.map((vehicle) =>
                vehicle.id === id ? { ...vehicle, ...updates } : vehicle
              ),
            }),
            false,
            'vehicles/update'
          )
        },
        deleteVehicle: (id) => {
          set(
            (state) => ({
              vehicles: state.vehicles.filter((vehicle) => vehicle.id !== id),
            }),
            false,
            'vehicles/delete'
          )
        },
        getVehicleById: (id) => {
          return get().vehicles.find((vehicle) => vehicle.id === id)
        },
        getVehiclesByCustomer: (customerId) => {
          return get().vehicles.filter((vehicle) => vehicle.customerId === customerId)
        },

        setCustomers: (customers) => {
          set({ customers }, false, 'customers/set')
        },
        setVehicles: (vehicles) => {
          set({ vehicles }, false, 'vehicles/set')
        },
      }),
      {
        name: 'customers',
        partialize: (state) => ({
          customers: state.customers,
          vehicles: state.vehicles,
        }),
      }
    ),
    { name: 'CustomersStore' }
  )
)

export const useCustomers = () => useCustomersStore((state) => state.customers)
export const useVehicles = () => useCustomersStore((state) => state.vehicles)

export const useCustomersActions = () =>
  useCustomersStore(
    useShallow((state) => ({
    addCustomer: state.addCustomer,
    updateCustomer: state.updateCustomer,
    setCustomers: state.setCustomers,
  })))

export const useVehiclesActions = () =>
  useCustomersStore(
  useShallow(
    (state) => ({
    addVehicle: state.addVehicle,
    updateVehicle: state.updateVehicle,
    setVehicles: state.setVehicles,
    getVehicleById: state.getVehicleById,
    }))
  )

export const useCustomerVehicles = (customerId: string | undefined) =>
  useCustomersStore((state) =>
    customerId
      ? state.vehicles.filter((vehicle) => vehicle.customerId === customerId)
      : []
  )
