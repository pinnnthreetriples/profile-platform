import type { PaymentStatus } from "@/types/database"

export type Profile = {
  id: string
  displayName: string | null
  bio: string | null
  avatarUrl: string | null
  paymentStatus: PaymentStatus
  createdAt: string
  updatedAt: string
}

export type ProfileUpdate = {
  displayName?: string | null
  bio?: string | null
  avatarUrl?: string | null
}

export type ProfileInput = {
  displayName?: string | null
  bio?: string | null
  avatarUrl?: string | null
}

export type ProfileActionResult = { ok: true } | { ok: false; message: string }
