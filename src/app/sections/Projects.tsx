import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import ChrisBradbrook from "./projects/ChrisBradbrook";
import PatientLeafletRepository from "./projects/PatientLeafletRepository";
import CustomAnchor from "../components/display/CustomAnchor";

export default function Projects() {
  return (
    <>
      <div className="mt-8 mb-10 max-w-[72ch]">
        <p className="bru-prose-muted max-w-[72ch]">
          Selected work with an emphasis on outcomes: clean UX, maintainable
          systems, and shipping end‑to‑end. Each item includes a short summary
          and the key decisions behind it.
        </p>
      </div>

      <ExperienceAccordion
        title="Commercial Wordpress Site"
        company="Chris Bradbrook"
        colour="bg-teal-500"
        startDate={2025}
        endDate={null}
        blurb={
          "Designed and developed a professional, fully responsive WordPress website for a celebrant, handling the project end-to-end from requirements gathering and Figma design to implementation and customization."
        }
        highlights={[
          "Translated client requirements into a functional and visually appealing WordPress site, ensuring maintainability and responsiveness across devices.",
          "Implemented custom themes and plugins to meet specific client needs.",
          "Managed the project from initial requirements and Figma designs through to final deployment, maintaining close communication with the client throughout.",
          "Technologies used: WordPress, custom theme development, responsive design.",
          "Live site: chrisbradbrook.com",
        ]}
      >
        <p className="mb-6 bru-prose-muted max-w-[72ch]">
          Visit:{" "}
          <CustomAnchor
            href="https://chrisbradbrook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            chrisbradbrook.com
          </CustomAnchor>
        </p>
        <ChrisBradbrook />
      </ExperienceAccordion>

      <ExperienceAccordion
        title="Patient Leaflet Repository"
        company="Calderdale & Huddersfield NHS Foundation Trust"
        colour="bg-blue-600"
        startDate={2022}
        endDate={null}
        blurb={
          "The Patient Leaflet Repository (PLR) is a web-based platform designed to store, manage, and share patient information leaflets across departments within the Trust. It enables clinicians and staff to upload, search, and maintain up-to-date patient resources in a central, compliant system accessible to both staff and the public."
        }
        highlights={["Live site: plr.cht.nhs.uk"]}
      >
        <p className="mb-6 bru-prose-muted max-w-[72ch]">
          Visit:{" "}
          <CustomAnchor
            href="https://plr.cht.nhs.uk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            plr.cht.nhs.uk
          </CustomAnchor>
        </p>
        <PatientLeafletRepository />
      </ExperienceAccordion>
    </>
  );
}
