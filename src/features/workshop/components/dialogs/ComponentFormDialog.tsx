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

interface ComponentFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'add' | 'edit'
  component: {
    name: string
    description: string
    estimated: number
    real: number
  }
  onComponentChange: (component: {
    name: string
    description: string
    estimated: number
    real: number
  }) => void
  onSubmit: () => void
}

export function ComponentFormDialog({
  open,
  onOpenChange,
  mode='add',
  component,
  onComponentChange,
  onSubmit,
}: ComponentFormDialogProps) {
  const isEditMode = mode === 'edit'
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    // Validación local
    if (!component.name.trim()) {
      setError('El nombre de la refacción es requerido')
      return
    }

    if (component.estimated <= 0) {
      setError('El costo estimado debe ser mayor a cero')
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
          <DialogTitle>{!isEditMode ? 'Agregar Refacción' : 'Editar Refacción'}</DialogTitle>
          <DialogDescription>
            {!isEditMode ? 'Ingresa los detalles de la nueva refacción' : 'Modifica los detalles de la refacción'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">Nombre de la Refacción *</label>
            <Input
              value={component.name}
              onChange={(e) => {
                onComponentChange({ ...component, name: e.target.value })
                if (error) setError(null)
              }}
              placeholder="Ej: Filtro de aceite"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">Descripción</label>
            <Input
              value={component.description}
              onChange={(e) => onComponentChange({ ...component, description: e.target.value })}
              placeholder="Descripción opcional"
            />
          </div>
          <div className="gap-4 grid grid-cols-2">
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Costo Estimado</label>
              <Input
                type="number"
                inputMode='decimal'
                value={component.estimated}
                onChange={(e) =>
                  onComponentChange({ ...component, estimated: Number.parseFloat(e.target.value) || 0 })
                }
                placeholder="0.00"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium text-gray-700 text-sm">Costo Real</label>
              <Input
                type="number"
                inputMode='decimal'
                value={component.real}
                onChange={(e) => onComponentChange({ ...component, real: Number.parseFloat(e.target.value) || 0 })}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>{!isEditMode ? 'Agregar Refacción' : 'Guardar Cambios'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
