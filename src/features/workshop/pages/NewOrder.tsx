import { CarFront, Check, ChevronLeft, ChevronRight, LoaderCircle, PlusIcon, SearchIcon } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { useNewOrder } from '@/features/workshop/hooks/useNewOrder'
import { Textarea } from '@/shared/components/ui/textarea'
import {
  ProgressBar,
  ModeToggle,
  ExistingCustomerList,
  NewCustomerForm,
  ExistingVehicleList,
  NewVehicleForm,
  CustomerInfoCard,
} from '@/features/workshop/components/new-order'

export default function TallerNuevaOrdenPage() {
  const {
    filteredCustomers,
    customerVehicles,
    selectedCustomer,
    step,
    isLoading,
    customerMode,
    vehicleMode,
    searchTerm,
    selectedCustomerId,
    selectedVehicleId,
    newCustomer,
    newVehicle,
    description,
    errors,
    setSearchTerm,
    setNewCustomer,
    setNewVehicle,
    setDescription,
    handleBack,
    handleNext,
    handlePrevious,
    handleCustomerModeChange,
    handleVehicleModeChange,
    handleSelectCustomer,
    handleSelectVehicle,
    handleSubmit,
  } = useNewOrder()

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm border-gray-200 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 py-4">
            <div>
              <h1 className="font-bold text-gray-900 text-2xl">Nueva Orden de Reparación</h1>
              <p className="text-gray-600 text-sm">
                Paso {step} de 2: {step === 1 ? 'Seleccionar Cliente' : 'Seleccionar Vehículo'}
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={handleBack}>
              ← Volver
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 max-w-4xl">
        <ProgressBar currentStep={step} totalSteps={2} steps={[{ label: 'Cliente' }, { label: 'Vehículo' }]} />
        <form onSubmit={step === 2 ? handleSubmit : (e) => { e.preventDefault(); handleNext() }}>
          {step === 1 && (
            <Card className="shadow-sm p-4 sm:p-8">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="font-semibold text-gray-900 text-lg sm:text-xl">Seleccionar Cliente</h2>
                <span className="text-gray-500 text-xs sm:text-sm">Paso 1 de 2</span>
              </div>
              <ModeToggle
                value={customerMode}
                onChange={handleCustomerModeChange}
                segments={[
                  {
                    value: 'existing',
                    label: 'Cliente Existente',
                    icon: (
                      <SearchIcon className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                    ),
                  },
                  {
                    value: 'new',
                    label: 'Nuevo Cliente',
                    icon: (
                      <PlusIcon className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
                    ),
                  },
                ]}
              />
              {customerMode === 'existing' ? (
                <ExistingCustomerList
                  customers={filteredCustomers}
                  selectedId={selectedCustomerId}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onSelect={handleSelectCustomer}
                  error={errors['customer']}
                />
              ) : (
                <NewCustomerForm data={newCustomer} onChange={setNewCustomer} errors={errors} />
              )}

              <div className="flex justify-end mt-6 sm:mt-8 pt-4 border-gray-100 border-t">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto sm:min-w-40"
                >
                  {isLoading ? (
                    <span className="flex justify-center items-center gap-2">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      Siguiente
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {step === 2 && (
            <Card className="shadow-sm p-4 sm:p-8">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="font-semibold text-gray-900 text-lg sm:text-xl">Seleccionar Vehículo</h2>
                <span className="text-gray-500 text-xs sm:text-sm">Paso 2 de 2</span>
              </div>
              <CustomerInfoCard
                customerName={customerMode === 'existing' ? selectedCustomer?.name || '' : newCustomer.name}
              />
              {customerMode === 'existing' && customerVehicles.length > 0 && (
                <ModeToggle
                  value={vehicleMode}
                  onChange={handleVehicleModeChange}
                  segments={[
                    {
                      value: 'existing',
                      label: 'Vehículo Existente',
                      icon: (
                        <CarFront className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                      ),
                    },
                    {
                      value: 'new',
                      label: 'Nuevo Vehículo',
                      icon: (
                        <PlusIcon className="w-3.5 sm:w-5 h-3.5 sm:h-5" />
                      ),
                    },
                  ]}
                />
              )}
              
              {vehicleMode === 'existing' && customerVehicles.length > 0 ? (
                <ExistingVehicleList
                  vehicles={customerVehicles}
                  selectedId={selectedVehicleId}
                  onSelect={handleSelectVehicle}
                  error={errors['vehicle']}
                />
              ) : (
                <NewVehicleForm
                  data={newVehicle}
                  onChange={setNewVehicle}
                  errors={errors}
                  showNoVehiclesWarning={customerVehicles.length === 0}
                />
              )}

              <div className="mt-6">
                <label className="block mb-2 font-medium text-gray-700 text-sm">
                  Descripción del Problema <span className="text-gray-500">(opcional)</span>
                </label>
                <Textarea
                  className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 focus:border-transparent rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-25 text-sm sm:text-base transition-all resize-none"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe brevemente el problema reportado por el cliente..."
                />
              </div>

              <div className="flex sm:flex-row flex-col sm:justify-end gap-3 mt-6 sm:mt-8 pt-4 border-gray-100 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  className="order-2 sm:order-1 w-full sm:w-auto sm:min-w-40"
                >
                  <span className="flex justify-center items-center gap-2">
                    <ChevronLeft className="w-4 h-4" />
                    Atrás
                  </span>
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="order-1 sm:order-2 w-full sm:w-auto sm:min-w-40"
                >
                  {isLoading ? (
                    <span className="flex justify-center items-center gap-2">
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                      Procesando...
                    </span>
                  ) : (
                    <span className="flex justify-center items-center gap-2">
                      <Check className="w-4 h-4" />
                      Crear Orden
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          )}
        </form>
      </main>
    </div>
  )
}
