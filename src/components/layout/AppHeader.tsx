"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PageShell } from "./PageShell"
import { mainNav } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface AppHeaderProps {
  /** Pass user email from server component to show auth state */
  userEmail?: string | null
}

export function AppHeader({ userEmail }: AppHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isLoggedIn = Boolean(userEmail)

  return (
    <header className="sticky top-0 z-50 border-b border-brand-line bg-brand-paper/90 backdrop-blur-sm">
      <PageShell>
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="shrink-0 text-lg font-bold tracking-tight text-brand-ink"
          >
            Models<span className="text-brand-orange">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-pill px-3 py-1.5 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-brand-ink text-brand-paper"
                    : "text-brand-muted hover:text-brand-ink"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA — session-aware */}
          <div className="hidden items-center gap-2 lg:flex">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <span className="max-w-[120px] truncate text-xs text-brand-muted">
                      {userEmail}
                    </span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/profile">Профиль</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Войти / Регистрация</Link>
                </Button>
                <Button variant="dark" size="sm" asChild>
                  <Link href="/apply-model">Стать моделью →</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <button
            className="flex size-9 items-center justify-center rounded-md text-brand-ink lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
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
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
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
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/profile" onClick={() => setMobileOpen(false)}>
                      Профиль
                    </Link>
                  </Button>
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
