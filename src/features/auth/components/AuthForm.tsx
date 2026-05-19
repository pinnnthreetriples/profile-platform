"use client"

import { useActionState, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formErrorMotion, formErrorConfig } from "@/lib/animations"
import type { AuthActionResult } from "../actions"

interface AuthFormProps {
  action: (
    _prevState: AuthActionResult | null,
    formData: FormData
  ) => Promise<AuthActionResult>
  submitLabel: string
  submittingLabel: string
  /** Show "remember me + forgot password" row (login mode) */
  showSecondaryRow?: boolean
}

/**
 * Editorial sign-in / sign-up form.
 * Uses native action with Supabase auth server actions (Stage 1 — unchanged).
 * Adds password visibility toggle and animated error feedback.
 */
export function AuthForm({
  action,
  submitLabel,
  submittingLabel,
  showSecondaryRow,
}: AuthFormProps) {
  const [state, formAction, isPending] = useActionState(action, null)
  const [showPassword, setShowPassword] = useState(false)

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-semibold text-brand-ink">
          Email
        </Label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          >
            ✉
          </span>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Введите ваш email"
            autoComplete="email"
            required
            disabled={isPending}
            className="h-12 rounded-md border-brand-line bg-brand-paper pl-10 text-base text-brand-ink shadow-soft focus-visible:ring-brand-orange"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-semibold text-brand-ink">
          Пароль
        </Label>
        <div className="relative">
          <span
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted"
            aria-hidden="true"
          >
            🔒
          </span>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Введите ваш пароль"
            autoComplete={showSecondaryRow ? "current-password" : "new-password"}
            required
            minLength={6}
            disabled={isPending}
            className="h-12 rounded-md border-brand-line bg-brand-paper px-10 text-base text-brand-ink shadow-soft focus-visible:ring-brand-orange"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-ink"
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? "🙈" : "👁"}
          </button>
        </div>
      </div>

      {showSecondaryRow && (
        <div className="flex items-center justify-between text-sm">
          <label className="inline-flex cursor-pointer items-center gap-2 text-brand-muted">
            <input
              type="checkbox"
              name="remember"
              className="size-4 rounded border-brand-line accent-brand-orange"
            />
            Запомнить меня
          </label>
          <a
            href="#"
            className="text-brand-lilac underline-offset-4 hover:text-brand-orange hover:underline"
          >
            Забыли пароль?
          </a>
        </div>
      )}

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
            className="rounded-md border border-brand-danger/30 bg-brand-danger/10 p-3 text-sm text-brand-danger"
          >
            {state.message}
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        type="submit"
        variant="primaryOrange"
        size="lg"
        className="w-full"
        loading={isPending}
      >
        {isPending ? submittingLabel : `${submitLabel} →`}
      </Button>
    </form>
  )
}
