export type ModelCategory =
  | "fashion"
  | "commercial"
  | "editorial"
  | "runway"
  | "fitness"
  | "lifestyle"

export type ModelStatus = "verified" | "available" | "new" | "top" | "campaign" | "risk"

export type ModelStats = {
  height?: number
  age?: number
  experience?: number // years
  campaigns?: number
}

export type ModelProfile = {
  id: string
  name: string
  city: string
  country: string
  categories: ModelCategory[]
  status: ModelStatus
  image: string
  telegram?: string
  bio?: string
  stats?: ModelStats
}

export type InvestmentCampaignStatus = "active" | "funded" | "closed" | "upcoming"

export type InvestmentCampaign = {
  id: string
  modelId: string
  modelName: string
  modelImage: string
  city: string
  goal: number
  raised: number
  progress: number // 0–100
  minContribution: number
  status: InvestmentCampaignStatus
  riskLevel: "low" | "medium" | "high"
  endsAt?: string
}
