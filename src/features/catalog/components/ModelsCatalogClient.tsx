"use client"

import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import { motion } from "motion/react"
import { PageShell } from "@/components/layout/PageShell"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { ModelCard, ModelCardSkeleton } from "@/components/cards/ModelCard"
import { HandDrawnArrow, StickyNote, VerifiedStamp } from "@/components/decor"
import { mockModels } from "@/lib/mock-data"
import { staggerContainer, fadeUp, fadeUpConfig } from "@/lib/animations"
import { ModelsFilters } from "./ModelsFilters"

const FEATURE_BLOCKS = [
  {
    num: "01",
    title: "Проверенные профили",
    text: "Каждая модель проходит модерацию и проверку.",
  },
  {
    num: "02",
    title: "Прямой контакт",
    text: "Свяжитесь с моделью напрямую через Telegram для быстрого общения.",
  },
  {
    num: "03",
    title: "Профессиональные портфолио",
    text: "Высококачественные фото и детальная информация о модели.",
  },
  {
    num: "04",
    title: "Быстрое бронирование",
    text: "Оставляйте заявки на бронирование и управляйте проектами удобно.",
  },
  {
    num: "05",
    title: "Крипто платежи",
    text: "Безопасные и гибкие платежи, в том числе с помощью криптовалют.",
  },
]

export function ModelsCatalogClient() {
  const searchParams = useSearchParams()

  const category = searchParams.get("category") ?? "all"
  const location = searchParams.get("location") ?? "all"
  const status = searchParams.get("status") ?? "all"

  const filtered = useMemo(() => {
    return mockModels.filter((m) => {
      if (category !== "all" && !m.categories.includes(category as never)) return false
      if (location !== "all" && m.country !== location) return false
      if (status !== "all" && m.status !== status) return false
      return true
    })
  }, [category, location, status])

  return (
    <main className="bg-grain pb-20 pt-8 md:pt-12">
      <PageShell>
        {/* ============================================================
            Page header — editorial heading
            ============================================================ */}
        <motion.header
          className="relative mb-10 grid gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:gap-10"
          variants={fadeUp}
          initial="initial"
          animate="animate"
          transition={fadeUpConfig}
        >
          <div className="space-y-4">
            <SectionLabel>
              <span className="mr-2 text-brand-orange" aria-hidden="true">
                ✦
              </span>
              Подборка моделей
            </SectionLabel>
            <h1 className="display text-[clamp(2.6rem,7vw,5.8rem)] text-brand-ink">
              Избранные модели
            </h1>
            <div className="flex items-end gap-3">
              <p className="script max-w-md text-xl text-brand-orange md:text-2xl">
                Топ профессиональные лица для ваших проектов
              </p>
              <HandDrawnArrow
                variant="right"
                className="hidden -translate-y-2 text-brand-ink/50 md:block"
                width={70}
                height={30}
              />
            </div>
          </div>

          <div className="relative flex items-start gap-4 md:justify-end">
            <p className="max-w-sm text-sm text-brand-muted md:text-base">
              Изучите нашу подборку проверенных моделей. Каждый профиль проходит
              модерацию, чтобы гарантировать профессионализм и высокое качество.
            </p>
            <div className="hidden md:block">
              <VerifiedStamp size={108} label="VERIFIED · PROFILE · " />
            </div>
          </div>
        </motion.header>

        {/* ============================================================
            Filters bar
            ============================================================ */}
        <ModelsFilters />

        {/* ============================================================
            Cards grid
            ============================================================ */}
        <div className="mt-8">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <motion.div
              key={`${category}-${location}-${status}`}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {filtered.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </motion.div>
          )}
        </div>

        {/* ============================================================
            Feature blocks
            ============================================================ */}
        <section className="mt-20 border-t border-brand-line pt-12">
          <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {FEATURE_BLOCKS.map((b) => (
              <li
                key={b.num}
                className="space-y-2 rounded-md border border-brand-line bg-brand-paper p-5 shadow-soft"
              >
                <p className="text-xs font-semibold text-brand-orange">{b.num}</p>
                <p className="display text-base text-brand-ink">{b.title}</p>
                <p className="text-sm text-brand-muted">{b.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </PageShell>
    </main>
  )
}

function EmptyState() {
  return (
    <div className="relative grid place-items-center rounded-md border border-dashed border-brand-line bg-brand-paper py-16 text-center">
      <div className="space-y-3">
        <p className="display text-2xl text-brand-ink">Никого не нашли</p>
        <p className="mx-auto max-w-sm text-sm text-brand-muted">
          Попробуйте изменить фильтры или сбросить их, чтобы увидеть полный каталог
          моделей.
        </p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {/* Skeletons hint */}
        {Array.from({ length: 4 }).map((_, i) => (
          <ModelCardSkeleton key={i} />
        ))}
      </div>
      <StickyNote tone="lilac" rotate={-4} className="absolute -top-6 right-6">
        Свяжитесь с нами,
        <br />
        мы найдём модель
      </StickyNote>
    </div>
  )
}
