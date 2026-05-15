import { PageShell } from "@/components/layout/PageShell"
import { PaymentStatusCard } from "@/features/payment/components/PaymentStatusCard"
import { PaymentCardClient } from "@/features/payment/components/PaymentCardClient"
import { PaymentHistory } from "@/features/payment/components/PaymentHistory"
import {
  getCurrentUserPayments,
  getLatestPaymentForCurrentUser,
} from "@/features/payment/server"
import { ensureCurrentProfile } from "@/features/profile/server"
import { StaggerWrapper } from "@/components/shared/StaggerWrapper"

export default async function PaymentPage() {
  const profile = await ensureCurrentProfile()
  const [latestPayment, allPayments] = await Promise.all([
    getLatestPaymentForCurrentUser(),
    getCurrentUserPayments(),
  ])

  return (
    <PageShell className="py-12">
      <StaggerWrapper className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-bold text-brand-ink">Оплата</h1>

        <PaymentStatusCard paymentStatus={profile.paymentStatus} />

        <PaymentCardClient
          profilePaymentStatus={profile.paymentStatus}
          latestPayment={latestPayment}
        />

        {allPayments.length > 0 && <PaymentHistory payments={allPayments} />}
      </StaggerWrapper>
    </PageShell>
  )
}
