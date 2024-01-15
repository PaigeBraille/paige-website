import { Wrapper } from "../components/Wrapper";
import React from "react";
import path from "path";
import Heading from "../components/Heading";
import {
  Swap,
  Translate,
  Learn,
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
    question: "Translate",
    answer: [],
    fragment: <Translate />,
  },
  // {
  //   question: "Connect (with internet)",
  //   answer: [],
  //   fragment: <ConnectB />,
  // },
  {
    question: "Learn",
    answer: [],
    fragment: <Learn />,
  },
  // {
  //   question: "Update",
  //   answer: [],
  //   fragment: <Update />,
  // },
  // {
  //   question: "Name",
  //   answer: [],
  //   fragment: <Name />,
  // },
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
        {/* <div className="flex flex-col bg-white p-4 sm:my-4 justify-between relative gap-6 sm:rounded-lg">
          <div className="flex flex-col justify-between">
            <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-l sm:text-xl md:text-xl">
            Paige Connect works with your favourite braille software{" "}
            <a className="text-primary" href="/compatibility">
              Check it out!
            </a>
            </h2>
          </div>
        </div> */}
        <ManualSection />
      </div>
    </Wrapper>
  );
}
