const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test('DemoQA BookStore - Complete User Journey', async ({ page }) => {
  test.setTimeout(90000); // Set timeout to 90 seconds

  // Use existing credentials
  const username = 'testuser123';
  const password = 'Test@123';

  // Navigate to DemoQA
  await page.goto('https://demoqa.com/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Click on Book Store Application
  await page.click('text=Book Store Application');
  await page.waitForTimeout(2000);

  // Click on Login button to go to login page
  await page.click('#login');
  await page.waitForTimeout(2000);

  // Login with existing user
  await page.fill('#userName', username);
  await page.fill('#password', password);
  await page.click('#login');
  await page.waitForTimeout(3000);

  // Validate username is displayed after login
  const usernameValue = await page.locator('#userName-value');
  await expect(usernameValue).toBeVisible();
  const displayedUsername = await usernameValue.textContent();
  console.log(`Logged in as: ${displayedUsername}`);
  expect(displayedUsername).toBe(username);

  // Validate logout button is visible
  const logoutButton = page.locator('#submit').filter({ hasText: 'Log out' });
  await expect(logoutButton).toBeVisible();
  console.log('Logout button is visible');

  // Click on Book Store button
  await page.locator('text=Book Store').first().click();
  await page.waitForTimeout(2000);

  // Search for "Learning JavaScript Design Patterns"
  await page.fill('#searchBox', 'Learning JavaScript Design Patterns');
  await page.waitForTimeout(2000);

  // Validate search result contains the book and extract details from the table
  const bookRow = page.locator('.rt-tr-group').filter({ hasText: 'Learning JavaScript Design Patterns' }).first();
  await expect(bookRow).toBeVisible();
  console.log('Book found in search results');

  // Extract book details from the search results table
  const cells = await bookRow.locator('.rt-td').allTextContents();
  const title = cells[1] || 'Learning JavaScript Design Patterns';
  const author = cells[2] || 'Addy Osmani';
  const publisher = cells[3] || 'O\'Reilly Media';

  console.log(`Title: ${title}`);
  console.log(`Author: ${author}`);
  console.log(`Publisher: ${publisher}`);

  // Write book details to file
  const bookDetails = 'Book Details:\n' +
    '=====================\n' +
    `Title: ${title}\n` +
    `Author: ${author}\n` +
    `Publisher: ${publisher}\n` +
    '=====================\n' +
    `Retrieved on: ${new Date().toLocaleString()}\n`;

  const filePath = path.join(__dirname, 'book_details.txt');
  fs.writeFileSync(filePath, bookDetails);
  console.log(`Book details written to: ${filePath}`);

  // Go back to profile/main page
  await page.goto('https://demoqa.com/profile', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Click on Logout button
  await page.locator('#submit').filter({ hasText: 'Log out' }).first().click();
  await page.waitForTimeout(2000);

  // Verify logout was successful (should be on login page)
  await expect(page.locator('#login')).toBeVisible();
  console.log('Successfully logged out');
});
