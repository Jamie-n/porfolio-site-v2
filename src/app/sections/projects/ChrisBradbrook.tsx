import Image from "next/image";

import Homepage from "@/assets/chris-bradbrook/hero.png";
import Body from "@/assets/chris-bradbrook/body.png";

export default function ChrisBradbrook() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Image src={Homepage} alt="Chris Bradbrook Homepage" />
      <Image src={Body} alt="Main body" />
    </div>
  );
}
