import { test, expect } from '@playwright/test';

test('Test 5: Negative E2E test - Page displays error when API call fails', async ({ page }) => {
  await page.route('**/api/dogs/random', route => route.abort());
  await page.goto('/');
  await expect(page.getByText(/error/i)).toBeVisible({ timeout: 10000 });
});