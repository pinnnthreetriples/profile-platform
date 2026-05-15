import Link from "next/link"
import {
  HandDrawnArrow,
  ModelPlaceholder,
  PaperCard,
  StickyNote,
  VerifiedStamp,
} from "@/components/decor"
import { APP_NAME } from "@/lib/constants"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-brand-bg lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* ============================================================
          LEFT — editorial side (hidden on mobile)
          ============================================================ */}
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-grain p-10 lg:flex xl:p-14">
        {/* Top: logo */}
        <Link
          href="/"
          className="display inline-flex w-fit items-center gap-1 text-2xl tracking-tight text-brand-ink"
        >
          M<span className="text-brand-orange">.</span>
        </Link>

        {/* Middle: hero copy */}
        <div className="relative max-w-md space-y-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
            <span className="mr-2 text-brand-orange" aria-hidden="true">
              ✦
            </span>
            Платформа профессиональных моделей
          </p>
          <h1 className="display text-[clamp(2.4rem,4.5vw,4rem)] text-brand-ink">
            Добро
            <br />
            пожаловать
            <br />
            в мир
            <br />
            профессиональных
            <br />
            моделей
          </h1>
          <p className="max-w-sm text-sm text-brand-muted md:text-base">
            Войдите в свой аккаунт, чтобы получать доступ к проверенным моделям, управлять
            профилем и бронированиями.
          </p>

          {/* Bullet list */}
          <ul className="space-y-3 pt-2">
            {[
              {
                icon: "✦",
                title: "Проверенные профили",
                text: "Каждая модель проходит модерацию для вашего спокойствия.",
              },
              {
                icon: "→",
                title: "Удобный booking",
                text: "Быстрый контакт и бронирование через Telegram.",
              },
              {
                icon: "•",
                title: "Безопасность данных",
                text: "Мы заботимся о конфиденциальности и защите ваших данных.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-3">
                <span
                  className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-brand-ink text-brand-paper"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-brand-ink">
                    {item.title}
                  </p>
                  <p className="text-xs text-brand-muted">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom: footer */}
        <p className="text-xs text-brand-muted">
          © {new Date().getFullYear()} {APP_NAME} ·{" "}
          <Link href="/privacy" className="underline-offset-4 hover:underline">
            Политика конфиденциальности
          </Link>
        </p>

        {/* Decorative collage layer */}
        <div
          className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 xl:block"
          aria-hidden="true"
        >
          <PaperCard rotate={-5} tape className="absolute right-12 top-24 w-[220px]">
            <ModelPlaceholder
              seed="auth-1"
              initials="LS"
              className="aspect-[3/4] w-full"
            />
          </PaperCard>

          <PaperCard rotate={4} pin className="absolute right-32 top-72 w-[180px]">
            <ModelPlaceholder
              seed="auth-2"
              initials="RV"
              className="aspect-[3/4] w-full"
            />
          </PaperCard>

          <div className="absolute left-2 top-44">
            <VerifiedStamp size={86} />
          </div>

          <div className="absolute bottom-32 right-20">
            <StickyNote tone="mustard" rotate={-4}>
              Профессионализм
              <br />в каждой детали
            </StickyNote>
          </div>

          <HandDrawnArrow
            variant="down-right"
            className="absolute right-[40%] top-[42%] text-brand-ink/40"
          />
        </div>
      </aside>

      {/* ============================================================
          RIGHT — form side
          ============================================================ */}
      <main className="relative flex flex-col bg-brand-paper">
        {/* Mobile-only logo top bar */}
        <header className="flex items-center justify-between border-b border-brand-line px-6 py-5 lg:hidden">
          <Link href="/" className="display text-xl tracking-tight text-brand-ink">
            M<span className="text-brand-orange">.</span>
          </Link>
          <span className="rounded-pill border border-brand-line px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-muted">
            🌐 RU
          </span>
        </header>

        <div className="flex flex-1 items-center justify-center px-6 py-10 md:py-16">
          <div className="w-full max-w-[440px]">{children}</div>
        </div>
      </main>
    </div>
  )
}
