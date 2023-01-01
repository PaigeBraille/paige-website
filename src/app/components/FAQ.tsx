import React, { useState } from "react";
import Heading from "./Heading";

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleClick = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  const questions = [
    {
      question: "What are you working on?",
      answer: "Our first product, Paige Connect, is getting ready for certification! It is an upgrade for existing braille writers which produces digital copies of the braille that is embossed on paper. A web app is hosted locally on Paige Connect and can be accessed wirelessly using any browser on a phone, tablet, or laptop. This enables collaboration with sighted peers, parents, and teachers. We are also developing a multiline paperless alternative to existing braille writers, which is currently under testing with users.",
    },
    {
      question: "Can I help test Paige?",
      answer:
        "Yes! Reach out at hello@paigebraille.com if you want to have a say in the technology created for you.",
    },
    {
        question: "Got another question?",
        answer:
          "You can ask any questions you have about Paige at hello@paigebraille.com.",
      },
    // Add more questions here...
  ];

  return (
    <div className="mb-6">
        <Heading css="text-start w-full px-4 md:px-6 py-4 bg-green-100 rounded-t-lg">FAQ</Heading>
    <div className="flex flex-col border-2 border-gray-300 border-t-0 rounded-b-lg divide-y-2">
      {questions.map((q, index) => (
        <div key={q.question} className="flex items-start flex-col p-4 md:p-4">
          <div
            className="flex flex-row justify-between cursor-pointer w-full gap-2"
            onClick={() => handleClick(index)}
          >
            <div
              className={`inline-flex md:text-xl font-bold ${
                index === activeQuestion ? "text-primary" : "text-black"
              }`}
            >
              {q.question}
            </div>
            <div className="text-gray-600 inline-flex text-lg md:text-2xl">
              {index === activeQuestion ? (
                "‹"
              ) : (
                "›"
              )}
            </div>
          </div>
          {index === activeQuestion && (
            <div
              key={q.answer}
              className={`text-sm md:text-base ${
                index === activeQuestion ? "flex w-full" : "hidden"
              }`}
            >
              {q.answer}
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQ;
