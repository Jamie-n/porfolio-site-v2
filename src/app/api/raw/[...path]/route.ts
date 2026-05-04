import { readFile } from "node:fs/promises";
import path from "node:path";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ALLOWED_REPO_FILES = new Set<string>([
  // Cursor plan files used to build this site
  ".cursor/plans/journey_+_ai_workflow_section_a4c04479.plan.md",
  ".cursor/plans/portfolio_site_roadmap_2026_5434d5fd.plan.md",
  ".cursor/plans/premium_ui_styling_polish_e66ae2b2.plan.md",
]);

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;

  const requested = Array.isArray(parts) ? parts.join("/") : "";
  if (!requested || requested.includes("..") || requested.startsWith("/")) {
    return new NextResponse("Not found", { status: 404 });
  }

  if (!ALLOWED_REPO_FILES.has(requested)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const repoRoot = process.cwd();
  const absolutePath = path.join(repoRoot, requested);

  try {
    const content = await readFile(absolutePath, "utf8");
    return new NextResponse(content, {
      status: 200,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
