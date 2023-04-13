import { Wrapper } from "../components/Wrapper";
import React from "react";
import Image from "next/image";
import device from "../public/home_connect3.png";

import {
  GraphicSection1,
  GraphicSection2,
  GraphicSection3,
} from "../components/GraphicSections";
import PaigeIs from "../components/PaigeIs";
import Partners from "../components/Partners";
import TestimonialsSection from "../components/Testimonials";
import WriteWithUs from "../components/WriteWithUs";

export default function Home() {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto flex flex-col gap-12 sm:gap-16 sm:px-6 py-6 overflow-clip">
        <PaigeIs />
        {/* <Image
              className="object-center object-contain w-auto"
              src={device}
              alt="Paige Connect Device"
              aria-details="Paige connect device that fits underneath a braille writer. "
              width={700}
            /> */}
        <GraphicSection3 />
        <GraphicSection1 />
        <TestimonialsSection />
        <GraphicSection2 />
        <WriteWithUs />
        <Partners />
      </div>
    </Wrapper>
  );
}
