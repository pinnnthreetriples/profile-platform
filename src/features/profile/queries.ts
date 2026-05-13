import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"

export function currentProfileQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.profile.current,
    queryFn: async () => {
      return {
        id: "placeholder-user-id",
        displayName: "Profile Placeholder",
        isPaid: false,
      }
    },
  })
}
