"use client"

import { motion } from "motion/react"
import type { ReactNode } from "react"

type FadeInProps = {
  children: ReactNode
  className?: string
}

export function FadeIn({ children, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
