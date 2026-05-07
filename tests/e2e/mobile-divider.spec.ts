import { expect, test } from "@playwright/test";

test.use({ viewport: { width: 320, height: 700 } });

test("section spacer divider is not squished on mobile", async ({ page }) => {
  await page.goto("/");

  const spacer = page.locator(".section-spacer").first();
  await expect(spacer).toBeVisible();

  const afterRight = await spacer.evaluate((el) => {
    const style = getComputedStyle(el, "::after");
    return style.right;
  });

  // The divider line (::after) should span the full spacer width.
  // If `--scrollbar-comp` goes negative, `right` becomes a positive px value,
  // pulling the divider in and visually "squishing" it on mobile.
  expect(afterRight).toBe("0px");

  const { meta, swatches } = await spacer.evaluate((el) => {
    const metaEl = el.querySelector<HTMLElement>(".section-spacer__meta");
    const swatchEl = el.querySelector<HTMLElement>(".section-spacer__swatches");

    if (!metaEl || !swatchEl) {
      throw new Error("Expected spacer meta and swatches");
    }

    const mb = metaEl.getBoundingClientRect();
    const sb = swatchEl.getBoundingClientRect();

    return {
      meta: { x: mb.x, y: mb.y, width: mb.width, height: mb.height },
      swatches: { x: sb.x, y: sb.y, width: sb.width, height: sb.height },
    };
  });

  const overlaps =
    meta.x < swatches.x + swatches.width &&
    meta.x + meta.width > swatches.x &&
    meta.y < swatches.y + swatches.height &&
    meta.y + meta.height > swatches.y;

  expect(overlaps).toBe(false);
});
