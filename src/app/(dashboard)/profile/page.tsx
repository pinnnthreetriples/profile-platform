import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LogoutButton } from "@/features/auth/components/LogoutButton"
import { ProfileCard } from "@/features/profile/components/ProfileCard"
import { ProfileForm } from "@/features/profile/components/ProfileForm"
import { ensureCurrentProfile } from "@/features/profile/server"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function ProfilePage() {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // ensureCurrentProfile redirects to /login if unauthenticated
  // and creates the profile row if it doesn't exist yet
  const profile = await ensureCurrentProfile()

  const email = user?.email ?? ""

  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <div className="w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Profile</h1>
          <LogoutButton />
        </div>

        <ProfileCard profile={profile} email={email} />

        <ProfileForm profile={profile} />

        <Button asChild variant="outline" className="w-full">
          <Link href="/payment">Pay with USDT</Link>
        </Button>
      </div>
    </div>
  )
}
