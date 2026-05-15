import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModelStatusBadge } from "@/components/badges/ModelStatusBadge"
import { cn } from "@/lib/utils"
import type { ModelProfile } from "@/types/model"

interface ModelCardProps {
  model: ModelProfile
  className?: string
  onAction?: () => void
}

export function ModelCard({ model, className, onAction }: ModelCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-brand-paper shadow-card",
        "transition-all duration-200 hover:-translate-y-1 hover:shadow-hover",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-brand-line">
        {model.image ? (
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-brand-muted">
            <span className="text-4xl">👤</span>
          </div>
        )}
        {/* Status badge overlay */}
        <div className="absolute left-3 top-3">
          <ModelStatusBadge status={model.status} />
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 p-4">
        <div>
          <p className="font-semibold text-brand-ink">{model.name}</p>
          <p className="text-sm text-brand-muted">
            {model.city}, {model.country}
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-1">
          {model.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="rounded-pill border border-brand-line px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-brand-muted"
            >
              {cat}
            </span>
          ))}
        </div>

        <Button variant="outline" size="sm" className="w-full" onClick={onAction}>
          Подробнее
        </Button>
      </div>
    </div>
  )
}

/* Loading skeleton */
export function ModelCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("overflow-hidden rounded-lg bg-brand-paper shadow-card", className)}
    >
      <div className="aspect-[3/4] animate-pulse bg-brand-line" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-brand-line" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-brand-line" />
        <div className="h-8 animate-pulse rounded-pill bg-brand-line" />
      </div>
    </div>
  )
}
