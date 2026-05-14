import { z } from "zod"

/**
 * Trim optional form strings and normalize empty strings to null.
 */
function normalizeOptionalString(val: unknown): string | null | undefined {
  if (typeof val !== "string") return val as string | null | undefined

  const trimmed = val.trim()
  return trimmed === "" ? null : trimmed
}

/**
 * Profile update schema
 * - displayName: optional, max 80 chars, trimmed, empty string → null
 * - bio: optional, max 500 chars, trimmed, empty string → null
 * - avatarUrl: optional, valid URL, trimmed, empty string → null
 */
export const profileUpdateSchema = z.object({
  displayName: z
    .preprocess(
      normalizeOptionalString,
      z
        .string()
        .max(80, "Display name must be 80 characters or fewer")
        .nullable()
        .optional()
    )
    .optional(),
  bio: z
    .preprocess(
      normalizeOptionalString,
      z.string().max(500, "Bio must be 500 characters or fewer").nullable().optional()
    )
    .optional(),
  avatarUrl: z
    .preprocess(
      normalizeOptionalString,
      z.string().url("Avatar URL must be a valid URL").nullable().optional()
    )
    .optional(),
})

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>
