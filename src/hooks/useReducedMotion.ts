"use client"

import { useReducedMotion as useMotionReducedMotion } from "motion/react"

/**
 * Returns true if the user has requested reduced motion.
 * Use this to conditionally disable or simplify animations.
 *
 * Motion.dev handles prefers-reduced-motion automatically for most cases,
 * but this hook is useful for:
 * - Stopping infinite animations (ticker, floating)
 * - Replacing complex transitions with simple opacity fades
 * - Disabling decorative elements entirely
 */
export function useReducedMotion(): boolean {
  return useMotionReducedMotion() ?? false
}
