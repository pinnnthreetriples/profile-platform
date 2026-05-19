import Link from "next/link"
import { LoginForm } from "@/features/auth/components/LoginForm"
import { AuthTabs } from "@/features/auth/components/AuthTabs"

export const metadata = {
  title: "Вход — Models Platform",
  description: "Войдите в свой аккаунт Models Platform",
}

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <AuthTabs />

      <div className="space-y-2">
        <h2 className="display text-3xl text-brand-ink md:text-4xl">Вход в аккаунт</h2>
        <p className="text-sm text-brand-muted">
          Добро пожаловать обратно. Пожалуйста, войдите в свой аккаунт для продолжения.
        </p>
      </div>

      <LoginForm />

      <SocialDivider />

      <div className="rounded-md border border-brand-line bg-brand-bg p-5 text-sm">
        <p className="font-semibold text-brand-ink">Нет аккаунта?</p>
        <p className="mt-1 text-brand-muted">
          Создайте новый аккаунт и получите доступ ко всем возможностям платформы.
        </p>
        <Link
          href="/register"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-brand-lilac underline-offset-4 hover:text-brand-orange hover:underline"
        >
          Зарегистрироваться →
        </Link>
      </div>
    </div>
  )
}

function SocialDivider() {
  return (
    <>
      <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-brand-muted">
        <span className="h-px flex-1 bg-brand-line" />
        или продолжите с
        <span className="h-px flex-1 bg-brand-line" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Telegram", icon: "✈" },
          { label: "Google", icon: "G" },
          { label: "Apple", icon: "" },
        ].map((p) => (
          <button
            key={p.label}
            type="button"
            disabled
            title="Скоро будет доступно"
            className="flex h-11 items-center justify-center gap-2 rounded-md border border-brand-line bg-brand-paper text-sm font-semibold text-brand-ink shadow-soft transition-colors hover:border-brand-ink disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span aria-hidden="true">{p.icon}</span>
            {p.label}
          </button>
        ))}
      </div>
    </>
  )
}
