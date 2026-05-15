"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { createPaymentAction } from "../actions"
import type { Payment } from "../types"
import type { PaymentStatus } from "@/types/database"
import { PAYMENT_AMOUNT, PAYMENT_CURRENCY } from "../constants"

interface PaymentCardProps {
  profilePaymentStatus: PaymentStatus
  latestPayment: Payment | null
}

export function PaymentCard({ profilePaymentStatus, latestPayment }: PaymentCardProps) {
  const [isPending, startTransition] = useTransition()
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(
    latestPayment?.checkoutUrl ?? null
  )
  const [error, setError] = useState<string | null>(null)

  const isAlreadyPaid = profilePaymentStatus === "paid"
  const hasActiveInvoice =
    latestPayment &&
    (latestPayment.status === "pending" || latestPayment.status === "processing") &&
    latestPayment.checkoutUrl

  function handleCreatePayment() {
    setError(null)
    startTransition(async () => {
      const result = await createPaymentAction()
      if (result.ok) {
        setCheckoutUrl(result.checkoutUrl)
      } else {
        setError(result.message)
      }
    })
  }

  if (isAlreadyPaid) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Your payment has been confirmed.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700">Thank you. Your account is active.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pay with USDT TRC20</CardTitle>
        <CardDescription>
          One-time payment of {PAYMENT_AMOUNT} {PAYMENT_CURRENCY} on TRON network.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md bg-muted p-3 text-sm space-y-1">
          <p>
            <span className="font-medium">Amount:</span> {PAYMENT_AMOUNT}{" "}
            {PAYMENT_CURRENCY}
          </p>
          <p>
            <span className="font-medium">Network:</span> TRON (TRC20)
          </p>
          <p>
            <span className="font-medium">Method:</span> USDT-TRON via BTCPay Server
          </p>
        </div>

        {error && (
          <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        {checkoutUrl || hasActiveInvoice ? (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Your invoice is ready. Click below to complete payment.
            </p>
            <Button asChild className="w-full">
              <Link
                href={checkoutUrl ?? latestPayment!.checkoutUrl!}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open BTCPay Checkout
              </Link>
            </Button>
          </div>
        ) : (
          <Button onClick={handleCreatePayment} disabled={isPending} className="w-full">
            {isPending ? "Creating invoice..." : "Pay with USDT TRC20"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
