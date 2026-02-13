import Image from "next/image";

import PlrHome from "@/assets/patient-leaflet-repository/plr-home.png";
import PlrSearch from "@/assets/patient-leaflet-repository/plr-search.png";
import PlrShow from "@/assets/patient-leaflet-repository/plr-show.png";

export default function PatientLeafletRepository() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Image src={PlrHome} alt="CHFT PLR Homepage" />
        <Image src={PlrSearch} alt="CHFT PLR Search Page" />
        <Image src={PlrShow} alt="CHFT PLR Leaflet Page" />
      </div>
    </>
  );
}
