export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
  },
  profile: {
    current: ["profile", "current"] as const,
    byId: (userId: string) => ["profile", userId] as const,
  },
  payment: {
    current: ["payment", "current"] as const,
    byId: (paymentId: string) => ["payment", paymentId] as const,
    status: (paymentId: string) => ["payment", paymentId, "status"] as const,
  },
}
