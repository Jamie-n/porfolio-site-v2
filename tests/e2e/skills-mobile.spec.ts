import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 375, height: 740 } });

test("skill pills have safe line-height on mobile", async ({ page }) => {
  await page.goto("/skills");

  const label = page.getByText("Digital Ocean", { exact: true });
  await expect(label).toBeVisible();

  const pill = label.locator(
    "xpath=ancestor::span[contains(@class,'inline-flex')][1]",
  );

  const styles = await pill.evaluate((el) => {
    const s = window.getComputedStyle(el);
    return { fontSize: s.fontSize, lineHeight: s.lineHeight };
  });

  const fontSize = Number.parseFloat(styles.fontSize);
  const lineHeight = Number.parseFloat(styles.lineHeight);

  // Regression guard for iOS/mobile clipping: line-height needs headroom for descenders.
  expect(lineHeight).toBeGreaterThanOrEqual(fontSize * 1.15);
});
