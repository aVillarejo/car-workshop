import { Plus, Edit, Trash2, MoreVertical } from 'lucide-react'
import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'

import type { Service } from '@/features/orders/types'
import { formatCurrency } from '@/shared/lib/formatters'

interface ServicesCardProps {
  services: Service[]
  canModifyServices: boolean
  onAddService: () => void
  onEditService: (service: Service) => void
  onDeleteService: (serviceId: string) => void
  onAddComponent: (serviceId: string) => void
  onEditComponent: (service: Service, componentId: string) => void
  onDeleteComponent: (serviceId: string, componentId: string) => void
  isClientView?: boolean
}

export function ServicesCard({
  services,
  canModifyServices,
  onAddService,
  onEditService,
  onDeleteService,
  onAddComponent,
  onEditComponent,
  onDeleteComponent,
  isClientView = false,
}: ServicesCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-3 mb-4">
        <h2 className="font-semibold text-gray-900 text-base sm:text-lg">Servicios y Refacciones</h2>
        {canModifyServices && (
          <Button size="sm" onClick={onAddService} className="w-full sm:w-auto">
            + Agregar Servicio
          </Button>
        )}
      </div>

      {services.length === 0 ? (
        <div className="py-8 text-gray-500 text-center">
          <p>No hay servicios registrados</p>
          {canModifyServices && (
            <Button
              className="bg-transparent mt-2"
              size="sm"
              variant="outline"
              onClick={onAddService}
            >
              Agregar Primer Servicio
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service) => (
            <div key={service.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex sm:flex-row flex-col sm:justify-between sm:items-start gap-3">
                <div className="flex-1 pr-8 sm:pr-0">
                  <h3 className="font-medium text-gray-900">{service.name}</h3>
                  {service.description && <p className="mt-1 text-gray-600 text-sm">{service.description}</p>}
                </div>
                {canModifyServices && (
                  <div className="flex flex-row gap-2 w-full sm:w-auto">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onAddComponent(service.id)}
                      aria-label="Agregar refacción"
                      className="sm:flex-initial flex-1"
                    >
                      <Plus className="mr-1 w-4 h-4" aria-hidden="true" />
                      <span className="hidden sm:inline">Agregar Refacción</span>
                      <span className="sm:hidden">Refacción</span>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="ghost" aria-label="Más opciones" className="p-0 w-8 h-8">
                          <MoreVertical className="w-4 h-4" aria-hidden="true" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditService(service)}>
                          <Edit className="mr-2 w-4 h-4" aria-hidden="true" />
                          Editar Servicio
                        </DropdownMenuItem>
                        <DropdownMenuItem variant="destructive" onClick={() => onDeleteService(service.id)}>
                          <Trash2 className="mr-2 w-4 h-4" aria-hidden="true" />
                          Eliminar Servicio
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
              </div>

              <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 mt-4 text-sm">
                <div>
                  <span className="text-gray-600">Mano de obra {!isClientView && 'estimada'}:</span>
                  <span className="ml-2 font-medium text-gray-900">{formatCurrency(service.laborEstimated)}</span>
                </div>
                <div>
                  {!isClientView && (
                    <>
                      <span className="text-gray-600">Mano de obra real:</span>
                      <span className="ml-2 font-medium text-gray-900">{formatCurrency(service.laborReal)}</span>
                    </>
                  )}
                </div>
              </div>

              {service.components.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 font-medium text-gray-700 text-sm">Refacciones:</p>
                  <div className="space-y-2">
                    {service.components.map((component) => (
                      <div
                        key={component.id}
                        className="relative flex sm:flex-row flex-col sm:justify-between sm:items-start gap-3 bg-gray-50 p-3 rounded text-sm"
                      >
                        <div className="flex-1 pr-8 sm:pr-0">
                          <p className="font-medium text-gray-900">{component.name}</p>
                          {component.description && (
                            <p className="mt-1 text-gray-600 text-xs">{component.description}</p>
                          )}
                        </div>
                        <div className="flex sm:flex-row flex-col items-stretch sm:items-center gap-3">
                          <div className="sm:text-right">
                            <p className={`text-gray-600 text-xs ${isClientView ? 'font-medium text-gray-900 mt-1' : null}`}>{!isClientView && 'Estimado:'} {formatCurrency(component.estimated)}</p>
                            {isClientView ? null : <p className="mt-1 font-medium text-gray-900 text-xs">Real: {formatCurrency(component.real)}</p>}
                          </div>
                          {canModifyServices && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  aria-label={`Opciones para ${component.name}`}
                                  className="top-2 right-2 sm:static absolute p-0 w-6 sm:w-6 h-6 sm:h-6"
                                >
                                  <MoreVertical className="w-3 h-3" aria-hidden="true" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => onEditComponent(service, component.id)}>
                                  <Edit className="mr-2 w-3 h-3" aria-hidden="true" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() => onDeleteComponent(service.id, component.id)}
                                >
                                  <Trash2 className="mr-2 w-3 h-3" aria-hidden="true" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  )
}
