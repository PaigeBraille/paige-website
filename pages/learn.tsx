import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import Login from "../components/Login"; // Import the Login component
import ProgressBar from "../components/ProgressBar";
import { BrailleTextBox } from "@/components/BrailleTextBox";

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
            <Learn lessons={lessons} />
          </>
        ) : (
          // Render the Login component when not authenticated
          <Login setAuthenticated={handleAuthentication} />
        )}
      </div>
    </Wrapper>
  );
}

function LessonProgressBar({
  lessonsInProgress,
}: {
  lessonsInProgress: LessonInProgress[];
}) {
  const totalLevels = lessonsInProgress.reduce(
    (total, lesson) => total + lesson.numberOfSuccessesToPass,
    0,
  );

  const totalProgress = lessonsInProgress.reduce(
    (total, lesson) => total + lesson.numberOfSuccesses,
    0,
  );

  return <ProgressBar currentLevel={totalProgress} totalLevels={totalLevels} />;
}

function selectRandomLesson(lessons: LessonInProgress[]) {
  const randomLessonIndex = Math.floor(Math.random() * lessons.length);
  return lessons[randomLessonIndex];
}

function Learn({ lessons }: { lessons: Lesson[] }) {
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

    setLessonsInProgress((prevLessonsInProgress) =>
      prevLessonsInProgress.map((lesson) =>
        lesson === currentLesson
          ? { ...lesson, numberOfSuccesses: lesson.numberOfSuccesses + 1 }
          : lesson,
      ),
    );
  };

  return (
    <>
      <LessonProgressBar lessonsInProgress={lessonsInProgress} />
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
      setLessonStatus("pending");
    } else {
      setLessonStatus("incorrect");
    }
  }

  return (
    <>
      <div>{lesson.prompt}</div> {/* Display the question prompt */}
      <BrailleTextBox
        onChange={onTextChange}
        value={inputText}
      ></BrailleTextBox>
      <div>Lesson Status: {lessonStatus}</div>
    </>
  );
}
