"use client"

import Image from "next/image"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { cardHover, staggerItem, staggerItemConfig } from "@/lib/animations"
import { useReducedMotion } from "@/hooks/useReducedMotion"
import { cn } from "@/lib/utils"
import type { InvestmentCampaign } from "@/types/model"

interface InvestmentCampaignCardProps {
  campaign: InvestmentCampaign
  className?: string
  onDetails?: () => void
}

const riskColors = {
  low: "text-brand-success",
  medium: "text-brand-mustard",
  high: "text-brand-danger",
} as const

const riskLabels = {
  low: "Низкий риск",
  medium: "Средний риск",
  high: "Высокий риск",
} as const

export function InvestmentCampaignCard({
  campaign,
  className,
  onDetails,
}: InvestmentCampaignCardProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={staggerItem}
      transition={staggerItemConfig}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: "-40px" }}
      animate="rest"
      whileHover={reducedMotion ? undefined : "hover"}
      className={cn("overflow-hidden rounded-lg bg-brand-paper shadow-card", className)}
      style={{ willChange: "transform" }}
    >
      <motion.div variants={reducedMotion ? undefined : cardHover} className="h-full">
        {/* Image */}
        <div className="relative aspect-video overflow-hidden bg-brand-line">
          {campaign.modelImage ? (
            <Image
              src={campaign.modelImage}
              alt={campaign.modelName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-muted">
              <span className="text-4xl">📸</span>
            </div>
          )}
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-brand-ink">{campaign.modelName}</p>
              <p className="text-sm text-brand-muted">{campaign.city}</p>
            </div>
            <span className={cn("text-xs font-semibold", riskColors[campaign.riskLevel])}>
              {riskLabels[campaign.riskLevel]}
            </span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-brand-ink">
                ${campaign.raised.toLocaleString()}
              </span>
              <span className="text-brand-muted">
                из ${campaign.goal.toLocaleString()}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-pill bg-brand-line">
              <div
                className="h-full rounded-pill bg-brand-orange transition-all"
                style={{ width: `${Math.min(campaign.progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-brand-muted">{campaign.progress}% собрано</p>
          </div>

          <p className="text-xs text-brand-muted">
            Мин. взнос:{" "}
            <span className="font-semibold text-brand-ink">
              ${campaign.minContribution}
            </span>
          </p>

          <Button
            variant="primaryOrange"
            size="sm"
            className="w-full"
            onClick={onDetails}
          >
            Подробнее
          </Button>
        </div>
      </motion.div>
    </motion.div>
  )
}
