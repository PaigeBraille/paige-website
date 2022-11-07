import React, { useEffect, useState } from "react";
import Arrow from "../svg/arrow.svg";
import "../vendor/build-tables-embeded-root-utf16";
import "../vendor/easy-api";
import Header from "./font/Header";

export default function Demo() {
  const [english, setEnglish] = useState("");
  const [braille, setBraille] = useState("");
  const [forwards, setForwards] = useState(true);

  const START_TEXT = `Worldwide, 43 million people are blind, with 174,000 people in the UK. The RNIB estimates that 15% of these people use braille. The United Nations Convention on the Rights of Persons with Disabilities (CRPD) defines braille as a means of communication and therefore essential in education, freedom of expression, access to information and social inclusion.`;

  function translate(text, forwards) {
    if (forwards) {
      return globalThis.liblouis.translateString(
        "unicode.dis,en-GB-g2.ctb",
        text
      );
    } else {
      return globalThis.liblouis.backTranslateString(
        "unicode.dis,en-GB-g2.ctb",
        text
      );
    }
  }

  useEffect(() => {
    setEnglish(START_TEXT);
    setForwards(true);
  }, []);

  return (
    <section className="flex flex-col bg-white px-2 md:px-6 lg:px-12 pt-12">
      <Header css="text-center mb-4">
        We are building Paige: The world's first low-cost, multiline braille
        display.
      </Header>
      <button className="flex flex-row justify-center content-center pt-6 arrow-pointer mb-4">
        <Arrow
          onClick={() => {
            setForwards(!forwards);
            setBraille("");
            setEnglish("");
          }}
        />
      </button>
      <div className="flex flex-row bg-white gap-2 sm:gap-6">
        <div className="flex flex-col w-1/2 h-full">
          <textarea
            disabled={!forwards}
            className={`w-full border-solid border-2 border-primary rounded-md h-72 p-2 sm:p-4 text-xs sm:text-base ${
              forwards ? "" : "bg-gray-200"
            }`}
            value={forwards ? english : translate(braille, false)}
            onChange={(e) => {
              setEnglish(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col w-1/2 h-full">
          <textarea
            className={`w-full border-solid border-2 border-primary rounded-md h-72 p-2 sm:p-4 text-xs sm:text-base braille ${
              forwards ? "bg-gray-200" : ""
            }`}
            disabled={forwards}
            value={forwards ? translate(english, true) : braille}
            onChange={(e) => {
              setBraille(e.target.value);
            }}
          />
        </div>
      </div>
    </section>
  );
}
