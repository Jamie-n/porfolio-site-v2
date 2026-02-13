import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import CustomAnchor from "../components/display/CustomAnchor";

export default function () {
  return (
    <>
      <div className="my-5">
        <p className="mb-10">
          A pragmatic full-stack software engineer who excels at breaking down
          complex problems and delivering simple, maintainable, and scalable
          solutions. Experienced across the full development lifecycle and
          comfortable collaborating with cross-functional and offshore teams.
        </p>

        <p>
          Want to see some examples of my work? Check out my{" "}
          <CustomAnchor
            href="https://github.com/Jamie-n"
            target="_blank"
            rel="no-referrer"
          >
            GitHub
          </CustomAnchor>
          .
        </p>
      </div>

      <p className="text-5xl font-bold my-5">Education</p>

      <ExperienceAccordion
        experienceTitle="Software Engineering MSc"
        experienceStartDate="2023"
        experienceEndDate="2024"
        experienceSubheading="The University of Huddersfield"
        experienceColour="bg-blue-500"
      />

      <ExperienceAccordion
        experienceTitle=" Software Engineering BSc (Hons)"
        experienceStartDate="2019"
        experienceEndDate="2024"
        experienceSubheading="The University of Huddersfield"
        experienceColour="bg-blue-500"
      />
    </>
  );
}
