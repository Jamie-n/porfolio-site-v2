import Image from "next/image";

import PlrHome from "@/assets/patient-leaflet-repository/plr-home.png";
import PlrSearch from "@/assets/patient-leaflet-repository/plr-search.png";
import PlrShow from "@/assets/patient-leaflet-repository/plr-show.png";

export default function PatientLeafletRepository() {
  return (
    <>
      <p>
        The Patient Leaflet Repository (PLR) is a web-based platform designed to
        store, manage, and share patient information leaflets across departments
        within the Trust. It enables clinicians and staff to easily upload,
        search, and maintain up-to-date patient resources in a central,
        compliant system accessible to both staff and the public.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Image src={PlrHome} alt="CHFT PLR Homepage" />
        <Image src={PlrSearch} alt="CHFT PLR Search Page" />
        <Image src={PlrShow} alt="CHFT PLR Leaflet Page" />
      </div>
    </>
  );
}
