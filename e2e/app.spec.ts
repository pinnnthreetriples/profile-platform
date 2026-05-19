import { expect, test } from "@playwright/test"

test.describe("Public Pages", () => {
  test("home page loads", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/Models Platform/i)
    // Hero CTA must be present
    await expect(page.getByRole("link", { name: /смотреть моделей/i })).toBeVisible()
  })

  test("login page shows login form", async ({ page }) => {
    await page.goto("/login")
    await expect(page).toHaveURL("/login")
    // Submit button uses the Russian label and arrow suffix
    await expect(page.getByRole("button", { name: /войти в аккаунт/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole("textbox", { name: /пароль/i })).toBeVisible()
  })

  test("register page shows register form", async ({ page }) => {
    await page.goto("/register")
    await expect(page).toHaveURL("/register")
    await expect(page.getByRole("button", { name: /создать аккаунт/i })).toBeVisible()
    await expect(page.getByLabel(/email/i)).toBeVisible()
    await expect(page.getByRole("textbox", { name: /пароль/i })).toBeVisible()
  })

  test("models catalog renders cards from mock data", async ({ page }) => {
    await page.goto("/models")
    await expect(page).toHaveURL("/models")
    // Page heading and at least one model card link
    await expect(page.getByRole("heading", { name: /избранные модели/i })).toBeVisible()
    await expect(page.locator("a[href^='/models/model-']").first()).toBeVisible()
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
    // Page must show informational message, not a confirmation that payment is paid.
    // Stage 4 rule: client-side success URL must never confirm a paid status.
    await expect(page.getByRole("heading", { name: /платёж отправлен/i })).toBeVisible()
    await expect(page.getByText(/подтверждение занимает несколько минут/i)).toBeVisible()
    // A link back to the profile must be present.
    await expect(page.getByRole("link", { name: /перейти в профиль/i })).toBeVisible()
  })

  test("payment cancel page loads and does not mark payment cancelled", async ({
    page,
  }) => {
    await page.goto("/payment/cancel")
    await expect(page).toHaveURL("/payment/cancel")
    // Page must show informational message, never a final cancelled status.
    await expect(page.getByRole("heading", { name: /платёж отменён/i })).toBeVisible()
    await expect(page.getByText(/вернитесь и попробуйте снова/i)).toBeVisible()
    // A link to retry must be present.
    await expect(page.getByRole("link", { name: /попробовать снова/i })).toBeVisible()
  })
})
