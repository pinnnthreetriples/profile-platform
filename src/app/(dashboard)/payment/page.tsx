import { PageShell } from "@/components/layout/PageShell"
import { PaymentStatusCard } from "@/features/payment/components/PaymentStatusCard"
import { PaymentCardClient } from "@/features/payment/components/PaymentCardClient"
import { PaymentHistory } from "@/features/payment/components/PaymentHistory"
import {
  getCurrentUserPayments,
  getLatestPaymentForCurrentUser,
} from "@/features/payment/server"
import { ensureCurrentProfile } from "@/features/profile/server"

export default async function PaymentPage() {
  const profile = await ensureCurrentProfile()
  const [latestPayment, allPayments] = await Promise.all([
    getLatestPaymentForCurrentUser(),
    getCurrentUserPayments(),
  ])

  return (
    <PageShell className="py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-brand-ink">Оплата</h1>

        <PaymentStatusCard paymentStatus={profile.paymentStatus} />

        {/* Client component with TanStack Query polling */}
        <PaymentCardClient
          profilePaymentStatus={profile.paymentStatus}
          latestPayment={latestPayment}
        />

        <PaymentHistory payments={allPayments} />
      </div>
    </PageShell>
  )
}
