import { AppHeader } from "@/components/layout/AppHeader"
import { AppFooter } from "@/components/layout/AppFooter"
import { createSupabaseServerClient } from "@/lib/supabase/server"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <>
      <AppHeader userEmail={user?.email} />
      <div className="flex min-h-[calc(100vh-4rem)] flex-col bg-brand-bg">{children}</div>
      <AppFooter />
    </>
  )
}
