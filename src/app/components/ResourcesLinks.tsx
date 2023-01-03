import React from "react";
import Heading from "./Heading";
import RNIB from "../svg/rnib.svg";
import APH from "../img/aph-logo.png";
import NVDA from "../img/nv-access.png";


export function ResourceSection1() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-primary sm:rounded-lg">
 
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center text-white sm:text-start grow">
            RNIB
            </Heading>
            <span className="text-white">
            The Royal National Institute of Blind People is a UK charity offering information, support, and advice to almost two million people in the UK with sight loss. Visit their website to find out more about braille, learning braille, braille music, braille books and products.
            </span>
            <a className="border rounded-sm border-white px-4 py-2 text-center text-white w-full sm:w-fit" href="https://www.rnib.org.uk/living-with-sight-loss/education-and-learning/braille-tactile-codes/">
              Learn more
            </a>
          </div>
          <RNIB className="block sm:inline-flex w-1/3 my-0 md:w-1/6 md:my-auto md:mr-20" />
        </div>
      </div>
    </section>
  );
}

export function ResourceSection2() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-paigelightgreen sm:rounded-lg">
 
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow">
              NVDA by NV Access
            </Heading>
            <span>
            NVDA is a free and open-source, portable screen reader for Windows operating system and many third-party applications created by NV Access. NVDA is open-source software, which means the code is accessible to anyone. This enables translators and developers around the world to continually contribute to its expansion and improvement!
            </span>
            <a className="border-2 rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit" href="https://www.nvaccess.org/">
              Learn more
            </a>
          </div>
          <img
            className="block sm:inline-flex w-1/2 my-6 md:w-1/5 md:my-auto md:mr-20"
            src={NVDA}
            alt={"NV Access logo."}
          />
        </div>
      </div>
    </section>
  );
}

export function ResourceSection3() {
  return (
    <section className="flex flex-col bg-white gap-4 mb-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-paigeyellow sm:rounded-lg">
 
          <div className="inline-flex flex-col gap-4 max-w-xl sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow">
              BrailleBlaster by the American Printing House
            </Heading>
            <span>
            BrailleBlaster™ is a braille transcription program developed by the American Printing House for the Blind to help transcribers provide blind students with braille textbooks on the first day of class. It has a range of fantastic features from translating braille accurately in UEB or EBAE to formatting braille, automating  line numbered poetry and prose, etc.
            </span>
            <a className="border-2 rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit" href="https://www.brailleblaster.org/">
              Learn more
            </a>
          </div>
          <img
            className="block sm:inline-flex w-1/2 my-6 md:w-1/5 md:my-auto md:mr-20"
            src={APH}
            alt={"American Printing House logo."}
          />
        </div>
      </div>
    </section>
  );
}
