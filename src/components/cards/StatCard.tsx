import { cn } from "@/lib/utils"

interface StatCardProps {
  label: string
  value: string | number
  description?: string
  className?: string
}

export function StatCard({ label, value, description, className }: StatCardProps) {
  return (
    <div className={cn("rounded-lg bg-brand-paper p-5 shadow-soft", className)}>
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
        {label}
      </p>
      <p className="mt-1 text-3xl font-bold text-brand-ink">{value}</p>
      {description && <p className="mt-1 text-sm text-brand-muted">{description}</p>}
    </div>
  )
}
