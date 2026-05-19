import { cn } from "@/lib/utils"

interface DecorativeStarProps {
  className?: string
  size?: number
}

export function DecorativeStar({ className, size = 24 }: DecorativeStarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("text-brand-orange", className)}
      aria-hidden="true"
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}
