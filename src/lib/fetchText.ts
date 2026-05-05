export async function fetchText(path: string): Promise<string> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to load content: ${path}`);
  return await res.text();
}
