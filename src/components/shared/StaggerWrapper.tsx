"use client"

import { motion } from "motion/react"
import { staggerContainer } from "@/lib/animations"

interface StaggerWrapperProps {
  children: React.ReactNode
  className?: string
}

/**
 * Client component wrapper that applies stagger animation to children.
 * Use in Server Components to add stagger without making the page client-only.
 *
 * Children don't need to be motion components — the stagger container
 * animates the wrapper itself with a fade-up entrance.
 */
export function StaggerWrapper({ children, className }: StaggerWrapperProps) {
  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  )
}
