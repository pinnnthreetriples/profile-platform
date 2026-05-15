"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface TickerProps {
  items: string[]
  className?: string
  speed?: number
}

export function Ticker({ items, className, speed = 30 }: TickerProps) {
  const doubled = [...items, ...items]

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: { repeat: Infinity, repeatType: "loop", duration: speed, ease: "linear" },
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold uppercase tracking-widest text-brand-muted"
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
