import React from "react";
import Demo from "../components/Demo";
import Info from "../components/Info";
import Device from "../img/device.png";

export default function Translate() {
  return (
    <div>

      <div className="bg-primary w-full flex justify-center pt-6">
        <img src={Device} style={{ height: "300px", width: "auto" }} />
      </div>

      <div className="max-w-5xl mx-auto p-2 md:p-6">
        <Demo />
      </div>
    </div>
  );
}
