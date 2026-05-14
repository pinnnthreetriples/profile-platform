"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFormCard } from "./AuthFormCard"
import type { AuthActionResult } from "../actions"

interface AuthFormProps {
  title: string
  description: string
  action: (
    _prevState: AuthActionResult | null,
    formData: FormData
  ) => Promise<AuthActionResult>
  submitLabel: string
  submittingLabel: string
}

export function AuthForm({
  title,
  description,
  action,
  submitLabel,
  submittingLabel,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null)

  return (
    <AuthFormCard title={title} description={description}>
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
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-800">
            {state.message}
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? submittingLabel : submitLabel}
        </Button>
      </form>
    </AuthFormCard>
  )
}
