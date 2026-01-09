import { Button } from '@/shared/components/ui/button'
import { useParams } from 'react-router'

import { useClientOrderDetail } from '../hooks'
import { PageLoader } from '@/shared/components/ui/PageLoader'
import { AuthorizationsCard, EventHistoryCard } from '@/features/orders/components/shared'
import { ServicesCard } from '@/features/workshop/components'
import { ServiceInfoCard, OrderActions } from '../components'

export default function ClientOrdenDetallePage() {
  const { id } = useParams<{ id: string }>()

  const {
    // data
    order,
    customer,
    vehicle,
    canApprove,
    canReauthorize,
    isActionRequired,

    // handlers
    handleBack,
    handleOpenRejectForm,
    handleAcceptProposal,
    handleAcceptReauthorization,
    handleRejectProposal,

    // Dialog states
    isShowingRejectForm,
    setIsShowingRejectForm,
    isAproving,
    setIsApproving,
    isReauthorizing,
    setIsReauthorizing,
    dialogTitle,
    dialogMessage,
    dialogAction,

    // Form states
    rejectionReason,
    setRejectionReason,
    errorAlert,
    setErrorAlert,

    // Helpers
    hasClientRejected,
  } = useClientOrderDetail(id)

  if (!order || !customer || !vehicle) {
    return (
      <PageLoader />
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="top-0 z-10 sticky bg-white shadow-sm border-gray-200 border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 py-4">
            <div>
              <h1 className="font-bold text-gray-900 text-2xl">Orden {order.orderId}</h1>
              <p className="text-gray-600 text-sm">Detalles</p>
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

        <OrderActions
          isActionRequired={isActionRequired}
          canApprove={canApprove}
          canReauthorize={canReauthorize}
          hasClientRejected={hasClientRejected()}
          handleOpenRejectForm={handleOpenRejectForm}
          handleAcceptProposal={handleAcceptProposal}
          handleAcceptReauthorization={handleAcceptReauthorization}
          handleRejectProposal={handleRejectProposal}
          isShowingRejectForm={isShowingRejectForm}
          setIsShowingRejectForm={setIsShowingRejectForm}
          isAproving={isAproving}
          setIsApproving={setIsApproving}
          isReauthorizing={isReauthorizing}
          setIsReauthorizing={setIsReauthorizing}
          rejectionReason={rejectionReason}
          setRejectionReason={setRejectionReason}
          errorAlert={errorAlert}
          setErrorAlert={setErrorAlert}
          dialogTitle={dialogTitle}
          dialogMessage={dialogMessage}
          dialogAction={dialogAction}
        />

        <div className="gap-6 grid grid-cols-1 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2"> 
            
            <ServiceInfoCard
              order={order}
              vehicle={vehicle}
              canApprove={canApprove}
              canReauthorize={canReauthorize}
              isActionRequired={isActionRequired}
            />

            <ServicesCard
              services={order.services}
              isClientView
              canModifyServices={false}
              onAddService={() => { }}
              onEditService={() => { }}
              onDeleteService={() => { }}
              onAddComponent={() => { }}
              onEditComponent={() => { }}
              onDeleteComponent={() => { }}
            />
          </div>
          <aside className="flex-1 space-y-6">
            <AuthorizationsCard
              authorizations={order.authorizations}
            />
            <EventHistoryCard
              events={order.events}
            />
          </aside>
        </div>
      </main>
    </div>
  )
}
