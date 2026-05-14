"use server"

import { revalidatePath } from "next/cache"
import { profileUpdateSchema } from "./schemas"
import { ensureCurrentProfile, updateCurrentProfile } from "./server"
import type { ProfileActionResult } from "./types"

/**
 * Server action to update the current user's profile.
 * Validates input with Zod, updates via server function, revalidates /profile.
 */
export async function updateProfileAction(
  _prevState: ProfileActionResult | null,
  formData: FormData
): Promise<ProfileActionResult> {
  const rawData = {
    displayName: formData.get("displayName"),
    bio: formData.get("bio"),
    avatarUrl: formData.get("avatarUrl"),
  }

  const result = profileUpdateSchema.safeParse(rawData)

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors as Record<
      string,
      string[] | undefined
    >
    const firstError = errors.displayName?.[0] || errors.bio?.[0] || errors.avatarUrl?.[0]
    return { ok: false, message: firstError || "Invalid input" }
  }

  try {
    // Ensure profile exists before updating
    await ensureCurrentProfile()
    await updateCurrentProfile(result.data)
    revalidatePath("/profile")
    return { ok: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to update profile"
    return { ok: false, message }
  }
}
