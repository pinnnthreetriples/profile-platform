import { describe, it, expect } from "vitest"
import { profileUpdateSchema } from "./schemas"

describe("profileUpdateSchema", () => {
  describe("displayName", () => {
    it("accepts a valid display name", () => {
      const result = profileUpdateSchema.safeParse({ displayName: "Alice" })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.displayName).toBe("Alice")
    })

    it("accepts undefined displayName", () => {
      const result = profileUpdateSchema.safeParse({})
      expect(result.success).toBe(true)
    })

    it("normalizes empty string to null", () => {
      const result = profileUpdateSchema.safeParse({ displayName: "" })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.displayName).toBeNull()
    })

    it("normalizes whitespace-only string to null", () => {
      const result = profileUpdateSchema.safeParse({ displayName: "   " })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.displayName).toBeNull()
    })

    it("accepts null displayName", () => {
      const result = profileUpdateSchema.safeParse({ displayName: null })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.displayName).toBeNull()
    })

    it("rejects displayName longer than 80 characters", () => {
      const result = profileUpdateSchema.safeParse({
        displayName: "a".repeat(81),
      })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("80 characters")
      }
    })

    it("accepts displayName of exactly 80 characters", () => {
      const result = profileUpdateSchema.safeParse({
        displayName: "a".repeat(80),
      })
      expect(result.success).toBe(true)
    })
  })

  describe("bio", () => {
    it("accepts a valid bio", () => {
      const result = profileUpdateSchema.safeParse({ bio: "Hello world" })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.bio).toBe("Hello world")
    })

    it("normalizes empty string to null", () => {
      const result = profileUpdateSchema.safeParse({ bio: "" })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.bio).toBeNull()
    })

    it("normalizes whitespace-only string to null", () => {
      const result = profileUpdateSchema.safeParse({ bio: "  " })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.bio).toBeNull()
    })

    it("accepts null bio", () => {
      const result = profileUpdateSchema.safeParse({ bio: null })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.bio).toBeNull()
    })

    it("rejects bio longer than 500 characters", () => {
      const result = profileUpdateSchema.safeParse({ bio: "a".repeat(501) })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("500 characters")
      }
    })

    it("accepts bio of exactly 500 characters", () => {
      const result = profileUpdateSchema.safeParse({ bio: "a".repeat(500) })
      expect(result.success).toBe(true)
    })
  })

  describe("avatarUrl", () => {
    it("accepts a valid URL", () => {
      const result = profileUpdateSchema.safeParse({
        avatarUrl: "https://example.com/avatar.png",
      })
      expect(result.success).toBe(true)
      if (result.success)
        expect(result.data.avatarUrl).toBe("https://example.com/avatar.png")
    })

    it("normalizes empty string to null", () => {
      const result = profileUpdateSchema.safeParse({ avatarUrl: "" })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.avatarUrl).toBeNull()
    })

    it("accepts null avatarUrl", () => {
      const result = profileUpdateSchema.safeParse({ avatarUrl: null })
      expect(result.success).toBe(true)
      if (result.success) expect(result.data.avatarUrl).toBeNull()
    })

    it("rejects an invalid URL", () => {
      const result = profileUpdateSchema.safeParse({ avatarUrl: "not-a-url" })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain("valid URL")
      }
    })
  })

  describe("combined", () => {
    it("accepts all fields at once", () => {
      const result = profileUpdateSchema.safeParse({
        displayName: "Alice",
        bio: "Developer",
        avatarUrl: "https://example.com/avatar.png",
      })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.displayName).toBe("Alice")
        expect(result.data.bio).toBe("Developer")
        expect(result.data.avatarUrl).toBe("https://example.com/avatar.png")
      }
    })

    it("accepts empty object (all optional)", () => {
      const result = profileUpdateSchema.safeParse({})
      expect(result.success).toBe(true)
    })
  })
})
