import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"
import type { Payment } from "./types"

/**
 * Query options for a specific payment's status.
 * Used for client-side polling after invoice creation.
 *
 * NOTE: Payment status is authoritative only from the server/webhook.
 * This query is for display purposes only — never trust client-side status
 * as confirmation of payment.
 */
export function paymentStatusQueryOptions(paymentId: string, initialData?: Payment) {
  return queryOptions({
    queryKey: queryKeys.payment.status(paymentId),
    queryFn: async (): Promise<Payment | null> => {
      return initialData ?? null
    },
    initialData: initialData,
    staleTime: 30_000,
  })
}

/**
 * Query options for the current user's latest payment.
 */
export function currentPaymentQueryOptions(initialData?: Payment | null) {
  return queryOptions({
    queryKey: queryKeys.payment.current,
    queryFn: async (): Promise<Payment | null> => {
      return initialData ?? null
    },
    initialData: initialData ?? undefined,
    staleTime: 30_000,
  })
}
