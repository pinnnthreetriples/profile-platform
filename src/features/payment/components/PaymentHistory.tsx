import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import type { Payment } from "../types"

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  if (payments.length === 0) return null

  return (
    <div className="rounded-lg bg-brand-paper p-5 shadow-soft">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-brand-muted">
        История платежей
      </p>
      <ul className="space-y-2">
        {payments.map((payment) => (
          <li
            key={payment.id}
            className="flex items-center justify-between border-b border-brand-line pb-2 text-sm last:border-0 last:pb-0"
          >
            <div className="space-y-0.5">
              <p className="font-medium text-brand-ink">
                {payment.amount} {payment.currency}
              </p>
              <p className="text-xs text-brand-muted">
                {new Date(payment.createdAt).toLocaleDateString("ru-RU")}
              </p>
            </div>
            <PaymentStatusBadge status={payment.status} />
          </li>
        ))}
      </ul>
    </div>
  )
}
