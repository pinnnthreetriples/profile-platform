import { cn } from "@/lib/utils"

interface DottedPathProps {
  className?: string
  /** Path direction shape */
  variant?: "wave" | "diagonal" | "loop"
  width?: number
  height?: number
}

const paths: Record<NonNullable<DottedPathProps["variant"]>, string> = {
  wave: "M5 35 C 25 5, 50 65, 75 35 S 110 35, 130 30",
  diagonal: "M5 5 L 130 60",
  loop: "M5 30 C 25 5, 60 5, 75 25 S 100 60, 130 35",
}

/**
 * Dotted decorative path that connects sections visually.
 * Pure SVG, no animations, aria-hidden.
 */
export function DottedPath({
  className,
  variant = "wave",
  width = 140,
  height = 70,
}: DottedPathProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 140 70"
      fill="none"
      className={cn("text-brand-ink/40", className)}
      aria-hidden="true"
    >
      <path
        d={paths[variant]}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="1 5"
      />
    </svg>
  )
}
