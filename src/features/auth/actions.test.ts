import { describe, it, expect, vi, beforeEach } from "vitest"
import { loginAction, registerAction, logoutAction } from "./actions"
import { loginSchema, registerSchema } from "./schemas"

// Mock dependencies
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

// Helper function to test auth action validation
async function testAuthActionValidation(
  action: typeof loginAction | typeof registerAction,
  email: string,
  password: string,
  expectedError: string
) {
  const formData = new FormData()
  formData.append("email", email)
  formData.append("password", password)

  const result = await action(null, formData)

  expect(result.ok).toBe(false)
  if (!result.ok) {
    expect(result.message).toContain(expectedError)
  }
}

describe("loginAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return error for invalid email", async () => {
    await testAuthActionValidation(loginAction, "invalid-email", "password123", "Invalid")
  })

  it("should return error for short password", async () => {
    await testAuthActionValidation(loginAction, "test@example.com", "short", "at least 8")
  })

  it("should validate input with loginSchema", () => {
    const result = loginSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    })
    expect(result.success).toBe(true)
  })
})

describe("registerAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return error for invalid email", async () => {
    await testAuthActionValidation(
      registerAction,
      "invalid-email",
      "password123",
      "Invalid"
    )
  })

  it("should return error for short password", async () => {
    await testAuthActionValidation(
      registerAction,
      "test@example.com",
      "short",
      "at least 8"
    )
  })

  it("should validate input with registerSchema", () => {
    const result = registerSchema.safeParse({
      email: "test@example.com",
      password: "password123",
    })
    expect(result.success).toBe(true)
  })
})

describe("logoutAction", () => {
  it("should be a function", () => {
    expect(typeof logoutAction).toBe("function")
  })
})
