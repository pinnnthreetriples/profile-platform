import Link from "next/link"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppFooter } from "@/components/layout/AppFooter"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"

export default function PaymentCancelPage() {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen items-center bg-brand-bg py-12">
        <PageShell>
          <div className="mx-auto max-w-md space-y-6 text-center">
            <div className="text-5xl">↩️</div>
            <h1 className="text-2xl font-bold text-brand-ink">Платёж отменён</h1>
            <p className="text-brand-muted">
              Вы покинули страницу оплаты. Инвойс может быть ещё активен — вернитесь и
              попробуйте снова.
            </p>
            <div className="flex flex-col gap-3">
              <Button variant="primaryOrange" asChild>
                <Link href="/payment">Попробовать снова</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/profile">Перейти в профиль</Link>
              </Button>
            </div>
          </div>
        </PageShell>
      </main>
      <AppFooter />
    </>
  )
}
