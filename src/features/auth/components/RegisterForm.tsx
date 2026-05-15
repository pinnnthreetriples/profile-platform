"use client"

import { useActionState } from "react"
import { AuthForm } from "./AuthForm"
import { AuthFormCard } from "./AuthFormCard"
import { registerAction } from "../actions"
import type { AuthActionResult } from "../actions"

export function RegisterForm() {
  const [state, , isPending] = useActionState<AuthActionResult | null, FormData>(
    registerAction,
    null
  )

  // Email confirmation required — show success message instead of form
  if (state && "needsConfirmation" in state && state.needsConfirmation) {
    return (
      <AuthFormCard
        title="Check your email"
        description="We sent you a confirmation link"
      >
        <div className="space-y-4">
          <div className="rounded-md bg-green-50 p-4 text-sm text-green-800">
            <p className="font-medium">Almost there!</p>
            <p className="mt-1">
              We sent a confirmation link to{" "}
              <span className="font-medium">{state.email}</span>. Click the link in the
              email to activate your account, then come back to log in.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder.
          </p>
        </div>
      </AuthFormCard>
    )
  }

  // Render shared AuthForm — avoids duplicating form fields
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
