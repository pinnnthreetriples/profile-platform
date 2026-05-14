"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import { loginSchema, registerSchema } from "./schemas"

export type AuthActionResult = { ok: true } | { ok: false; message: string }

/**
 * Login action
 * Uses Supabase Auth for authentication
 */
export async function loginAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  // Validate input
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = loginSchema.safeParse(rawData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    const firstError = errors.email?.[0] || errors.password?.[0]
    return { ok: false, message: firstError || "Invalid input" }
  }

  const { email, password } = result.data

  // Authenticate with Supabase
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  // Success - redirect to profile
  revalidatePath("/", "layout")
  redirect("/profile")
}

/**
 * Register action
 * Uses Supabase Auth for user creation
 */
export async function registerAction(
  _prevState: AuthActionResult | null,
  formData: FormData
): Promise<AuthActionResult> {
  // Validate input
  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  }

  const result = registerSchema.safeParse(rawData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors
    const firstError = errors.email?.[0] || errors.password?.[0]
    return { ok: false, message: firstError || "Invalid input" }
  }

  const { email, password } = result.data

  // Create user with Supabase
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { ok: false, message: error.message }
  }

  // Success - redirect to profile
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
