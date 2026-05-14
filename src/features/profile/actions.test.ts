import { describe, it, expect, vi, beforeEach } from "vitest"

// Mock server functions
vi.mock("./server", () => ({
  ensureCurrentProfile: vi.fn(),
  updateCurrentProfile: vi.fn(),
}))

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}))

import { updateProfileAction } from "./actions"
import { ensureCurrentProfile, updateCurrentProfile } from "./server"
import { revalidatePath } from "next/cache"

function makeFormData(fields: Record<string, string>): FormData {
  const fd = new FormData()
  for (const [key, value] of Object.entries(fields)) {
    fd.append(key, value)
  }
  return fd
}

const mockProfile = {
  id: "user-123",
  displayName: "Alice",
  bio: "Developer",
  avatarUrl: null,
  paymentStatus: "pending" as const,
  createdAt: "2026-01-01T00:00:00Z",
  updatedAt: "2026-01-01T00:00:00Z",
}

describe("updateProfileAction", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(ensureCurrentProfile).mockResolvedValue(mockProfile)
    vi.mocked(updateCurrentProfile).mockResolvedValue(mockProfile)
  })

  it("returns ok: true on valid input", async () => {
    const fd = makeFormData({ displayName: "Alice", bio: "Developer", avatarUrl: "" })
    const result = await updateProfileAction(null, fd)
    expect(result.ok).toBe(true)
  })

  it("calls ensureCurrentProfile and updateCurrentProfile on success", async () => {
    const fd = makeFormData({ displayName: "Alice", bio: "", avatarUrl: "" })
    await updateProfileAction(null, fd)
    expect(ensureCurrentProfile).toHaveBeenCalledOnce()
    expect(updateCurrentProfile).toHaveBeenCalledOnce()
  })

  it("calls revalidatePath('/profile') on success", async () => {
    const fd = makeFormData({ displayName: "Alice", bio: "", avatarUrl: "" })
    await updateProfileAction(null, fd)
    expect(revalidatePath).toHaveBeenCalledWith("/profile")
  })

  it("returns ok: false for invalid avatar URL", async () => {
    const fd = makeFormData({
      displayName: "Alice",
      bio: "",
      avatarUrl: "not-a-url",
    })
    const result = await updateProfileAction(null, fd)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.message).toContain("valid URL")
    }
  })

  it("returns ok: false when displayName exceeds 80 chars", async () => {
    const fd = makeFormData({
      displayName: "a".repeat(81),
      bio: "",
      avatarUrl: "",
    })
    const result = await updateProfileAction(null, fd)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.message).toContain("80 characters")
    }
  })

  it("returns ok: false when bio exceeds 500 chars", async () => {
    const fd = makeFormData({
      displayName: "",
      bio: "a".repeat(501),
      avatarUrl: "",
    })
    const result = await updateProfileAction(null, fd)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.message).toContain("500 characters")
    }
  })

  it("returns ok: false when updateCurrentProfile throws", async () => {
    vi.mocked(updateCurrentProfile).mockRejectedValue(new Error("DB error"))
    const fd = makeFormData({ displayName: "Alice", bio: "", avatarUrl: "" })
    const result = await updateProfileAction(null, fd)
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.message).toBe("DB error")
    }
  })

  it("rethrows Next.js redirect errors", async () => {
    const redirectError = new Error("NEXT_REDIRECT") as Error & { digest: string }
    redirectError.digest = "NEXT_REDIRECT;replace;/login;307;"
    vi.mocked(ensureCurrentProfile).mockRejectedValue(redirectError)

    const fd = makeFormData({ displayName: "Alice", bio: "", avatarUrl: "" })

    await expect(updateProfileAction(null, fd)).rejects.toBe(redirectError)
  })

  it("normalizes empty displayName to null before calling updateCurrentProfile", async () => {
    const fd = makeFormData({ displayName: "", bio: "", avatarUrl: "" })
    await updateProfileAction(null, fd)
    expect(updateCurrentProfile).toHaveBeenCalledWith(
      expect.objectContaining({ displayName: null })
    )
  })
})
