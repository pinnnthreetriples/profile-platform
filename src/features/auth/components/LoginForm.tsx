"use client"

import { AuthForm } from "./AuthForm"
import { loginAction } from "../actions"

export function LoginForm() {
  return (
    <AuthForm
      action={loginAction}
      submitLabel="Войти в аккаунт"
      submittingLabel="Входим..."
      showSecondaryRow
    />
  )
}
