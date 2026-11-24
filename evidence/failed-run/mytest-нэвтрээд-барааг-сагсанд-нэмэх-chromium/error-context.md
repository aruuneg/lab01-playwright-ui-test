# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: mytest.spec.ts >> нэвтрээд барааг сагсанд нэмэх
- Location: tests\mytest.spec.ts:42:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('This deliberate assertion is wrong', { exact: true })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByText('This deliberate assertion is wrong', { exact: true }) with timeout 5000ms
  - waiting for getByText('This deliberate assertion is wrong', { exact: true })

```

```yaml
- banner:
  - button "Open Menu"
  - img "Open Menu"
  - text: Swag Labs
  - button "Cart, 1 items": "1"
  - text: Your Cart
- main:
  - text: QTY Description 1
  - button "View details for Sauce Labs Backpack": Sauce Labs Backpack
  - text: carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection. $29.99
  - button "Remove"
  - button "Continue Shopping"
  - button "Checkout"
- contentinfo:
  - list:
    - listitem:
      - link "X":
        - /url: https://x.com/saucelabs
    - listitem:
      - link "Facebook":
        - /url: https://www.facebook.com/saucelabs
    - listitem:
      - link "LinkedIn":
        - /url: https://www.linkedin.com/company/sauce-labs/
  - text: © 2026 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy
```

# Test source

```ts
  1  | import { test, expect, Page } from '@playwright/test';
  2  | 
  3  | const SAUCE_URL = 'https://www.saucedemo.com';
  4  | 
  5  | /**
  6  |  * Logs in once for a test. Keeping login in a helper does not create shared
  7  |  * browser state: each test receives a fresh isolated page and context.
  8  |  */
  9  | async function login(page: Page, username = 'standard_user', password = 'secret_sauce') {
  10 |   await page.goto(SAUCE_URL);
  11 |   await page.getByPlaceholder('Username').fill(username);
  12 |   await page.getByPlaceholder('Password').fill(password);
  13 |   await page.getByRole('button', { name: 'Login' }).click();
  14 | }
  15 | 
  16 | /** Logs out and confirms the login screen, as a test cleanup step. */
  17 | async function logout(page: Page) {
  18 |   await page.getByRole('button', { name: 'Open Menu' }).click();
  19 |   await page.getByText('Logout', { exact: true }).click();
  20 |   await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  21 | }
  22 | 
  23 | test('амжилттай нэвтрэх', async ({ page }) => {
  24 |   await login(page);
  25 | 
  26 |   await expect(page).toHaveURL(/\/inventory\.html$/);
  27 |   await expect(page.getByText('Products', { exact: true })).toBeVisible();
  28 |   await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  29 | 
  30 |   await logout(page);
  31 | });
  32 | 
  33 | test('буруу нууц үгээр нэвтрэхэд алдааг харуулна', async ({ page }) => {
  34 |   await login(page, 'standard_user', 'wrong_password');
  35 | 
  36 |   await expect(page.getByText(
  37 |     'Epic sadface: Username and password do not match any user in this service',
  38 |   )).toBeVisible();
  39 |   await expect(page).toHaveURL(SAUCE_URL + '/');
  40 | });
  41 | 
  42 | test('нэвтрээд барааг сагсанд нэмэх', async ({ page }) => {
  43 |   await login(page);
  44 | 
  45 |   await expect(page).toHaveURL(/\/inventory\.html$/);
  46 | 
  47 |   const backpackCard = page
  48 |     .locator('.inventory_item')
  49 |     .filter({ hasText: 'Sauce Labs Backpack' });
  50 |   await expect(backpackCard).toBeVisible();
  51 |   await backpackCard.getByRole('button', { name: 'Add to cart' }).click();
  52 | 
  53 |   const cartButton = page.getByRole('button', { name: 'Cart, 1 items' });
  54 |   await expect(cartButton).toBeVisible();
  55 |   await cartButton.click();
  56 |   await expect(page).toHaveURL(/\/cart\.html$/);
> 57 |   await expect(page.getByText('This deliberate assertion is wrong', { exact: true })).toBeVisible();
     |                                                                                       ^ Error: expect(locator).toBeVisible() failed
  58 | 
  59 |   await logout(page);
  60 | });
  61 | 
```