import React from "react";
import Contact from "../components/Contact";
import Demo from "../components/Demo";
import Info from "../components/Info";
import PaigeIs from "../components/PaigeIs";
import Partners from "../components/partners/Partners";
import Quote from "../components/Quote";
import People from "../components/team/People";
import Device from "../img/device.png";

export default function Home() {
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <PaigeIs />
        <Info />
      </div>
      <div className="w-full p-0 m-0">
        <Partners />
        <Contact />
      </div>
    </div>
  );
}
