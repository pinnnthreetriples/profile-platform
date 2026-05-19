"use client"

import { motion } from "motion/react"
import { fadeUp, fadeUpConfig } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  /** Delay before animation starts (seconds) */
  delay?: number
}

/**
 * Wraps a section with a fade-up reveal animation.
 * Use for content sections, not for page-level transitions.
 *
 * For page transitions, see components/motion/PageTransition.tsx.
 */
export function AnimatedSection({
  children,
  className,
  delay = 0,
}: AnimatedSectionProps) {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ ...fadeUpConfig, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
