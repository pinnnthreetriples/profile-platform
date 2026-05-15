"use server"

import { createPaymentForCurrentUser } from "./server"
import type { CreatePaymentResult } from "./types"

/**
 * Server action to create a BTCPay invoice for the current user.
 *
 * Returns a checkout URL on success.
 * Amount, currency, network, and payment method are server-controlled.
 * Users cannot override any payment parameters.
 */
export async function createPaymentAction(): Promise<CreatePaymentResult> {
  return createPaymentForCurrentUser()
}
