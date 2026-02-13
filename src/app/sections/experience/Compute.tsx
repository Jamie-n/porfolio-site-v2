import ComputeHome from "@/assets/compute/compute-home.png";
import ComputeListing from "@/assets/compute/compute-listing.png";
import ComputeCreateProduct from "@/assets/compute/compute-create-product-with-image.gif";
import Image from "next/image";

export default function Compute() {
  return (
    <>
      <p>
        Compute is a full-featured e-commerce web application designed for
        selling computer components and accessories. The platform provides an
        intuitive shopping experience for customers, streamlined product
        management for admins, and secure online transactions, all built using
        the Laravel framework.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Image src={ComputeHome} alt="Compute Homepage" />
        <Image src={ComputeListing} alt="Compute Show Page" />
        <Image src={ComputeCreateProduct} alt="Compute Create Product" />
      </div>
    </>
  );
}
