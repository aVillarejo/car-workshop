import { CircleAlert, Loader2, Send, CheckCircle2 } from 'lucide-react'

import { VehicleSelector } from './VehicleSelector'
import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { Textarea } from '@/shared/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'

import type { Vehicle } from '@/shared/stores/useCustomersStore'

interface NewOrderFormProps {
  vehicles: Vehicle[]
  selectedVehicle: string
  isNewVehicle: boolean
  newPlate: string
  newModel: string
  description: string
  isLoading: boolean
  errors: Record<string, string>
  successDialogOpen: boolean
  errorMessage: string
  onToggleMode: (isNew: boolean) => void
  onSelectVehicle: (vehicleId: string) => void
  onPlateChange: (plate: string) => void
  onModelChange: (model: string) => void
  onDescriptionChange: (description: string) => void
  onSubmit: (e: React.FormEvent) => void
  onSuccessClose: () => void
  onErrorClose: () => void
}

export function NewOrderForm({
  vehicles,
  selectedVehicle,
  isNewVehicle,
  newPlate,
  newModel,
  description,
  isLoading,
  errors,
  successDialogOpen,
  errorMessage,
  onToggleMode,
  onSelectVehicle,
  onPlateChange,
  onModelChange,
  onDescriptionChange,
  onSubmit,
  onSuccessClose,
  onErrorClose,
}: NewOrderFormProps) {
  return (
    <>
      <Card className="shadow-sm p-8">
        <form onSubmit={onSubmit} className="space-y-8">
          <VehicleSelector
            vehicles={vehicles}
            selectedVehicle={selectedVehicle}
            isNewVehicle={isNewVehicle}
            newPlate={newPlate}
            newModel={newModel}
            errors={errors}
            onToggleMode={onToggleMode}
            onSelectVehicle={onSelectVehicle}
            onPlateChange={onPlateChange}
            onModelChange={onModelChange}
          />
          <div>
            <h2 className="mb-4 font-semibold text-gray-900 text-xl">Describe el Problema</h2>
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                ¿Qué problema presenta tu vehículo? *
              </label>
              <Textarea
                className={`px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 focus:border-transparent rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-36 text-sm sm:text-base transition-all resize-none
                  ${errors['description']
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  }`
                }
                rows={6}
                value={description}
                onChange={(e) => onDescriptionChange(e.target.value)}
                placeholder="Describe con detalle el problema. Por ejemplo: 'El motor hace un ruido extraño al arrancar' o 'El aire acondicionado no enfría'..."
                disabled={isLoading}
              />
              {errors['description'] && <FieldError message={errors['description']} />}
              <p className="mt-2 text-gray-500 text-xs">
                Proporciona la mayor cantidad de detalles posible para un mejor diagnóstico
              </p>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="disabled:opacity-50 shadow-gray-200 shadow-lg hover:shadow-xl py-3.5 rounded-xl w-full font-medium text-white transition-all disabled:cursor-not-allowed"
            >
              <span className="flex justify-center items-center gap-2">
                { isLoading
                  ? <Loader2 className="w-5 h-5 animate-spin" />
                  : <Send className="w-5 h-5" />
                }
                Enviar Solicitud
              </span>
            </Button>
          </div>
        </form>
      </Card>

      <Dialog open={successDialogOpen} onOpenChange={onSuccessClose}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <DialogTitle className="text-xl text-center">¡Solicitud Enviada!</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            El taller revisará tu vehículo y te enviará un diagnóstico en breve.
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button onClick={onSuccessClose} className="w-full sm:w-auto">
              Aceptar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!errorMessage} onOpenChange={onErrorClose}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <CircleAlert className="w-12 h-12 text-red-600" />
            </div>
            <DialogTitle className="text-xl text-center">Error</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center">
            {errorMessage}
          </DialogDescription>
          <DialogFooter className="sm:justify-center">
            <Button onClick={onErrorClose} variant="outline" className="w-full sm:w-auto">
              Intentar de nuevo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
      <CircleAlert
        className="w-4 h-4"
      />
      {message}
    </p>
  )
}
