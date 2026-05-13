import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"

export function paymentStatusQueryOptions(paymentId: string) {
  return queryOptions({
    queryKey: queryKeys.payment.status(paymentId),
    queryFn: async () => {
      return {
        id: paymentId,
        status: "pending" as const,
      }
    },
  })
}
