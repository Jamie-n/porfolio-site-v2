import { slugify } from "../../utils";
import AnimatedText from "./AnimatedText";

export default function SectionHeader({ titleText }: { titleText: string }) {
  return (
    <AnimatedText className="py-5" id={slugify(titleText)}>
      <h1 className="text-white text-5xl border-b border-white inline-block pe-20 pb-2">{titleText}</h1>
    </AnimatedText>
  )
}
