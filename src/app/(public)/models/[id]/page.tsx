import { notFound } from "next/navigation"
import Link from "next/link"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { ModelStatusBadge } from "@/components/badges/ModelStatusBadge"
import { ModelPlaceholder, PaperCard, VerifiedStamp } from "@/components/decor"
import { mockModels } from "@/lib/mock-data"

interface ModelDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return mockModels.map((m) => ({ id: m.id }))
}

export async function generateMetadata({ params }: ModelDetailPageProps) {
  const { id } = await params
  const model = mockModels.find((m) => m.id === id)
  if (!model) return { title: "Модель не найдена" }
  return {
    title: `${model.displayName ?? model.name} — Models Platform`,
    description: model.bio ?? `Профиль модели ${model.name}`,
  }
}

/**
 * Stage 5 PR1 placeholder: simple read-only profile page.
 * Full editorial layout with portfolio gallery and booking form arrives in PR2.
 */
export default async function ModelDetailPage({ params }: ModelDetailPageProps) {
  const { id } = await params
  const model = mockModels.find((m) => m.id === id)
  if (!model) notFound()

  return (
    <main className="bg-grain pb-20 pt-8 md:pt-12">
      <PageShell>
        <Link
          href="/models"
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-muted hover:text-brand-ink"
        >
          ← Назад к каталогу
        </Link>

        <div className="grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-12">
          {/* Left — bio */}
          <div className="space-y-5">
            <ModelStatusBadge status={model.status} />
            <h1 className="display text-[clamp(2.6rem,7vw,5.5rem)] text-brand-ink">
              {model.name}
            </h1>
            <p className="text-brand-muted">
              📍 {model.city}, {model.country}
            </p>
            <div className="flex flex-wrap gap-2">
              {model.categories.map((c) => (
                <span
                  key={c}
                  className="rounded-pill border border-brand-line bg-brand-paper px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-brand-ink"
                >
                  {c}
                </span>
              ))}
            </div>
            {model.bio && <p className="max-w-md text-brand-muted">{model.bio}</p>}

            <div className="flex flex-wrap gap-3 pt-2">
              <Button variant="primaryOrange" size="lg">
                Написать в Telegram ✈
              </Button>
              <Button variant="outline" size="lg">
                Запросить booking ✦
              </Button>
            </div>
          </div>

          {/* Right — collage */}
          <div className="relative">
            <PaperCard rotate={1.5} tape className="w-full">
              <ModelPlaceholder
                seed={model.id}
                initials={model.initials}
                className="aspect-[3/4] w-full"
              />
            </PaperCard>
            <div className="absolute -bottom-4 -right-4 hidden md:block">
              <VerifiedStamp size={96} />
            </div>
          </div>
        </div>

        <p className="mt-12 rounded-md border border-dashed border-brand-line bg-brand-paper p-5 text-sm text-brand-muted">
          Полный редизайн карточки модели с портфолио, кнопками связи и формой
          бронирования появится в следующем релизе.
        </p>
      </PageShell>
    </main>
  )
}
