import "server-only"

/**
 * Rate Limiting Architecture Layer
 *
 * This module defines the rate limiting strategy for the application.
 * Implementation will be added in future stages.
 *
 * Strategy:
 * - Use sliding window algorithm for accurate rate limiting
 * - Store rate limit data in Redis or Upstash for distributed systems
 * - Apply different limits based on endpoint sensitivity
 * - Include IP-based and user-based rate limiting
 */

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the window
   */
  maxRequests: number

  /**
   * Time window in seconds
   */
  windowSeconds: number

  /**
   * Identifier type for rate limiting
   */
  identifierType: "ip" | "user" | "session"
}

/**
 * Rate limit configurations for different endpoint types
 *
 * TODO: Implement actual rate limiting in Stage 2+
 */
export const RATE_LIMITS: Record<string, RateLimitConfig> = {
  // Auth endpoints - strict limits to prevent brute force
  "auth:login": {
    maxRequests: 5,
    windowSeconds: 60, // 5 attempts per minute
    identifierType: "ip",
  },
  "auth:register": {
    maxRequests: 3,
    windowSeconds: 3600, // 3 registrations per hour
    identifierType: "ip",
  },
  "auth:password-reset": {
    maxRequests: 3,
    windowSeconds: 3600, // 3 resets per hour
    identifierType: "ip",
  },

  // Payment endpoints - moderate limits
  "payment:create": {
    maxRequests: 10,
    windowSeconds: 60, // 10 payment creations per minute
    identifierType: "user",
  },
  "payment:webhook": {
    maxRequests: 100,
    windowSeconds: 60, // 100 webhook calls per minute
    identifierType: "ip",
  },

  // Profile mutation endpoints - moderate limits
  "profile:update": {
    maxRequests: 20,
    windowSeconds: 60, // 20 updates per minute
    identifierType: "user",
  },

  // General API - lenient limits
  "api:general": {
    maxRequests: 100,
    windowSeconds: 60, // 100 requests per minute
    identifierType: "ip",
  },
}

/**
 * Rate limiter interface
 *
 * TODO: Implement using Upstash Redis or similar
 */
export interface RateLimiter {
  /**
   * Check if request is allowed under rate limit
   * @param key - Unique identifier (IP, user ID, etc.)
   * @param config - Rate limit configuration
   * @returns true if allowed, false if rate limited
   */
  check(key: string, config: RateLimitConfig): Promise<boolean>

  /**
   * Get remaining requests for a key
   * @param key - Unique identifier
   * @param config - Rate limit configuration
   * @returns number of remaining requests
   */
  remaining(key: string, config: RateLimitConfig): Promise<number>

  /**
   * Reset rate limit for a key
   * @param key - Unique identifier
   */
  reset(key: string): Promise<void>
}

/**
 * Placeholder rate limiter
 * Always returns true (no limiting)
 *
 * TODO: Replace with actual implementation
 */
export const rateLimiter: RateLimiter = {
  async check() {
    return true
  },

  async remaining() {
    return 999
  },

  async reset() {
    // No-op
  },
}

/**
 * Helper to get rate limit config by endpoint
 */
export function getRateLimitConfig(endpoint: string): RateLimitConfig {
  return RATE_LIMITS[endpoint] || RATE_LIMITS["api:general"]
}
