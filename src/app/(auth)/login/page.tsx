import Link from "next/link"
import { LoginForm } from "@/features/auth/components/LoginForm"

export default function LoginPage() {
  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <LoginForm />
      <p className="text-center text-sm text-brand-muted">
        Нет аккаунта?{" "}
        <Link href="/register" className="font-medium text-brand-orange hover:underline">
          Регистрация
        </Link>
      </p>
    </div>
  )
}
