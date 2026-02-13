// import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import CustomAnchor from "../components/display/CustomAnchor";

export default function About() {
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
        title="Software Engineering MSc"
        startDate={2023}
        endDate={2024}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="Completed a Master's in Software Engineering with a focus on AI and data-driven solutions. Developed advanced technical skills through a capstone project analyzing sentiment in real-world datasets, combining machine learning and natural language processing techniques."
        highlights={[
          "Delivered a Master's project on AI-based sentiment analysis, applying ML algorithms to analyze textual data with a focus on identifying underlying mental health conditions.",
        ]}
      />

      <ExperienceAccordion
        title=" Software Engineering BSc (Hons)"
        startDate={2019}
        endDate={2023}
        company="The University of Huddersfield"
        colour="bg-blue-500"
        blurb="Graduated with first-class honours in Software Engineering. Recognized for academic excellence, including achieving the highest grade for the Final Year Project, demonstrating strong problem-solving and software development skills."
        highlights={[
          "Awarded highest grade for Final Year Project, developing a computer vision system for train autonomy and safety monitoring.",
        ]}
      />
    </>
  );
}
