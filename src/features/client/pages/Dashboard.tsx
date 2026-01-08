import { BookSearch, Car } from "lucide-react"

import { AppHeader } from "@/shared/components/Layout"
import { EmptyOrdersState, OrdersHeader, OrderStats } from "@/features/orders/components/shared"
import { ClientOrdersList } from "@/features/client/components/ClientOrdersList"
import { useClientDashboard } from "@/features/client/hooks/useClientDashboard"

export default function ClienteOrdenesPage() {
  const {
    orders,
    statsData,
    getVehicleInfo,
    requiresAction,
    handleLogout,
    handleCreateOrder,
    handleViewDetail,
  } = useClientDashboard()
  
  return (
    <div className="bg-gray-50 min-h-screen">
      <AppHeader
        title="Mis Órdenes"
        subtitle="Consulta el estado de tus reparaciones"
        icon={<Car className="w-5 h-5 text-white" />}
        onLogout={handleLogout}
      />

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
          <OrdersHeader
            title="Mis Reparaciones"
            ordersCount={orders.length}
            buttonText="Solicitar reparación"
            onCreateOrder={handleCreateOrder}
          />
          
        <OrderStats stats={statsData} />
        
        {orders.length === 0 ? (
            <EmptyOrdersState
              icon={<BookSearch className="mx-auto w-12 h-12 text-foreground" />}
            />
        ) : (
            <ClientOrdersList
              orders={orders}
              getVehicleInfo={getVehicleInfo}
              requiresAction={requiresAction}
              handleViewDetail={handleViewDetail}
            />
        )}
      </main>
    </div>
  )
}
