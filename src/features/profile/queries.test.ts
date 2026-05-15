import { describe, it, expect, vi } from "vitest"
import { currentProfileQueryOptions } from "./queries"
import type { Profile } from "./types"

function makeProfile(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "user-1",
    displayName: "Alice",
    bio: "Developer",
    avatarUrl: null,
    paymentStatus: "pending",
    createdAt: "2026-01-01T00:00:00Z",
    updatedAt: "2026-01-01T00:00:00Z",
    ...overrides,
  }
}

describe("currentProfileQueryOptions", () => {
  it("uses correct query key", () => {
    expect(currentProfileQueryOptions().queryKey).toEqual(["profile", "current"])
  })

  it("uses initialData when provided", () => {
    const profile = makeProfile()
    expect(currentProfileQueryOptions(profile).initialData).toEqual(profile)
  })

  it("initialData is undefined when not provided", () => {
    expect(currentProfileQueryOptions().initialData).toBeUndefined()
  })

  it("staleTime is 60 seconds", () => {
    expect(currentProfileQueryOptions().staleTime).toBe(60_000)
  })

  it("queryFn is defined", () => {
    expect(currentProfileQueryOptions().queryFn).toBeDefined()
  })

  it("queryFn fetches from /api/profile", async () => {
    const profile = makeProfile()
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => profile,
    })
    vi.stubGlobal("fetch", mockFetch)

    const opts = currentProfileQueryOptions()
    const queryFn = opts.queryFn!
    const result = await (queryFn as () => Promise<Profile | null>)()

    expect(mockFetch).toHaveBeenCalledWith("/api/profile", { cache: "no-store" })
    expect(result).toEqual(profile)
  })

  it("queryFn returns null on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 401 }))

    const opts = currentProfileQueryOptions()
    const queryFn = opts.queryFn!
    const result = await (queryFn as () => Promise<Profile | null>)()
    expect(result).toBeNull()
  })
})
