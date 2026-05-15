"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { Ticker } from "@/components/shared/Ticker"
import { ModelCard } from "@/components/cards/ModelCard"
import {
  DottedPath,
  HandDrawnArrow,
  ModelPlaceholder,
  PaperCard,
  StickyNote,
  VerifiedStamp,
} from "@/components/decor"
import { mockModels } from "@/lib/mock-data"
import {
  staggerContainer,
  staggerItem,
  staggerItemConfig,
  fadeUp,
  fadeUpConfig,
} from "@/lib/animations"
import { useReducedMotion } from "@/hooks/useReducedMotion"

const TICKER_ITEMS = [
  "FASHION",
  "BEAUTY",
  "COMMERCIAL",
  "RUNWAY",
  "EDITORIAL",
  "PROMO",
  "LIFESTYLE",
]

const HERO_STATS = [
  { value: "500+", label: "проверенных моделей" },
  { value: "24ч", label: "средний отклик" },
  { value: "98%", label: "довольных клиентов" },
]

const CATEGORY_PILLS = [
  { number: "01", label: "FASHION" },
  { number: "02", label: "BEAUTY" },
  { number: "03", label: "COMMERCIAL" },
  { number: "04", label: "RUNWAY" },
  { number: "05", label: "EDITORIAL" },
  { number: "06", label: "PROMO" },
]

export default function HomePage() {
  const reduced = useReducedMotion()

  return (
    <main className="bg-grain">
      {/* ============================================================
          HERO — collage
          ============================================================ */}
      <section className="relative overflow-hidden pb-12 pt-10 md:pb-20 md:pt-16">
        <PageShell>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-12">
            {/* Left: copy */}
            <motion.div
              className="relative space-y-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem} transition={staggerItemConfig}>
                <SectionLabel>
                  <span className="mr-2 text-brand-orange" aria-hidden="true">
                    ✦
                  </span>
                  Проверенные профили моделей
                </SectionLabel>
              </motion.div>

              <motion.h1
                variants={staggerItem}
                transition={staggerItemConfig}
                className="display text-[clamp(2.6rem,7vw,5.5rem)] text-brand-ink"
              >
                Профессиональные
                <br />
                модели для
                <br />
                ваших проектов
              </motion.h1>

              <motion.p
                variants={staggerItem}
                transition={staggerItemConfig}
                className="script text-2xl text-brand-orange md:text-3xl"
              >
                fashion. beauty. commercial. editorial.
              </motion.p>

              <motion.p
                variants={staggerItem}
                transition={staggerItemConfig}
                className="max-w-md text-base text-brand-muted md:text-lg"
              >
                Платформа проверенных моделей для брендов, фотографов и продакшн-команд.
                Актуальные портфолио, быстрый контакт и удобный букинг через Telegram.
              </motion.p>

              <motion.div
                variants={staggerItem}
                transition={staggerItemConfig}
                className="flex flex-wrap items-center gap-3"
              >
                <Button variant="primaryOrange" size="lg" asChild>
                  <Link href="/models">Смотреть моделей →</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/apply-model">
                    <span className="mr-1 text-brand-orange" aria-hidden="true">
                      ✦
                    </span>
                    Стать моделью
                  </Link>
                </Button>
              </motion.div>

              {/* Avatar group + stats */}
              <motion.div
                variants={staggerItem}
                transition={staggerItemConfig}
                className="flex flex-wrap items-center gap-6 pt-4"
              >
                <div className="flex -space-x-2">
                  {mockModels.slice(0, 4).map((m) => (
                    <span
                      key={m.id}
                      className="grid size-9 place-items-center overflow-hidden rounded-full border-2 border-brand-paper bg-brand-line"
                    >
                      <ModelPlaceholder
                        seed={m.id}
                        initials={m.initials}
                        shape="square"
                        className="h-full w-full"
                      />
                    </span>
                  ))}
                  <span className="grid size-9 place-items-center rounded-full border-2 border-brand-paper bg-brand-ink text-xs font-semibold text-brand-paper">
                    +
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  {HERO_STATS.map((s) => (
                    <div key={s.label}>
                      <p className="display text-2xl text-brand-ink md:text-3xl">
                        {s.value}
                      </p>
                      <p className="text-xs uppercase tracking-widest text-brand-muted">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right: collage */}
            <motion.div
              className="relative mx-auto w-full max-w-[560px]"
              variants={fadeUp}
              initial="initial"
              animate="animate"
              transition={{ ...fadeUpConfig, delay: 0.15 }}
            >
              {/* Decorative dotted path */}
              <DottedPath
                variant="loop"
                className="absolute -left-6 top-1/3 hidden text-brand-ink/30 md:block"
                width={120}
                height={80}
              />

              {/* Sticky note: "Доступны на этой неделе" */}
              <div className="absolute -left-2 -top-2 z-20 hidden md:block">
                <StickyNote tone="lilac" rotate={-6}>
                  Доступны
                  <br />
                  на этой неделе
                  <br />
                  <span className="text-brand-ink/60">↗</span>
                </StickyNote>
              </div>

              {/* Mustard "ticket" */}
              <div className="absolute right-0 top-2 z-20 hidden -rotate-6 bg-brand-mustard p-3 shadow-soft md:block">
                <p className="text-[10px] uppercase tracking-widest text-brand-ink/70">
                  Модель
                </p>
                <p className="display text-3xl text-brand-ink">024</p>
              </div>

              {/* Main hero photo card */}
              <PaperCard
                rotate={reduced ? 0 : 1.5}
                tape
                className="relative z-10 mx-auto w-[88%]"
              >
                <ModelPlaceholder
                  seed="hero-main"
                  initials="AK"
                  className="aspect-[4/5] w-full"
                />
              </PaperCard>

              {/* Profile mini-card */}
              <PaperCard
                rotate={reduced ? 0 : -3}
                pin
                className="absolute -bottom-6 right-0 z-20 hidden w-[58%] md:block"
              >
                <div className="space-y-3 px-1 py-2">
                  <div>
                    <p className="display text-xl text-brand-ink">АЛИНА К.</p>
                    <p className="text-[10px] uppercase tracking-widest text-brand-muted">
                      FASHION · BEAUTY · COMMERCIAL
                    </p>
                  </div>
                  <p className="text-xs text-brand-muted">📍 Париж, Франция</p>
                  <div className="border-t border-brand-line pt-2">
                    <Link
                      href="/models/model-1"
                      className="inline-flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-widest text-brand-ink"
                    >
                      Смотреть профиль <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </PaperCard>

              {/* Verified stamp */}
              <div className="absolute -right-4 bottom-32 z-30 hidden md:block">
                <VerifiedStamp size={104} label="VERIFIED · PROFILE · " />
              </div>

              {/* Hand-drawn arrow */}
              <HandDrawnArrow
                variant="loop"
                className="absolute -right-10 -top-6 hidden text-brand-ink/40 md:block"
              />
            </motion.div>
          </div>
        </PageShell>

        {/* Decorative star bg */}
        <span
          className="pointer-events-none absolute right-12 top-12 hidden text-brand-orange/15 md:block"
          aria-hidden="true"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </span>
      </section>

      {/* ============================================================
          CATEGORY ROW
          ============================================================ */}
      <section className="border-y border-brand-line bg-brand-ink text-brand-paper">
        <PageShell>
          <div className="grid grid-cols-2 gap-6 py-8 md:grid-cols-7 md:gap-2 md:py-10">
            <div className="col-span-2 flex items-center gap-3 md:col-span-1">
              <span className="display text-base text-brand-paper/70">FIND YOUR</span>
              <HandDrawnArrow
                variant="right"
                color="currentColor"
                className="h-6 text-brand-orange"
                width={48}
                height={24}
              />
            </div>
            {CATEGORY_PILLS.map((cat) => (
              <div key={cat.label} className="space-y-1">
                <p className="text-xs text-brand-paper/50">{cat.number}</p>
                <p className="display text-lg leading-none md:text-xl">
                  <span className="mr-1 text-brand-orange" aria-hidden="true">
                    ✦
                  </span>
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </PageShell>
      </section>

      {/* ============================================================
          MODEL PREVIEW
          ============================================================ */}
      <section className="py-16 md:py-24">
        <PageShell>
          <motion.div
            className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={fadeUpConfig}
          >
            <div className="space-y-3">
              <SectionLabel>
                <span className="mr-2 text-brand-orange" aria-hidden="true">
                  ✦
                </span>
                Подборка моделей
              </SectionLabel>
              <h2 className="display text-4xl text-brand-ink md:text-6xl">
                Избранные модели
              </h2>
              <p className="script text-lg text-brand-orange md:text-xl">
                Топ профессиональные лица для ваших проектов
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link href="/models">Все модели →</Link>
            </Button>
          </motion.div>

          {/* Stagger grid */}
          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-60px" }}
          >
            {mockModels.slice(0, 4).map((model) => (
              <ModelCard key={model.id} model={model} />
            ))}
          </motion.div>
        </PageShell>
      </section>

      {/* ============================================================
          TICKER STRIP (between sections)
          ============================================================ */}
      <div className="border-y border-brand-line bg-brand-bg py-4">
        <Ticker items={TICKER_ITEMS} />
      </div>

      {/* ============================================================
          PAYMENT TRUST STRIP
          ============================================================ */}
      <section className="bg-brand-paper py-16 md:py-20">
        <PageShell>
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <SectionLabel>Безопасные платежи</SectionLabel>
              <h2 className="display text-3xl text-brand-ink md:text-5xl">
                Оплата удобно
                <br />и безопасно
              </h2>
              <p className="max-w-md text-brand-muted">
                Прозрачные платежи через USDT и другие криптовалюты. Без посредников, без
                скрытых комиссий, с прямым контактом через Telegram.
              </p>
              <Button variant="dark" size="lg" asChild>
                <Link href="/payment">Узнать про оплату →</Link>
              </Button>
            </div>

            <ul className="grid grid-cols-2 gap-3">
              {[
                { sym: "₮", label: "USDT TRC20" },
                { sym: "Ξ", label: "Ethereum" },
                { sym: "₿", label: "Bitcoin" },
                { sym: "✦", label: "BNB" },
              ].map((c) => (
                <li
                  key={c.label}
                  className="flex items-center gap-3 rounded-md border border-brand-line bg-brand-bg p-4 shadow-soft"
                >
                  <span
                    className="grid size-10 place-items-center rounded-full bg-brand-ink text-brand-paper"
                    aria-hidden="true"
                  >
                    {c.sym}
                  </span>
                  <span className="text-sm font-semibold text-brand-ink">{c.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </PageShell>
      </section>
    </main>
  )
}
