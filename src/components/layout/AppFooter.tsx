import Link from "next/link"
import { PageShell } from "./PageShell"
import { footerNav, footerLegal } from "@/lib/navigation"
import { APP_NAME, TELEGRAM_HANDLE } from "@/lib/constants"

export function AppFooter() {
  return (
    <footer className="border-t border-brand-line bg-brand-ink text-brand-paper">
      <PageShell>
        <div className="grid gap-8 py-12 md:grid-cols-3">
          {/* Brand */}
          <div className="space-y-3">
            <p className="text-lg font-bold tracking-tight">
              Models<span className="text-brand-orange">.</span>
            </p>
            <p className="max-w-xs text-sm text-brand-muted">
              {APP_NAME} — платформа для профессиональных моделей с прозрачными платежами
              в USDT.
            </p>
            <a
              href={`https://t.me/${TELEGRAM_HANDLE.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-muted transition-colors hover:text-brand-paper"
            >
              <span>Telegram</span>
              <span>{TELEGRAM_HANDLE}</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Навигация
            </p>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-brand-muted transition-colors hover:text-brand-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Legal */}
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">
              Документы
            </p>
            {footerLegal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-brand-muted transition-colors hover:text-brand-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-brand-paper/10 py-6 text-center text-xs text-brand-muted">
          © {new Date().getFullYear()} {APP_NAME}. Все права защищены.
        </div>
      </PageShell>
    </footer>
  )
}
