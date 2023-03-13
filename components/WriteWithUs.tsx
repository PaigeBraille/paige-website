import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import graphic from "../public/graphicbraille.png";

const WRITE_WITH_US_CONTENT =
  "We have included a tool that translates print into braille and allows you to generate braille files in Universal English Braille Grade 1 and 2. Check it out! ";
  
export default function WriteWithUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center md:justify-between w-full px-4 sm:px-8">
      <div className="flex flex-col gap-6 items-center sm:items-start">
        <Heading css="sm:text-start">Write with us</Heading>
        <span>{WRITE_WITH_US_CONTENT}</span>
        <a
          className="border rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit sm:mt-4"
          href="https://paigetranslate.netlify.app/"
        >
          Translation tool
        </a>
      </div>
      <div>
        <Image
          src={graphic}
          className="max-w-64 sm:max-w-xs md:max-w-sm"
          alt="Paige Device"
        />
      </div>
    </div>
  );
}
