import { AppHeader } from "@/components/layout/AppHeader"
import { AppFooter } from "@/components/layout/AppFooter"
import { PageShell } from "@/components/layout/PageShell"
import { PaymentCard } from "@/features/payment/components/PaymentCard"
import { PaymentHistory } from "@/features/payment/components/PaymentHistory"
import { PaymentStatusCard } from "@/features/payment/components/PaymentStatusCard"
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
    <>
      <AppHeader />
      <main className="min-h-screen bg-brand-bg py-12">
        <PageShell>
          <div className="mx-auto max-w-2xl space-y-6">
            <h1 className="text-2xl font-bold text-brand-ink">Оплата</h1>
            <PaymentStatusCard paymentStatus={profile.paymentStatus} />
            <PaymentCard
              profilePaymentStatus={profile.paymentStatus}
              latestPayment={latestPayment}
            />
            <PaymentHistory payments={allPayments} />
          </div>
        </PageShell>
      </main>
      <AppFooter />
    </>
  )
}
