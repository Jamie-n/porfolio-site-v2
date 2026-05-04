import ExperienceAccordion from "@/app/components/accordion/ExperienceAccordion";
import { BruText } from "@/app/components/primitives/BruText";
import { certifications, CERTIFICATION_IDS } from "@/app/data/certifications";
import { sectionIntros } from "@/app/data/sectionIntros";

export default function Certifications() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {sectionIntros.certifications}
        </BruText>
      </div>

      {certifications.map((entry, idx) => (
        <ExperienceAccordion key={CERTIFICATION_IDS[idx]} {...entry} />
      ))}
    </>
  );
}
