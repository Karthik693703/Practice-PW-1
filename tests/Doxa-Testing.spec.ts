import { test, expect } from '@playwright/test';

// TODO: replace with the real Doxa login URL
const LOGIN_URL = process.env.DOXA_URL ?? 'https://auth-dev.doxa-holdings.com/login';
// Keep credentials out of the code: set them as environment variables
const USERNAME = process.env.DOXA_USER ?? '';
const PASSWORD = process.env.DOXA_PASS ?? '';

test.describe('Doxa login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);

    // TODO: adjust these locators to match the Doxa login form
    await page.getByLabel(/user ?name|email/i).fill(USERNAME);
    await page.getByLabel(/password/i).fill(PASSWORD);
    await page.getByRole('button', { name: /log ?in|sign ?in/i }).click();

    // TODO: replace with something that only appears after login
    await expect(page).not.toHaveURL(/login/i);
    // await expect(page.getByText('Dashboard')).toBeVisible();
  });

  test('shows an error for invalid credentials', async ({ page }) => {
    await page.goto(LOGIN_URL);

    await page.getByLabel(/user ?name|email/i).fill('wrong-user');
    await page.getByLabel(/password/i).fill('wrong-password');
    await page.getByRole('button', { name: /log ?in|sign ?in/i }).click();

    // TODO: match the real error message text
    await expect(page.getByText(/invalid|incorrect|failed/i)).toBeVisible();
  });
});
