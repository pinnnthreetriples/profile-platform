import { cn } from "@/lib/utils"

interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border border-brand-line",
        "px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-muted",
        className
      )}
    >
      {children}
    </span>
  )
}
