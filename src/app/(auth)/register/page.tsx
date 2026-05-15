import Link from "next/link"
import { RegisterForm } from "@/features/auth/components/RegisterForm"

export default function RegisterPage() {
  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <RegisterForm />
      <p className="text-center text-sm text-brand-muted">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="font-medium text-brand-orange hover:underline">
          Войти
        </Link>
      </p>
    </div>
  )
}
