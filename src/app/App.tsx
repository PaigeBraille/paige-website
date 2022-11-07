import React from "react";
import Demo from "./components/Demo";
import Info from "./components/Info";
import PaigeHeader from "./components/PaigeHeader";
import Partners from "./components/partners/Partners";
import Quote from "./components/Quote";
import People from "./components/team/People";
import Device from "./img/device.png";
export function App() {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <PaigeHeader />

      <div
        style={{
          maxWidth: "1400px",
          margin: "auto",
          padding: "6px",
          width: "100%",
        }}
      >
        <Demo />
        <Info />
      </div>
      <div className="bg-primary w-full flex justify-center mb-8 lg:mb-12 pt-6">
      <img src={Device} style={{ height: "300px", width: "auto" }} />
      </div>
      
      <div
        style={{
          maxWidth: "1400px",
          margin: "auto",
          padding: "6px",
          width: "100%",
        }}
      >
        <Quote />
        <People />
      </div>
      <Partners />
    </div>
  );
}
