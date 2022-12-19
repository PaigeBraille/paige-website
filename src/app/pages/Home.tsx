import React from "react";
import Contact from "../components/Contact";
import {
  GraphicSection1,
  GraphicSection2,
} from "../components/GraphicSections";
import PaigeIs from "../components/PaigeIs";
import Partners from "../components/Partners";
import TestimonialsSection from "../components/Testimonials";
import WriteWithUs from "../components/WriteWithUs";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16 sm:px-6 py-6">
      <PaigeIs />
      <GraphicSection1 />
      <TestimonialsSection />
      <GraphicSection2 />
      <WriteWithUs />
      <Partners />
      <Contact />
    </div>
  );
}
