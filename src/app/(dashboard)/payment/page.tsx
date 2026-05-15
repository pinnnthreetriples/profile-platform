import { motion } from "motion/react"
import { PageShell } from "@/components/layout/PageShell"
import { PaymentStatusCard } from "@/features/payment/components/PaymentStatusCard"
import { PaymentCardClient } from "@/features/payment/components/PaymentCardClient"
import { PaymentHistory } from "@/features/payment/components/PaymentHistory"
import {
  getCurrentUserPayments,
  getLatestPaymentForCurrentUser,
} from "@/features/payment/server"
import { ensureCurrentProfile } from "@/features/profile/server"
import { staggerContainer, staggerItem, staggerItemConfig } from "@/lib/animations"

export default async function PaymentPage() {
  const profile = await ensureCurrentProfile()
  const [latestPayment, allPayments] = await Promise.all([
    getLatestPaymentForCurrentUser(),
    getCurrentUserPayments(),
  ])

  return (
    <PageShell className="py-12">
      <motion.div
        className="mx-auto max-w-2xl space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        <motion.h1
          variants={staggerItem}
          transition={staggerItemConfig}
          className="text-2xl font-bold text-brand-ink"
        >
          Оплата
        </motion.h1>

        <motion.div variants={staggerItem} transition={staggerItemConfig}>
          <PaymentStatusCard paymentStatus={profile.paymentStatus} />
        </motion.div>

        {/* Client component with TanStack Query polling */}
        <motion.div variants={staggerItem} transition={staggerItemConfig}>
          <PaymentCardClient
            profilePaymentStatus={profile.paymentStatus}
            latestPayment={latestPayment}
          />
        </motion.div>

        {allPayments.length > 0 && (
          <motion.div variants={staggerItem} transition={staggerItemConfig}>
            <PaymentHistory payments={allPayments} />
          </motion.div>
        )}
      </motion.div>
    </PageShell>
  )
}
