import { cn } from "@/lib/utils"

interface TornTapeProps {
  className?: string
  tone?: "lilac" | "mustard" | "paper"
  rotate?: number
  children?: React.ReactNode
}

const toneClass: Record<NonNullable<TornTapeProps["tone"]>, string> = {
  lilac: "bg-brand-lilac/80",
  mustard: "bg-brand-mustard/80",
  paper: "bg-brand-paper/80",
}

/** Masking-tape strip used to attach photos and notes. */
export function TornTape({
  className,
  tone = "mustard",
  rotate = -8,
  children,
}: TornTapeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-ink/70",
        "shadow-soft",
        toneClass[tone],
        className
      )}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath:
          "polygon(2% 12%, 8% 0, 16% 18%, 28% 4%, 40% 16%, 54% 0, 66% 18%, 78% 4%, 90% 16%, 100% 0, 98% 92%, 90% 100%, 78% 86%, 66% 100%, 54% 86%, 40% 100%, 28% 86%, 16% 100%, 8% 86%, 0 100%)",
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  )
}
