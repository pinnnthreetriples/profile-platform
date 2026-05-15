import { describe, it, expect, beforeEach, vi } from "vitest"

describe("getClientEnv", () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it("should validate and return client env variables", async () => {
    // Set valid env vars
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
    process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "USDT"
    process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "tron"

    const { getClientEnv } = await import("./client")
    const env = getClientEnv()

    expect(env.NEXT_PUBLIC_APP_URL).toBe("http://localhost:3000")
    expect(env.NEXT_PUBLIC_SUPABASE_URL).toBe("https://example.supabase.co")
    expect(env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBe("test-anon-key")
    expect(env.NEXT_PUBLIC_PAYMENT_CURRENCY).toBe("USDT")
    expect(env.NEXT_PUBLIC_PAYMENT_NETWORK).toBe("tron")
  })

  it("should throw error for invalid URL", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "not-a-url"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
    process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "USDT"
    process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "tron"

    const { getClientEnv } = await import("./client")

    expect(() => getClientEnv()).toThrow("Invalid client environment variables")
  })

  it("should throw error for invalid payment currency", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
    process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "BTC"
    process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "tron"

    const { getClientEnv } = await import("./client")

    expect(() => getClientEnv()).toThrow("Invalid client environment variables")
  })

  it("should cache validated env", async () => {
    process.env.NEXT_PUBLIC_APP_URL = "http://localhost:3000"
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co"
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon-key"
    process.env.NEXT_PUBLIC_PAYMENT_CURRENCY = "USDT"
    process.env.NEXT_PUBLIC_PAYMENT_NETWORK = "tron"

    const { getClientEnv } = await import("./client")
    const env1 = getClientEnv()
    const env2 = getClientEnv()

    expect(env1).toBe(env2) // Same reference
  })
})
