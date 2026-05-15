"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { ModelStatusBadge } from "@/components/badges/ModelStatusBadge"
import { ModelPlaceholder } from "@/components/decor/ModelPlaceholder"
import { cardHover, staggerItem, staggerItemConfig } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"
import type { ModelProfile } from "@/types/model"

interface ModelCardProps {
  model: ModelProfile
  className?: string
  /** Optional override for action link */
  href?: string
}

export function ModelCard({ model, className, href }: ModelCardProps) {
  const reduced = useReducedMotion()
  const target = href ?? `/models/${model.id}`

  return (
    <motion.article
      variants={staggerItem}
      transition={staggerItemConfig}
      className={cn(
        "group relative overflow-hidden rounded-md bg-brand-paper shadow-card",
        className
      )}
      animate="rest"
      whileHover={reduced ? undefined : "hover"}
      style={{ willChange: "transform" }}
    >
      <motion.div variants={reduced ? undefined : cardHover} className="h-full">
        <Link href={target} className="block focus-visible:outline-none">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-brand-line">
            {model.image ? (
              <Image
                src={model.image}
                alt={model.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <ModelPlaceholder
                seed={model.id}
                initials={model.initials}
                className="h-full w-full transition-transform duration-500 group-hover:scale-105"
              />
            )}
            <div className="absolute left-3 top-3">
              <ModelStatusBadge status={model.status} />
            </div>

            {/* Wishlist heart, decorative */}
            <span
              className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-brand-paper/95 text-brand-ink shadow-soft"
              aria-hidden="true"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </span>
          </div>

          {/* Info */}
          <div className="space-y-2 p-4">
            <div className="flex items-baseline justify-between gap-2">
              <p className="display text-lg leading-none text-brand-ink">
                {model.displayName ?? model.name}
              </p>
              <span className="text-brand-orange" aria-hidden="true">
                ✦
              </span>
            </div>
            <p className="text-xs uppercase tracking-wide text-brand-muted">
              {model.categories
                .slice(0, 3)
                .map((c) => c)
                .join(" · ")}
            </p>
            <p className="text-sm text-brand-muted">
              <svg
                className="mr-1 inline size-3 -translate-y-px"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
              </svg>
              {model.city}, {model.country}
            </p>
          </div>

          {/* Bottom-right corner arrow as CTA */}
          <span
            className="pointer-events-none absolute bottom-4 right-4 grid size-9 place-items-center rounded-full bg-brand-orange/10 text-brand-orange transition-colors group-hover:bg-brand-orange group-hover:text-white"
            aria-hidden="true"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M7 17 17 7" />
              <path d="M8 7h9v9" />
            </svg>
          </span>
        </Link>
      </motion.div>
    </motion.article>
  )
}

/* Loading skeleton */
export function ModelCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-md bg-brand-paper shadow-card", className)}
    >
      <div className="aspect-[3/4] animate-pulse bg-brand-line" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-brand-line" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-brand-line" />
      </div>
    </div>
  )
}
