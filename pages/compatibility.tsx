import { Wrapper } from "../components/Wrapper";
import React from "react";
import {
  CompatibilitySection1,
  CompatibilitySection2,
  CompatibilitySection3,
} from "../components/CompatibilityLinks";

const CompatibilityText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-6 px-4 md:py-12">
      <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight md:w-2/3 font-extralight">
        <span className="font-extrabold text-primary">Paige Connect</span> works with your{" "}
        favourite braille software!
      </h1>
    </div>
  );
};

export default function Compatibility() {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <CompatibilityText />
        <CompatibilitySection1 />
        <CompatibilitySection2 />
        <CompatibilitySection3 />
      </div>
    </Wrapper>
  );
}
