"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Thin progress bar at the top of the page during navigation.
 * CSS-driven — no Motion.dev dependency, no conflict with page transition.
 *
 * Sequence: 0 → 70% (fast) → 100% (on complete) → fade out
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname

      // Reset
      if (timerRef.current) clearTimeout(timerRef.current)
      setOpacity(1)
      setVisible(true)
      setWidth(0)

      // Start: jump to 70% quickly
      const raf = requestAnimationFrame(() => {
        setWidth(70)
      })

      // Complete: fill to 100%, then fade out
      timerRef.current = setTimeout(() => {
        setWidth(100)
        timerRef.current = setTimeout(() => {
          setOpacity(0)
          timerRef.current = setTimeout(() => {
            setVisible(false)
            setWidth(0)
            setOpacity(1)
          }, 300)
        }, 200)
      }, 350)

      return () => {
        cancelAnimationFrame(raf)
        if (timerRef.current) clearTimeout(timerRef.current)
      }
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      role="progressbar"
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-[2px] bg-brand-orange"
      style={{
        width: `${width}%`,
        opacity,
        transition:
          width === 0
            ? "none"
            : width === 70
              ? "width 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
              : "width 0.2s ease-out, opacity 0.3s ease-out",
      }}
    />
  )
}
