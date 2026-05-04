import { describe, expect, it } from "vitest";
import {
  CASE_STUDY_IDS,
  caseStudies,
  caseStudyUi,
} from "@/app/data/case-studies";

describe("case study data", () => {
  it("lists studies in CASE_STUDY_IDS order with matching UI for each id", () => {
    expect(caseStudies.map((s) => s.id)).toEqual([...CASE_STUDY_IDS]);
    for (const id of CASE_STUDY_IDS) {
      expect(caseStudyUi[id]).toBeDefined();
    }
  });
});
