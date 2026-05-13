import { expect, test } from "@playwright/test"

test.describe("Public Pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/USDT Profile Platform/i)
  })

  test("login page loads", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /login/i })).toBeVisible()
  })

  test("register page loads", async ({ page }) => {
    await page.goto("/register")
    await expect(page.getByRole("heading", { name: /register/i })).toBeVisible()
  })
})

test.describe("Dashboard Pages", () => {
  test("profile page loads", async ({ page }) => {
    await page.goto("/profile")
    await expect(page.getByRole("heading", { name: /profile/i })).toBeVisible()
  })

  test("payment page loads", async ({ page }) => {
    await page.goto("/payment")
    await expect(page.getByRole("heading", { name: /payment/i })).toBeVisible()
  })

  test("payment success page loads", async ({ page }) => {
    await page.goto("/payment/success")
    await expect(page.getByRole("heading", { name: /success/i })).toBeVisible()
  })

  test("payment cancel page loads", async ({ page }) => {
    await page.goto("/payment/cancel")
    await expect(page.getByRole("heading", { name: /cancel/i })).toBeVisible()
  })
})
