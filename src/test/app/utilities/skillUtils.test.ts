import { describe, expect, it } from "vitest";
import {
  flattenSkillCategories,
  skillsGroupedByUsage,
} from "@/app/utilities/skillUtils";
import type { Skill, SkillCategory } from "@/app/data/skills";

describe("skillsGroupedByUsage", () => {
  it("groups by usage tier in Daily→Exploring order and sorts names", () => {
    const skills: Skill[] = [
      { name: "Zed", usage: "Exploring" },
      { name: "Beta", usage: "Daily" },
      { name: "Alpha", usage: "Daily" },
      { name: "Gamma", usage: "Regular" },
    ];

    expect(skillsGroupedByUsage(skills)).toEqual([
      {
        usage: "Daily",
        skills: [
          { name: "Alpha", usage: "Daily" },
          { name: "Beta", usage: "Daily" },
        ],
      },
      { usage: "Regular", skills: [{ name: "Gamma", usage: "Regular" }] },
      { usage: "Exploring", skills: [{ name: "Zed", usage: "Exploring" }] },
    ]);
  });

  it("omits empty tiers", () => {
    const skills: Skill[] = [{ name: "Only", usage: "Occasional" }];
    expect(skillsGroupedByUsage(skills)).toEqual([
      { usage: "Occasional", skills: [{ name: "Only", usage: "Occasional" }] },
    ]);
  });
});

describe("flattenSkillCategories", () => {
  it("preserves skills with category titles in panel order", () => {
    const categories: SkillCategory[] = [
      {
        title: "A",
        skills: [{ name: "X", usage: "Daily" }],
      },
      {
        title: "B",
        skills: [
          { name: "Y", usage: "Regular" },
          { name: "Z", usage: "Exploring" },
        ],
      },
    ];
    expect(flattenSkillCategories(categories)).toEqual([
      { name: "X", usage: "Daily", categoryTitle: "A" },
      { name: "Y", usage: "Regular", categoryTitle: "B" },
      { name: "Z", usage: "Exploring", categoryTitle: "B" },
    ]);
  });
});
