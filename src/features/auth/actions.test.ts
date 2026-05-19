import { describe, it, expect, vi, beforeEach } from "vitest"
import { loginAction, registerAction, logoutAction } from "./actions"
import { loginSchema, registerSchema } from "./schemas"
import type { SupabaseClient } from "@supabase/supabase-js"

// jscpd:ignore-start — vi.mock must be inline (Vitest hoisting), duplication with profile tests is unavoidable
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))
// jscpd:ignore-end

// Import mocked modules
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

// Test helpers
function createMockSupabaseAuth(
  method: "signInWithPassword" | "signUp" | "signOut",
  error: { message: string } | null = null
) {
  return {
    auth: {
      [method]: vi.fn().mockResolvedValue({ error }),
    },
  } as unknown as SupabaseClient
}

function createMockSignUpSupabase(data: { session: unknown }) {
  return {
    auth: {
      signUp: vi.fn().mockResolvedValue({
        data: { user: { id: "user-123" }, session: data.session },
        error: null,
      }),
    },
  } as unknown as SupabaseClient
}

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

async function testAuthActionError(
  action: typeof loginAction | typeof registerAction,
  method: "signInWithPassword" | "signUp",
  errorMessage: string
) {
  const mockSupabase = createMockSupabaseAuth(method, { message: errorMessage })
  vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

  const formData = new FormData()
  formData.append("email", "test@example.com")
  formData.append("password", "password123")

  const result = await action(null, formData)

  expect(result.ok).toBe(false)
  if (!result.ok) {
    expect(result.message).toBe(errorMessage)
  }
  expect(mockSupabase.auth[method]).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  })
}

async function testAuthActionSuccess(
  action: typeof loginAction | typeof registerAction,
  method: "signInWithPassword" | "signUp",
  redirectUrl: string
) {
  const mockSupabase = createMockSupabaseAuth(method, null)
  vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

  const formData = new FormData()
  formData.append("email", "test@example.com")
  formData.append("password", "password123")

  await expect(action(null, formData)).rejects.toThrow(`REDIRECT:${redirectUrl}`)

  expect(mockSupabase.auth[method]).toHaveBeenCalledWith({
    email: "test@example.com",
    password: "password123",
  })
  expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  expect(redirect).toHaveBeenCalledWith(redirectUrl)
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

  it("should return error when Supabase auth fails", async () => {
    await testAuthActionError(loginAction, "signInWithPassword", "Invalid credentials")
  })

  it("should call redirect and revalidatePath on successful login", async () => {
    await testAuthActionSuccess(loginAction, "signInWithPassword", "/profile")
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

  it("should return error when Supabase auth fails", async () => {
    await testAuthActionError(registerAction, "signUp", "User already exists")
  })

  it("should return needsConfirmation when signUp returns no session (email confirmation required)", async () => {
    const mockSupabase = createMockSignUpSupabase({ session: null })
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

    const formData = new FormData()
    formData.append("email", "test@example.com")
    formData.append("password", "password123")

    const result = await registerAction(null, formData)

    expect(result.ok).toBe(true)
    if (result.ok && "needsConfirmation" in result) {
      expect(result.needsConfirmation).toBe(true)
      expect(result.email).toBe("test@example.com")
    }
    expect(redirect).not.toHaveBeenCalled()
  })

  it("should redirect to /profile when signUp returns a session (email confirmation disabled)", async () => {
    const mockSupabase = createMockSignUpSupabase({ session: { access_token: "tok" } })
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

    const formData = new FormData()
    formData.append("email", "test@example.com")
    formData.append("password", "password123")

    await expect(registerAction(null, formData)).rejects.toThrow("REDIRECT:/profile")
    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
    expect(redirect).toHaveBeenCalledWith("/profile")
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
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should call supabase.auth.signOut", async () => {
    const mockSupabase = createMockSupabaseAuth("signOut", null)
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

    await expect(logoutAction()).rejects.toThrow("REDIRECT:/login")

    expect(mockSupabase.auth.signOut).toHaveBeenCalled()
  })

  it("should call revalidatePath", async () => {
    const mockSupabase = createMockSupabaseAuth("signOut", null)
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

    await expect(logoutAction()).rejects.toThrow("REDIRECT:/login")

    expect(revalidatePath).toHaveBeenCalledWith("/", "layout")
  })

  it("should call redirect to /login", async () => {
    const mockSupabase = createMockSupabaseAuth("signOut", null)
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabase)

    await expect(logoutAction()).rejects.toThrow("REDIRECT:/login")

    expect(redirect).toHaveBeenCalledWith("/login")
  })
})
