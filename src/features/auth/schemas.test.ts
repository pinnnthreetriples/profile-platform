import { describe, it, expect } from "vitest"
import { loginSchema, registerSchema } from "./schemas"

const validEmail = "test@example.com"
const validPassword = "password123"
const invalidEmail = "invalid-email"
const shortPassword = "short"

describe("loginSchema", () => {
  it("should accept valid email and password", () => {
    const result = loginSchema.safeParse({ email: validEmail, password: validPassword })
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const result = loginSchema.safeParse({ email: invalidEmail, password: validPassword })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Invalid email")
    }
  })

  it("should reject short password", () => {
    const result = loginSchema.safeParse({ email: validEmail, password: shortPassword })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 8 characters")
    }
  })
})

describe("registerSchema", () => {
  it("should accept valid email and password", () => {
    const result = registerSchema.safeParse({
      email: validEmail,
      password: validPassword,
    })
    expect(result.success).toBe(true)
  })

  it("should reject invalid email", () => {
    const result = registerSchema.safeParse({
      email: invalidEmail,
      password: validPassword,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Invalid email")
    }
  })

  it("should reject short password", () => {
    const result = registerSchema.safeParse({
      email: validEmail,
      password: shortPassword,
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 8 characters")
    }
  })
})
