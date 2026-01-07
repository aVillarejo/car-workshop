import { useParams } from 'react-router'
import { AlertCircle } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'
import { Alert, AlertTitle, AlertDescription } from '@/shared/components/ui/alert'
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog'
import { AuthorizationsCard, EventHistoryCard } from '@/features/orders/components/shared'
import {
  OrderInfoCard,
  AmountsCard,
  ServicesCard,
  ActionsCard,
} from '../components'
import { ServiceFormDialog } from '../components/dialogs/ServiceFormDialog'
import { ComponentFormDialog } from '../components/dialogs/ComponentFormDialog'
import { ReauthorizeDialog } from '../components/dialogs/ReauthorizeDialog'
import { useWorkshopOrderDetail } from '../hooks'
import { PageLoader } from '@/shared/components/ui/PageLoader'

export default function TallerOrdenDetallePage() {
  const { id } = useParams<{ id: string }>()
  const {
    // Data
    order,
    customer,
    vehicle,
    canModifyServices,
    overcostLimit,
    availableTransitions,

    // Dialog states
    isAddingService,
    setIsAddingService,
    isEditingService,
    setIsEditingService,
    isAddingComponent,
    setIsAddingComponent,
    isEditingComponent,
    setIsEditingComponent,
    isReauthorizing,
    setIsReauthorizing,
    
    // Form states
    newService,
    setNewService,
    newComponent,
    setNewComponent,
    reauthorAmount,
    setReauthorAmount,

    // Alert states
    errorAlert,
    setErrorAlert,
    confirmDialog,
    setConfirmDialog,

    // Handlers
    handleBack,
    handleTransition,
    handleAddService,
    handleEditService,
    handleDeleteService,
    handleOpenAddComponent,
    handleOpenEditService,
    handleOpenEditComponent,
    handleAddComponent,
    handleEditComponent,
    handleDeleteComponent,
    handleReauthorize,
  } = useWorkshopOrderDetail(id)


  if (!order || !customer || !vehicle) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white shadow-sm border-gray-200 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 py-4">
            <div>
              <h1 className="font-bold text-gray-900 text-2xl">Orden {order.orderId}</h1>
              <p className="text-gray-600 text-sm">Detalle y gestión completa</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBack}>
                ← Volver al Listado
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-7xl">
        {errorAlert && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{errorAlert.title}</AlertTitle>
            <AlertDescription>{errorAlert.message}</AlertDescription>
            <Button variant="ghost" size="sm" className="top-2 right-2 absolute" onClick={() => setErrorAlert(null)}>
              ✕
            </Button>
          </Alert>
        )}
        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <OrderInfoCard order={order} customer={customer} vehicle={vehicle}/>
            <AmountsCard order={order} overcostLimit={overcostLimit} />
            <ServicesCard
              services={order.services}
              canModifyServices={canModifyServices}
              onAddService={() => setIsAddingService(true)}
              onEditService={handleOpenEditService}
              onDeleteService={handleDeleteService}
              onAddComponent={handleOpenAddComponent}
              onEditComponent={handleOpenEditComponent}
              onDeleteComponent={handleDeleteComponent}
            />
            <EventHistoryCard events={order.events} />
          </div>

          <div className="space-y-6">
            <ActionsCard
              order={order}
              availableTransitions={availableTransitions}
              onTransition={handleTransition}
              onReauthorize={() => setIsReauthorizing(true)}
            />
            <AuthorizationsCard
              authorizations={order.authorizations}
            />
          </div>
        </div>
      </main>

      <ServiceFormDialog
        open={isAddingService || isEditingService}
        onOpenChange={(open) => {
          setIsAddingService(open && isAddingService)
          setIsEditingService(open && isEditingService)
        }}
        mode={isEditingService ? 'edit' : 'add'}
        service={newService}
        onServiceChange={setNewService}
        onSubmit={isEditingService ? handleEditService : handleAddService}
      />

      <ComponentFormDialog
        open={isAddingComponent || isEditingComponent}
        onOpenChange={(open) => {
          setIsAddingComponent(open && isAddingComponent)
          setIsEditingComponent(open && isEditingComponent)
        }}
        mode={isEditingComponent ? 'edit' : 'add'}
        component={newComponent}
        onComponentChange={setNewComponent}
        onSubmit={isEditingComponent ? handleEditComponent : handleAddComponent}
      />

      <ReauthorizeDialog
        open={isReauthorizing}
        onOpenChange={setIsReauthorizing}
        amount={reauthorAmount}
        onAmountChange={setReauthorAmount}
        onSubmit={handleReauthorize}
        currentAuthorizedAmount={order.authorizedAmount}
        currentRealTotal={order.realTotal}
      />

      {confirmDialog && (
        <ConfirmDialog
          open={!!confirmDialog}
          onOpenChange={(open) => !open && setConfirmDialog(null)}
          title={confirmDialog.title}
          message={confirmDialog.message}
          onConfirm={confirmDialog.onConfirm}
        />
      )}
    </div>
  )
}
