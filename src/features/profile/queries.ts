import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"
import type { Profile } from "./types"

/**
 * Query options for the current user's profile.
 * The actual fetch is done server-side; this is used for client-side
 * cache management and refetching after mutations.
 *
 * NOTE: The queryFn here is intentionally a no-op placeholder.
 * Profile data is fetched server-side via server.ts and passed as props.
 * This query key is used for cache invalidation after profile updates.
 */
export function currentProfileQueryOptions(initialData?: Profile) {
  return queryOptions({
    queryKey: queryKeys.profile.current,
    queryFn: async (): Promise<Profile | null> => {
      // Profile data is loaded server-side; client refetch not needed
      return initialData ?? null
    },
    initialData: initialData,
    staleTime: 60_000,
  })
}
