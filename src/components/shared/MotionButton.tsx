"use client"

import { motion } from "motion/react"
import { Button, type ButtonProps } from "@/components/ui/button"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { defaultEase } from "@/lib/animations"

interface MotionButtonProps extends ButtonProps {
  /** Show arrow that shifts right on hover */
  withArrow?: boolean
}

/**
 * Button with Motion.dev hover/tap animations.
 * Wraps the shadcn Button without breaking its API.
 *
 * - whileHover: scale 1.02
 * - whileTap: scale 0.97
 * - Arrow shifts right 4px on hover (via variant propagation)
 * - Disabled/loading: no hover animation
 * - Reduced motion: no scale/arrow animation
 *
 * Arrow animation works via variant propagation:
 * parent sets initial="rest" + whileHover="hover",
 * child motion.span responds to the same variant names.
 */
export function MotionButton({
  children,
  withArrow,
  disabled,
  loading,
  ...props
}: MotionButtonProps) {
  const reducedMotion = useReducedMotion()
  const isDisabled = disabled ?? loading

  const transition = { duration: 0.18, ease: defaultEase }

  return (
    <motion.div
      className="inline-flex"
      // Variant propagation: children with matching variant names respond automatically
      initial="rest"
      whileHover={!isDisabled && !reducedMotion ? "hover" : undefined}
      whileTap={!isDisabled && !reducedMotion ? "tap" : undefined}
      variants={{
        rest: { scale: 1 },
        hover: { scale: 1.02, transition },
        tap: { scale: 0.97, transition: { duration: 0.1 } },
      }}
    >
      <Button disabled={disabled} loading={loading} {...props}>
        {withArrow ? (
          <span className="inline-flex items-center gap-1.5">
            {children}
            {/* Arrow responds to parent's "hover" variant via propagation */}
            <motion.span
              className="inline-block"
              variants={{
                rest: { x: 0 },
                hover: { x: 4, transition },
              }}
            >
              →
            </motion.span>
          </span>
        ) : (
          children
        )}
      </Button>
    </motion.div>
  )
}
