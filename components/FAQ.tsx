import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronLeft } from "@fortawesome/free-solid-svg-icons";


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
    <div className="flex flex-col">
      {props.questions.map((q, index) => (
        <div
          key={q.question}
          className="flex items-start flex-col px-4 py-4 gap-2 md:border-x border-b border-paigedarkgrey"
        >
          <div
            className="flex flex-row justify-between cursor-pointer w-full gap-4 items-center"
            onClick={() => handleClick(index)}
          >
            <span className="inline-flex md:text-xl font-bold leading-tight tracking-tight">
              {q.question}
            </span>
            <span className="text-gray-600 inline-flex text-lg md:text-2xl">
              {index === activeQuestion ? <FontAwesomeIcon icon={faChevronDown} size="xs"/> : <FontAwesomeIcon icon={faChevronLeft} size="xs"/>}
            </span>
          </div>
          {index === activeQuestion && (
            <div
              key={q.question}
              className={`text-sm ${
                index === activeQuestion
                  ? "flex w-full flex-col gap-2"
                  : "hidden"
              }`}
            >
              {q.answer.map((a) => {
                return (
                  <span key={a} className="block">
                    {a}
                  </span>
                );
              })}
              {q.fragment}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
