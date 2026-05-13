import { expect, test } from "@playwright/test"

test("home page loads", async ({ page }) => {
  await page.goto("/")
  await expect(page).toHaveTitle(/USDT Profile Platform/i)
})

test("login page loads", async ({ page }) => {
  await page.goto("/login")
  await expect(page.getByRole("heading", { name: /login/i })).toBeVisible()
})

test("profile page loads", async ({ page }) => {
  await page.goto("/profile")
  await expect(page.getByRole("heading", { name: /profile/i })).toBeVisible()
})
