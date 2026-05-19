export type UserProfile = {
  id: string
  displayName: string | null
  bio: string | null
  avatarUrl: string | null
  paymentStatus: "pending" | "paid" | "failed" | "expired" | "cancelled"
  createdAt: string
  updatedAt: string
}
