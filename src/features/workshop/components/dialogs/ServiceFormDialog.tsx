import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'

interface ServiceFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  service: {
    name: string
    description: string
    laborEstimated: number
    laborReal: number
  }
  onServiceChange: (service: {
    name: string
    description: string
    laborEstimated: number
    laborReal: number
  }) => void
  onSubmit: () => void
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  mode='add',
  service,
  onServiceChange,
  onSubmit,
}: ServiceFormDialogProps) {
  const isEditMode = mode === 'edit'
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!service.name.trim()) {
      setError('El nombre del servicio es requerido')
      return
    }

    if (service.laborEstimated <= 0) {
      setError('La mano de obra estimada debe ser mayor a cero')
      return
    }

    setError(null)
    onSubmit()
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setError(null)
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{!isEditMode ? 'Agregar Servicio' : 'Editar Servicio'}</DialogTitle>
          <DialogDescription>
            {!isEditMode ? 'Ingresa los detalles del nuevo servicio' : 'Modifica los detalles del servicio'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">Nombre del Servicio *</label>
            <Input
              value={service.name}
              onChange={(e) => {
                onServiceChange({ ...service, name: e.target.value })
                if (error) setError(null)
              }}
              placeholder="Ej: Cambio de aceite"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">Descripción</label>
            <Input
              value={service.description}
              onChange={(e) => onServiceChange({ ...service, description: e.target.value })}
              placeholder="Descripción opcional"
            />
          </div>
          <div className="gap-4 grid grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Mano de Obra Estimada</label>
              <Input
                type="number"
                value={service.laborEstimated}
                onChange={(e) =>
                  onServiceChange({ ...service, laborEstimated: Number.parseFloat(e.target.value) || 0 })
                }
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Mano de Obra Real</label>
              <Input
                type="number"
                value={service.laborReal}
                onChange={(e) => onServiceChange({ ...service, laborReal: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{!isEditMode ? 'Agregar Servicio' : 'Guardar Cambios'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
