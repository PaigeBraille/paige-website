import React, { useEffect, useState } from "react";
import Arrow from "../svg/arrow.svg";
import "../vendor/build-tables-embeded-root-utf16";
import "../vendor/easy-api";

export default function Demo() {
  const [english, setEnglish] = useState("");
  const [braille, setBraille] = useState("");
  const [forwards, setForwards] = useState(true);

  const START_TEXT = `With our web app, users can save and load Braille files, and sighted peers can interact with translated versions of Braille content.`;

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
    <section className="flex flex-col bg-white px-2 py-6 lg:p-12 gap-4">
      <button className="flex flex-row justify-center content-center arrow-pointer">
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
            className={`w-full border-solid border-2 border-primary rounded-md h-36 p-2 sm:p-4 text-xs sm:text-base ${
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
            className={`w-full border-solid border-2 border-primary rounded-md h-36 p-2 sm:p-4 text-xs sm:text-base braille ${
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
