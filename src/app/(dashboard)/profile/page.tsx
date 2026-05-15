import Link from "next/link"
import { motion } from "motion/react"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/features/auth/components/LogoutButton"
import { ProfileFormClient } from "@/features/profile/components/ProfileFormClient"
import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import { ensureCurrentProfile } from "@/features/profile/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { staggerContainer, staggerItem, staggerItemConfig } from "@/lib/animations"

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const profile = await ensureCurrentProfile()

  return (
    <PageShell className="py-12">
      <motion.div
        className="mx-auto max-w-2xl space-y-6"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Header */}
        <motion.div
          variants={staggerItem}
          transition={staggerItemConfig}
          className="flex items-center justify-between"
        >
          <h1 className="text-2xl font-bold text-brand-ink">Профиль</h1>
          <LogoutButton />
        </motion.div>

        {/* Profile summary */}
        <motion.div
          variants={staggerItem}
          transition={staggerItemConfig}
          className="rounded-lg bg-brand-paper p-6 shadow-card"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-brand-ink">
                {profile.displayName ?? "Без имени"}
              </p>
              <p className="text-sm text-brand-muted">{user?.email}</p>
            </div>
            <PaymentStatusBadge status={profile.paymentStatus} />
          </div>
          {profile.bio && <p className="mt-3 text-sm text-brand-muted">{profile.bio}</p>}
        </motion.div>

        {/* Edit form */}
        <motion.div variants={staggerItem} transition={staggerItemConfig}>
          <ProfileFormClient profile={profile} />
        </motion.div>

        {/* Payment CTA */}
        <motion.div variants={staggerItem} transition={staggerItemConfig}>
          <Button variant="primaryOrange" className="w-full" asChild>
            <Link href="/payment">Оплатить доступ (USDT)</Link>
          </Button>
        </motion.div>
      </motion.div>
    </PageShell>
  )
}
