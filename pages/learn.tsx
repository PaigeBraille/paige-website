import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import Login from "../components/Login"; // Import the Login component
import ProgressBar from "../components/ProgressBar";
import { BrailleTextBox } from "@/components/BrailleTextBox";

export default function LearnPage() {
  // Add a state to track if the user is authenticated
  const [authenticated, setAuthenticated] = useState(true);

  // Define a function to set the authenticated state
  const handleAuthentication = (value: boolean) => {
    setAuthenticated(value);
  };
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Learn</Heading>
        </div>
        {authenticated ? (
          <>
            <ProgressBar currentLevel={1} totalLevels={2} />
            <Learn />
          </>
        ) : (
          // Render the Login component when not authenticated
          <Login setAuthenticated={handleAuthentication} />
        )}
      </div>
    </Wrapper>
  );
}

interface Lesson {
  prompt: string;
  correctInputMatch: string;
  numberOfSuccessesToPass: number;
}

interface LessonInProgress extends Lesson {
  numberOfSuccesses: number;
}

const lessons: Lesson[] = [
  {
    prompt: "Type the letter a?",
    correctInputMatch: "a", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter b",
    correctInputMatch: "b", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter c?",
    correctInputMatch: "c", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
];

function selectRandomLesson(lessons: LessonInProgress[]) {
  const randomLessonIndex = Math.floor(Math.random() * lessons.length);
  return lessons[randomLessonIndex];
}

function Learn() {
  const [inputText, setInputText] = useState<string>("");
  const [lessonsInProgress, setLessonsInProgress] = useState<
    LessonInProgress[]
  >(lessons.map((lesson) => ({ ...lesson, numberOfSuccesses: 0 })));
  const [currentLesson, setCurrentLesson] = useState<LessonInProgress>(
    selectRandomLesson(lessonsInProgress),
  );

  const handleLessonCompletion = () => {
    const newRandomLesson = selectRandomLesson(lessonsInProgress);
    setCurrentLesson(newRandomLesson);
  };

  return (
    <>
      <Lesson
        lesson={currentLesson}
        onCompletion={handleLessonCompletion}
      ></Lesson>
    </>
  );
}

function Lesson({
  lesson,
  onCompletion,
}: {
  lesson: Lesson;
  onCompletion: () => void;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [lessonStatus, setLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");

  function onTextChange(newAsciiString: string) {
    setInputText(newAsciiString);
    if (newAsciiString === lesson.correctInputMatch) {
      setLessonStatus("correct");
      setInputText("");
      onCompletion();
    } else {
      setLessonStatus("incorrect");
    }
  }

  return (
    <>
      <div>{lesson.prompt}</div> {/* Display the question prompt */}
      <BrailleTextBox onChange={onTextChange}></BrailleTextBox>
      <div>Lesson Status: {lessonStatus}</div>
    </>
  );
}
