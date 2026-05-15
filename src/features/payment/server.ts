import "server-only"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { createSupabaseAdminClient } from "@/lib/supabase/admin"
import { createBtcpayInvoice } from "@/lib/btcpay/client"
import { checkRateLimit } from "@/lib/security/rate-limit"
import {
  PAYMENT_AMOUNT,
  PAYMENT_CURRENCY,
  PAYMENT_NETWORK,
  BTCPAY_USDT_TRON_PAYMENT_METHOD_ID,
  ACTIVE_PAYMENT_STATUSES,
  RATE_LIMIT_MAX_ATTEMPTS,
  RATE_LIMIT_WINDOW_MS,
} from "./constants"
import type { Payment, CreatePaymentResult } from "./types"
import type { Database } from "@/types/database"

type PaymentRow = Database["public"]["Tables"]["payments"]["Row"]

function toPayment(row: PaymentRow): Payment {
  return {
    id: row.id,
    userId: row.user_id,
    profileId: row.profile_id,
    provider: row.provider,
    providerInvoiceId: row.provider_invoice_id,
    checkoutUrl: row.checkout_url,
    amount: Number(row.amount),
    currency: row.currency,
    network: row.network,
    paymentMethodId: row.payment_method_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    expiresAt: row.expires_at,
    settledAt: row.settled_at,
  }
}

/**
 * Get the current authenticated user, or redirect to /login.
 */
export async function getCurrentUserOrRedirect() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return user
}

/**
 * Get all payments for the current authenticated user.
 */
export async function getCurrentUserPayments(): Promise<Payment[]> {
  const user = await getCurrentUserOrRedirect()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(`Failed to fetch payments: ${error.message}`)
  }

  return ((data ?? []) as unknown as PaymentRow[]).map(toPayment)
}

/**
 * Get the most recent payment for the current authenticated user.
 */
export async function getLatestPaymentForCurrentUser(): Promise<Payment | null> {
  const user = await getCurrentUserOrRedirect()
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()

  if (error) {
    if (error.code === "PGRST116") return null
    throw new Error(`Failed to fetch latest payment: ${error.message}`)
  }

  return toPayment(data as unknown as PaymentRow)
}

/**
 * Create a payment for the current authenticated user.
 *
 * Rules:
 * - Amount, currency, network, and payment method are server-controlled.
 * - If profile is already paid, returns alreadyPaid result.
 * - If an active pending/processing payment with a checkout URL exists, reuses it.
 * - Rate-limited per user (in-memory, dev-only limitation).
 * - Uses admin client for DB writes (bypasses RLS).
 * - Uses anon client for auth check only.
 */
export async function createPaymentForCurrentUser(): Promise<CreatePaymentResult> {
  const user = await getCurrentUserOrRedirect()
  const admin = createSupabaseAdminClient()
  const supabase = await createSupabaseServerClient()

  // Rate limit: 5 attempts per 10 minutes per user
  const rateLimitKey = `create-payment:${user.id}`
  const { allowed } = checkRateLimit(
    rateLimitKey,
    RATE_LIMIT_MAX_ATTEMPTS,
    RATE_LIMIT_WINDOW_MS
  )
  if (!allowed) {
    return {
      ok: false,
      message: "Too many payment attempts. Please wait a few minutes and try again.",
    }
  }

  // Check profile payment status
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("id, payment_status")
    .eq("id", user.id)
    .single()

  if (profileError || !profile) {
    return { ok: false, message: "Failed to load profile. Please try again." }
  }

  const profileData = profile as unknown as {
    id: string
    payment_status: string
  }

  if (profileData.payment_status === "paid") {
    return { ok: false, message: "Your payment is already confirmed.", alreadyPaid: true }
  }

  // Check for existing active payment with a checkout URL
  const { data: existingPayments } = await supabase
    .from("payments")
    .select("*")
    .eq("user_id", user.id)
    .in("status", [...ACTIVE_PAYMENT_STATUSES])
    .not("checkout_url", "is", null)
    .order("created_at", { ascending: false })
    .limit(1)

  if (existingPayments && existingPayments.length > 0) {
    const existing = toPayment(existingPayments[0] as unknown as PaymentRow)
    return {
      ok: true,
      checkoutUrl: existing.checkoutUrl!,
      paymentId: existing.id,
    }
  }

  // Insert new payment record (pending, no invoice yet)
  const { data: newPayment, error: insertError } = await admin
    .from("payments")
    .insert({
      user_id: user.id,
      profile_id: profileData.id,
      amount: PAYMENT_AMOUNT,
      currency: PAYMENT_CURRENCY,
      network: PAYMENT_NETWORK,
      payment_method_id: BTCPAY_USDT_TRON_PAYMENT_METHOD_ID,
      status: "pending",
    })
    .select("*")
    .single()

  if (insertError || !newPayment) {
    return { ok: false, message: "Failed to create payment record. Please try again." }
  }

  const payment = toPayment(newPayment as unknown as PaymentRow)

  // Create BTCPay invoice
  let invoiceResult
  try {
    invoiceResult = await createBtcpayInvoice({
      paymentId: payment.id,
      userId: user.id,
      amount: PAYMENT_AMOUNT,
      currency: PAYMENT_CURRENCY,
      network: PAYMENT_NETWORK,
      paymentMethodId: BTCPAY_USDT_TRON_PAYMENT_METHOD_ID,
    })
  } catch {
    // Mark payment as failed if BTCPay call fails
    await admin.from("payments").update({ status: "failed" }).eq("id", payment.id)

    return {
      ok: false,
      message: "Failed to create payment invoice. Please try again.",
    }
  }

  // Update payment with invoice details
  const { error: updateError } = await admin
    .from("payments")
    .update({
      provider_invoice_id: invoiceResult.invoiceId,
      checkout_url: invoiceResult.checkoutUrl,
      expires_at: invoiceResult.expiresAt ?? null,
    })
    .eq("id", payment.id)

  if (updateError) {
    return { ok: false, message: "Failed to update payment record. Please try again." }
  }

  return {
    ok: true,
    checkoutUrl: invoiceResult.checkoutUrl,
    paymentId: payment.id,
  }
}

/**
 * Mark a payment as processing (admin only — called from webhook handler).
 */
export async function markPaymentProcessing(paymentId: string): Promise<void> {
  const admin = createSupabaseAdminClient()
  const { error } = await admin
    .from("payments")
    .update({ status: "processing" })
    .eq("id", paymentId)
    .eq("status", "pending")

  if (error) {
    throw new Error(`Failed to mark payment processing: ${error.message}`)
  }
}

/**
 * Mark a payment as paid and update the profile payment status.
 * Admin only — called from verified webhook handler.
 */
export async function markPaymentPaid(paymentId: string, userId: string): Promise<void> {
  const admin = createSupabaseAdminClient()

  const { error: paymentError } = await admin
    .from("payments")
    .update({
      status: "paid",
      settled_at: new Date().toISOString(),
    })
    .eq("id", paymentId)

  if (paymentError) {
    throw new Error(`Failed to mark payment paid: ${paymentError.message}`)
  }

  const { error: profileError } = await admin
    .from("profiles")
    .update({ payment_status: "paid" })
    .eq("id", userId)

  if (profileError) {
    throw new Error(`Failed to update profile payment status: ${profileError.message}`)
  }
}

/**
 * Mark a payment as expired.
 * Admin only — called from verified webhook handler.
 */
export async function markPaymentExpired(paymentId: string): Promise<void> {
  const admin = createSupabaseAdminClient()
  const { error } = await admin
    .from("payments")
    .update({ status: "expired" })
    .eq("id", paymentId)
    .in("status", ["pending", "processing"])

  if (error) {
    throw new Error(`Failed to mark payment expired: ${error.message}`)
  }
}

/**
 * Mark a payment as failed.
 * Admin only — called from verified webhook handler.
 */
export async function markPaymentFailed(paymentId: string): Promise<void> {
  const admin = createSupabaseAdminClient()
  const { error } = await admin
    .from("payments")
    .update({ status: "failed" })
    .eq("id", paymentId)
    .in("status", ["pending", "processing"])

  if (error) {
    throw new Error(`Failed to mark payment failed: ${error.message}`)
  }
}
