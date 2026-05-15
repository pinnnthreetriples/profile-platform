import { cn } from "@/lib/utils"

interface StickyNoteProps {
  children: React.ReactNode
  /** Background color tone */
  tone?: "lilac" | "mustard" | "paper"
  /** Visual rotation in degrees */
  rotate?: number
  className?: string
}

const toneClass: Record<NonNullable<StickyNoteProps["tone"]>, string> = {
  lilac: "bg-brand-lilac text-brand-ink",
  mustard: "bg-brand-mustard text-brand-ink",
  paper: "bg-brand-paper text-brand-ink",
}

/**
 * Decorative sticky-note element with handwritten-style content.
 * Pure CSS, no images. Honours prefers-reduced-motion via .rotate-tilt-* utilities.
 */
export function StickyNote({
  children,
  tone = "lilac",
  rotate = -3,
  className,
}: StickyNoteProps) {
  return (
    <div
      className={cn(
        "relative inline-block px-4 py-3 shadow-soft",
        toneClass[tone],
        className
      )}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      {/* Paper tape on top */}
      <span
        className="absolute -top-2 left-1/2 h-3 w-12 -translate-x-1/2 bg-brand-ink/10"
        style={{ transform: "translateX(-50%) rotate(-4deg)" }}
      />
      <div className="script text-sm leading-snug md:text-base">{children}</div>
    </div>
  )
}
