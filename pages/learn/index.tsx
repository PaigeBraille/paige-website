import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../../components/Wrapper";
import Heading from "../../components/Heading";
import Login from "../../components/Login"; // Import the Login component
import ProgressBar from "../../components/ProgressBar";
import { BrailleLearnBox } from "@/components/BrailleLearnBox";
import audioFile from "./correct.mp3";
import Link from "next/link";
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import HintOn from "../../public/svg/hint-on.svg";
import HintOff from "../../public/svg/hint-off.svg";
import Heart from "../../public/svg/heart.svg";

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

interface Level {
  name: string;
  description: string;
  lessons: Lesson[];
}

export type Chapter = {
  question: string; // Question
  answer: string[]; // List of paragraphs
};

const questions:Chapter[] = [
  {
    question: "Alphabet",
    answer: [],
  },
  // {
  //   question: "Numbers",
  //   answer: [],
  // },
  // {
  //   question: "Signs",
  //   answer: [],
  // },
];

const LESSONS: Lesson[] = [
  {
    prompt: "a",
    hint: "is dot 1",
    correctInputMatch: "a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "b",
    hint: "is dots 1 2",
    correctInputMatch: "b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "c",
    hint: "is dots 1 4",
    correctInputMatch: "c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "k",
    hint: "is dots 1 3",
    correctInputMatch: "k",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "l",
    hint: "is dots 1 2 3",
    correctInputMatch: "l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "m",
    hint: "is dots 1 3 4",
    correctInputMatch: "m",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "u",
    hint: "is dots 1 3 6",
    correctInputMatch: "u",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "v",
    hint: "is dots 1 2 3 6",
    correctInputMatch: "v",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "x",
    hint: "is dots 1 3 4 6",
    correctInputMatch: "x",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "d",
    hint: "is dots 1 4 5",
    correctInputMatch: "d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "f",
    hint: "dots 1 2 4",
    correctInputMatch: "f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "n",
    hint: "is dots 1 3 4 5",
    correctInputMatch: "n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "p",
    hint: "is dots 1 2 3 4",
    correctInputMatch: "p",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "y",
    hint: "is dots 1 3 4 5 6",
    correctInputMatch: "y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "e",
    hint: "is dots 1 5",
    correctInputMatch: "e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "i",
    hint: "is dots 2 4",
    correctInputMatch: "i",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "o",
    hint: "is dots 1 3 5",
    correctInputMatch: "o",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "s",
    hint: "is dots 2 3 4",
    correctInputMatch: "s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "z",
    hint: "is dots 1 3 5 6",
    correctInputMatch: "z",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "h",
    hint: "is dots 1 2 5",
    correctInputMatch: "h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "j",
    hint: "is dots 2 4 5",
    correctInputMatch: "j",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "r",
    hint: "is dots 1 2 3 5",
    correctInputMatch: "r",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "t",
    hint: "is dots 2 3 4 5",
    correctInputMatch: "t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "w",
    hint: "is dots 2 4 5 6",
    correctInputMatch: "w",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "g",
    hint: "is dots 1 2 4 5",
    correctInputMatch: "g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "q",
    hint: "is dots 1 2 3 4 5",
    correctInputMatch: "q",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "1",
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

const allLevels: Level[] = [
  {
    name: "Level 1",
    description: "a, b, c",
    lessons: [LESSONS[0],LESSONS[1],LESSONS[2]],
  },
  {
    name: "Level 2",
    description: "k, l, m",
    lessons: [LESSONS[3],LESSONS[4], LESSONS[5]],
  },
  {
    name: "Level 3",
    description: "u, v, x",
    lessons: [ LESSONS[6],LESSONS[7], LESSONS[8]],
  },
  {
    name: "Level 4",
    description: "d, f",
    lessons: [LESSONS[9], LESSONS[10]],
  },
  {
    name: "Level 5",
    description: "n, p",
    lessons: [LESSONS[11], LESSONS[12]],
  },
  {
    name: "Level 6",
    description: "y",
    lessons: [LESSONS[13]],
  },
  {
    name: "Level 7",
    description: "e, i",
    lessons: [LESSONS[14],LESSONS[15]],
  },
  {
    name: "Level 8",
    description: "o, s",
    lessons: [LESSONS[16],LESSONS[17]],
  },
  {
    name: "Level 9",
    description: "z",
    lessons: [LESSONS[18]],
  },
  {
    name: "Level 10",
    description: "h, j",
    lessons: [LESSONS[19],LESSONS[20]],
  },
  {
    name: "Level 11",
    description: "r, t",
    lessons: [LESSONS[21],LESSONS[22]],
  },
  {
    name: "Level 12",
    description: "w",
    lessons: [LESSONS[23]],
  },
  {
    name: "Level 13",
    description: "g",
    lessons: [LESSONS[24]],
  },
  {
    name: "Level 14",
    description: "q",
    lessons: [LESSONS[25]],
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
            <ChapterList levels={allLevels} />
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
        <div  className="text-center leading-tight text-2xl text-paigedarkgrey p-2">
          Level completed!
        </div>
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

  const audio = new Audio(audioFile);

  let lastInputWasSpaceOrNewline = false;

  useEffect(() => {
    // Update showHint when lesson.isFirstAppearance changes
    setShowHint(lesson.isFirstAppearance);
  }, [lesson.isFirstAppearance]);

  async function onTextChange(newAsciiString: string) {
    // Update lastInputWasSpaceOrNewline based on the current input
    lastInputWasSpaceOrNewline = newAsciiString.endsWith(' ') || newAsciiString.endsWith('\n');

    // Remove the last character if the last input was space bar or newline
    if (lastInputWasSpaceOrNewline) {
      newAsciiString = newAsciiString.slice(0, -1);
    }
  
    setInputText(newAsciiString);
  
    // Check if the last input was space bar or newline
    if (lastInputWasSpaceOrNewline && newAsciiString === lesson.correctInputMatch) {
      setLessonStatus("correct");
      audio.play();
  
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 500));
  
      setLessonStatus("pending");
      setInputText("");
      onCompletion();

    } else {
      setLessonStatus("incorrect");
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <div  className="text-center leading-tight text-2xl text-paigedarkgrey p-6" aria-live="assertive">
        {lesson.prompt}
        {showHint && ` ${lesson.hint}`}
      </div>{" "}
      {/* Display the question prompt and hint if showHint is true */}
      <BrailleLearnBox
        aria-live="off"
        onChange={onTextChange}
        value={inputText}
      ></BrailleLearnBox>
      <div className="flex justify-left w-full">
        <button
          className=" button h-10 w-10"
          onClick={toggleHint}
        >
          {showHint ? <HintOn title="Hide hint" className="w-10 h-10" /> : <HintOff title="Show hint" className="w-10 h-10" />}
        </button>
        {/* <Heart title="Hide hint" className="w-10 h-10" /> */}
      </div>

    </>
  );
}

function Level({
  level,
  setSelectedLevel,
}: {
  level: Level;
  setSelectedLevel: React.Dispatch<React.SetStateAction<Level | null>>;
}) {
  const { name, description, lessons } = level;
  const lessonsInProgress: LessonInProgress[] = lessons.map((lesson) => ({
    ...lesson,
    numberOfSuccesses: 0,
    isFirstAppearance: true,
  }));

  const goBack = () => {
    setSelectedLevel(null);
  };

  return (
    <div className="py-6 md:py-12 px-4">
      <button onClick={goBack} className="text-left text-primary text-xs font-light">
          ← Go back
      </button>
      <Heading css="text-center text-primary">
          {name}{" - "}{` ${description}`}
      </Heading>
      <Lessons lessons={lessonsInProgress} />
    </div>
  );
}

function ChapterList({ levels }: { levels: Level[] }) {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeQuestion, setActiveQuestion] = useState<null | number>(0);

  const handleClick = (index: number) => {
    setActiveQuestion(index === activeQuestion ? null : index);
  };
  return (
    <>
      {selectedLevel === null && (
        <div className="py-6 md:py-12 px-4">
          <div className="bg-white flex justify-between items-end">
            <Heading css="text-start leading-tight text-primary">Learn</Heading>
          </div>
          <ul className="flex flex-col">
           {questions.map((q, index) => (
             <li
               key={q.question}
               className="flex items-start flex-col py-4 gap-2 border-b border-paigedarkgrey"
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
                <ul>
                  {levels.map((level) => (
                    <li key={level.name}>
                      <button
                        onClick={() => setSelectedLevel(level)}
                        className="bg-primary text-white font-bold rounded-md py-2 px-4 mt-2 hover:bg-blue-700"
                      >
                        {`${level.name} - ${level.description}`}
                      </button>
                    </li>
                  ))}
                </ul>
               </div>
             </li>
           ))}
         </ul>
        </div>
      )}
      {selectedLevel && (
        <Level
          level={selectedLevel}
          setSelectedLevel={setSelectedLevel}
        />
      )}
    </>
  );
}
