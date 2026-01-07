import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import type { RepairOrder, OrderStatus } from '../types'

interface OrdersState {
  orders: RepairOrder[]
  isLoading: boolean
  error: string | null
}

interface OrdersActions {
  addOrder: (order: RepairOrder) => void
  updateOrder: (id: string, updates: Partial<RepairOrder>) => void
  deleteOrder: (id: string) => void
  
  getOrderById: (id: string) => RepairOrder | undefined
  getOrdersByCustomer: (customerId: string) => RepairOrder[]
  getOrdersByStatus: (status: OrderStatus) => RepairOrder[]
  
  setOrders: (orders: RepairOrder[]) => void
  reset: () => void
}

type OrdersStore = OrdersState & OrdersActions

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
}

export const useOrdersStore = create<OrdersStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        addOrder: (order) => {
          set(
            (state) => ({ orders: [...state.orders, order] }),
            false,
            'orders/addOrder'
          )
        },
        updateOrder: (id, updates) => {
          set(
            (state) => ({
              orders: state.orders.map((order) =>
                order.id === id ? { ...order, ...updates } : order
              ),
            }),
            false,
            'orders/updateOrder'
          )
        },
        deleteOrder: (id) => {
          set(
            (state) => ({
              orders: state.orders.filter((order) => order.id !== id),
            }),
            false,
            'orders/deleteOrder'
          )
        },
        getOrderById: (id) => {
          return get().orders.find((order) => order.id === id)
        },
        getOrdersByCustomer: (customerId) => {
          return get().orders.filter((order) => order.customerId === customerId)
        },
        getOrdersByStatus: (status) => {
          return get().orders.filter((order) => order.status === status)
        },

        setOrders: (orders) => {
          set(
            { orders },
            false,
            'orders/setOrders'
          )
        },
        reset: () => {
          set(
            initialState,
            false,
            'orders/reset'
          )
        },
      }),
      {
        name: 'orders',
        partialize: (state) => ({ orders: state.orders }),
      }
    ),
    { name: 'OrdersStore' }
  )
)

export const useOrders = () => useOrdersStore((state) => state.orders)
export const useOrdersLoading = () => useOrdersStore((state) => state.isLoading)
export const useOrdersError = () => useOrdersStore((state) => state.error)

export const useOrdersActions = () =>
  useOrdersStore((state) => ({
    addOrder: state.addOrder,
    updateOrder: state.updateOrder,
    deleteOrder: state.deleteOrder,
    setOrders: state.setOrders,
  }))

export const useCustomerOrders = (customerId: string | undefined) =>
  useOrdersStore((state) =>
    customerId
      ? state.orders.filter((order) => order.customerId === customerId)
      : []
  )

export const useOrdersStats = () =>
  useOrdersStore((state) => {
    const orders = state.orders
    return {
      total: orders.length,
      byStatus: orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      }, {} as Record<OrderStatus, number>),
    }
  })
