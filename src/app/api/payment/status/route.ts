import { NextResponse } from "next/server"
import { getLatestPaymentForCurrentUser } from "@/features/payment/server"

/**
 * GET /api/payment/status
 * Returns the latest payment for the current user.
 * Used by TanStack Query for polling payment status after invoice creation.
 */
export async function GET() {
  try {
    const payment = await getLatestPaymentForCurrentUser()
    return NextResponse.json(payment)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
