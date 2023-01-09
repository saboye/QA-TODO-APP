const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('http://localhost:5500');
  const title = page.locator('text=QA TODO APP');
  await expect(title).toBeVisible();
});

