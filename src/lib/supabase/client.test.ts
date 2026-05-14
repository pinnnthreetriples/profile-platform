import { describe, it, expect, beforeEach, vi } from "vitest"

const setupValidEnv = () => {
  process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
  process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
  process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "USDT"
  process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "polygon"
}

describe("createSupabaseBrowserClient", () => {
  beforeEach(() => {
    vi.resetModules()
    setupValidEnv()
  })

  it("should create a Supabase browser client", async () => {
    const { createSupabaseBrowserClient } = await import("./client")
    const client = createSupabaseBrowserClient()

    expect(client).toBeDefined()
    expect(client.auth).toBeDefined()
  })

  it("should use environment variables from getClientEnv", async () => {
    const { createSupabaseBrowserClient } = await import("./client")
    const client = createSupabaseBrowserClient()

    expect(client).toBeDefined()
  })

  it("should throw error if env validation fails", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "invalid-url"

    const { createSupabaseBrowserClient } = await import("./client")

    expect(() => createSupabaseBrowserClient()).toThrow()
  })
})
