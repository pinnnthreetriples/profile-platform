/**
 * Environment variable validation
 *
 * Usage:
 * - Client components: import { getClientEnv } from "@/lib/env"
 * - Server components/API routes: import { getServerEnv } from "@/lib/env/server"
 */

export { getClientEnv } from "./client"
export { getServerEnv } from "./server"
export type { PublicEnv, ServerEnv } from "./shared"
