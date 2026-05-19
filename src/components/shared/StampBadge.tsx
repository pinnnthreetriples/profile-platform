import { cn } from "@/lib/utils"

interface StampBadgeProps {
  children: React.ReactNode
  className?: string
}

/** Circular stamp-style decorative badge */
export function StampBadge({ children, className }: StampBadgeProps) {
  return (
    <div
      className={cn(
        "flex size-20 items-center justify-center rounded-full",
        "border-2 border-brand-orange text-center",
        "text-[10px] font-bold uppercase leading-tight tracking-widest text-brand-orange",
        className
      )}
    >
      {children}
    </div>
  )
}
