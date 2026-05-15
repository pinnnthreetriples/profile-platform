/**
 * In-memory rate limiter for server-side use.
 *
 * LIMITATION: This is a per-process, in-memory store.
 * It does NOT work correctly in multi-instance or serverless deployments
 * where each request may hit a different process.
 * For production, replace with a Redis-backed or database-backed rate limiter.
 *
 * Suitable for: development, single-instance deployments, CI.
 */

type RateLimitEntry = {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

/**
 * Check and increment rate limit for a given key.
 *
 * @param key - Unique identifier (e.g. userId + action)
 * @param maxAttempts - Maximum allowed attempts in the window
 * @param windowMs - Time window in milliseconds
 * @returns { allowed: boolean; remaining: number }
 */
export function checkRateLimit(
  key: string,
  maxAttempts: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now >= entry.resetAt) {
    // New window
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: maxAttempts - 1 }
  }

  if (entry.count >= maxAttempts) {
    return { allowed: false, remaining: 0 }
  }

  entry.count += 1
  return { allowed: true, remaining: maxAttempts - entry.count }
}

/**
 * Reset rate limit for a given key (e.g. after successful action).
 */
export function resetRateLimit(key: string): void {
  store.delete(key)
}
