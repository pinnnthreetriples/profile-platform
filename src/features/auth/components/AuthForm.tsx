"use client"

import { useActionState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthFormCard } from "./AuthFormCard"
import { formErrorMotion, formErrorConfig } from "@/lib/animations"
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
          <Label htmlFor="password">Пароль</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            required
            disabled={isPending}
          />
        </div>

        <AnimatePresence mode="wait">
          {state && !state.ok && (
            <motion.div
              key="error"
              variants={formErrorMotion}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={formErrorConfig}
              role="alert"
              className="rounded-md bg-brand-danger/10 p-3 text-sm text-brand-danger"
            >
              {state.message}
            </motion.div>
          )}
        </AnimatePresence>

        <Button type="submit" variant="dark" className="w-full" loading={isPending}>
          {isPending ? submittingLabel : submitLabel}
        </Button>
      </form>
    </AuthFormCard>
  )
}
