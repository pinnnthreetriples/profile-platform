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
  test("profile page redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/profile")
    await expect(page).toHaveURL(/\/login/)
  })

  test("payment page redirects to login when unauthenticated", async ({ page }) => {
    await page.goto("/payment")
    await expect(page).toHaveURL(/\/login/)
  })
})

test.describe("Payment Result Pages", () => {
  test("payment success page loads and does not mark payment paid", async ({ page }) => {
    await page.goto("/payment/success")
    await expect(page).toHaveURL("/payment/success")
    // Page should show informational message, not a confirmation of payment
    await expect(page.getByText("Your payment is being processed.")).toBeVisible()
    // Should have links back to profile and payment
    await expect(page.getByRole("link", { name: /profile/i })).toBeVisible()
  })

  test("payment cancel page loads and does not mark payment cancelled", async ({
    page,
  }) => {
    await page.goto("/payment/cancel")
    await expect(page).toHaveURL("/payment/cancel")
    // Page should show informational message
    await expect(page.getByText(/your payment was not completed/i)).toBeVisible()
    // Should have a link to try again
    await expect(page.getByRole("link", { name: /try again/i })).toBeVisible()
  })
})
