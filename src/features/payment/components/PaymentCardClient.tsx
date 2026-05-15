"use client"

import { useState, useTransition, useEffect } from "react"
import Link from "next/link"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import { createPaymentAction } from "../actions"
import { currentPaymentQueryOptions } from "../queries"
import { queryKeys } from "@/lib/query/keys"
import type { Payment } from "../types"
import type { PaymentStatus } from "@/types/database"
import { PAYMENT_AMOUNT, PAYMENT_CURRENCY } from "../constants"

interface PaymentCardClientProps {
  profilePaymentStatus: PaymentStatus
  latestPayment: Payment | null
}

/**
 * Payment card with TanStack Query polling.
 *
 * - Polls /api/payment/status every 10s while status is pending/processing
 * - Stops polling automatically when status becomes paid/failed/expired
 * - Invalidates profile query when payment becomes paid
 */
export function PaymentCardClient({
  profilePaymentStatus,
  latestPayment,
}: PaymentCardClientProps) {
  const queryClient = useQueryClient()
  const [isPending, startTransition] = useTransition()
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(
    latestPayment?.checkoutUrl ?? null
  )
  const [error, setError] = useState<string | null>(null)

  // Real polling via API route — stops automatically when status is final
  const { data: payment } = useQuery(currentPaymentQueryOptions(latestPayment))

  // When payment becomes paid, invalidate profile to refresh status badge.
  // useEffect prevents calling invalidateQueries as a side effect inside select/render.
  useEffect(() => {
    if (payment?.status === "paid") {
      void queryClient.invalidateQueries({ queryKey: queryKeys.profile.current })
    }
  }, [payment?.status, queryClient])

  const currentStatus = payment?.status ?? latestPayment?.status
  const currentCheckoutUrl =
    checkoutUrl ?? payment?.checkoutUrl ?? latestPayment?.checkoutUrl

  const isAlreadyPaid = profilePaymentStatus === "paid" || currentStatus === "paid"
  const hasActiveInvoice =
    (currentStatus === "pending" || currentStatus === "processing") && currentCheckoutUrl

  function handleCreatePayment() {
    setError(null)
    startTransition(async () => {
      const result = await createPaymentAction()
      if (result.ok) {
        setCheckoutUrl(result.checkoutUrl)
        // Trigger immediate refetch to start polling
        await queryClient.invalidateQueries({ queryKey: queryKeys.payment.current })
      } else {
        setError(result.message)
      }
    })
  }

  if (isAlreadyPaid) {
    return (
      <div className="rounded-lg bg-brand-paper p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-brand-ink">Оплата</h2>
            <p className="text-sm text-brand-muted">Ваш платёж подтверждён.</p>
          </div>
          <PaymentStatusBadge status="paid" />
        </div>
        <p className="mt-3 text-sm text-brand-success">Спасибо. Ваш аккаунт активен.</p>
      </div>
    )
  }

  return (
    <div className="rounded-lg bg-brand-paper p-6 shadow-card">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="font-semibold text-brand-ink">Оплата USDT TRC20</h2>
          <p className="text-sm text-brand-muted">
            Единоразовый платёж {PAYMENT_AMOUNT} {PAYMENT_CURRENCY} в сети TRON.
          </p>
        </div>
        {currentStatus && <PaymentStatusBadge status={currentStatus} />}
      </div>

      {/* Payment details */}
      <div className="mb-4 space-y-1 rounded-md bg-brand-bg p-3 text-sm">
        <p>
          <span className="font-medium text-brand-ink">Сумма:</span>{" "}
          <span className="text-brand-muted">
            {PAYMENT_AMOUNT} {PAYMENT_CURRENCY}
          </span>
        </p>
        <p>
          <span className="font-medium text-brand-ink">Сеть:</span>{" "}
          <span className="text-brand-muted">TRON (TRC20)</span>
        </p>
        <p>
          <span className="font-medium text-brand-ink">Метод:</span>{" "}
          <span className="text-brand-muted">USDT-TRON via BTCPay Server</span>
        </p>
      </div>

      {/* Polling indicator */}
      {(currentStatus === "pending" || currentStatus === "processing") && (
        <div className="mb-4 flex items-center gap-2 text-xs text-brand-muted">
          <span className="size-2 animate-pulse rounded-full bg-brand-mustard" />
          Ожидаем подтверждения платежа...
        </div>
      )}

      {error && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-brand-danger/10 p-3 text-sm text-brand-danger"
        >
          {error}
        </div>
      )}

      {hasActiveInvoice ? (
        <div className="space-y-2">
          <p className="text-sm text-brand-muted">Инвойс готов. Нажмите для оплаты.</p>
          <Button variant="primaryOrange" className="w-full" asChild>
            <Link href={currentCheckoutUrl!} target="_blank" rel="noopener noreferrer">
              Открыть BTCPay Checkout
            </Link>
          </Button>
        </div>
      ) : (
        <Button
          variant="primaryOrange"
          className="w-full"
          onClick={handleCreatePayment}
          loading={isPending}
        >
          Оплатить USDT TRC20
        </Button>
      )}
    </div>
  )
}
