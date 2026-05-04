import { describe, expect, it } from "vitest";
import { WORKING_STYLE_IDS, workingStyle } from "@/app/data/aboutContent";
import { CERTIFICATION_IDS, certifications } from "@/app/data/certifications";
import { EDUCATION_IDS, education } from "@/app/data/education";
import {
  EXPERIENCE_IDS,
  OTHER_EXPERIENCE_IDS,
  experienceList,
  otherExperienceList,
} from "@/app/data/experiences";
import { SECTION_INTRO_KEYS, sectionIntros } from "@/app/data/sectionIntros";

describe("content data shape", () => {
  it("education list matches EDUCATION_IDS order and length", () => {
    expect(education).toHaveLength(EDUCATION_IDS.length);
  });

  it("certifications list matches CERTIFICATION_IDS order and length", () => {
    expect(certifications).toHaveLength(CERTIFICATION_IDS.length);
  });

  it("experience lists match id arrays", () => {
    expect(experienceList).toHaveLength(EXPERIENCE_IDS.length);
    expect(otherExperienceList).toHaveLength(OTHER_EXPERIENCE_IDS.length);
  });

  it("working style rows match WORKING_STYLE_IDS order and length", () => {
    expect(workingStyle).toHaveLength(WORKING_STYLE_IDS.length);
  });

  it("sectionIntros has a string for every SECTION_INTRO_KEYS entry", () => {
    for (const key of SECTION_INTRO_KEYS) {
      expect(typeof sectionIntros[key]).toBe("string");
      expect(sectionIntros[key].length).toBeGreaterThan(0);
    }
  });
});
