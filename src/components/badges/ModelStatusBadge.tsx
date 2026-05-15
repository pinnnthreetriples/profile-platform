import { cn } from "@/lib/utils"
import type { ModelStatus } from "@/types/model"

const config: Record<ModelStatus, { label: string; className: string }> = {
  verified: {
    label: "Проверена",
    className: "bg-brand-success/15 text-brand-success border-brand-success/30",
  },
  available: {
    label: "Доступна",
    className: "bg-brand-lilac/30 text-brand-ink border-brand-lilac/50",
  },
  new: {
    label: "Новое лицо",
    className: "bg-brand-orange/15 text-brand-orange border-brand-orange/30",
  },
  top: {
    label: "Топ-модель",
    className: "bg-brand-mustard/20 text-brand-ink border-brand-mustard/40",
  },
  campaign: {
    label: "Активная кампания",
    className: "bg-brand-ink text-brand-paper border-brand-ink",
  },
  risk: {
    label: "Высокий риск",
    className: "bg-brand-danger/15 text-brand-danger border-brand-danger/30",
  },
}

interface ModelStatusBadgeProps {
  status: ModelStatus
  className?: string
}

export function ModelStatusBadge({ status, className }: ModelStatusBadgeProps) {
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
