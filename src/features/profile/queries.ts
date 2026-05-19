import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"
import type { Profile } from "./types"

/**
 * Query options for the current user's profile.
 *
 * - Uses initialData from server-side fetch to avoid loading flash
 * - On invalidation (after profile update), refetches from /api/profile
 * - staleTime: 60s — profile data doesn't change often
 */
export function currentProfileQueryOptions(initialData?: Profile) {
  return queryOptions({
    queryKey: queryKeys.profile.current,
    queryFn: async (): Promise<Profile | null> => {
      const res = await fetch("/api/profile", { cache: "no-store" })
      if (!res.ok) return null
      return res.json() as Promise<Profile | null>
    },
    initialData: initialData,
    staleTime: 60_000,
  })
}
