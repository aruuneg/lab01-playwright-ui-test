import { test, expect, Page } from '@playwright/test';

const SAUCE_URL = 'https://www.saucedemo.com';

/**
 * Logs in once for a test. Keeping login in a helper does not create shared
 * browser state: each test receives a fresh isolated page and context.
 */
async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  await page.goto(SAUCE_URL);
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

/** Logs out and confirms the login screen, as a test cleanup step. */
async function logout(page: Page) {
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByText('Logout', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
}

test('амжилттай нэвтрэх', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/\/inventory\.html$/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();

  await logout(page);
});

test('буруу нууц үгээр нэвтрэхэд алдааг харуулна', async ({ page }) => {
  await login(page, 'standard_user', 'wrong_password');

  await expect(page.getByText(
    'Epic sadface: Username and password do not match any user in this service',
  )).toBeVisible();
  await expect(page).toHaveURL(SAUCE_URL + '/');
});

test('нэвтрээд барааг сагсанд нэмэх', async ({ page }) => {
  await login(page);

  await expect(page).toHaveURL(/\/inventory\.html$/);

  const backpackCard = page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' });
  await expect(backpackCard).toBeVisible();
  await backpackCard.getByRole('button', { name: 'Add to cart' }).click();

  const cartButton = page.getByRole('button', { name: 'Cart, 1 items' });
  await expect(cartButton).toBeVisible();
  await cartButton.click();
  await expect(page).toHaveURL(/\/cart\.html$/);
  await expect(page.getByText('Sauce Labs Backpack', { exact: true })).toBeVisible();

  await logout(page);
});
