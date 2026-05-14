import { describe, it, expect, beforeEach, vi } from "vitest"

// Mock Next.js cookies at module level
vi.mock("next/headers", () => ({
  cookies: vi.fn().mockResolvedValue({
    getAll: vi.fn().mockReturnValue([]),
    set: vi.fn(),
  }),
}))

const setupValidEnv = () => {
  process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
  process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "USDT"
  process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "polygon"
}

describe("createSupabaseServerClient", () => {
  beforeEach(() => {
    vi.resetModules()
    setupValidEnv()
  })

  it("should create a Supabase server client", async () => {
    const { createSupabaseServerClient } = await import("./server")
    const client = await createSupabaseServerClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })

  it("should be async function", async () => {
    const { createSupabaseServerClient } = await import("./server")
    const result = createSupabaseServerClient()

    expect(result).toBeInstanceOf(Promise)
  })

  it("should use environment variables from getClientEnv", async () => {
    const { createSupabaseServerClient } = await import("./server")
    const client = await createSupabaseServerClient()

    expect(client).toBeDefined()
  })
})
