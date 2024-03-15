import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import NextSense from "../public/svg/nextsense.svg";
import APH from "../public/svg/aph.svg";
import Duxbury from "../public/svg/duxbury.svg";
import nvAccessLogo from "../public/nv-access.png";
import aphLogo from "../public/aph-logo.png";

export function CompatibilitySection1() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-primary sm:rounded-lg">
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center text-white sm:text-start grow">
              UEB Online
            </Heading>
            <span className="text-white">
             The UEB Online website, administered by the NextSense Institute, offers online training programs 
             and competency exams in braille literacy and mathematics using the Unified English Braille (UEB) code.
            </span>
            <a
              className="border rounded-sm border-white px-4 py-2 text-center text-white w-full sm:w-fit"
              href="https://uebonline.org/"
            >
              Learn more
            </a>
          </div>
          <NextSense className="block sm:inline-flex w-20 h-20 my-6 md:w-44 md:h-44 md:my-auto md:mr-20" aria-label="NextSense logo." />
        </div>
      </div>
    </section>
  );
}

export function CompatibilitySection2() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-paigelightgreen sm:rounded-lg">
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow">
              APH Products
            </Heading>
            <span>
             The American Printing House offers a range of software products to help you learn braille. Like Braille Brain, a free self-paced online braille 
             tutorial in the foundations of UEB. 
             Or UEB Math Tutorial, designed to teach UEB for technical materials with a focus on mathematics.
            </span>
            <a
              className="border-2 rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit"
              href="https://uebmath.aphtech.org/"
            >
              Learn more
            </a>
          </div>
          <Image
            className="block sm:inline-flex w-1/2 my-6 md:w-1/5 md:my-auto md:mr-20"
            src={aphLogo}
            alt={"American Printing House logo."}
            height={100}
          />
        </div>
      </div>
    </section>
  );
}

export function CompatibilitySection3() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-paigeyellow sm:rounded-lg">
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow">
              Duxbury
            </Heading>
            <span>
            Duxbury is a braille translation software that can tranlsate braille to print in over 170 languages in either uncontracted or contracted 
            braille. It can produce literary, mathematics, and technical braille.
            </span>
            <a
              className="border-2 rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit"
              href="https://www.duxburysystems.com/"
            >
              Learn more
            </a>
          </div>
          <Duxbury className="block sm:inline-flex w-20 h-20 my-6 md:w-44 md:h-44 md:my-auto md:mr-20"  aria-label="Duxbury logo."  />
        </div>
      </div>
    </section>
  );
}
