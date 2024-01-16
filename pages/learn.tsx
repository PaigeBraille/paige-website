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
  isFirstAppearance: boolean;
}

const lessons: Lesson[] = [
  {
    prompt: "Type the letter a?",
    hint: "e.g. ⠁",
    correctInputMatch: "a", // This is the ascii character representing the ascii glyph for A
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter b?",
    hint: "e.g. ⠃",
    correctInputMatch: "b", // This is the ascii character representing the ascii glyph for B
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter c?",
    hint: "e.g. ⠉",
    correctInputMatch: "c", // This is the ascii character representing the ascii glyph for C
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

  const lessonsInProgress: LessonInProgress[] = lessons.map((lesson) => ({
    ...lesson,
    numberOfSuccesses: 0,
    isFirstAppearance: true,
  }));
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Learn</Heading>
        </div>
        {authenticated ? (
          <>
            <Learn lessons={lessonsInProgress} />
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
  const incompleteLessons = lessons.filter(
    (lesson) => lesson.numberOfSuccesses < lesson.numberOfSuccessesToPass,
  );

  const randomLessonIndex = Math.floor(
    Math.random() * incompleteLessons.length,
  );
  return incompleteLessons[randomLessonIndex];
}

function Learn({ lessons }: { lessons: LessonInProgress[] }) {
  const [lessonsInProgress, setLessonsInProgress] =
    useState<LessonInProgress[]>(lessons);
  const [currentLesson, setCurrentLesson] = useState<LessonInProgress>(
    lessonsInProgress[0],
  );

  const handleLessonCompletion = (lesson: LessonInProgress) => {
    // Increment the number of successes for the old lesson
    const updatedLessonsInProgress = lessonsInProgress.map((prevLesson) =>
      prevLesson.prompt === lesson.prompt
        ? {
            ...prevLesson,
            numberOfSuccesses: prevLesson.numberOfSuccesses + 1,
          }
        : prevLesson,
    );
    setLessonsInProgress(updatedLessonsInProgress);

    // Set the old lesson to not be the first appearance
    setLessonsInProgress((prevLessonsInProgress) =>
      prevLessonsInProgress.map((prevLesson) =>
        prevLesson.prompt === lesson.prompt
          ? { ...prevLesson, isFirstAppearance: false }
          : prevLesson,
      ),
    );

    // Get a new random lesson
    const newRandomLesson = selectRandomLesson(updatedLessonsInProgress);
    setCurrentLesson(newRandomLesson);
  };

  const isLessonComplete = lessonsInProgress.every(
    (lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass,
  );

  return (
    <>
      <LessonProgressBar lessonsInProgress={lessonsInProgress} />
      {isLessonComplete ? (
        <>{"Lesson complete!"}</>
      ) : (
        <Lesson
          lesson={currentLesson}
          onCompletion={() => handleLessonCompletion(currentLesson)}
        ></Lesson>
      )}
    </>
  );
}

function Lesson({
  lesson,
  onCompletion,
}: {
  lesson: LessonInProgress;
  onCompletion: () => void;
}) {
  const [inputText, setInputText] = useState<string>("");
  const [lessonStatus, setLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");
  const [showHint, setShowHint] = useState<boolean>(lesson.isFirstAppearance);

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
