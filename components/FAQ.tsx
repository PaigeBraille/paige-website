import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

// Register font awesome icons
library.add(faChevronDown);
library.add(faChevronLeft);

export type FAQuestion = {
  question: string; // Question
  answer: string[]; // List of paragraphs
  fragment?: React.ReactNode; // React component to include as part of answer
};

const FAQ = (props: { questions: FAQuestion[] }) => {
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeQuestion, setActiveQuestion] = useState<null | number>(0);

  const handleClick = (index: number) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };

  return (
    <ul className="flex flex-col">
      {props.questions.map((q, index) => (
        <li
          key={q.question}
          className="flex items-start flex-col px-4 py-4 gap-2 border-b border-paigedarkgrey"
        >
          <div
            className="flex flex-row justify-between cursor-pointer w-full gap-4 items-center"
            onClick={() => handleClick(index)}
            aria-label={q.question}
          >
            <h3 className="inline-flex text-xl md:text-xl font-bold leading-tight tracking-tight">
              {q.question}
            </h3>
            <span className="text-gray-600 inline-flex text-xl md:text-2xl">
              {index === activeQuestion ? (
                <FontAwesomeIcon icon={faChevronDown} size="xs" />
              ) : (
                <FontAwesomeIcon icon={faChevronLeft} size="xs" />
              )}
            </span>
          </div>
          <div
            key={q.question}
            className={`text-sm  ${
              index === activeQuestion
                ? "flex w-full flex-col gap-2 visible"
                : "hidden"
            }`}
          >
            {q.answer.map((a) => {
              return (
                <p key={a} className="block">
                  {a}
                </p>
              );
            })}
            {q.fragment}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default FAQ;
