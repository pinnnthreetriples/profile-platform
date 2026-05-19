import { vi } from "vitest"

/**
 * Shared mock setup for tests that need Supabase + redirect mocks.
 * Import this BEFORE importing modules that use the mocked dependencies.
 */
export function setupSupabaseMock() {
  vi.mock("@/lib/supabase/server", () => ({
    createSupabaseServerClient: vi.fn(),
  }))
}

export function setupRedirectMock() {
  vi.mock("next/navigation", () => ({
    redirect: vi.fn((url: string) => {
      throw new Error(`REDIRECT:${url}`)
    }),
  }))
}

export function setupCacheMock() {
  vi.mock("next/cache", () => ({
    revalidatePath: vi.fn(),
  }))
}
