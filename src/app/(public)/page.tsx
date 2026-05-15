import Link from "next/link"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { ModelCard } from "@/components/cards/ModelCard"
import { StatCard } from "@/components/cards/StatCard"
import { mockModels } from "@/lib/mock-data"

export default function HomePage() {
  return (
    <main className="bg-brand-bg">
      <section className="py-20 md:py-32">
        <PageShell>
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <SectionLabel>Платформа для моделей</SectionLabel>
            <h1 className="text-4xl font-bold leading-tight text-brand-ink md:text-6xl">
              Профессиональные модели.{" "}
              <span className="text-brand-orange">Прозрачные платежи.</span>
            </h1>
            <p className="text-lg text-brand-muted">
              Платформа для работы с профессиональными моделями с оплатой в USDT.
              Безопасно, быстро, без посредников.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="primaryOrange" size="lg" asChild>
                <Link href="/models">Смотреть моделей</Link>
              </Button>
              <Button variant="dark" size="lg" asChild>
                <Link href="/apply-model">Стать моделью</Link>
              </Button>
            </div>
          </div>
        </PageShell>
      </section>

      {/* Stats */}
      <section className="border-y border-brand-line bg-brand-paper py-12">
        <PageShell>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <StatCard label="Моделей" value="500+" description="Верифицированных" />
            <StatCard label="Городов" value="40+" description="По всему миру" />
            <StatCard label="Кампаний" value="1 200+" description="Успешно завершено" />
            <StatCard label="Выплачено" value="$2M+" description="Моделям платформы" />
          </div>
        </PageShell>
      </section>

      {/* Model preview */}
      <section className="py-16 md:py-24">
        <PageShell>
          <div className="mb-8 flex items-end justify-between">
            <div className="space-y-2">
              <SectionLabel>Каталог</SectionLabel>
              <h2 className="text-2xl font-bold text-brand-ink md:text-3xl">
                Топ модели
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/models">Все модели →</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {mockModels.slice(0, 4).map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </div>
        </PageShell>
      </section>
    </main>
  )
}
