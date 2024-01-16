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
    hint: "a is dot 1",
    correctInputMatch: "a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter b?",
    hint: "b is dots 1 2",
    correctInputMatch: "b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter c?",
    hint: "c is dots 1 4",
    correctInputMatch: "c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter k?",
    hint: "k is dots 1 3",
    correctInputMatch: "k",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter l?",
    hint: "l is dots 1 2 3",
    correctInputMatch: "l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter m?",
    hint: "m is dots 1 3 4",
    correctInputMatch: "m",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter u?",
    hint: "u is dots 1 3 6",
    correctInputMatch: "u",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter v?",
    hint: "v is dots 1 2 3 6",
    correctInputMatch: "v",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter x?",
    hint: "x is dots 1 3 4 6",
    correctInputMatch: "x",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter d?",
    hint: "d is dots 1 4 5",
    correctInputMatch: "d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter f?",
    hint: "f is dots 1 2 4",
    correctInputMatch: "f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter n?",
    hint: "n is dots 1 3 4 5",
    correctInputMatch: "n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter p?",
    hint: "p is dots 1 2 3 4",
    correctInputMatch: "p",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter y?",
    hint: "y is dots 1 3 4 5 6",
    correctInputMatch: "y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter e?",
    hint: "e is dots 1 5",
    correctInputMatch: "e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter i?",
    hint: "i is dots 2 4",
    correctInputMatch: "i",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter o?",
    hint: "o is dots 1 3 5",
    correctInputMatch: "o",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter s?",
    hint: "s is dots 2 3 4",
    correctInputMatch: "s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter z?",
    hint: "z is dots 1 3 5 6",
    correctInputMatch: "z",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter h?",
    hint: "h is dots 1 2 5",
    correctInputMatch: "h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter j?",
    hint: "j is dots 2 4 5",
    correctInputMatch: "j",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter r?",
    hint: "r is dots 1 2 3 5",
    correctInputMatch: "r",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter t?",
    hint: "t is dots 2 3 4 5",
    correctInputMatch: "t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter w?",
    hint: "w is dots 2 4 5 6",
    correctInputMatch: "w",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter g?",
    hint: "g is dots 1 2 4 5",
    correctInputMatch: "g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the letter q?",
    hint: "q is dots 1 2 3 4 5",
    correctInputMatch: "q",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 1?",
    hint: "1 is dots 3 4 5 6, dot 1",
    correctInputMatch: "#a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 2?",
    hint: "2 is dots 3 4 5 6, dots 1 2",
    correctInputMatch: "#b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 3?",
    hint: "3 is dots 3 4 5 6, dots 1 4",
    correctInputMatch: "#c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 4?",
    hint: "4 is dots 3 4 5 6, dots 1 4 5",
    correctInputMatch: "#d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 5?",
    hint: "5 is dots 3 4 5 6, dots 1 5",
    correctInputMatch: "#e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 6?",
    hint: "6 is dots 3 4 5 6, dots 1 2 4",
    correctInputMatch: "#f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 7?",
    hint: "7 is dots 3 4 5 6, dots 1 2 4 5",
    correctInputMatch: "#g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 8?",
    hint: "8 is dots 3 4 5 6, dots 1 2 5",
    correctInputMatch: "#h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 9?",
    hint: "9 is dots 3 4 5 6, dots 2 4",
    correctInputMatch: "#i",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the number 0?",
    hint: "0 is dots 3 4 5 6, dots 2 4 5",
    correctInputMatch: "#j",
    numberOfSuccessesToPass: 3,
  },
  // {
  //   prompt: "Type the comma ,?",
  //   hint: "e.g. ⠂",
  //   correctInputMatch: ",",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the apostrophe '?",
  //   hint: "e.g. ⠄",
  //   correctInputMatch: "'",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the colon :?",
  //   hint: "e.g. ⠒",
  //   correctInputMatch: ":",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the semicolon ;?",
  //   hint: "e.g. ⠆",
  //   correctInputMatch: ";",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the hyphen -?",
  //   hint: "e.g. ⠤",
  //   correctInputMatch: "-",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the period .?",
  //   hint: "e.g. ⠲",
  //   correctInputMatch: ".",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the exclamation mark !?",
  //   hint: "e.g. ⠖",
  //   correctInputMatch: "!",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the question mark ??",
  //   hint: "e.g. ⠦",
  //   correctInputMatch: "?",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: 'Type the opening double quote "?',
  //   hint: 'e.g. ⠦',
  //   correctInputMatch: '"',
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: 'Type the closing double quote "?',
  //   hint: 'e.g. ⠴',
  //   correctInputMatch: '"',
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the left parenthesis (?",
  //   hint: "e.g. ⠐⠣",
  //   correctInputMatch: "(",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the right parenthesis )?",
  //   hint: "e.g. ⠐⠜",
  //   correctInputMatch: ")",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the at symbol @?",
  //   hint: "e.g. ⠈⠁",
  //   correctInputMatch: "@",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the ampersand symbol &?",
  //   hint: "e.g. ⠈⠯",
  //   correctInputMatch: "&",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the plus symbol +?",
  //   hint: "e.g. ⠐⠖",
  //   correctInputMatch: "+",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the equals symbol =?",
  //   hint: "e.g. ⠐⠶",
  //   correctInputMatch: "=",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the percent symbol %?",
  //   hint: "e.g. ⠨⠴",
  //   correctInputMatch: "%",
  //   numberOfSuccessesToPass: 3,
  // },
  // {
  //   prompt: "Type the hash symbol #?",
  //   hint: "e.g. ⠼⠔",
  //   correctInputMatch: "#",
  //   numberOfSuccessesToPass: 3,
  // },
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
