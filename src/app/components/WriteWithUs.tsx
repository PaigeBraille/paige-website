import React from "react";
import Heading from "./Heading";
import BrailleGraphic from "../img/graphicbraille.png";

const WRITE_WITH_US_CONTENT =
  " We have included a tool on our web that allows you to generate .brf documents in UEB grade one and two. Electronic braille files contain braille signs (for example, braille contractions) and do not require further conversion into braille. Check it out! ";

export default function WriteWithUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-6  justify-center md:justify-between w-full px-4 sm:px-0">
      <div className="flex flex-col gap-6 items-center sm:items-start">
        <Heading css="sm:text-start sm:ml-12">Write with us</Heading>
        <span className="sm:ml-12">{WRITE_WITH_US_CONTENT}</span>
        <a className="border rounded-sm border-paigedarkgrey sm:ml-12 px-4 py-2 text-center w-full sm:w-fit" href="https://paigetranslate.netlify.app/">
          Translation tool
        </a>
      </div>
      <div>
        <img
          src={BrailleGraphic}
          className="max-w-64 sm:max-w-xs md:max-w-sm"
        />
      </div>
    </div>
  );
}
