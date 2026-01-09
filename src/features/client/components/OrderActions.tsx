import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { AlertTriangle, InfoIcon, XCircle } from 'lucide-react'
import { ConfirmDialog } from '@/shared/components/ui/ConfirmDialog'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog'
import { Textarea } from '@/shared/components/ui/textarea'

interface OrderActionsProps {
  isActionRequired: boolean
  canApprove: boolean
  canReauthorize: boolean
  hasClientRejected: boolean

  // Handlers
  handleOpenRejectForm: () => void
  handleAcceptProposal: () => void
  handleAcceptReauthorization: () => void
  handleRejectProposal: () => void

  // Dialog states
  isShowingRejectForm: boolean
  setIsShowingRejectForm: (value: boolean) => void
  isAproving: boolean
  setIsApproving: (value: boolean) => void
  isReauthorizing: boolean
  setIsReauthorizing: (value: boolean) => void

  // Form states
  rejectionReason: string
  setRejectionReason: (value: string) => void

  // Alert states
  errorAlert: { title: string; message: string } | null
  setErrorAlert: (value: { title: string; message: string } | null) => void

  // Dialog content
  dialogTitle: string
  dialogMessage: string
  dialogAction: (() => void) | null
}

export function OrderActions({
  isActionRequired,
  canApprove,
  canReauthorize,
  hasClientRejected,
  handleOpenRejectForm,
  handleAcceptProposal,
  handleAcceptReauthorization,
  handleRejectProposal,
  isShowingRejectForm,
  setIsShowingRejectForm,
  isAproving,
  setIsApproving,
  isReauthorizing,
  setIsReauthorizing,
  rejectionReason,
  setRejectionReason,
  errorAlert,
  setErrorAlert,
  dialogTitle,
  dialogMessage,
  dialogAction,
}: OrderActionsProps) {
  return (
    <>
      {isActionRequired && !hasClientRejected && (
        <Card className="bg-linear-to-r from-blue-50 to-green-50 mb-6 p-6 border-blue-200">
          <div className="flex sm:flex-row flex-col sm:items-center gap-4">
            <div className="flex-1">
              <div className='flex items-center gap-3'>
              {canApprove ? <InfoIcon className="stroke-blue-900 w-7 h-7" /> : <AlertTriangle className="stroke-amber-900 w-7 h-7" />}
              <h2 className="font-bold text-gray-900 text-lg">
                {canApprove ? 'Propuesta de Reparación' : 'Reautorización Requerida'}
              </h2>
              </div>
              <p className="mt-1 text-gray-700 text-sm">
                {canApprove
                  ? 'Revisa el diagnóstico y los servicios propuestos. Si estás de acuerdo, acepta para que el taller comience con la reparación.'
                  : 'El costo real de la reparación excedió el monto inicialmente autorizado. Revisa el nuevo monto y autoriza para continuar.'}
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  handleOpenRejectForm()
                }}
              >
                Rechazar / Comentar
              </Button>
              <Button
                size="sm"
                onClick={() => {
                  if (canApprove) {
                    handleAcceptProposal()
                  } else if (canReauthorize) {
                    handleAcceptReauthorization()
                  }
                }}
              >
                {canApprove ? 'Aceptar Propuesta' : 'Autorizar Monto'}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {hasClientRejected && (
        <Card className="bg-red-50 mb-6 p-6 border-red-200">
          <div className="flex items-center gap-3">
            <div className="shrink-0">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-bold text-red-900 text-lg">Propuesta Rechazada</h2>
              <p className="mt-1 text-red-800 text-sm">
                Has rechazado esta propuesta. El taller ha sido notificado de tu decisión.
              </p>
            </div>
          </div>
        </Card>
      )}

      <Dialog open={isShowingRejectForm} onOpenChange={setIsShowingRejectForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rechazar Propuesta</DialogTitle>
            <DialogDescription>
              Cuéntanos por qué deseas rechazar esta propuesta. El taller recibirá tu comentario.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="Motivo del rechazo..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            {errorAlert && (
              <div className="bg-red-50 p-3 border border-red-200 rounded-md">
                <p className="text-red-800 text-sm">{errorAlert.message}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsShowingRejectForm(false)
                setRejectionReason('')
                setErrorAlert(null)
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleRejectProposal()
              }}
            >
              Rechazar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={isAproving || isReauthorizing}
        onOpenChange={(open) => {
          if (!open) {
            setIsApproving(false)
            setIsReauthorizing(false)
          }
        }}
        title={dialogTitle}
        message={dialogMessage}
        onConfirm={() => {
          dialogAction?.()
        }}
      />
    </>
  )
}
