import Homepage from "@/assets/chris-bradbrook/hero.png";
import Body from "@/assets/chris-bradbrook/body.png";
import BrutalScreenshot from "@/app/components/display/BrutalScreenshot";

export default function ChrisBradbrook() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <BrutalScreenshot
        src={Homepage}
        alt="Chris Bradbrook Homepage"
        label="Homepage / hero"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
      <BrutalScreenshot
        src={Body}
        alt="Main body"
        label="Homepage / body"
        sizes="(min-width: 768px) 50vw, 100vw"
      />
    </div>
  );
}
