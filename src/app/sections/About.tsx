import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import CustomAnchor from "../components/display/CustomAnchor";


export default function () {
  return (
    <>
      <div className="my-5">
        <p className="mb-10">
          A friendly and dedicated software engineer who demonstrates strong commitment to their employer, establishing strong relationships with their peers and embraces the value of teamwork. He possesses a remarkable ability to lear quickly and work efficiently to complete tasks, whilst never hesitating to ask for assistance when needed. Meticulous in his attention to detail, taking great pride in his work and approaching problem solving with a a well organized, rational mindset.
        </p>

        <p>
          Want to see some examples of my work? Check out my <CustomAnchor href="https://github.com/Jamie-n" target="_blank" rel="no-referrer">GitHub</CustomAnchor>.
        </p>
      </div>

      <p className="text-5xl font-bold my-5">Education</p>

      <ExperienceAccordion
        experienceTitle="Software Engineering MSc"
        experienceStartDate="2023"
        experienceEndDate="2024"
        experienceCompany="The University of Huddersfield"
        experienceColour="bg-blue-500"
      />

      <ExperienceAccordion
        experienceTitle=" Software Engineering BSc (Hons)"
        experienceStartDate="2019"
        experienceEndDate="2024"
        experienceCompany="The University of Huddersfield"
        experienceColour="bg-blue-500"
      />
    </>
  )
}
