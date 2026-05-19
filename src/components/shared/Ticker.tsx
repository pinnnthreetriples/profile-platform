"use client"

import { useRef } from "react"
import { motion, useAnimationControls } from "motion/react"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"

interface TickerProps {
  items: string[]
  className?: string
  /** Seconds for one full loop */
  speed?: number
  separator?: string
}

/**
 * Infinite horizontal ticker.
 * - Pauses on hover
 * - Stops (static row) when prefers-reduced-motion is enabled
 * - Animation config from lib/animations.ts (speed is configurable)
 */
export function Ticker({ items, className, speed = 32, separator = "·" }: TickerProps) {
  const reducedMotion = useReducedMotion()
  const controls = useAnimationControls()
  const isRunning = useRef(true)

  // Double items so the loop is seamless
  const doubled = [...items, ...items]

  function startAnimation() {
    void controls.start({
      x: ["0%", "-50%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: speed,
          ease: "linear",
        },
      },
    })
  }

  function handleMouseEnter() {
    if (!reducedMotion) {
      isRunning.current = false
      void controls.stop()
    }
  }

  function handleMouseLeave() {
    if (!reducedMotion) {
      isRunning.current = true
      startAnimation()
    }
  }

  // Reduced motion: static row
  if (reducedMotion) {
    return (
      <div className={cn("flex flex-wrap gap-4 overflow-hidden", className)}>
        {items.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold uppercase tracking-widest text-brand-muted"
          >
            {item}
            {i < items.length - 1 && (
              <span className="ml-4 text-brand-line">{separator}</span>
            )}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn("overflow-hidden", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={controls}
        initial={{ x: "0%" }}
        onViewportEnter={startAnimation}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-sm font-semibold uppercase tracking-widest text-brand-muted"
          >
            {item}
            <span className="ml-8 text-brand-line">{separator}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
