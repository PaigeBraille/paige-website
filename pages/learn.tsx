import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import Login from "../components/Login"; // Import the Login component
import ProgressBar from "../components/ProgressBar";
import { BrailleTextBox } from "@/components/BrailleTextBox";

interface Lesson {
  prompt: string;
  hint: string;
  correctInputMatch: string;
  numberOfSuccessesToPass: number;
}

interface LessonInProgress extends Lesson {
  numberOfSuccesses: number;
}

const lessons: Lesson[] = [
  {
    prompt: "Type the letter a?",
    hint: "e.g. ⠁",
    correctInputMatch: "a", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter b",
    hint: "e.g. ⠃",
    correctInputMatch: "b", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter c?",
    hint: "e.g. ⠉",
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

// I would like this lesson to filter out lessons which have been completed i.e. numberOfSuccesses === numberOfSuccessesToPass.
// It should never return a lesson which has been completed.
function selectRandomLesson(lessons: LessonInProgress[]) {
  const incompleteLessons = lessons.filter(
    (lesson) => lesson.numberOfSuccesses < lesson.numberOfSuccessesToPass,
  );

  const randomLessonIndex = Math.floor(
    Math.random() * incompleteLessons.length,
  );
  return incompleteLessons[randomLessonIndex];
}

function Learn({ lessons }: { lessons: Lesson[] }) {
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

  const isLessonComplete = lessonsInProgress.every(
    (lesson) => lesson.numberOfSuccesses === lesson.numberOfSuccessesToPass,
  );

  return (
    <>
      <LessonProgressBar lessonsInProgress={lessonsInProgress} />
      {isLessonComplete ? (
        <>{"Lesson complete!"}</>
      ) : (
        <Lesson
          lesson={currentLesson}
          onCompletion={handleLessonCompletion}
        ></Lesson>
      )}
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
  const [showHint, setShowHint] = useState<boolean>(false);

  function onTextChange(newAsciiString: string) {
    setInputText(newAsciiString);
    if (newAsciiString === lesson.correctInputMatch) {
      setLessonStatus("correct");
      setInputText("");
      onCompletion();
      setLessonStatus("pending");
      setShowHint(false);
    } else {
      setLessonStatus("incorrect");
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          justifyItems: "center",
          alignItems: "center",
          paddingTop: "1rem",
          paddingBottom: "1rem",
        }}
      >
        <div>
          {lesson.prompt}
          {showHint && ` ${lesson.hint}`}
        </div>{" "}
        {/* Display the question prompt and hint if showHint is true */}
        <button
          className="bg-primary text-white font-bold rounded-md py-2 px-2 mt-2 mx-2 hover:bg-blue-700"
          onClick={toggleHint}
        >
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
      </div>
      <BrailleTextBox
        onChange={onTextChange}
        value={inputText}
      ></BrailleTextBox>
      <div>Lesson Status: {lessonStatus}</div>
    </>
  );
}
