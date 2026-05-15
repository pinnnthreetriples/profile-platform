import { AppHeader } from "@/components/layout/AppHeader"
import { AppFooter } from "@/components/layout/AppFooter"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Try to get user for session-aware header — null if not logged in
  let userEmail: string | null = null
  try {
    const supabase = await createSupabaseServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    userEmail = user?.email ?? null
  } catch {
    // Not authenticated — show guest header
  }

  return (
    <>
      <AppHeader userEmail={userEmail} />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col">{children}</div>
      <AppFooter />
    </>
  )
}
