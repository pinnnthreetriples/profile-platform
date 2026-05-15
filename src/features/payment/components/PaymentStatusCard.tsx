import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import type { PaymentStatus } from "@/types/database"

interface PaymentStatusCardProps {
  paymentStatus: PaymentStatus
}

export function PaymentStatusCard({ paymentStatus }: PaymentStatusCardProps) {
  return (
    <div className="rounded-lg bg-brand-paper p-5 shadow-soft">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
          Статус аккаунта
        </p>
        <PaymentStatusBadge status={paymentStatus} />
      </div>
      {paymentStatus === "paid" && (
        <p className="mt-2 text-sm text-brand-success">
          Платёж подтверждён. Аккаунт активен.
        </p>
      )}
    </div>
  )
}
