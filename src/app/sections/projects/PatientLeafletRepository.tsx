import BrutalScreenshot from "@/app/components/display/BrutalScreenshot";

export default function PatientLeafletRepository() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <BrutalScreenshot
        src="/projects/plr-home.png"
        alt="Patient Leaflet Repository home page"
        label="Home page"
        sizes="(min-width: 768px) 50vw, 100vw"
        imageProps={{ width: 400, height: 240 }}
      />
      <BrutalScreenshot
        src="/projects/plr-leaflets.png"
        alt="Patient Leaflet Repository leaflet search page"
        label="Leaflet search"
        sizes="(min-width: 768px) 50vw, 100vw"
        imageProps={{ width: 400, height: 240 }}
      />
    </div>
  );
}
