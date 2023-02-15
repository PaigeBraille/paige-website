import React from "react";
import Image from "next/image";
import device from "../public/device.png";

export default function Products() {
  return (
    <div className="bg-primary w-full flex justify-center pt-6">
      <Image
        src={device}
        style={{ height: "300px", width: "auto" }}
        alt="Paige Device"
      />
    </div>
  );
}
