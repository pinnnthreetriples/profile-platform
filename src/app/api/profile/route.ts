import { NextResponse } from "next/server"
import { getCurrentProfile } from "@/features/profile/server"

/**
 * GET /api/profile
 * Returns the current user's profile for client-side TanStack Query refetch.
 * Used after profile mutations to invalidate and refresh the cache.
 *
 * Returns 401 if not authenticated.
 */
export async function GET() {
  try {
    const profile = await getCurrentProfile()
    return NextResponse.json(profile)
  } catch (err) {
    // Re-throw Next.js redirect errors so they're handled correctly
    if (err instanceof Error && err.message.startsWith("NEXT_REDIRECT")) {
      throw err
    }
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
