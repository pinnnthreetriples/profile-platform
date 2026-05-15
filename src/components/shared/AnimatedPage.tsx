"use client"

import { motion } from "motion/react"
import { pageTransition, pageTransitionConfig } from "@/lib/animations"

interface AnimatedPageProps {
  children: React.ReactNode
  className?: string
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransitionConfig}
      className={className}
    >
      {children}
    </motion.div>
  )
}
