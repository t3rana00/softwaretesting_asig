import { test, expect } from '@playwright/test';

test('Test 4: Positive E2E test - Dog image is retrieved successfully when button is clicked', async ({ page }) => {
  await page.goto('/');

  await page.waitForResponse(response => 
    response.url().includes('/api/dogs/random') && response.status() === 200
  );

  const button = page.locator('button.fetch-button');
  await button.waitFor({ state: 'visible' });

  await button.click();

  await page.waitForResponse(response => 
    response.url().includes('/api/dogs/random') && response.status() === 200
  );

  const dogImage = page.locator('img[alt="Random dog"]');
  await dogImage.waitFor({ state: 'visible' });

  const imageSrc = await dogImage.getAttribute('src');
  expect(imageSrc).toBeDefined();
  
  expect(imageSrc).toMatch(/^https:\/\//);
});
