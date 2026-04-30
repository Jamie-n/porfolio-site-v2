import { expect, test } from "@playwright/test";

test("home loads and renders sidebar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Jamie.")).toBeVisible();
  await expect(page.getByText("JAMIE", { exact: true })).toBeVisible();
  await expect(page.getByText("NEIGHBOURS")).toBeVisible();
});

test("sidebar navigation updates URL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /About/i }).click();
  await expect(page).toHaveURL(/\/about$/);

  await page.getByRole("link", { name: /Projects/i }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("dark mode toggle persists", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByLabel("Dark mode");
  await expect(toggle).toBeVisible();

  await page.getByTestId("dark-mode-toggle").click({ force: true });
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("dark-mode")))
    .toBe("true");

  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect
    .poll(() => page.evaluate(() => localStorage.getItem("dark-mode")))
    .toBe("true");
  await expect(page.locator("html")).toHaveClass(/dark/);
});
