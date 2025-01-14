import { Content } from "next/font/google";
import ContentContainer from "./components/ContentContainer";
import Letter from "./components/Letter";
import Sidebar from "./components/nav/Sidebar";
import Section from "./components/Section";
import LettersFromWord from "./components/LettersFromWord";
import ProgressBar from "./components/ProgressBar";

export default function Home() {
  return (
    <main className="no-scrollbar">
      <Sidebar />
      <Section data="01" className="flex">
        <ContentContainer className="flex items-center flex-grow flex-row justify-between">
          <div className="relative hover:rotate-45 transition-all duration-1000 ease-in-out">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-500 w-96 h-96 rounded-full border-dashed dash" />
            <div className="bg-red-500 w-80 h-80 rounded-full" />
          </div>

          <div>
            <div className="flex">
              <LettersFromWord word="JAMIE" />
            </div>

            <div className="flex">
              <LettersFromWord word="NEIGHBOURS" />
            </div>

            <h2 className="text-sm mb-5">Software Engineer &<span className="text-red-500"> Creative Problem Solver.</span></h2>
            <div className="flex gap-3 text-7xl">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="hover:text-red-500 transition-colors" viewBox="0 0 16 16">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </a>

              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin hover:text-red-500 transition-colors" viewBox="0 0 16 16">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </a>
            </div>
          </div>
        </ContentContainer>
      </Section>

      <Section data="02">
        <ContentContainer>

          <LettersFromWord word="#ABOUT" />
          <div className="my-5">
            <p className="mb-10">
              A friendly and dedicated software engineer who demonstrates strong commitment to their employer, establishing strong relationships with their peers and embraces the value of teamwork. He possesses a remarkable ability to lear quickly and work efficiently to complete tasks, whilst never hesitating to ask for assistance when needed. Meticulous in his attention to detail, taking great pride in his work and approaching problem solving with a a well organized, rational mindset.
            </p>

            <p>
              Want to see some examples of my work? Check out my <a href="https://github.com/Jamie-n" className="underline hover:text-red-500 transition-colors" target="_blank" rel="no-referrer">GitHub</a>.
            </p>
          </div>

          <p className="text-5xl font-bold my-5">Education</p>
          <div className="my-5">
            <p>2023 - 2024</p>
            <p className="text-3xl font-bold">The University of Huddersfield</p>
            <p className="text-xl font-bold">Software Engineering MSc</p>
          </div>

          <div className="my-5">
            <p>2019 - 2023</p>
            <p className="text-3xl font-bold">The University of Huddersfield</p>
            <p className="text-xl font-bold">  Software Engineering BSc (Hons)</p>
          </div>
        </ContentContainer>
      </Section>

      <Section data="03">
        <ContentContainer>
          <LettersFromWord word="#SKILLS" />

          <p className="text-5xl font-bold my-5">Languages and Frameworks</p>

          <div className="flex flex-col gap-3">
            <ProgressBar barText="PHP (Laravel)" percentage={80} />
            <ProgressBar barText=".NET" percentage={75} />
            <ProgressBar barText="React" percentage={75} />
            <ProgressBar barText="HTML" percentage={75} />
            <ProgressBar barText="CSS" percentage={75} />
            <ProgressBar barText="Bootstrap" percentage={75} />
            <ProgressBar barText="Javascript" percentage={60} />
            <ProgressBar barText="Tailwind" percentage={50} />
            <ProgressBar barText="JQuery" percentage={45} />
          </div>

          <p className="text-5xl font-bold my-5">Testing Frameworks</p>
          <div className="flex flex-col gap-3">
            <ProgressBar barText="XUnit" percentage={65} />
            <ProgressBar barText="Jest" percentage={65} />
            <ProgressBar barText="PHP Unit" percentage={50} />
          </div>

          <p className="text-5xl font-bold my-5">Technologies</p>

          <div className="flex flex-col gap-3">
            <ProgressBar barText="Figma" percentage={85} />
            <ProgressBar barText="Adobe Illustrator" percentage={85} />
            <ProgressBar barText="Git" percentage={75} />
            <ProgressBar barText="Docker" percentage={40} />
          </div>
        </ContentContainer>
      </Section>

      <Section data="04">
        <ContentContainer>

          <LettersFromWord word="#EXPERIENCE" />

          <div className="my-5">
            <p>2024 - Present</p>
            <p className="text-3xl font-bold">The Curve</p>
            <p className="text-xl font-bold">Software Engineer</p>
          </div>

          <div className="my-5">
            <p>2020 - 2024</p>
            <p className="text-3xl font-bold">The Health Informatics Service</p>
            <p className="text-xl font-bold">Backend Web Developer</p>
          </div>

        </ContentContainer>
      </Section>

      <Section data="05">
        <ContentContainer>

          <LettersFromWord word="#PROJECTS" />

        </ContentContainer>
      </Section>
    </main >

  );
}
