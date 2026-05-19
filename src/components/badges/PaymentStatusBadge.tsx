import { cn } from "@/lib/utils"
import type { PaymentStatus } from "@/types/database"

const config: Record<PaymentStatus, { label: string; className: string }> = {
  paid: {
    label: "Оплачено",
    className: "bg-brand-success/15 text-brand-success border-brand-success/30",
  },
  pending: {
    label: "Ожидает оплаты",
    className: "bg-brand-mustard/15 text-brand-mustard border-brand-mustard/30",
  },
  processing: {
    label: "Обрабатывается",
    className: "bg-brand-lilac/30 text-brand-ink border-brand-lilac/50",
  },
  expired: {
    label: "Истекло",
    className: "bg-brand-muted/20 text-brand-muted border-brand-muted/30",
  },
  failed: {
    label: "Ошибка оплаты",
    className: "bg-brand-danger/15 text-brand-danger border-brand-danger/30",
  },
  cancelled: {
    label: "Отменено",
    className: "bg-brand-muted/20 text-brand-muted border-brand-muted/30",
  },
}

interface PaymentStatusBadgeProps {
  status: PaymentStatus
  className?: string
}

export function PaymentStatusBadge({ status, className }: PaymentStatusBadgeProps) {
  const { label, className: statusClass } = config[status]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-0.5",
        "text-[10px] font-semibold uppercase tracking-wider",
        statusClass,
        className
      )}
    >
      {label}
    </span>
  )
}
