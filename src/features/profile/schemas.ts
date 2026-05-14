import { z } from "zod"

/**
 * Normalize empty strings to null for optional text fields
 */
function emptyToNull(val: unknown): string | null | undefined {
  if (typeof val === "string" && val.trim() === "") return null
  return val as string | null | undefined
}

/**
 * Profile update schema
 * - displayName: optional, max 80 chars, empty string → null
 * - bio: optional, max 500 chars, empty string → null
 * - avatarUrl: optional, valid URL, empty string → null
 */
export const profileUpdateSchema = z.object({
  displayName: z
    .preprocess(
      emptyToNull,
      z
        .string()
        .max(80, "Display name must be 80 characters or fewer")
        .nullable()
        .optional()
    )
    .optional(),
  bio: z
    .preprocess(
      emptyToNull,
      z.string().max(500, "Bio must be 500 characters or fewer").nullable().optional()
    )
    .optional(),
  avatarUrl: z
    .preprocess(
      emptyToNull,
      z.string().url("Avatar URL must be a valid URL").nullable().optional()
    )
    .optional(),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
