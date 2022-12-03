import React, { useRef } from "react";
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
  const aboutRef = useRef(null);
  const testimonialRef = useRef(null);
  const translateRef = useRef(null);
  const teamRef = useRef(null);
  const partnersRef = useRef(null);
  const contactRef = useRef(null);

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <PaigeHeader
        links={[
          {
            name: "About",
            location: aboutRef,
          },
          {
            name: "Translate",
            location: translateRef,
          },
          {
            name: "Testimonials",
            location: testimonialRef,
          },
          {
            name: "Team",
            location: teamRef,
          },
          {
            name: "Partners",
            location: partnersRef,
          },
          {
            name: "Contact",
            location: contactRef,
          }
        ]}
      />

      <div
        ref={aboutRef}
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
        <span ref={translateRef}>
          <Demo />
        </span>

        <span ref={testimonialRef}>
          <Quote />
        </span>
        <span ref={teamRef}>
          <People />
        </span>
      </div>
      <span ref={partnersRef}>
        <Partners />
      </span>
      <span ref={contactRef}>
        <Contact />
      </span>

      <Footer />
    </div>
  );
}
