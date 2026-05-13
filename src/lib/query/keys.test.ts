import { describe, it, expect } from "vitest"
import { queryKeys } from "./keys"

describe("queryKeys", () => {
  describe("auth", () => {
    it("should return session key", () => {
      expect(queryKeys.auth.session).toEqual(["auth", "session"])
    })
  })

  describe("profile", () => {
    it("should return current profile key", () => {
      expect(queryKeys.profile.current).toEqual(["profile", "current"])
    })

    it("should return profile by id key", () => {
      const userId = "user-123"
      expect(queryKeys.profile.byId(userId)).toEqual(["profile", userId])
    })

    it("should return different keys for different user ids", () => {
      const key1 = queryKeys.profile.byId("user-1")
      const key2 = queryKeys.profile.byId("user-2")
      expect(key1).not.toEqual(key2)
    })
  })

  describe("payment", () => {
    it("should return current payment key", () => {
      expect(queryKeys.payment.current).toEqual(["payment", "current"])
    })

    it("should return payment by id key", () => {
      const paymentId = "payment-123"
      expect(queryKeys.payment.byId(paymentId)).toEqual(["payment", paymentId])
    })

    it("should return payment status key", () => {
      const paymentId = "payment-123"
      expect(queryKeys.payment.status(paymentId)).toEqual([
        "payment",
        paymentId,
        "status",
      ])
    })

    it("should return different keys for different payment ids", () => {
      const key1 = queryKeys.payment.byId("payment-1")
      const key2 = queryKeys.payment.byId("payment-2")
      expect(key1).not.toEqual(key2)
    })
  })

  describe("key immutability", () => {
    it("should return readonly arrays (as const)", () => {
      const sessionKey = queryKeys.auth.session
      // TypeScript will enforce readonly at compile time
      expect(Array.isArray(sessionKey)).toBe(true)
    })
  })
})
