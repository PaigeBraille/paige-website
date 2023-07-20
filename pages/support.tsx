import { Wrapper } from "../components/Wrapper";
import React from "react";
import path from "path";
import Heading from "../components/Heading";
import {Swap, ConnectA, ConnectB, Share, Update} from "../components/SupportSection";
import FAQ, { FAQuestion } from "../components/FAQ";
import ManualSection from "../components/ManualSection";
import Graphic3 from "../public/svg/graphic-3.svg";


const questions: FAQuestion[] = [
    {
      question: "Swap",
      answer: [],
      fragment: <Swap />,
    },
    {
      question: "Connect (without internet)",
      answer: [],
      fragment:  <ConnectA />,
    },
    {
      question: "Connect (with internet)",
      answer: [],
      fragment:  <ConnectB />,
    },
    {
      question: "Share",
      answer: [],
      fragment:  <Share />,
    },
    {
      question: "Update",
      answer: [],
      fragment:  <Update />,
    },
    // Add more questions here...
  ];

export default function Support() {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-4 md:px-6">
        {/* <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4 border-b border-paigedarkgrey">
          <Heading css="text-start leading-tight">Support</Heading>
        </div> */}
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Manual</Heading>
        </div>
        <div className="border-t border-paigedarkgrey md:mb-6">
            <FAQ questions={questions} />
        </div>
        <div className="flex flex-col">
          <Heading css="text-grey text-center text-lg lg:text-3xl leading-none mt-8 sm:mt-12">
            If you have any questions,<br></br>
            get in touch at <a className="text-primary" href = "mailto: hello@paigebraille.com">hello@paigebraille.com</a>
          </Heading>
          <Graphic3 className="overflow-visible mt-8 h-48 sm:h-64" />
        </div>
        {/* <ManualSection /> */}
      </div>
    </Wrapper>
  );
}
