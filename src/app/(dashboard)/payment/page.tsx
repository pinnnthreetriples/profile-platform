import { PaymentCard } from "@/features/payment/components/PaymentCard"
import { PaymentHistory } from "@/features/payment/components/PaymentHistory"
import { PaymentStatusCard } from "@/features/payment/components/PaymentStatusCard"
import {
  getCurrentUserPayments,
  getLatestPaymentForCurrentUser,
} from "@/features/payment/server"
import { ensureCurrentProfile } from "@/features/profile/server"

export default async function PaymentPage() {
  // ensureCurrentProfile redirects to /login if unauthenticated
  const profile = await ensureCurrentProfile()
  const [latestPayment, allPayments] = await Promise.all([
    getLatestPaymentForCurrentUser(),
    getCurrentUserPayments(),
  ])

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold">Payment</h1>

        <PaymentStatusCard paymentStatus={profile.paymentStatus} />

        <PaymentCard
          profilePaymentStatus={profile.paymentStatus}
          latestPayment={latestPayment}
        />

        <PaymentHistory payments={allPayments} />
      </div>
    </div>
  )
}
