export type ModelCategory =
  | "fashion"
  | "beauty"
  | "commercial"
  | "editorial"
  | "runway"
  | "fitness"
  | "lifestyle"
  | "promo"

export type ModelStatus = "verified" | "available" | "new" | "top" | "campaign" | "risk"

export type ModelStats = {
  height?: number
  age?: number
  experience?: number // years
  campaigns?: number
}

export type ModelProfile = {
  id: string
  /** Latin display name like "ALINA K." used in editorial layouts */
  name: string
  /** Short Cyrillic display name used as secondary label, e.g. "Алина К." */
  displayName?: string
  city: string
  country: string
  /** Initials for placeholder avatar */
  initials: string
  categories: ModelCategory[]
  status: ModelStatus
  /** Optional photo URL — when absent, ModelPlaceholder is used */
  image?: string
  telegram?: string
  bio?: string
  stats?: ModelStats
}

export type InvestmentCampaignStatus = "active" | "funded" | "closed" | "upcoming"

export type InvestmentCampaign = {
  id: string
  modelId: string
  modelName: string
  modelImage?: string
  city: string
  goal: number
  raised: number
  progress: number // 0–100
  minContribution: number
  status: InvestmentCampaignStatus
  riskLevel: "low" | "medium" | "high"
  endsAt?: string
}
