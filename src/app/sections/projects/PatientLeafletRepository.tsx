import BrutalScreenshot from "@/app/components/display/BrutalScreenshot";

export default function PatientLeafletRepository() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <BrutalScreenshot
        src="/projects/plr-placeholder-search.svg"
        alt="Placeholder: search and index"
        label="Search / index (placeholder)"
        sizes="(min-width: 768px) 50vw, 100vw"
        imageProps={{ width: 400, height: 240 }}
      />
      <BrutalScreenshot
        src="/projects/plr-placeholder-detail.svg"
        alt="Placeholder: leaflet detail"
        label="Leaflet / detail (placeholder)"
        sizes="(min-width: 768px) 50vw, 100vw"
        imageProps={{ width: 400, height: 240 }}
      />
    </div>
  );
}
