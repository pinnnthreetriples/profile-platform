import { NextResponse } from "next/server"
import { getLatestPaymentForCurrentUser } from "@/features/payment/server"

/**
 * GET /api/payment/status
 * Returns the latest payment for the current user.
 * Used by TanStack Query for polling payment status after invoice creation.
 *
 * Returns 401 if not authenticated (redirect from server function is caught).
 */
export async function GET() {
  try {
    const payment = await getLatestPaymentForCurrentUser()
    return NextResponse.json(payment)
  } catch (err) {
    // Next.js redirect() throws a special error — re-throw it so Next.js handles it
    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
