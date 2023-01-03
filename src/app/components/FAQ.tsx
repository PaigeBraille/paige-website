import React, { useState } from "react";
import Heading from "./Heading";

type FAQuestion = {
  question: string; // Question
  answer: string[]; // List of paragraphs
};

const FAQ = () => {
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeQuestion, setActiveQuestion] = useState<null | number>(0);

  const handleClick = (index: number) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  const questions: FAQuestion[] = [
    {
      question: "What are you working on?",
      answer: [
        "Our first product, Paige Connect, is getting ready for certification! It is an upgrade for existing braille writers which produces digital copies of the braille that is embossed on paper.",
        "A web app is hosted locally on Paige Connect and can be accessed wirelessly using any browser on a phone, tablet, or laptop. This enables collaboration with sighted peers, parents, and teachers.",
        "We are also developing a multiline paperless alternative to existing braille writers, which is currently under testing with users.",
      ],
    },
    {
      question: "Can I help test Paige?",
      answer: [
        "Yes! Reach out at hello@paigebraille.com if you want to have a say in the technology created for you.",
      ],
    },
    {
      question: "Got another question?",
      answer: [
        "You can ask any questions you have about Paige at hello@paigebraille.com.",
      ],
    },
    // Add more questions here...
  ];

  return (
    <div className="mb-6">
      <Heading css="text-start w-full px-4 md:px-6 py-4 bg-paigelightgreen rounded-t-lg">
        FAQ
      </Heading>
      <div className="flex flex-col border border-paigedarkgrey border-t-0 rounded-b-lg divide-y divide-paigedarkgrey">
        {questions.map((q, index) => (
          <div
            key={q.question}
            className="flex items-start flex-col p-4 md:p-4 gap-2"
          >
            <div
              className="flex flex-row justify-between cursor-pointer w-full gap-2 items-center"
              onClick={() => handleClick(index)}
            >
              <span className="inline-flex md:text-xl font-bold leading-tight tracking-tight">
                {q.question}
              </span>
              <span className="text-gray-600 inline-flex text-lg md:text-2xl">
                {index === activeQuestion ? "‹" : "›"}
              </span>
            </div>
            {index === activeQuestion && (
              <div
                key={q.question}
                className={`text-sm md:text-base ${
                  index === activeQuestion ? "flex w-full flex-col gap-2" : "hidden"
                }`}
              >
                {q.answer.map((a) => {
                  return (
                    <span key={a} className="block">
                      {a}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
