"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const tabs = [
  { label: "Вход", href: "/login" },
  { label: "Регистрация", href: "/register" },
] as const

/** Tab navigation between login and register pages. */
export function AuthTabs() {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-6 border-b border-brand-line">
      {tabs.map((tab) => {
        const active = pathname.startsWith(tab.href)
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "relative pb-3 text-sm font-semibold uppercase tracking-widest transition-colors",
              active ? "text-brand-ink" : "text-brand-muted hover:text-brand-ink"
            )}
          >
            {tab.label}
            {active && (
              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-brand-orange" />
            )}
          </Link>
        )
      })}
    </div>
  )
}
