import React, { useState } from "react";
import Heading from "./Heading";

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleClick = (index) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  const questions = [
    {
      question: "Better ways to help visually impaired people",
      answer: "Paige can help visually impaired people by allowing them to easily produce written braille documents, which can be used to read and write independently and access written information more easily.",
    },
    {
      question: "Is Paige and affordable device",
      answer:
        "Yes it is very affordable because A B C.",
    },
    {
        question: "When will it be available",
        answer:
          "Paige will be available when we do X Y and Z probably in 2023",
      },
    // Add more questions here...
  ];

  return (
    <div className="mb-6">
        <Heading css="text-start w-full p-4 md:p-6 bg-green-100 rounded-t-lg">FAQ</Heading>
    <div className="flex flex-col gap-4 border-2 border-gray-300 p-4 md:p-6">
      {questions.map((q, index) => (
        <div key={q.question} className="flex items-start flex-col">
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
