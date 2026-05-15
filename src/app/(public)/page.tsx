"use client"

import Link from "next/link"
import { motion } from "motion/react"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/shared/SectionLabel"
import { AnimatedSection } from "@/components/shared/AnimatedSection"
import { Ticker } from "@/components/shared/Ticker"
import { ModelCard } from "@/components/cards/ModelCard"
import { StatCard } from "@/components/cards/StatCard"
import { mockModels } from "@/lib/mock-data"
import {
  staggerContainer,
  staggerItem,
  staggerItemConfig,
  fadeUp,
  fadeUpConfig,
} from "@/lib/animations"

const TICKER_ITEMS = [
  "Fashion",
  "Beauty",
  "Commercial",
  "Runway",
  "Editorial",
  "Promo",
  "Lifestyle",
]

export default function HomePage() {
  return (
    <main className="bg-brand-bg">
      {/* Hero */}
      <section className="py-20 md:py-32">
        <PageShell>
          <motion.div
            className="mx-auto max-w-3xl space-y-6 text-center"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div variants={staggerItem} transition={staggerItemConfig}>
              <SectionLabel>Платформа для моделей</SectionLabel>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              transition={staggerItemConfig}
              className="text-4xl font-bold leading-tight text-brand-ink md:text-6xl"
            >
              Профессиональные модели.{" "}
              <span className="text-brand-orange">Прозрачные платежи.</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              transition={staggerItemConfig}
              className="text-lg text-brand-muted"
            >
              Платформа для работы с профессиональными моделями с оплатой в USDT.
              Безопасно, быстро, без посредников.
            </motion.p>

            <motion.div
              variants={staggerItem}
              transition={staggerItemConfig}
              className="flex flex-wrap justify-center gap-3"
            >
              <Button variant="primaryOrange" size="lg" asChild>
                <Link href="/models">Смотреть моделей</Link>
              </Button>
              <Button variant="dark" size="lg" asChild>
                <Link href="/apply-model">Стать моделью</Link>
              </Button>
            </motion.div>
          </motion.div>
        </PageShell>
      </section>

      {/* Ticker */}
      <div className="border-y border-brand-line py-4">
        <Ticker items={TICKER_ITEMS} />
      </div>

      {/* Stats */}
      <AnimatedSection>
        <section className="bg-brand-paper py-12">
          <PageShell>
            <motion.div
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-60px" }}
            >
              {[
                { label: "Моделей", value: "500+", description: "Верифицированных" },
                { label: "Городов", value: "40+", description: "По всему миру" },
                { label: "Кампаний", value: "1 200+", description: "Успешно завершено" },
                { label: "Выплачено", value: "$2M+", description: "Моделям платформы" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={staggerItem}
                  transition={staggerItemConfig}
                >
                  <StatCard
                    label={stat.label}
                    value={stat.value}
                    description={stat.description}
                  />
                </motion.div>
              ))}
            </motion.div>
          </PageShell>
        </section>
      </AnimatedSection>

      {/* Model preview */}
      <section className="py-16 md:py-24">
        <PageShell>
          <motion.div
            className="mb-8 flex items-end justify-between"
            variants={fadeUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            transition={fadeUpConfig}
          >
            <div className="space-y-2">
              <SectionLabel>Каталог</SectionLabel>
              <h2 className="text-2xl font-bold text-brand-ink md:text-3xl">
                Топ модели
              </h2>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/models">Все модели →</Link>
            </Button>
          </motion.div>

          {/* Stagger grid */}
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
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
    </main>
  )
}
