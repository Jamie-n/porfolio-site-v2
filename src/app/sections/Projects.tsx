import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import PatientLeafletRepository from "./experience/PatientLeafletRepository";

export default function Projects() {
  return (
    <>
      <ExperienceAccordion
        title="Commercial Wordpress Site"
        company="Chris Bradbrook"
        colour="bg-teal-500"
        startDate={2025}
        endDate={null}
        blurb={
          "Designed and developed a professional, fully responsive WordPress website for a celebrant, handling the project end-to-end from requirements gathering and Figma design to implementation and customization. https://chrisbradbrook.com"
        }
        highlights={[
          "Translated client requirements into a functional and visually appealing WordPress site, ensuring maintainability and responsiveness across devices.",
          "Implemented custom themes and plugins to meet specific client needs.",
          "Managed the project from initial requirements and Figma designs through to final deployment, maintaining close communication with the client throughout.",
          "Technologies used: WordPress, custom theme development, responsive design.",
        ]}
      ></ExperienceAccordion>

      <ExperienceAccordion
        title="Patient Leaflet Repository"
        company="Calderdale & Huddersfield NHS Foundation Trust"
        colour="bg-blue-600"
        startDate={2022}
        endDate={null}
        blurb={
          "The Patient Leaflet Repository (PLR) is a web-based platform designed to store, manage, and share patient information leaflets across departments within the Trust. It enables clinicians and staff to easily upload, search, and maintain up-to-date patient resources in a central, compliant system accessible to both staff and the public. https://plr.cht.nhs.uk/"
        }
        highlights={[]}
      >
        <PatientLeafletRepository />
      </ExperienceAccordion>
    </>
  );
}
