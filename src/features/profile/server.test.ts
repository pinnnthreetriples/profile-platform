import { describe, it, expect, vi, beforeEach } from "vitest"
import type { SupabaseClient } from "@supabase/supabase-js"

// jscpd:ignore-start — vi.mock must be inline (Vitest hoisting), duplication with auth tests is unavoidable
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(),
}))

vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    throw new Error(`REDIRECT:${url}`)
  }),
}))
// jscpd:ignore-end

import { createSupabaseServerClient } from "@/lib/supabase/server"
import { getCurrentProfile, ensureCurrentProfile, updateCurrentProfile } from "./server"

// ---- helpers ----

type MockAuth = {
  getUser: ReturnType<typeof vi.fn>
}

type MockQuery = {
  from: ReturnType<typeof vi.fn>
}

function makeProfileRow(overrides = {}) {
  return {
    id: "user-123",
    display_name: "Alice",
    bio: "Developer",
    avatar_url: null,
    payment_status: "pending",
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    ...overrides,
  }
}

function mockSupabaseWithUser(userId: string, queryChain: object): SupabaseClient {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: userId } } }),
    },
    from: vi.fn().mockReturnValue(queryChain),
  } as unknown as SupabaseClient
}

function mockSupabaseNoUser(): SupabaseClient {
  return {
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
    from: vi.fn(),
  } as unknown as SupabaseClient
}

// ---- tests ----

describe("getCurrentProfile", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when user is not authenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabaseNoUser())
    await expect(getCurrentProfile()).rejects.toThrow("REDIRECT:/login")
  })

  it("returns null when no profile row exists (PGRST116)", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { code: "PGRST116", message: "no rows" },
      }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    const result = await getCurrentProfile()
    expect(result).toBeNull()
  })

  it("throws on unexpected database error", async () => {
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { code: "500", message: "DB error" },
      }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    await expect(getCurrentProfile()).rejects.toThrow("Failed to fetch profile")
  })

  it("returns mapped profile when row exists", async () => {
    const row = makeProfileRow()
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: row, error: null }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    const profile = await getCurrentProfile()
    expect(profile).not.toBeNull()
    expect(profile?.id).toBe("user-123")
    expect(profile?.displayName).toBe("Alice")
    expect(profile?.bio).toBe("Developer")
    expect(profile?.paymentStatus).toBe("pending")
  })
})

describe("ensureCurrentProfile", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when user is not authenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabaseNoUser())
    await expect(ensureCurrentProfile()).rejects.toThrow("REDIRECT:/login")
  })

  it("returns existing profile when it exists", async () => {
    const row = makeProfileRow()
    const chain = {
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: row, error: null }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    const profile = await ensureCurrentProfile()
    expect(profile.id).toBe("user-123")
    expect(profile.displayName).toBe("Alice")
  })

  it("creates and returns profile when none exists", async () => {
    const row = makeProfileRow({ display_name: null, bio: null })
    const fromMock = vi.fn()
    // First call: select returns PGRST116
    // Second call: insert returns new row
    fromMock
      .mockReturnValueOnce({
        select: vi.fn().mockReturnThis(),
        eq: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { code: "PGRST116", message: "no rows" },
        }),
      })
      .mockReturnValueOnce({
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({ data: row, error: null }),
      })

    const supabase = {
      auth: {
        getUser: vi.fn().mockResolvedValue({ data: { user: { id: "user-123" } } }),
      },
      from: fromMock,
    } as unknown as SupabaseClient

    vi.mocked(createSupabaseServerClient).mockResolvedValue(supabase)

    const profile = await ensureCurrentProfile()
    expect(profile.id).toBe("user-123")
    expect(profile.displayName).toBeNull()
  })
})

describe("updateCurrentProfile", () => {
  beforeEach(() => vi.clearAllMocks())

  it("redirects to /login when user is not authenticated", async () => {
    vi.mocked(createSupabaseServerClient).mockResolvedValue(mockSupabaseNoUser())
    await expect(updateCurrentProfile({ displayName: "Bob" })).rejects.toThrow(
      "REDIRECT:/login"
    )
  })

  it("updates and returns the profile", async () => {
    const row = makeProfileRow({ display_name: "Bob" })
    const chain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: row, error: null }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    const profile = await updateCurrentProfile({ displayName: "Bob" })
    expect(profile.displayName).toBe("Bob")
  })

  it("throws on database error", async () => {
    const chain = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: { message: "update failed" },
      }),
    }
    vi.mocked(createSupabaseServerClient).mockResolvedValue(
      mockSupabaseWithUser("user-123", chain)
    )

    await expect(updateCurrentProfile({ displayName: "Bob" })).rejects.toThrow(
      "Failed to update profile"
    )
  })
})
