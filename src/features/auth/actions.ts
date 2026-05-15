"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { loginSchema, registerSchema } from "./schemas"
import type { z } from "zod"

export type AuthActionResult =
  | { ok: true }
  | { ok: true; needsConfirmation: true; email: string }
  | { ok: false; message: string }

/**
 * Shared validation logic for auth actions
 */
function validateAuthInput<T extends z.ZodTypeAny>(
  schema: T,
  formData: FormData
): { ok: true; data: z.infer<T> } | { ok: false; message: string } {
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = schema.safeParse(rawData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as Record<
      string,
      string[] | undefined
    >
    const firstError = errors.email?.[0] || errors.password?.[0]
    return { ok: false, message: firstError || "Invalid input" }
  }

  return { ok: true, data: result.data }
}

/**
 * Login action
 * Uses Supabase Auth for authentication
 */
export async function loginAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const validation = validateAuthInput(loginSchema, formData)
  if (!validation.ok) return validation

  const { email, password } = validation.data

  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  revalidatePath("/", "layout")
  redirect("/profile")
}

/**
 * Register action
 * Uses Supabase Auth for user creation.
 *
 * If Supabase email confirmation is enabled, signUp returns a user but no
 * active session. In that case we return needsConfirmation instead of
 * redirecting, so the UI can show "check your email".
 *
 * If email confirmation is disabled (dev/test), signUp returns a session
 * immediately and we redirect to /profile.
 */
export async function registerAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  const validation = validateAuthInput(registerSchema, formData)
  if (!validation.ok) return validation

  const { email, password } = validation.data

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  // If there is no session, Supabase requires email confirmation.
  // Show a "check your email" message instead of redirecting.
  if (!data.session) {
    return { ok: true, needsConfirmation: true, email }
  }

  // Email confirmation disabled — session is active, redirect to profile.
  revalidatePath("/", "layout")
  redirect("/profile")
}

/**
 * Logout action
 * Signs out the current user
 */
export async function logoutAction(): Promise<void> {
  const supabase = await createSupabaseServerClient()
  await supabase.auth.signOut()

  revalidatePath("/", "layout")
  redirect("/login")
}
