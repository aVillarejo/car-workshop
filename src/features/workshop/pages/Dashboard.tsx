import { Wrench, Plus } from "lucide-react"
import { useNavigate } from "react-router"

import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Badge } from "@/shared/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { AppHeader } from "@/shared/components/Layout"

const orders = [
  {
    folio: "RO-001",
    source: "TALLER",
    cliente: "Juan Pérez García",
    vehiculo: "ABC-123-D - Toyota Corolla 2020",
    estado: "Creada",
    autorizado: "-",
    real: "-",
  },
  {
    folio: "RO-002",
    source: "CLIENTE",
    cliente: "María González López",
    vehiculo: "XYZ-789-F - Honda Civic 2019",
    estado: "Diagnosticada",
    autorizado: "-",
    real: "$1,750.00",
  },
  {
    folio: "RO-003",
    source: "TALLER",
    cliente: "Carlos Rodríguez Martínez",
    vehiculo: "DEF-456-G - Nissan Versa 2021",
    estado: "Autorizada",
    autorizado: "$2,450.00",
    real: "$2,450.00",
  },
  {
    folio: "RO-004",
    source: "TALLER",
    cliente: "Ana Martínez Sánchez",
    vehiculo: "GHI-111-H - Mazda 3 2018",
    estado: "En Progreso",
    autorizado: "$2,050.00",
    real: "$2,050.00",
  },
  {
    folio: "RO-005",
    source: "TALLER",
    cliente: "Juan Pérez García",
    vehiculo: "JKL-222-I - Ford Focus 2017",
    estado: "Esperando Aprobación",
    autorizado: "$5,100.00",
    real: "$5,950.00",
  },
  {
    folio: "RO-006",
    source: "CLIENTE",
    cliente: "María González López",
    vehiculo: "XYZ-789-F - Honda Civic 2019",
    estado: "Completada",
    autorizado: "$2,450.00",
    real: "$2,450.00",
  },
]

const statusColors = {
  Creada: "bg-amber-50 text-amber-700 border-amber-200",
  Diagnosticada: "bg-blue-50 text-blue-700 border-blue-200",
  Autorizada: "bg-emerald-50 text-emerald-700 border-emerald-200",
  "En Progreso": "bg-indigo-50 text-indigo-700 border-indigo-200",
  "Esperando Aprobación": "bg-yellow-50 text-yellow-700 border-yellow-200",
  Completada: "bg-green-50 text-green-700 border-green-200",
}

export default function TallerPage() {
  const navigate = useNavigate() 
  return (
    <div className="min-h-screen bg-gray-50">
      <AppHeader
        title="Órdenes de Reparación"
        subtitle="Gestiona todas las órdenes del taller"
        icon={<Wrench className="w-5 h-5 text-white" />}
        onLogout={() => navigate('/')}
      />
      
      <main className="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Listado de Órdenes</h2>
            <p className="text-sm text-gray-500">6 órdenes encontradas</p>
          </div>
          <Button className="gap-2 px-6 py-3 w-full text-base font-medium sm:w-auto min-h-12">
            <Plus className="w-5 h-5" />
            Nueva Orden
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-4">
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Total</p>
            <p className="flex-1 text-2xl font-semibold text-gray-900">6</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Pendientes Autorización</p>
            <p className="flex-1 text-2xl font-semibold text-blue-600">1</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="text-sm text-gray-500">En Progreso</p>
            <p className="flex-1 text-2xl font-semibold text-orange-600">1</p>
          </Card>
          <Card className="gap-2 p-4 border border-gray-200">
            <p className="text-sm text-gray-500">Esperando Aprobación</p>
            <p className="flex-1 text-2xl font-semibold text-red-600">1</p>
          </Card>
        </div>

        <Card className="p-4 mb-6 bg-white">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Input placeholder="Buscar por folio o cliente..." className="bg-white" />
          <Select>
            <SelectTrigger className="w-full bg-white">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos los estados</SelectItem>
              <SelectItem value="creada">Creada</SelectItem>
              <SelectItem value="diagnosticada">Diagnosticada</SelectItem>
              <SelectItem value="autorizada">Autorizada</SelectItem>
              <SelectItem value="en-progreso">En Progreso</SelectItem>
              <SelectItem value="esperando">Esperando Aprobación</SelectItem>
              <SelectItem value="completada">Completada</SelectItem>
            </SelectContent>
          </Select>
          </div>
        </Card>

        <div className="hidden overflow-hidden bg-white rounded-lg border border-gray-200 lg:block">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs font-medium text-gray-700">Folio</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Cliente</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Vehículo</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Estado</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Autorizado</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Real</TableHead>
                <TableHead className="text-xs font-medium text-gray-700">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.folio}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.folio}</p>
                      <p className="text-xs text-gray-500">{order.source}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{order.cliente}</TableCell>
                  <TableCell className="text-sm text-gray-900">{order.vehiculo}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[order.estado as keyof typeof statusColors]}>
                      {order.estado}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-900">{order.autorizado}</TableCell>
                  <TableCell className="text-sm text-gray-900">{order.real}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      Ver Detalle
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="space-y-4 lg:hidden">
          {orders.map((order) => (
            <Card key={order.folio} className="p-4 bg-white border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-semibold text-gray-900">{order.folio}</p>
                  <p className="text-xs text-gray-500">{order.cliente}</p>
                </div>
                <Badge variant="outline" className={statusColors[order.estado as keyof typeof statusColors]}>
                  {order.estado}
                </Badge>
              </div>
              <div className="mb-3 space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Vehículo:</p>
                  <p className="text-sm text-gray-900">{order.vehiculo}</p>
                </div>
                {order.autorizado !== "-" && (
                  <div className="flex gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Autorizado:</p>
                      <p className="text-sm font-medium text-gray-900">{order.autorizado}</p>
                    </div>
                    {order.real !== "-" && (
                      <div>
                        <p className="text-xs text-gray-500">Real:</p>
                        <p className="text-sm font-medium text-gray-900">{order.real}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                Ver Detalle →
              </Button>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
