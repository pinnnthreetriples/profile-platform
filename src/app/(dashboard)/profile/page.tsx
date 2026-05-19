import Link from "next/link"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/features/auth/components/LogoutButton"
import { ProfileFormClient } from "@/features/profile/components/ProfileFormClient"
import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import { ensureCurrentProfile } from "@/features/profile/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { StaggerWrapper } from "@/components/shared/StaggerWrapper"

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const profile = await ensureCurrentProfile()

  return (
    <PageShell className="py-12">
      <StaggerWrapper className="mx-auto max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-brand-ink">Профиль</h1>
          <LogoutButton />
        </div>

        {/* Profile summary */}
        <div className="rounded-lg bg-brand-paper p-6 shadow-card">
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
        </div>

        {/* Edit form */}
        <ProfileFormClient profile={profile} />

        {/* Payment CTA */}
        <Button variant="primaryOrange" className="w-full" asChild>
          <Link href="/payment">Оплатить доступ (USDT)</Link>
        </Button>
      </StaggerWrapper>
    </PageShell>
  )
}
