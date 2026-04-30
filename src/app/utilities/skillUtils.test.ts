import { describe, expect, it } from "vitest";
import { orderSkills } from "./skillUtils";
import type { Skill } from "../data/skills";

describe("orderSkills", () => {
  it("sorts by level descending then progress descending", () => {
    const skills: Skill[] = [
      { name: "A", level: "Beginner", progress: 1 },
      { name: "B", level: "Expert", progress: 0.1 },
      { name: "C", level: "Advanced", progress: 0.9 },
      { name: "D", level: "Expert", progress: 0.9 },
      { name: "E", level: "Advanced", progress: 0.2 },
    ];

    const ordered = orderSkills(skills).map((s) => s.name);
    expect(ordered).toEqual(["D", "B", "C", "E", "A"]);
  });

  it("does not mutate the input array", () => {
    const skills: Skill[] = [
      { name: "A", level: "Beginner", progress: 1 },
      { name: "B", level: "Expert", progress: 0.1 },
    ];
    const copy = [...skills];
    orderSkills(skills);
    expect(skills).toEqual(copy);
  });
});
