import { useState } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'

import { formatCurrency } from '@/shared/lib/formatters'

interface ReauthorizeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  amount: string
  onAmountChange: (amount: string) => void
  onSubmit: () => void
  currentAuthorizedAmount: number
  currentRealTotal: number
}

export function ReauthorizeDialog({
  open,
  onOpenChange,
  amount,
  onAmountChange,
  onSubmit,
  currentAuthorizedAmount,
  currentRealTotal,
}: ReauthorizeDialogProps) {
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    const parsedAmount = Number.parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Ingresa un monto válido mayor a cero')
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
          <DialogTitle>Reautorizar Orden</DialogTitle>
          <DialogDescription>Ingresa el nuevo monto a autorizar (incluye IVA)</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div>
            <label className="block mb-1 font-medium text-gray-700 text-sm">Nuevo Monto Autorizado *</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => {
                onAmountChange(e.target.value)
                if (error) setError(null)
              }}
              placeholder="0.00"
            />
          </div>
          <div className="bg-blue-50 p-3 border border-blue-200 rounded-md">
            <p className="text-blue-900 text-sm">
              <strong>Monto actual:</strong> {formatCurrency(currentAuthorizedAmount)}
            </p>
            <p className="text-blue-900 text-sm">
              <strong>Costo real:</strong> {formatCurrency(currentRealTotal)}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Confirmar Reautorización</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
