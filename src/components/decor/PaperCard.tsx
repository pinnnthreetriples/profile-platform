import { cn } from "@/lib/utils"

interface PaperCardProps {
  children: React.ReactNode
  className?: string
  /** Visual rotation in degrees */
  rotate?: number
  /** Show top tape strip */
  tape?: boolean
  /** Show pin in top-right corner */
  pin?: boolean
}

/**
 * Polaroid/paper card frame for collage layouts.
 * Combines a soft drop shadow, cream paper background, and optional decorative tape/pin.
 */
export function PaperCard({
  children,
  className,
  rotate = 0,
  tape,
  pin,
}: PaperCardProps) {
  return (
    <div
      className={cn(
        "relative bg-brand-paper p-3 shadow-card",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-grain-paper before:opacity-30",
        className
      )}
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    >
      {tape && (
        <span
          className="absolute -top-3 left-1/2 z-10 h-5 w-20 -translate-x-1/2 bg-brand-mustard/70 shadow-soft"
          style={{ transform: "translateX(-50%) rotate(-3deg)" }}
          aria-hidden="true"
        />
      )}
      {pin && (
        <span
          className="absolute -right-1 -top-1 z-10 size-3 rounded-full bg-brand-orange shadow"
          aria-hidden="true"
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
