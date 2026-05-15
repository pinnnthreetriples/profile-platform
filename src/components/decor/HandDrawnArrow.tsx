import { cn } from "@/lib/utils"

interface HandDrawnArrowProps {
  className?: string
  /** Arrow direction shape */
  variant?: "down-right" | "right" | "loop" | "down-left"
  /** Stroke color override; defaults to brand-ink */
  color?: string
  width?: number
  height?: number
}

const paths: Record<NonNullable<HandDrawnArrowProps["variant"]>, string> = {
  "down-right": "M5 8 C 25 6, 50 18, 70 30 S 95 60, 100 80 M88 70 L100 82 L86 86",
  right: "M5 30 C 30 20, 60 38, 95 28 M85 22 L96 28 L86 36",
  loop: "M10 20 C 30 6, 70 6, 90 26 S 90 70, 60 70 S 30 50, 50 35 M40 40 L50 33 L58 42",
  "down-left": "M95 8 C 75 6, 50 18, 30 32 S 8 60, 5 82 M16 72 L4 82 L18 86",
}

/**
 * SVG hand-drawn arrow used as a decorative pointer.
 * Stroke is dashed for sketch-feel; non-interactive (aria-hidden).
 */
export function HandDrawnArrow({
  className,
  variant = "down-right",
  color = "currentColor",
  width = 110,
  height = 90,
}: HandDrawnArrowProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 110 90"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-brand-ink/70", className)}
      aria-hidden="true"
    >
      <path d={paths[variant]} strokeDasharray="3 3" />
    </svg>
  )
}
