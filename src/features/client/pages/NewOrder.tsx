import { Button } from '@/shared/components/ui/button'
import {
  NewOrderInfoCard,
  NewOrderForm,
} from '@/features/client/components'
import { useNewOrder } from '@/features/client/hooks'

export default function ClienteSolicitarPage() {
  const {
    vehicles,
    isLoading,
    errors,
    selectedVehicle,
    isNewVehicle,
    newPlate,
    newModel,
    description,
    successDialogOpen,
    errorMessage,
    setNewPlate,
    setNewModel,
    setDescription,
    handleSubmit,
    handleToggleVehicleMode,
    handleSelectVehicle,
    handleBack,
    handleSuccessClose,
    handleErrorClose,
  } = useNewOrder()


  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm border-gray-200 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 py-4">
            <div>
              <h1 className="font-bold text-gray-900 text-2xl">
                Solicitar Reparación
              </h1>
              <p className="text-gray-600 text-sm">
                Describe el problema de tu vehículo
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
            >
              ← Volver
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-3xl">
        <NewOrderInfoCard />

        <NewOrderForm
          vehicles={vehicles}
          selectedVehicle={selectedVehicle}
          isNewVehicle={isNewVehicle}
          newPlate={newPlate}
          newModel={newModel}
          description={description}
          isLoading={isLoading}
          errors={errors}
          successDialogOpen={successDialogOpen}
          errorMessage={errorMessage}
          onToggleMode={handleToggleVehicleMode}
          onSelectVehicle={handleSelectVehicle}
          onPlateChange={setNewPlate}
          onModelChange={setNewModel}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          onSuccessClose={handleSuccessClose}
          onErrorClose={handleErrorClose}
        />
      </main>
    </div>
  )
}
