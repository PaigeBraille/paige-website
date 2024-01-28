import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../../components/Wrapper";
import Heading from "../../components/Heading";
import Login from "../../components/Login"; // Import the Login component
import ProgressBar from "../../components/ProgressBar";
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

interface Chapter {
  name: string;
  description: string;
  lessons: Lesson[];
}

const LESSONS: Lesson[] = [
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
  {
    prompt: "Type the comma symbol ,?",
    hint: ", is dot 2",
    correctInputMatch: "1",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the apostrophe symbol '?",
    hint: "' is dot 3",
    correctInputMatch: "'",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the colon symbol :?",
    hint: ": is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the semicolon symbol ;?",
    hint: "; is dot 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the hyphen symbol -?",
    hint: "- is dots 3 6",
    correctInputMatch: "-",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the period symbol .?",
    hint: ". is dots 2 5 6",
    correctInputMatch: "4",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the exclamation mark symbol !?",
    hint: "! is dots 2 3 5",
    correctInputMatch: "6",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the question mark symbol ??",
    hint: "? is dots 2 3 6",
    correctInputMatch: "8",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: 'Type the opening quote symbol "?',
    hint: '" is dots 2 3 6',
    correctInputMatch: "8",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: 'Type the closing quote symbol "?',
    hint: '" is dots  3 5 6',
    correctInputMatch: "0",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the left parenthesis symbol ( ?",
    hint: "( is dot 5, dots 1 2 6",
    correctInputMatch: '"<',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the right parenthesis symbol ) ?",
    hint: ") is dot 5, dots 3 4 5",
    correctInputMatch: '">',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the less than symbol < ?",
    hint: "< is dot 4, dots 1 2 6",
    correctInputMatch: "@<",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the greater than symbol > ?",
    hint: "> is dot 4, dots 3 4 5",
    correctInputMatch: "@>",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the at symbol @?",
    hint: "@ is dot 4, dot 1",
    correctInputMatch: "@a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the ampersand symbol &?",
    hint: "& is dot 4, dots 1 2 3 4 6",
    correctInputMatch: "@&",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the plus symbol +?",
    hint: "+ is dot 5, dots 2 3 5",
    correctInputMatch: '"6',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the equals symbol =?",
    hint: "= is dot 5, dots 2 3 5 6",
    correctInputMatch: '"7',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the percent symbol %?",
    hint: "% is dots 4 6, dots 3 5 6",
    correctInputMatch: ".0",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the hash symbol #?",
    hint: "# is dots 4 5 6, dots 1 4 5 6",
    correctInputMatch: "_?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign but?",
    hint: "but is dots 1 2",
    correctInputMatch: "b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign can?",
    hint: "can is dots 1 4",
    correctInputMatch: "c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign do?",
    hint: "do is dots 1 4 5",
    correctInputMatch: "d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign every?",
    hint: "every is dots 1 5",
    correctInputMatch: "e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign from?",
    hint: "from is dots 1 2 4",
    correctInputMatch: "f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign go?",
    hint: "go is dots 1 2 4 5",
    correctInputMatch: "g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign have?",
    hint: "have is dots 1 2 5",
    correctInputMatch: "h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign just?",
    hint: "just is dots 2 4 5",
    correctInputMatch: "j",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign knowledge?",
    hint: "knowledge is dots 1 3",
    correctInputMatch: "k",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign like?",
    hint: "like is dots 1 2 3",
    correctInputMatch: "l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign more?",
    hint: "more is dots 1 3 4",
    correctInputMatch: "m",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign not?",
    hint: "not is dots 1 3 4 5",
    correctInputMatch: "n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign people?",
    hint: "people is dots 1 2 3 4",
    correctInputMatch: "p",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign quite?",
    hint: "quite is dots 1 2 3 4 5",
    correctInputMatch: "q",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign rather?",
    hint: "rather is dots 1 2 3 5",
    correctInputMatch: "r",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign so?",
    hint: "so is dots 2 3 4",
    correctInputMatch: "s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign that?",
    hint: "that is dots 2 3 4 5",
    correctInputMatch: "t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign us?",
    hint: "us is dots 1 3 6",
    correctInputMatch: "u",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign very?",
    hint: "very is dots 1 2 3 6",
    correctInputMatch: "v",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign will?",
    hint: "will is dots 2 4 5 6",
    correctInputMatch: "w",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign it?",
    hint: "it is dots 1 3 4 6",
    correctInputMatch: "x",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign you?",
    hint: "you is dots 1 3 4 5 6",
    correctInputMatch: "y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the wordsign as?",
    hint: "as is dots 1 3 5 6",
    correctInputMatch: "z",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the contraction and?",
    hint: "and is dots 1 2 3 4 6",
    correctInputMatch: "&",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the contraction for?",
    hint: "for is dots 1 2 3 4 5 6",
    correctInputMatch: "=",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the contraction of?",
    hint: "of is dots 1 2 3 5 6",
    correctInputMatch: "(",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the contraction the?",
    hint: "the is dots 2 3 4 6",
    correctInputMatch: "!",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the contraction with?",
    hint: "with is dots 2 3 4 5 6",
    correctInputMatch: ")",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign child?",
    hint: "child is dots 1 6",
    correctInputMatch: "*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign shall?",
    hint: "shall is dots 1 4 6",
    correctInputMatch: "%",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign this?",
    hint: "this is dots 1 4 5 6",
    correctInputMatch: "?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign which?",
    hint: "which is dots 1 5 6",
    correctInputMatch: ":",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign out?",
    hint: "out is dots 1 2 5 6",
    correctInputMatch: "\\",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong wordsign still?",
    hint: "still is dots 3 4",
    correctInputMatch: "/",
    numberOfSuccessesToPass: 3,
  },
  // Strong Groupsigns
  {
    prompt: "Type the strong groupsign ch?",
    hint: "ch is dots 1 6",
    correctInputMatch: "*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign sh?",
    hint: "sh is dots 1 4 6",
    correctInputMatch: "%",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign th?",
    hint: "th is dots 1 4 5 6",
    correctInputMatch: "?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign wh?",
    hint: "wh is dots 1 5 6",
    correctInputMatch: ":",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign ou?",
    hint: "ou is dots 1 2 5 6",
    correctInputMatch: "\\",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign st?",
    hint: "st is dots 3 4",
    correctInputMatch: "/",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign gh?",
    hint: "gh is dots 1 2 6",
    correctInputMatch: "<",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign ed?",
    hint: "ed is dots 1 2 4 6",
    correctInputMatch: "$",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign er?",
    hint: "er is dots 1 2 4 5 6",
    correctInputMatch: "]",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign ow?",
    hint: "ow is dots 2 4 6",
    correctInputMatch: "[",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign ar?",
    hint: "ar is dots 3 4 5",
    correctInputMatch: ">",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the strong groupsign ing?",
    hint: "ing is dots 3 4 6",
    correctInputMatch: "+",
    numberOfSuccessesToPass: 3,
  },

  // Lower Groupsigns
  {
    prompt: "Type the lower groupsign ea?",
    hint: "ea is dot 2",
    correctInputMatch: "1",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign bb?",
    hint: "bb is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign cc?",
    hint: "cc is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign ff?",
    hint: "ff is dots 2 3 5",
    correctInputMatch: "6",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign gg?",
    hint: "gg is dots 2 3 5 6",
    correctInputMatch: "7",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign be?",
    hint: "be is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign con?",
    hint: "con is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign dis?",
    hint: "dis is dots 2 5 6",
    correctInputMatch: "4",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign en?",
    hint: "en is dots 2 6",
    correctInputMatch: "5",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "Type the lower groupsign in?",
    hint: "in is dots 3 5",
    correctInputMatch: "9",
    numberOfSuccessesToPass: 3,
  },

  // Lower Wordsigns
  {
    prompt: "Type the lower wordsign be?",
    hint: "be is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
];

const CHAPTERS: Chapter[] = [
  {
    name: "Chapter 1",
    description: "The alphabet",
    lessons: [
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
    ],
  },
  {
    name: "Chapter 2",
    description: "The alphabet extended",
    lessons: [
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
    ],
  },
];

export default function LearnPage() {
  // Add a state to track if the user is authenticated
  const [authenticated, setAuthenticated] = useState(true);

  // Define a function to set the authenticated state
  const handleAuthentication = (value: boolean) => {
    setAuthenticated(value);
  };

  const lessonsInProgress: LessonInProgress[] = LESSONS.map((lesson) => ({
    ...lesson,
    numberOfSuccesses: 0,
    isFirstAppearance: true,
  }));
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        {authenticated ? (
          <>
            <ChapterList chapters={CHAPTERS} />
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

function Lessons({ lessons }: { lessons: LessonInProgress[] }) {
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
            isFirstAppearance: false,
          }
        : prevLesson,
    );
    setLessonsInProgress(updatedLessonsInProgress);

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
        <IndividualLesson
          lesson={currentLesson}
          onCompletion={() => handleLessonCompletion(currentLesson)}
        ></IndividualLesson>
      )}
    </>
  );
}

function IndividualLesson({
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
      // setShowHint(false);
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

function Chapter({
  chapter,
  setSelectedChapter,
}: {
  chapter: Chapter;
  setSelectedChapter: React.Dispatch<React.SetStateAction<Chapter | null>>;
}) {
  const { name, description, lessons } = chapter;
  const lessonsInProgress: LessonInProgress[] = lessons.map((lesson) => ({
    ...lesson,
    numberOfSuccesses: 0,
    isFirstAppearance: true,
  }));

  const goBack = () => {
    setSelectedChapter(null);
  };

  return (
    <div className="py-6 md:py-12 px-4">
      <div className="bg-white flex justify-between items-center align-content-center my-6">
        <div className="flex">
          <Heading css="text-start leading-tight text-primary mr-3">
            {name}{" "}
          </Heading>
          <Heading css="text-start leading-tight text-tertiary">
            {` ${description}`}
          </Heading>
        </div>
        <button
          className="bg-primary text-white font-bold rounded-md py-2 px-2 mt-2 mx-2 hover:bg-blue-700"
          onClick={goBack}
        >
          Back
        </button>
      </div>
      <Lessons lessons={lessonsInProgress} />
    </div>
  );
}

function ChapterList({ chapters }: { chapters: Chapter[] }) {
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  return (
    <>
      {selectedChapter === null && (
        <div className="py-6 md:py-12 px-4">
          <div className="bg-white flex justify-between items-end">
            <Heading css="text-start leading-tight text-primary">Learn</Heading>
          </div>
          <ul>
            {chapters.map((chapter) => (
              <li key={chapter.name}>
                <button
                  onClick={() => setSelectedChapter(chapter)}
                  className="bg-primary text-white font-bold rounded-md py-2 px-4 mt-2  hover:bg-blue-700"
                >
                  {`${chapter.name} - ${chapter.description}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedChapter && (
        <Chapter
          chapter={selectedChapter}
          setSelectedChapter={setSelectedChapter}
        />
      )}
    </>
  );
}
