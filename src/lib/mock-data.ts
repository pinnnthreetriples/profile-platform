import type { ModelProfile, InvestmentCampaign } from "@/types/model"
import type { UserProfile } from "@/types/user"
import type { PaymentNetwork } from "@/types/payment"

/* ---- Models ---- */

export const mockModels: ModelProfile[] = [
  {
    id: "model-1",
    name: "ALINA K.",
    displayName: "Алина К.",
    city: "Париж",
    country: "Франция",
    initials: "AK",
    categories: ["fashion", "beauty", "commercial"],
    status: "verified",
    telegram: "@alina_k",
    bio: "Профессиональная модель с опытом работы в fashion, beauty и commercial съёмках. Сотрудничаю с брендами, фотографами и продакшн-командами по всему миру.",
    stats: { height: 178, age: 24, experience: 6, campaigns: 42 },
  },
  {
    id: "model-2",
    name: "YUNA L.",
    displayName: "Юна Л.",
    city: "Сеул",
    country: "Южная Корея",
    initials: "YL",
    categories: ["editorial", "fashion", "commercial"],
    status: "new",
    bio: "Editorial-направление и fashion-съёмки. Работа с азиатскими и европейскими брендами.",
    stats: { height: 174, age: 22, experience: 3, campaigns: 18 },
  },
  {
    id: "model-3",
    name: "SOFIA R.",
    displayName: "София Р.",
    city: "Милан",
    country: "Италия",
    initials: "SR",
    categories: ["runway", "fashion", "beauty"],
    status: "available",
    bio: "Подиумная модель Milan Fashion Week. Открыта к коммерческим съёмкам и beauty-проектам.",
    stats: { height: 180, age: 23, experience: 4, campaigns: 24 },
  },
  {
    id: "model-4",
    name: "NINA M.",
    displayName: "Нина М.",
    city: "Берлин",
    country: "Германия",
    initials: "NM",
    categories: ["beauty", "commercial", "lifestyle"],
    status: "top",
    bio: "Beauty и lifestyle модель. Регулярные кампании для индустрии красоты.",
    stats: { height: 172, age: 26, experience: 7, campaigns: 38 },
  },
  {
    id: "model-5",
    name: "ELENA P.",
    displayName: "Елена П.",
    city: "Нью-Йорк",
    country: "США",
    initials: "EP",
    categories: ["fashion", "editorial", "promo"],
    status: "verified",
    bio: "Fashion-модель и кампании для глобальных брендов.",
    stats: { height: 176, age: 25, experience: 5, campaigns: 31 },
  },
  {
    id: "model-6",
    name: "MIA R.",
    displayName: "Мия Р.",
    city: "Лондон",
    country: "Великобритания",
    initials: "MR",
    categories: ["fitness", "commercial", "lifestyle"],
    status: "campaign",
    bio: "Fitness и commercial направление. Активная инвестиционная кампания.",
    stats: { height: 170, age: 21, experience: 2, campaigns: 9 },
  },
  {
    id: "model-7",
    name: "VALERIA D.",
    displayName: "Валерия Д.",
    city: "Дубай",
    country: "ОАЭ",
    initials: "VD",
    categories: ["runway", "fashion", "promo"],
    status: "available",
    bio: "Подиумная и promo модель, работает в Дубае и Европе.",
    stats: { height: 181, age: 22, experience: 3, campaigns: 14 },
  },
  {
    id: "model-8",
    name: "ANASTASIA K.",
    displayName: "Анастасия К.",
    city: "Москва",
    country: "Россия",
    initials: "AK",
    categories: ["fashion", "editorial"],
    status: "top",
    bio: "Топ-модель с 8-летним опытом в fashion и editorial.",
    stats: { height: 178, age: 27, experience: 8, campaigns: 52 },
  },
]

/* ---- Investment campaigns ---- */

export const mockCampaigns: InvestmentCampaign[] = [
  {
    id: "campaign-1",
    modelId: "model-6",
    modelName: "Mia R.",
    city: "Лондон",
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
    modelName: "Alina K.",
    city: "Париж",
    goal: 30000,
    raised: 30000,
    progress: 100,
    minContribution: 50,
    status: "funded",
    riskLevel: "low",
  },
  {
    id: "campaign-3",
    modelId: "model-7",
    modelName: "Valeria D.",
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
  avatarUrl: null,
  paymentStatus: "pending",
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
}

/* ---- Filters ---- */

export const modelCategoryOptions = [
  { value: "all", label: "Все категории" },
  { value: "fashion", label: "Fashion" },
  { value: "beauty", label: "Beauty" },
  { value: "commercial", label: "Commercial" },
  { value: "runway", label: "Runway" },
  { value: "editorial", label: "Editorial" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "fitness", label: "Fitness" },
  { value: "promo", label: "Promo" },
] as const

export const modelLocationOptions = [
  { value: "all", label: "Все локации" },
  { value: "Россия", label: "Россия" },
  { value: "Франция", label: "Франция" },
  { value: "Италия", label: "Италия" },
  { value: "Германия", label: "Германия" },
  { value: "Великобритания", label: "Великобритания" },
  { value: "США", label: "США" },
  { value: "ОАЭ", label: "ОАЭ" },
  { value: "Южная Корея", label: "Южная Корея" },
] as const

export const modelStatusOptions = [
  { value: "all", label: "Любой статус" },
  { value: "verified", label: "Проверена" },
  { value: "available", label: "Доступна" },
  { value: "new", label: "Новое лицо" },
  { value: "top", label: "Топ-модель" },
  { value: "campaign", label: "Активная кампания" },
] as const
