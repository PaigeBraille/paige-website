import React from "react";
import Contact from "../components/Contact";
import {GraphicSection1, GraphicSection2} from "../components/GraphicSections";
import PaigeIs from "../components/PaigeIs";
import Partners from "../components/partners/Partners";
import TestimonialsSection from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <PaigeIs />
        <GraphicSection1 />
        <TestimonialsSection />
        <GraphicSection2 />
      </div>
      <div className="w-full p-0 m-0">
        <Partners />
        <Contact />
      </div>
    </div>
  );
}
