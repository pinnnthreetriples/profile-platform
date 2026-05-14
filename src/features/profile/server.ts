import "server-only"

import { redirect } from "next/navigation"
import { createSupabaseServerClient } from "@/lib/supabase/server"
import type { Profile, ProfileUpdate } from "./types"
import type { Database } from "@/types/database"

type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"]

/**
 * Map a database row to the Profile domain type
 */
function toProfile(row: ProfileRow): Profile {
  return {
    id: row.id,
    displayName: row.display_name,
    bio: row.bio,
    avatarUrl: row.avatar_url,
    paymentStatus: row.payment_status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Get the current authenticated user's profile.
 * Returns null if no profile exists yet.
 * Redirects to /login if the user is not authenticated.
 */
export async function getCurrentProfile(): Promise<Profile | null> {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (error) {
    // PGRST116 = no rows found — not an error, just no profile yet
    if (error.code === "PGRST116") {
      return null
    }
    throw new Error(`Failed to fetch profile: ${error.message}`)
  }

  return toProfile(data as ProfileRow)
}

/**
 * Get the current user's profile, creating it if it doesn't exist.
 * Redirects to /login if the user is not authenticated.
 */
export async function ensureCurrentProfile(): Promise<Profile> {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Try to fetch existing profile
  const { data: existing, error: fetchError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") {
    throw new Error(`Failed to fetch profile: ${fetchError.message}`)
  }

  if (existing) {
    return toProfile(existing as ProfileRow)
  }

  // Create profile if it doesn't exist
  const { data: created, error: insertError } = await supabase
    .from("profiles")
    .insert({ id: user.id })
    .select("*")
    .single()

  if (insertError) {
    throw new Error(`Failed to create profile: ${insertError.message}`)
  }

  return toProfile(created as ProfileRow)
}

/**
 * Update the current authenticated user's profile.
 * Redirects to /login if the user is not authenticated.
 */
export async function updateCurrentProfile(input: ProfileUpdate): Promise<Profile> {
  const supabase = await createSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const updateData: Database["public"]["Tables"]["profiles"]["Update"] = {}

  if ("displayName" in input) updateData.display_name = input.displayName ?? null
  if ("bio" in input) updateData.bio = input.bio ?? null
  if ("avatarUrl" in input) updateData.avatar_url = input.avatarUrl ?? null

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("id", user.id)
    .select("*")
    .single()

  if (error) {
    throw new Error(`Failed to update profile: ${error.message}`)
  }

  return toProfile(data as ProfileRow)
}
