import React from "react";
import Device from "../img/device.png";

export default function Products() {
  return (
    <div>
      <div className="bg-primary w-full flex justify-center pt-6">
        <img src={Device} style={{ height: "300px", width: "auto" }} />
      </div>
    </div>
  );
}
