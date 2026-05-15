"use client"

import { motion } from "motion/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface VerifiedStampProps {
  className?: string
  /** Diameter in pixels */
  size?: number
  /** Top label, repeats around the circle */
  label?: string
  /** Center icon, defaults to a star */
  children?: React.ReactNode
  /** Disable rotating animation */
  static?: boolean
}

/**
 * Circular "verified profile" stamp with text wrapping around the edge.
 * Implemented via SVG textPath; rotates slowly unless reduced motion is set.
 */
export function VerifiedStamp({
  className,
  size = 96,
  label = "VERIFIED · PROFILE · ",
  children,
  static: isStatic,
}: VerifiedStampProps) {
  const reduced = useReducedMotion()
  // Repeat label so it wraps fully around the circle
  const repeatedLabel = label.repeat(3)

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        animate={!reduced && !isStatic ? { rotate: 360 } : undefined}
        transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        className="absolute inset-0"
      >
        <defs>
          <path
            id="stampCircle"
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="text-brand-orange"
        />
        <circle
          cx="50"
          cy="50"
          r="33"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          className="text-brand-orange/70"
        />
        <text
          className="fill-brand-orange"
          style={{ fontSize: "8px", letterSpacing: "2px", fontWeight: 700 }}
        >
          <textPath href="#stampCircle" startOffset="0">
            {repeatedLabel}
          </textPath>
        </text>
      </motion.svg>

      {/* Center icon — counter-rotated isn't needed because SVG group below isn't animated */}
      <div className="absolute inset-0 flex items-center justify-center text-brand-orange">
        {children ?? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        )}
      </div>
    </div>
  )
}
