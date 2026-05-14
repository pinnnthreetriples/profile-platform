import { describe, it, expect } from "vitest"
import { config } from "./src/middleware"

describe("middleware config", () => {
  it("should have matcher configuration", () => {
    expect(config).toBeDefined()
    expect(config.matcher).toBeDefined()
    expect(Array.isArray(config.matcher)).toBe(true)
  })

  it("should exclude static files from middleware", () => {
    const matcher = config.matcher[0]

    expect(matcher).toContain("_next/static")
    expect(matcher).toContain("_next/image")
    expect(matcher).toContain("favicon.ico")
  })

  it("should exclude image extensions", () => {
    const matcher = config.matcher[0]

    expect(matcher).toContain("svg")
    expect(matcher).toContain("png")
    expect(matcher).toContain("jpg")
    expect(matcher).toContain("jpeg")
    expect(matcher).toContain("gif")
    expect(matcher).toContain("webp")
  })
})
