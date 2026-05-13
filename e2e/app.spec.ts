import { expect, test } from "@playwright/test"

test.describe("Public Pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/USDT Profile Platform/i)
  })

  test("login page loads", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
  })

  test("register page loads", async ({ page }) => {
    await page.goto("/register")
    await expect(page).toHaveURL("/register")
  })
})

test.describe("Dashboard Pages", () => {
  test("profile page loads", async ({ page }) => {
    await page.goto("/profile")
    await expect(page).toHaveURL("/profile")
  })

  test("payment page loads", async ({ page }) => {
    await page.goto("/payment")
    await expect(page).toHaveURL("/payment")
  })

  test("payment success page loads", async ({ page }) => {
    await page.goto("/payment/success")
    await expect(page).toHaveURL("/payment/success")
  })

  test("payment cancel page loads", async ({ page }) => {
    await page.goto("/payment/cancel")
    await expect(page).toHaveURL("/payment/cancel")
  })
})
