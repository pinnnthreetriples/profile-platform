"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"
import { pageTransition, pageTransitionConfig } from "@/lib/animations"

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Wraps page content with an enter animation.
 * Used in template.tsx — animates only the content, not header/footer.
 *
 * Values come from lib/animations.ts — single source of truth.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.main
      variants={pageTransition}
      initial="initial"
      animate="animate"
      transition={pageTransitionConfig}
    >
      {children}
    </motion.main>
  )
}
