import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import Login from "../components/Login"; // Import the Login component
import ProgressBar from "../components/ProgressBar";
import { BrailleTextBox } from "@/components/BrailleTextBox";

export default function LearnPage() {
  // Add a state to track if the user is authenticated
  const [authenticated, setAuthenticated] = useState(false);

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

function Learn() {
  const [inputText, setInputText] = useState<string>("");
  const [currentLessonStatus, setCurrentLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");
  const [lessonsInProgress, setLessonsInProgress] = useState<
    LessonInProgress[]
  >(lessons.map((lesson) => ({ ...lesson, numberOfSuccesses: 0 })));

  // Randomly select a lesson from the lessonsInProgress array
  const randomLessonIndex = Math.floor(
    Math.random() * lessonsInProgress.length,
  );
  const randomLesson = lessonsInProgress[randomLessonIndex];

  // Rest of the code...

  function onTextChange(newAsciiString: string) {
    if (newAsciiString === lessons[0].correctInputMatch) {
      setCurrentLessonStatus("correct");
    } else {
      setCurrentLessonStatus("incorrect");
    }
    setInputText(newAsciiString);
  }

  return (
    <>
      <div>{lessons[0].prompt}</div> {/* Display the question prompt */}
      <BrailleTextBox onChange={onTextChange}></BrailleTextBox>
      <div>Lesson Status: {currentLessonStatus}</div>
    </>
  );
}

function Lesson({ lesson }: { lesson: Lesson }) {
  const [inputText, setInputText] = useState<string>("");
  const [currentLessonStatus, setCurrentLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");
  const [lessonsInProgress, setLessonsInProgress] = useState<
    LessonInProgress[]
  >(lessons.map((lesson) => ({ ...lesson, numberOfSuccesses: 0 })));

  // Randomly select a lesson from the lessonsInProgress array
  const randomLessonIndex = Math.floor(
    Math.random() * lessonsInProgress.length,
  );
  const randomLesson = lessonsInProgress[randomLessonIndex];

  // Rest of the code...

  function onTextChange(newAsciiString: string) {
    if (newAsciiString === lessons[0].correctInputMatch) {
      setCurrentLessonStatus("correct");
    } else {
      setCurrentLessonStatus("incorrect");
    }
    setInputText(newAsciiString);
  }

  return (
    <>
      <div>{lessons[0].prompt}</div> {/* Display the question prompt */}
      <BrailleTextBox onChange={onTextChange}></BrailleTextBox>
      <div>Lesson Status: {currentLessonStatus}</div>
    </>
  );
}
