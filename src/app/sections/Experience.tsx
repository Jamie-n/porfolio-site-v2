import ExperienceAccordion from "../components/accordion/ExperienceAccordion";
import Header from "../components/Header";
import { experiences, otherExperiences } from "../data/experiences";
import Image from "next/image";

import JacketArtboard from "@/assets/snowsports/jacket-artboard.png";
import JacketArtboard2 from "@/assets/snowsports/jacket-artboard-v2.png";
import JacketMock from "@/assets/snowsports/jacket-mock.png";
import JacketDesignArtboard from "@/assets/snowsports/jacket-design-artboard.png";

import HoodieDesign from "@/assets/snowsports/hoodie.png";

export default function Experience() {
  return (
    <>
      {Object.values(experiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex} />
      ))}

      <Header variant="subheading">#OTHER EXPERIENCES</Header>
      {Object.values(otherExperiences).map((ex, idx) => (
        <ExperienceAccordion key={idx} {...ex}>
          <div className="flex flex-wrap gap-4 items-start">
            <div className="flex-1 flex">
              <Image
                src={JacketDesignArtboard}
                alt="Initial jacket design art board"
                className="h-96 w-auto object-contain"
              />
            </div>
            <div className="flex-1 flex">
              <Image
                src={JacketArtboard2}
                alt="Second design art board"
                className="h-96 w-auto object-contain"
              />
            </div>
            <div className="flex-1 flex">
              <Image
                src={JacketMock}
                alt="Jacket mock"
                className="h-96 w-auto object-contain"
              />
            </div>
            <div className="flex-1 flex">
              <Image
                src={JacketArtboard}
                alt="Alternative design art board"
                className="h-96 w-auto object-contain"
              />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <Image
              src={HoodieDesign}
              alt="Hoodie"
              className="h-96 w-auto object-contain"
            />
          </div>
        </ExperienceAccordion>
      ))}
    </>
  );
}
