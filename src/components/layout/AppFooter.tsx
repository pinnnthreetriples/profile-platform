import Link from "next/link"
import { PageShell } from "./PageShell"
import { Ticker } from "@/components/shared/Ticker"
import { footerNav, footerLegal } from "@/lib/navigation"
import { APP_NAME, TELEGRAM_HANDLE } from "@/lib/constants"

const FOOTER_TICKER = [
  "FASHION",
  "BEAUTY",
  "COMMERCIAL",
  "RUNWAY",
  "EDITORIAL",
  "PROMO",
  "LIFESTYLE",
]

export function AppFooter() {
  return (
    <footer className="border-t border-brand-line bg-brand-ink text-brand-paper">
      {/* Ticker strip */}
      <div className="border-b border-brand-paper/10 py-4">
        <Ticker items={FOOTER_TICKER} className="text-brand-paper/80" />
      </div>

      <PageShell>
        <div className="grid gap-8 py-12 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-3 md:col-span-2">
            <p className="display text-2xl tracking-tight">
              M<span className="text-brand-orange">.</span> Platform
            </p>
            <p className="max-w-md text-sm text-brand-paper/70">
              {APP_NAME} — платформа проверенных моделей для брендов, фотографов и
              продакшн-команд. Прозрачные платежи в USDT, прямой контакт через Telegram.
            </p>
            <a
              href={`https://t.me/${TELEGRAM_HANDLE.replace("@", "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-brand-paper/70 underline-offset-4 transition-colors hover:text-brand-paper hover:underline"
            >
              <span aria-hidden="true">✈</span>
              <span>Telegram {TELEGRAM_HANDLE}</span>
            </a>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-paper/50">
              Навигация
            </p>
            {footerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-brand-paper/70 transition-colors hover:text-brand-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Legal */}
          <nav className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-paper/50">
              Документы
            </p>
            {footerLegal.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-sm text-brand-paper/70 transition-colors hover:text-brand-paper"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t border-brand-paper/10 py-6 text-xs text-brand-paper/50 md:flex-row md:items-center md:justify-between">
          <span>
            © {new Date().getFullYear()} {APP_NAME}. Все права защищены.
          </span>
          <span className="uppercase tracking-widest">
            USDT · TRON · Bitcoin · Ethereum
          </span>
        </div>
      </PageShell>
    </footer>
  )
}
