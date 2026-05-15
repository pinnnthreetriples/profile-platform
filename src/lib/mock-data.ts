import type { ModelProfile, InvestmentCampaign } from "@/types/model"
import type { UserProfile } from "@/types/user"
import type { PaymentNetwork } from "@/types/payment"

/* ---- Models ---- */

export const mockModels: ModelProfile[] = [
  {
    id: "model-1",
    name: "Anastasia K.",
    city: "Москва",
    country: "RU",
    categories: ["fashion", "editorial"],
    status: "top",
    image: "/mock/model-1.jpg",
    telegram: "@anastasia_k",
    bio: "Топ-модель с 8-летним опытом в fashion и editorial съёмках.",
    stats: { height: 178, age: 24, experience: 8, campaigns: 42 },
  },
  {
    id: "model-2",
    name: "Sofia M.",
    city: "Санкт-Петербург",
    country: "RU",
    categories: ["commercial", "lifestyle"],
    status: "verified",
    image: "/mock/model-2.jpg",
    bio: "Коммерческая модель, специализация — lifestyle и beauty.",
    stats: { height: 172, age: 22, experience: 4, campaigns: 18 },
  },
  {
    id: "model-3",
    name: "Valeria D.",
    city: "Дубай",
    country: "AE",
    categories: ["runway", "fashion"],
    status: "available",
    image: "/mock/model-3.jpg",
    bio: "Подиумная модель, работает в Дубае и Европе.",
    stats: { height: 180, age: 21, experience: 3, campaigns: 12 },
  },
  {
    id: "model-4",
    name: "Elena V.",
    city: "Милан",
    country: "IT",
    categories: ["editorial", "fashion"],
    status: "campaign",
    image: "/mock/model-4.jpg",
    bio: "Editorial модель, активная кампания по привлечению инвестиций.",
    stats: { height: 176, age: 26, experience: 6, campaigns: 31 },
  },
  {
    id: "model-5",
    name: "Mia R.",
    city: "Лондон",
    country: "GB",
    categories: ["fitness", "commercial"],
    status: "new",
    image: "/mock/model-5.jpg",
    bio: "Новое лицо платформы. Fitness и commercial направление.",
    stats: { height: 170, age: 20, experience: 1, campaigns: 3 },
  },
]

/* ---- Investment campaigns ---- */

export const mockCampaigns: InvestmentCampaign[] = [
  {
    id: "campaign-1",
    modelId: "model-4",
    modelName: "Elena V.",
    modelImage: "/mock/model-4.jpg",
    city: "Милан",
    goal: 50000,
    raised: 32500,
    progress: 65,
    minContribution: 100,
    status: "active",
    riskLevel: "medium",
    endsAt: "2026-07-01",
  },
  {
    id: "campaign-2",
    modelId: "model-1",
    modelName: "Anastasia K.",
    modelImage: "/mock/model-1.jpg",
    city: "Москва",
    goal: 30000,
    raised: 30000,
    progress: 100,
    minContribution: 50,
    status: "funded",
    riskLevel: "low",
  },
  {
    id: "campaign-3",
    modelId: "model-3",
    modelName: "Valeria D.",
    modelImage: "/mock/model-3.jpg",
    city: "Дубай",
    goal: 75000,
    raised: 8000,
    progress: 11,
    minContribution: 200,
    status: "active",
    riskLevel: "high",
    endsAt: "2026-08-15",
  },
]

/* ---- Payment networks ---- */

export const mockPaymentNetworks: PaymentNetwork[] = ["tron"]

/* ---- Profile mock ---- */

export const mockProfile: UserProfile = {
  id: "mock-user-id",
  displayName: "Anastasia K.",
  bio: "Топ-модель платформы. Работаю в fashion и editorial.",
  avatarUrl: "/mock/model-1.jpg",
  paymentStatus: "pending",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
}
