import { test, expect } from '@playwright/test';

test('homepage has expected content', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/ai-interview/i);
  // You can also check for visible text, e.g.:
  // await expect(page.getByText('Welcome')).toBeVisible();
}); 