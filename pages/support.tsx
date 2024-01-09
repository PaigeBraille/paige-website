import { Wrapper } from "../components/Wrapper";
import React from "react";
import path from "path";
import Heading from "../components/Heading";
import {
  Swap,
  ConnectA,
  ConnectB,
  Share,
  Update,
  Name,
} from "../components/SupportSection";
import FAQ, { FAQuestion } from "../components/FAQ";
import ManualSection from "../components/ManualSection";

const questions: FAQuestion[] = [
  {
    question: "Swap",
    answer: [],
    fragment: <Swap />,
  },
  {
    question: "Connect (without internet)",
    answer: [],
    fragment: <ConnectA />,
  },
  {
    question: "Connect (with internet)",
    answer: [],
    fragment: <ConnectB />,
  },
  {
    question: "Share",
    answer: [],
    fragment: <Share />,
  },
  {
    question: "Update",
    answer: [],
    fragment: <Update />,
  },
  {
    question: "Name",
    answer: [],
    fragment: <Name />,
  },
  // Add more questions here...
];

export default function Support() {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Manual</Heading>
        </div>
        <div className="border-t border-paigedarkgrey  md:mb-6">
          <FAQ questions={questions} />
        </div>
        <ManualSection />
      </div>
    </Wrapper>
  );
}
