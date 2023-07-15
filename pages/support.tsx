import { Wrapper } from "../components/Wrapper";
import React from "react";
import path from "path";
import Heading from "../components/Heading";
import {Swap, Connect, Share, Update} from "../components/SupportSection";
import FAQ, { FAQuestion } from "../components/FAQ";
import ManualSection from "../components/ManualSection";


const questions: FAQuestion[] = [
    {
      question: "Swap",
      answer: [],
      fragment: <Swap />,
    },
    {
      question: "Connect",
      answer: [],
      fragment:  <Connect />,
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
        <ManualSection />
      </div>
    </Wrapper>
  );
}
