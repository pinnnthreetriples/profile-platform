"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFormCard } from "./AuthFormCard"
import { registerAction } from "../actions"
import type { AuthActionResult } from "../actions"

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState<AuthActionResult | null, FormData>(
    registerAction,
    null
  )

  // Email confirmation required — show success message
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
              <span className="font-medium">{state.email}</span>. Click the link
              in the email to activate your account, then come back to log in.
            </p>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive it? Check your spam folder.
          </p>
        </div>
      </AuthFormCard>
    )
  }

  return (
    <AuthFormCard
      title="Register"
      description="Create a new account to get started"
    >
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            disabled={isPending}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
        </div>

        {state && !state.ok && (
          <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {state.message}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating account..." : "Register"}
        </Button>
      </form>
    </AuthFormCard>
  )
}
