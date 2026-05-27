import { test, expect } from '@playwright/test';
import vercelData from '../data/processed/vercel.json';
import lovableData from '../data/processed/lovable.json';
import base44Data from '../data/processed/base44.json';
import youwareData from '../data/processed/youware.json';

type AppData = {
  id: string;
  name: string;
  platform: string;
  url: string;
  rank: number;
  visits: number;
  change: number;
  keywordCount: number;
};

const allApps: AppData[] = [
  ...vercelData,
  ...lovableData,
  ...base44Data,
  ...youwareData,
] as AppData[];

// Test a sample of apps from each platform
const sampleApps = [
  // First 3 from each platform (April 2026)
  ...vercelData.filter((app: any) => app.month === '2026-04').slice(0, 3),
  ...lovableData.filter((app: any) => app.month === '2026-04').slice(0, 3),
  ...base44Data.filter((app: any) => app.month === '2026-04').slice(0, 3),
  ...youwareData.filter((app: any) => app.month === '2026-04').slice(0, 3),
] as AppData[];

test.describe('App Detail Pages', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/VibeHunt/);
    await expect(page.locator('h1')).toContainText('VibeHunt');
  });

  test('sample app pages load and display content', async ({ page }) => {
    for (const app of sampleApps) {
      console.log(`Testing ${app.platform}: ${app.name} (${app.id})`);

      await page.goto(`/app/${app.id}`);

      // Check page title contains app name
      await expect(page).toHaveTitle(new RegExp(app.name));

      // Check key elements exist
      await expect(page.locator('h1')).toContainText(app.name);
      await expect(page.locator('text=Monthly Visits')).toBeVisible();
      await expect(page.locator('text=Growth Rate')).toBeVisible();
      await expect(page.locator('text=Visit Live App')).toBeVisible();

      // Check "Visit Live App" button has correct URL
      const visitButton = page.locator('a:has-text("Visit Live App")');
      await expect(visitButton).toHaveAttribute('href', `https://${app.url}`);

      console.log(`  ✓ ${app.name} page loaded correctly`);
    }
  });

  test('app detail page has performance summary', async ({ page }) => {
    const testApp = sampleApps[0];
    await page.goto(`/app/${testApp.id}`);

    // Check "Why This App is Popular" section exists
    await expect(page.locator('text=Why This App is Popular')).toBeVisible();
  });

  test('app cards on homepage are clickable', async ({ page }) => {
    await page.goto('/');

    // Wait for app cards to load
    await page.waitForSelector('[href^="/app/"]', { timeout: 10000 });

    // Get first app card link
    const firstAppLink = page.locator('[href^="/app/"]').first();
    const href = await firstAppLink.getAttribute('href');

    // Click and verify navigation
    await firstAppLink.click();
    await expect(page).toHaveURL(new RegExp('/app/'));
    await expect(page.locator('text=Visit Live App')).toBeVisible();
  });
});

test.describe('Platform Filtering', () => {
  test('can filter apps by platform', async ({ page }) => {
    await page.goto('/');

    // Click Vercel platform filter
    await page.click('button:has-text("Vercel")');

    // Wait for filtering to complete
    await page.waitForTimeout(500);

    // Check that only Vercel apps are shown (this is a simplified check)
    const appCount = await page.locator('[href^="/app/"]').count();
    expect(appCount).toBeGreaterThan(0);
    expect(appCount).toBeLessThanOrEqual(300);
  });
});

test.describe('Search Functionality', () => {
  test('can search for apps', async ({ page }) => {
    await page.goto('/');

    // Type in search box
    const searchBox = page.locator('input[placeholder*="Search"]');
    await searchBox.fill('test');

    // Wait for search to filter results
    await page.waitForTimeout(500);

    // Verify results are filtered
    const resultsText = await page.locator('text=/\\d+ apps found/').textContent();
    expect(resultsText).toBeTruthy();
  });
});
