import ChrisBradbrook from "./projects/ChrisBradbrook";
import PatientLeafletRepository from "./projects/PatientLeafletRepository";
import CaseStudyCard, {
  caseStudyLinkButtonClassName,
} from "../components/CaseStudyCard";
import CustomAnchor from "../components/display/CustomAnchor";
import { BruText } from "../components/primitives/BruText";
import { OpenJourneyOverlayButton } from "../components/JourneyOverlay";

export default function Projects() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <BruText as="p" variant="proseMuted" className="max-w-[72ch]">
          Selected work with an emphasis on outcomes: clean UX, maintainable
          systems, and shipping end‑to‑end. Each item includes a short summary
          and the key decisions behind it.
        </BruText>
      </div>

      <CaseStudyCard
        title="This portfolio (build notes)"
        meta="Personal project · 2025"
        chips={[
          "end‑to‑end rebuild",
          "Next.js + design system",
          "AI‑assisted · human‑owned",
        ]}
        summary={
          <p>
            Laravel portfolio reimagined in Next.js—same intent, better
            architecture and craft, with an editorial design system and
            AI‑assisted delivery kept under human direction, taste, and review.
          </p>
        }
        bullets={[
          "Requirements, IA, and front‑end moved together—not a reskin on old foundations.",
          "Print/editorial brutalism lives in tokens and components so the look scales without one‑offs.",
          "Plan → build → test → refine, with guardrails so generated work stays shippable and maintainable.",
        ]}
        footer={
          <OpenJourneyOverlayButton className="border border-border bg-background px-4 py-3 bru-button shadow-rule transition-all duration-200 ease-out hover:-translate-y-[1px] hover:border-accent/40 hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background">
            Read the build journey
          </OpenJourneyOverlayButton>
        }
      />

      <CaseStudyCard
        title="Commercial WordPress site"
        meta="Chris Bradbrook · 2025"
        chips={[
          "end‑to‑end delivery",
          "WordPress + custom theme",
          "Figma → build → deploy",
        ]}
        summary={
          <p>
            Celebrant site from brief through Figma, custom WordPress theme,
            deployment, and handoff—responsive, production‑ready, owned
            end‑to‑end.
          </p>
        }
        bullets={[
          "Brief and constraints became IA and a visual system before theme code.",
          "Responsive layouts and clear component boundaries—customisation only where it paid off.",
          "Tight client loops through launch: predictable milestones, steady go‑live, no last‑minute surprises.",
        ]}
        footer={
          <CustomAnchor
            href="https://chrisbradbrook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={caseStudyLinkButtonClassName}
          >
            Visit chrisbradbrook.com
          </CustomAnchor>
        }
        appendix={{ label: "Screens", children: <ChrisBradbrook /> }}
      />

      <CaseStudyCard
        title="Patient Leaflet Repository"
        meta="Calderdale & Huddersfield NHS Foundation Trust · 2022 — Present"
        chips={[
          "rebuild & migration",
          "central leaflet platform",
          "staff + public access",
        ]}
        summary={
          <p>
            A web platform to store, search, and maintain patient information
            leaflets across the Trust. The thrust of the work was a{" "}
            <span className="text-foreground/85">rebuild and migration</span>:
            moving to a clearer architecture and safer content lifecycle without
            losing day‑to‑day usability for clinicians and the public site.
          </p>
        }
        bullets={[
          "Migration path: inventory legacy content, normalise structure, and cut over with rollback in mind.",
          "Single place for governed leaflets—upload, versioning, and discovery so departments stay aligned.",
          "Dual audience: staff workflows for upkeep and a public‑facing surface that stays readable and trustworthy.",
        ]}
        footer={
          <CustomAnchor
            href="https://plr.cht.nhs.uk/"
            target="_blank"
            rel="noopener noreferrer"
            className={caseStudyLinkButtonClassName}
          >
            Visit plr.cht.nhs.uk
          </CustomAnchor>
        }
        appendix={{ label: "Screens", children: <PatientLeafletRepository /> }}
      />
    </>
  );
}
