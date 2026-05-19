import { queryOptions } from "@tanstack/react-query"
import { queryKeys } from "@/lib/query/keys"
import type { Payment } from "./types"

const ACTIVE_STATUSES = new Set(["pending", "processing"])

/**
 * Query options for the current user's latest payment.
 *
 * - Polls /api/payment/status every 10s while status is pending/processing
 * - Stops polling automatically when status becomes final (paid/failed/expired)
 * - Uses initialData from server-side fetch to avoid loading flash
 */
export function currentPaymentQueryOptions(initialData?: Payment | null) {
  return queryOptions({
    queryKey: queryKeys.payment.current,
    queryFn: async (): Promise<Payment | null> => {
      const res = await fetch("/api/payment/status", { cache: "no-store" })
      if (!res.ok) return null
      return res.json() as Promise<Payment | null>
    },
    initialData: initialData ?? undefined,
    staleTime: 10_000,
    // Poll every 10s while payment is in an active state.
    // In TanStack Query v5, refetchInterval receives the Query object.
    refetchInterval: (query) => {
      const data = query.state.data
      const status = data?.status
      return status && ACTIVE_STATUSES.has(status) ? 10_000 : false
    },
  })
}

/**
 * Query options for a specific payment's status (by ID).
 */
export function paymentStatusQueryOptions(paymentId: string, initialData?: Payment) {
  return queryOptions({
    queryKey: queryKeys.payment.status(paymentId),
    queryFn: async (): Promise<Payment | null> => {
      const res = await fetch("/api/payment/status", { cache: "no-store" })
      if (!res.ok) return null
      return res.json() as Promise<Payment | null>
    },
    initialData: initialData,
    staleTime: 10_000,
    refetchInterval: (query) => {
      const data = query.state.data
      const status = data?.status
      return status && ACTIVE_STATUSES.has(status) ? 10_000 : false
    },
  })
}
