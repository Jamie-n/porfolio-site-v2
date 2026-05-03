import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 1280, height: 720 } });

test("home loads and renders sidebar", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Jamie.")).toBeVisible();
  await expect(page.getByText(/Full.stack engineer.*UI focused/)).toBeVisible();
});

test("sidebar navigation updates URL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "02. About" }).click();
  await expect(page).toHaveURL(/\/about$/);

  await page.getByRole("link", { name: "05. Projects" }).click();
  await expect(page).toHaveURL(/\/projects$/);
});

test("dark mode toggle persists", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByTestId("dark-mode-toggle");
  await expect(toggle).toBeVisible();

  await toggle.click();
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
