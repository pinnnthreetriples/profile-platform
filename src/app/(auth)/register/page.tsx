import Link from "next/link"
import { AppHeader } from "@/components/layout/AppHeader"
import { AppFooter } from "@/components/layout/AppFooter"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <>
      <AppHeader />
      <main className="flex min-h-screen items-center justify-center bg-brand-bg py-12">
        <div className="w-full max-w-md space-y-4 px-4">
          <RegisterForm />
          <p className="text-center text-sm text-brand-muted">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="font-medium text-brand-orange hover:underline">
              Войти
            </Link>
          </p>
        </div>
      </main>
      <AppFooter />
    </>
  )
}
