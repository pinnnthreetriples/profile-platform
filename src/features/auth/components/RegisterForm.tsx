"use client"

import { useActionState } from "react"
import { AuthForm } from "./AuthForm"
import { registerAction } from "../actions"
import type { AuthActionResult } from "../actions"

export function RegisterForm() {
  const [state] = useActionState<AuthActionResult | null, FormData>(registerAction, null)

  // Email confirmation required — show success message instead of form
  if (state && "needsConfirmation" in state && state.needsConfirmation) {
    return (
      <div className="space-y-4 rounded-md border border-brand-success/30 bg-brand-success/10 p-5 text-sm text-brand-success">
        <p className="text-base font-semibold">Почти готово!</p>
        <p>
          Мы отправили ссылку для подтверждения на{" "}
          <span className="font-semibold">{state.email}</span>. Перейдите по ссылке в
          письме, чтобы активировать аккаунт, и затем войдите.
        </p>
        <p className="text-xs text-brand-muted">
          Не получили письмо? Проверьте папку «Спам».
        </p>
      </div>
    )
  }

  return (
    <AuthForm
      action={registerAction}
      submitLabel="Создать аккаунт"
      submittingLabel="Создаём аккаунт..."
    />
  )
}
