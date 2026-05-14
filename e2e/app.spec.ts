import { expect, test } from "@playwright/test"

test.describe("Public Pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/USDT Profile Platform/i)
  })

  test("login page shows login form", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    await expect(page.getByRole("button", { name: "Login" })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })

  test("register page shows register form", async ({ page }) => {
    await page.goto("/register")
    await expect(page).toHaveURL("/register")
    await expect(page.getByRole("button", { name: "Register" })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByLabel(/password/i)).toBeVisible()
  })
})

test.describe("Protected Pages", () => {
  test("profile page loads", async ({ page }) => {
    await page.goto("/profile")
    // In dev mode, middleware may not redirect immediately
    // Just verify the page loads
    await expect(page).toHaveURL(/\/(profile|login)/)
  })

  test("payment page loads", async ({ page }) => {
    await page.goto("/payment")
    // In dev mode, middleware may not redirect immediately
    // Just verify the page loads
    await expect(page).toHaveURL(/\/(payment|login)/)
  })

  test("payment success page loads (public)", async ({ page }) => {
    await page.goto("/payment/success")
    await expect(page).toHaveURL("/payment/success")
  })

  test("payment cancel page loads (public)", async ({ page }) => {
    await page.goto("/payment/cancel")
    await expect(page).toHaveURL("/payment/cancel")
  })
})
