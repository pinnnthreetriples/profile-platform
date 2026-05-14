/**
 * Browser-safe environment variable validation.
 *
 * Usage:
 * - Client components: import { getClientEnv } from "@/lib/env"
 * - Server components/API routes: import { getServerEnv } from "@/lib/env/server"
 *
 * Do not re-export server-only helpers from this module. Client modules may import
 * this barrel, so it must remain browser-safe.
 */

export { getClientEnv } from "./client"
export type { PublicEnv, ServerEnv } from "./shared"
