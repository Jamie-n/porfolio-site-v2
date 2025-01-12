import AnimatedText from "./components/AnimatedText";
import DownArrows from "./components/DownArrows";
import NavItem from "./components/nav/NavItem";
import SectionHeader from "./components/SectionHeader";

export default function Home() {
  return (
    <div className="no-scrollbar h-screen">
      <main className="h-full">
        <nav className="flex flex-grow justify-center gap-5 pt-10 h-1/6">
          <NavItem href={"#"} linkText="About" />
          <NavItem href={"#"} linkText="Skills" />
          <NavItem href={"#"} linkText="Experience" />
          <NavItem href={"#"} linkText="Projects" />
        </nav >
        <div className="flex flex-row justify-between items-center px-24 py-48 h-4/6">
          <div>
            <h1 className="text-7xl mb-5">Jamie Neighbours</h1>
            <h2 className="text-2xl mb-5">Software Engineer &<span className="text-red-500"> Creative Problem Solver.</span></h2>
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
          <div className="relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   border-2 border-red-500 w-72 h-72 rounded-full" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2   border-2 border-red-500 w-80 h-80 rounded-full border-dashed dash" />
            <div className="bg-red-500 w-64 h-64 rounded-full" />
          </div>
        </div>

        <div className="h-1/6 bg-black relative px-24">
          <a href="#about-me">
            <DownArrows />
          </a>
        </div>

        <div className="bg-black min-h-screen px-24">
          <div className="min-h-screen">
            <SectionHeader titleText="About Me" />
            <AnimatedText delay={100}>
              <p className="mb-10">
                A friendly and dedicated software engineer who demonstrates strong commitment to their employer, establishing strong relationships with their peers and embraces the value of teamwork. He possesses a remarkable ability to lear quickly and work efficiently to complete tasks, whilst never hesitating to ask for assistance when needed. Meticulous in his attention to detail, taking great pride in his work and approaching problem solving with a a well organized, rational mindset.
              </p>
              <p>
                Want to see some examples of my work? Check out my <a href="https://github.com/Jamie-n" className="underline" target="_blank" rel="no-referrer">GitHub</a>.
              </p>
            </AnimatedText>
          </div>
          <div className="min-h-screen">
            <SectionHeader titleText="Skills" />
          </div>
          <div className="min-h-screen">
            <SectionHeader titleText="Experience" />
          </div>
          <div className="min-h-screen">
            <SectionHeader titleText="Projects" />
          </div>
        </div>
      </main >
    </div >
  );
}
