import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";

export default function Experience() {
  return (

    <>
      <ExperienceAccordion
        experienceTitle="Software Engineer"
        experienceStartDate="2024"
        experienceCompany="The Curve"
        experienceColour="bg-red-500"
      />

      <ExperienceAccordion
        experienceTitle="Backend Web Developer"
        experienceStartDate="2020"
        experienceEndDate="2024"
        experienceCompany="The Health Informatics Service"
        experienceColour="bg-blue-500"
      />

      <ExperienceAccordion
        experienceTitle="Freelance Application Developer"
        experienceStartDate="2023"
        experienceEndDate="2023"
        experienceCompany="Apple Designs Ltd"
        experienceColour="bg-green-500"
      />

      <ExperienceAccordion
        experienceTitle="Shift Leader"
        experienceStartDate="2017"
        experienceEndDate="2019"
        experienceCompany="JD Wetherspoon"
        experienceColour="bg-black"
      />

      <Header variant="subheading">
        #OTHER EXPERIENCES
      </Header>

      <ExperienceAccordion
        experienceTitle="Media & Merchandise Secretary"
        experienceStartDate="2023"
        experienceEndDate="2024"
        experienceCompany="Huddersfield University Snowsports Society"
        experienceColour="bg-blue-300"
      />
    </>
  )
}
