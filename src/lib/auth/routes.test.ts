import { describe, it, expect } from "vitest"
import { isPublicRoute, isAuthRoute, isProtectedRoute } from "./routes"

describe("isPublicRoute", () => {
  it("should return true for public routes", () => {
    expect(isPublicRoute("/")).toBe(true)
    expect(isPublicRoute("/login")).toBe(true)
    expect(isPublicRoute("/register")).toBe(true)
    expect(isPublicRoute("/auth/callback")).toBe(true)
  })

  it("should return false for protected routes", () => {
    expect(isPublicRoute("/profile")).toBe(false)
    expect(isPublicRoute("/payment")).toBe(false)
  })
})

describe("isAuthRoute", () => {
  it("should return true for auth routes", () => {
    expect(isAuthRoute("/login")).toBe(true)
    expect(isAuthRoute("/register")).toBe(true)
  })

  it("should return false for non-auth routes", () => {
    expect(isAuthRoute("/")).toBe(false)
    expect(isAuthRoute("/profile")).toBe(false)
    expect(isAuthRoute("/payment")).toBe(false)
  })
})

describe("isProtectedRoute", () => {
  it("should return true for protected routes", () => {
    expect(isProtectedRoute("/profile")).toBe(true)
    expect(isProtectedRoute("/payment")).toBe(true)
  })

  it("should return false for public routes", () => {
    expect(isProtectedRoute("/")).toBe(false)
    expect(isProtectedRoute("/login")).toBe(false)
    expect(isProtectedRoute("/register")).toBe(false)
    expect(isProtectedRoute("/payment/success")).toBe(false)
    expect(isProtectedRoute("/payment/cancel")).toBe(false)
  })
})
