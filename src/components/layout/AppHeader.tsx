"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { PageShell } from "./PageShell"
import { mainNav } from "@/lib/navigation"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { defaultEase } from "@/lib/animations"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  /** Pass user email from server component to show auth state */
  userEmail?: string | null
  /** Use transparent background (for hero pages with paper bg) */
  transparent?: boolean
}

export function AppHeader({ userEmail, transparent }: AppHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const reduced = useReducedMotion()

  const isLoggedIn = Boolean(userEmail)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 backdrop-blur-sm",
        transparent
          ? "border-transparent bg-brand-bg/70"
          : "border-b border-brand-line bg-brand-paper/90"
      )}
    >
      <PageShell>
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="display shrink-0 text-2xl tracking-tight text-brand-ink"
          >
            M<span className="text-brand-orange">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {mainNav.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href))
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-xs font-semibold uppercase tracking-widest transition-colors",
                    active ? "text-brand-ink" : "text-brand-muted hover:text-brand-ink"
                  )}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 bg-brand-orange"
                      transition={
                        reduced ? { duration: 0 } : { duration: 0.32, ease: defaultEase }
                      }
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Desktop CTA — session-aware */}
          <div className="hidden items-center gap-3 lg:flex">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="text-xs font-semibold uppercase tracking-widest text-brand-muted underline-offset-4 transition-colors hover:text-brand-ink hover:underline"
                  title={userEmail ?? undefined}
                >
                  Профиль
                </Link>
                <Button variant="dark" size="sm" asChild>
                  <Link href="/payment">Оплата →</Link>
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-xs font-semibold uppercase tracking-widest text-brand-ink underline-offset-4 transition-colors hover:underline"
                >
                  Войти / Регистрация
                </Link>
                <Button variant="dark" size="sm" asChild>
                  <Link href="/apply-model">Стать моделью →</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-md text-brand-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={mobileOpen}
          >
            <span className="sr-only">{mobileOpen ? "Закрыть" : "Меню"}</span>
            <div className="flex flex-col gap-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform duration-200",
                  mobileOpen && "translate-y-2 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-opacity duration-200",
                  mobileOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 bg-current transition-transform duration-200",
                  mobileOpen && "-translate-y-2 -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </PageShell>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-brand-line bg-brand-paper lg:hidden">
          <PageShell>
            <nav className="flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-widest transition-colors",
                    pathname === item.href
                      ? "bg-brand-ink text-brand-paper"
                      : "text-brand-ink hover:bg-brand-line/40"
                  )}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-brand-line pt-3">
                {isLoggedIn ? (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/profile" onClick={() => setMobileOpen(false)}>
                        Профиль
                      </Link>
                    </Button>
                    <Button variant="dark" size="sm" asChild>
                      <Link href="/payment" onClick={() => setMobileOpen(false)}>
                        Оплата →
                      </Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>
                        Войти / Регистрация
                      </Link>
                    </Button>
                    <Button variant="dark" size="sm" asChild>
                      <Link href="/apply-model" onClick={() => setMobileOpen(false)}>
                        Стать моделью →
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </nav>
          </PageShell>
        </div>
      )}
    </header>
  )
}
