"use client"

import { AuthForm } from "./AuthForm"
import { loginAction } from "../actions"

export function LoginForm() {
  return (
    <AuthForm
      title="Login"
      description="Enter your credentials to access your account"
      action={loginAction}
      submitLabel="Login"
      submittingLabel="Logging in..."
    />
  )
}
