import { expect, test } from "@playwright/test"

test.describe("Public Pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/M\./i)
    await expect(page.getByRole("heading", { name: "M." })).toBeVisible()
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
