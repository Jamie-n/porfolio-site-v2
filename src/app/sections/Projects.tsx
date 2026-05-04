import CaseStudyCard from "@/app/components/CaseStudyCard";
import Markdown from "@/app/components/Markdown";
import { BruText } from "@/app/components/primitives/BruText";
import {
  caseStudies,
  caseStudyUi,
  type CaseStudyUi,
} from "@/app/data/case-studies";
import { sectionIntros } from "@/app/data/sectionIntros";

export default function Projects() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          {sectionIntros.projects}
        </BruText>
      </div>

      {caseStudies.map((study) => {
        const ui: CaseStudyUi = caseStudyUi[study.id];
        return (
          <CaseStudyCard
            key={study.id}
            title={study.title}
            meta={study.meta}
            chips={study.chips}
            summary={<Markdown caseStudySummary>{study.summary}</Markdown>}
            bullets={study.bullets}
            footer={ui.footer}
            appendix={ui.appendix}
          />
        );
      })}
    </>
  );
}
