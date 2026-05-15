"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"

/**
 * Thin progress bar at the top of the page during navigation.
 * Purely CSS-driven — no external dependencies.
 */
export function NavigationProgress() {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const [width, setWidth] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // New navigation started
      prevPathname.current = pathname
      setVisible(true)
      setWidth(0)

      // Animate to near-complete
      requestAnimationFrame(() => {
        setWidth(85)
      })

      // Complete after a short delay
      timerRef.current = setTimeout(() => {
        setWidth(100)
        setTimeout(() => setVisible(false), 300)
      }, 400)
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [pathname])

  if (!visible) return null

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-0.5 bg-brand-orange transition-all duration-300 ease-out"
      style={{ width: `${width}%` }}
      aria-hidden="true"
    />
  )
}
