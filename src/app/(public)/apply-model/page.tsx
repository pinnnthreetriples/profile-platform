import Link from "next/link"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { HandDrawnArrow, StickyNote, VerifiedStamp } from "@/components/decor"

export const metadata = {
  title: "Стать моделью — Models Platform",
  description:
    "Создайте профессиональный профиль на платформе Models. Анкета и форма заявки скоро будут доступны.",
}

export default function ApplyModelPage() {
  return (
    <main className="bg-grain pb-20 pt-12 md:pt-16">
      <PageShell>
        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start">
          <div className="space-y-6">
            <SectionLabel>
              <span className="mr-2 text-brand-orange" aria-hidden="true">
                ✦
              </span>
              Стань частью платформы
            </SectionLabel>

            <h1 className="display text-[clamp(2.6rem,7vw,5.5rem)] text-brand-ink">
              Стань
              <br />
              моделью
            </h1>

            <p className="script text-2xl text-brand-orange">
              Создай профессиональный профиль
            </p>

            <p className="max-w-md text-brand-muted">
              Заполните анкету, загрузите портфолио и пройдите модерацию. После проверки
              ваш профиль появится в каталоге и будет доступен клиентам.
            </p>

            <div className="space-y-4 rounded-md border border-dashed border-brand-line bg-brand-paper p-6 shadow-soft">
              <p className="display text-2xl text-brand-ink">Анкета скоро</p>
              <p className="text-sm text-brand-muted">
                Полная форма заявки с загрузкой портфолио, валидацией и отправкой на
                модерацию готовится в следующем релизе. Пока что вы можете связаться с
                нами напрямую через Telegram, чтобы оставить заявку.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="primaryOrange" size="lg" asChild>
                  <Link href="/">На главную</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/models">Каталог моделей</Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute -left-8 top-4">
              <StickyNote tone="lilac" rotate={-5}>
                Твой путь
                <br />
                начинается здесь
              </StickyNote>
            </div>

            <div className="rounded-md border border-brand-line bg-brand-paper p-8 shadow-card">
              <div className="space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-brand-muted">
                    Что будет в анкете
                  </p>
                  <ul className="mt-3 space-y-3 text-sm text-brand-ink">
                    {[
                      "Личные данные и контакты",
                      "Параметры (рост, размеры, цвет волос/глаз)",
                      "Опыт работы и направления",
                      "Портфолио и фото",
                      "Telegram для связи",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 size-2 rounded-full bg-brand-orange"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-brand-line pt-4">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-xs uppercase tracking-widest text-brand-muted">
                      После отправки
                    </p>
                    <HandDrawnArrow
                      variant="right"
                      className="text-brand-ink/40"
                      width={48}
                      height={20}
                    />
                  </div>
                  <p className="mt-2 text-sm text-brand-ink">
                    Уведомление в Telegram о статусе модерации.
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-4">
              <VerifiedStamp size={96} />
            </div>
          </div>
        </div>
      </PageShell>
    </main>
  )
}
