import { NextResponse } from "next/server"
import { getCurrentProfile } from "@/features/profile/server"

/**
 * GET /api/profile
 * Returns the current user's profile for client-side TanStack Query refetch.
 * Used after profile mutations to invalidate and refresh the cache.
 */
export async function GET() {
  try {
    const profile = await getCurrentProfile()
    return NextResponse.json(profile)
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}
