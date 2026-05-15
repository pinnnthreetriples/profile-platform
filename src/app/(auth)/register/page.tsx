import Link from "next/link"
import { RegisterForm } from "@/features/auth/components/RegisterForm"
import { AuthTabs } from "@/features/auth/components/AuthTabs"

export const metadata = {
  title: "Регистрация — Models Platform",
  description: "Создайте аккаунт Models Platform",
}

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <AuthTabs />

      <div className="space-y-2">
        <h2 className="display text-3xl text-brand-ink md:text-4xl">Регистрация</h2>
        <p className="text-sm text-brand-muted">
          Создайте аккаунт, чтобы получить доступ к проверенным моделям и удобному
          букингу.
        </p>
      </div>

      <RegisterForm />

      <p className="text-center text-sm text-brand-muted">
        Уже есть аккаунт?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-orange underline-offset-4 hover:underline"
        >
          Войти
        </Link>
      </p>
    </div>
  )
}
