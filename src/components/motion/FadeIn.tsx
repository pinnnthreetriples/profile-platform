"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { fadeIn, fadeInConfig, fadeUp, fadeUpConfig } from "@/lib/animations"

interface FadeInProps {
  children: ReactNode
  className?: string
  /** Use fade-up (y offset) instead of plain fade */
  up?: boolean
  /** Delay in seconds */
  delay?: number
}

/**
 * Simple fade-in wrapper for individual elements.
 * Uses presets from lib/animations.ts — no hardcoded values.
 *
 * For section-level reveals, use AnimatedSection.
 * For page transitions, see components/motion/PageTransition.tsx.
 */
export function FadeIn({ children, className, up = false, delay = 0 }: FadeInProps) {
  const variants = up ? fadeUp : fadeIn
  const config = up ? fadeUpConfig : fadeInConfig

  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{ ...config, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
