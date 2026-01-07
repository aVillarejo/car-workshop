import { Wrench, BookSearch } from "lucide-react"

import { AppHeader } from "@/shared/components/Layout"
import { WorkshopOrdersTable, WorkshopOrdersCards } from '../components'
import {
  OrdersHeader,
  OrderStats,
  OrderFilters,
  EmptyOrdersState,
} from '@/features/orders/components/shared'
import { WORKSHOP_FILTER_OPTIONS } from '../config/filterOptions'
import { useWorkshopDashboard } from '../hooks'

export default function TallerPage() {
  const {
    orders,
    filteredOrders,
    statsData,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    getCustomerName,
    getVehicleInfo,
    formatCurrency,
    handleCreateOrder,
    handleViewDetail,
    handleLogout,
  } = useWorkshopDashboard()

  return (
    <div className="bg-gray-50 min-h-screen">
      <AppHeader
        title="Órdenes de Reparación"
        subtitle="Gestiona todas las órdenes del taller"
        icon={<Wrench className="w-5 h-5 text-white" />}
        onLogout={handleLogout}
      />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        <OrdersHeader
          title="Listado de Órdenes"
          ordersCount={orders.length}
          buttonText="Nueva Orden"
          onCreateOrder={handleCreateOrder}
          />

        <OrderStats stats={statsData} />

        <OrderFilters
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          statusOptions={WORKSHOP_FILTER_OPTIONS}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        {filteredOrders.length === 0 ? (
          <EmptyOrdersState
            icon={<BookSearch className="mx-auto w-12 h-12 text-foreground" />}
          />
        ) : (
          <div className="space-y-4">
            <WorkshopOrdersTable
              orders={filteredOrders}
              getCustomerName={getCustomerName}
              getVehicleInfo={getVehicleInfo}
              formatCurrency={formatCurrency}
              onViewOrdenDetails={handleViewDetail}
            />
            <WorkshopOrdersCards
              orders={filteredOrders}
              getCustomerName={getCustomerName}
              getVehicleInfo={getVehicleInfo}
              formatCurrency={formatCurrency}
              onViewOrdenDetails={handleViewDetail}
            />
          </div>
        )}
      </main>
    </div>
  )
}
