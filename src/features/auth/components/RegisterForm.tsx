"use client"

import { AuthForm } from "./AuthForm"
import { registerAction } from "../actions"

export function RegisterForm() {
  return (
    <AuthForm
      title="Register"
      description="Create a new account to get started"
      action={registerAction}
      submitLabel="Register"
      submittingLabel="Creating account..."
    />
  )
}
