import { useNavigate } from "react-router"
import { Car, Plus, } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/ui/badge"
import { AppHeader } from "@/shared/components/Layout"

const clientOrders = [
  {
    folio: "RO-002",
    estado: "DIAGNOSTICADO",
    requiresAction: true,
    vehiculo: "XYZ-789-F - Honda Civic 2019",
    fecha: "6 de enero de 2026",
    diagnostico: "Diagnóstico completado - Pendiente de tu autorización",
    real: null,
    autorizado: null,
    montoAutorizado: 1500.00,
  },
  {
    folio: "RO-006",
    estado: "Completada",
    requiresAction: false,
    vehiculo: "XYZ-789-F - Honda Civic 2019",
    fecha: "2 de enero de 2026",
    montoAutorizado: 2450.00,
    diagnostico: null,
    real: null,
    autorizado: null,
  },
]

const statusColors = {
  Diagnosticada: "bg-blue-50 text-blue-700 border-blue-200",
  Completada: "bg-green-50 text-green-700 border-green-200",
}


export default function ClientePage() {
  const navigate = useNavigate()

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Mis Órdenes"
        subtitle="Consulta el estado de tus reparaciones"
        icon={<Car className="w-5 h-5 text-white" />}
        onLogout={() => navigate('/')}
      />

      <main className="px-4 py-6 mx-auto max-w-6xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mis Reparaciones</h2>
            <p className="text-sm text-gray-500">2 órdenes registradas</p>
          </div>
          <Button className="gap-2 px-6 py-3 w-full text-base font-medium hover:bg-primary/90 sm:w-auto min-h-12">
            <Plus className="w-5 h-5" />
            Solicitar Reparación
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="mb-1 text-sm text-gray-500">Total</p>
            <p className="text-2xl font-semibold text-gray-900">2</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="mb-1 text-sm text-gray-500">Activas</p>
            <p className="text-2xl font-semibold text-blue-600">2</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="mb-1 text-sm text-gray-500">Requieren Acción</p>
            <p className="text-2xl font-semibold text-orange-600">1</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="mb-1 text-sm text-gray-500">Completadas</p>
            <p className="text-2xl font-semibold text-green-600">0</p>
          </Card>
        </div>

        <div className="space-y-6">
          {clientOrders.map((order) => (
            <Card key={order.folio}
                className="gap-0 p-6 transition-shadow cursor-pointer hover:shadow-md"
                onClick={() => console.log(`Navigating to order ${order.folio}`)}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-start">
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                      <h3 className="text-lg font-bold text-gray-900">{order.folio}</h3>
                      <Badge variant="outline" className={statusColors[order.estado as keyof typeof statusColors]}>
                        {order.estado}
                      </Badge>
                      {order?.requiresAction && (
                        <span className="inline-flex gap-1 items-center px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Requiere Acción
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-gray-600">Vehículo:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {order.vehiculo}
                        </span>
                      </div>

                      <div>
                        <span className="text-gray-600">Fecha:</span>
                        <span className="ml-2 font-medium text-gray-900">
                          {order.fecha}
                        </span>
                      </div>
                    </div>

                    {order.montoAutorizado > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600">Monto Autorizado:</span>
                        <span className="ml-2 text-lg font-semibold text-blue-600">
                          {formatCurrency(order.montoAutorizado)}
                        </span>
                      </div>
                    )}

                    {order.estado === 'DIAGNOSTICADO' && (
                      <div className="p-3 mt-2 bg-blue-50 rounded-md border border-blue-100">
                        <p className="text-sm font-medium text-blue-900">
                          📋 Diagnóstico completado - Pendiente de tu autorización
                        </p>
                      </div>
                    )} 

                    {order.estado === 'ESPERANDO_APROBACION' && (
                      <div className="p-3 mt-2 bg-yellow-50 rounded-md border border-yellow-100">
                        <p className="text-sm font-medium text-yellow-900">
                          ⚠️ Se requiere tu aprobación para continuar con la reparación
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="sm:shrink-0">
                    <Button
                    variant={"outline"}
                      className={`
                        ${order.requiresAction && 'border-yellow-700/50 hover:text-yellow-900 hover:bg-yellow-200/10 hover:border-yellow-200'}
                        mt-4 sm:mt-0`
                        }
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        console.log(`Button clicked for order ${order.folio}`)
                      }}
                    >
                      {order.requiresAction ? 'Revisar y Aprobar' : 'Ver Detalle'} →
                    </Button>
                  </div>
                </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
