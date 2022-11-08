import React from "react";
import Contact from "./components/Contact";
import Demo from "./components/Demo";
import Footer from "./components/Footer";
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
        <Info />
      </div>
      <div className="bg-primary w-full flex justify-center pt-6">
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
        <Demo />
        <Quote />
        <People />
      </div>
      <Partners />
      <Contact />
      <Footer />
    </div>
  );
}
