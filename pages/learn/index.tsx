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
  name: string;
  levels: Level[];
};

const LESSONS: Lesson[] = [
  // Lesson 1: a, l, d, t
  {
    prompt: "a",
    hint: "is dot 1",
    correctInputMatch: "a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "l",
    hint: "is dots 1 2 3",
    correctInputMatch: "l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "d",
    hint: "is dots 1 4 5",
    correctInputMatch: "d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "t",
    hint: "is dots 2 3 4 5",
    correctInputMatch: "t",
    numberOfSuccessesToPass: 3,
  },
  // Lesson 2: e, m, y, b, h, o
  {
    prompt: "e",
    hint: "is dots 1 5",
    correctInputMatch: "e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "m",
    hint: "is dots 1 3 4",
    correctInputMatch: "m",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "y",
    hint: "is dots 1 3 4 5 6",
    correctInputMatch: "y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "b",
    hint: "is dots 1 2",
    correctInputMatch: "b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "h",
    hint: "is dots 1 2 5",
    correctInputMatch: "h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "o",
    hint: "is dots 1 3 5",
    correctInputMatch: "o",
    numberOfSuccessesToPass: 3,
  },
  // Lesson 3: c, k, s
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
    prompt: "s",
    hint: "is dots 2 3 4",
    correctInputMatch: "s",
    numberOfSuccessesToPass: 3,
  },
  //Halfway 
  //Level 4: g,i,u,j,n, v
  {
    prompt: "g",
    hint: "is dots 1 2 4 5",
    correctInputMatch: "g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "i",
    hint: "is dots 2 4",
    correctInputMatch: "i",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "u",
    hint: "is dots 1 3 6",
    correctInputMatch: "u",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "j",
    hint: "is dots 2 4 5",
    correctInputMatch: "j",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "n",
    hint: "is dots 1 3 4 5",
    correctInputMatch: "n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "v",
    hint: "is dots 1 2 3 6",
    correctInputMatch: "v",
    numberOfSuccessesToPass: 3,
  },
  // Level 5: r, x, f, p
  {
    prompt: "r",
    hint: "is dots 1 2 3 5",
    correctInputMatch: "r",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "x",
    hint: "is dots 1 3 4 6",
    correctInputMatch: "x",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "f",
    hint: "dots 1 2 4",
    correctInputMatch: "f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "p",
    hint: "is dots 1 2 3 4",
    correctInputMatch: "p",
    numberOfSuccessesToPass: 3,
  },
  // Level 6: w, z, q
  {
    prompt: "w",
    hint: "is dots 2 4 5 6",
    correctInputMatch: "w",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "z",
    hint: "is dots 1 3 5 6",
    correctInputMatch: "z",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "q",
    hint: "is dots 1 2 3 4 5",
    correctInputMatch: "q",
    numberOfSuccessesToPass: 3,
  },
  // Numbers
  {
    prompt: "1",
    hint: "is dots 3 4 5 6, dot 1",
    correctInputMatch: "#a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "2",
    hint: "is dots 3 4 5 6, dots 1 2",
    correctInputMatch: "#b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "3",
    hint: "is dots 3 4 5 6, dots 1 4",
    correctInputMatch: "#c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "4",
    hint: "is dots 3 4 5 6, dots 1 4 5",
    correctInputMatch: "#d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "5",
    hint: "is dots 3 4 5 6, dots 1 5",
    correctInputMatch: "#e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "6",
    hint: "is dots 3 4 5 6, dots 1 2 4",
    correctInputMatch: "#f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "7",
    hint: "is dots 3 4 5 6, dots 1 2 4 5",
    correctInputMatch: "#g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "8",
    hint: "is dots 3 4 5 6, dots 1 2 5",
    correctInputMatch: "#h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "9",
    hint: "is dots 3 4 5 6, dots 2 4",
    correctInputMatch: "#i",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "0",
    hint: "is dots 3 4 5 6, dots 2 4 5",
    correctInputMatch: "#j",
    numberOfSuccessesToPass: 3,
  },
  //Punctuation
  // Level 1
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

const alphabetLevels: Level[] = [
  {
    name: "Level 1",
    description: "a, l, d, t",
    lessons: [LESSONS[0], LESSONS[1], LESSONS[2], LESSONS[3]],
  },
  {
    name: "Level 2",
    description: "e, m, y, b, h, o",
    lessons: [LESSONS[4], LESSONS[5], LESSONS[6], LESSONS[7], LESSONS[8], LESSONS[9]],
  },
  {
    name: "Level 3",
    description: "c, k, s",
    lessons: [ LESSONS[10], LESSONS[11], LESSONS[12]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [ LESSONS[0], LESSONS[1], LESSONS[2], LESSONS[3], LESSONS[4], LESSONS[5], LESSONS[6], LESSONS[7], LESSONS[8], LESSONS[9], LESSONS[10], LESSONS[11], LESSONS[12]],
  },
  {
    name: "Level 4",
    description: "g, i, u, j, n, v",
    lessons: [LESSONS[13], LESSONS[14], LESSONS[15], LESSONS[16], LESSONS[17], LESSONS[18]],
  },
  {
    name: "Level 5",
    description: "r, x, f, p",
    lessons:  [LESSONS[19], LESSONS[20], LESSONS[21], LESSONS[22]],
  },
  {
    name: "Level 6",
    description: "w, z, q",
    lessons: [ LESSONS[23] ,LESSONS[24], LESSONS[25]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [ LESSONS[0], LESSONS[1], LESSONS[2], LESSONS[3], LESSONS[4], LESSONS[5], LESSONS[6], LESSONS[7], LESSONS[8], LESSONS[9], LESSONS[10], LESSONS[11], LESSONS[12], LESSONS[13], LESSONS[14], LESSONS[15], LESSONS[16], LESSONS[17], LESSONS[18], LESSONS[19], LESSONS[20], LESSONS[21], LESSONS[22], LESSONS[23], LESSONS[24], LESSONS[25]],
  },
];

const numberLevels: Level[] = [
  {
    name: "Level 1",
    description: "0 to 9",
    lessons: [LESSONS[26],LESSONS[27], LESSONS[28], LESSONS[29], LESSONS[30], LESSONS[31], LESSONS[32],LESSONS[33], LESSONS[34], LESSONS[35]],
  },
];

const chapters:Chapter[] = [
  {
    name: "Alphabet",
    levels: alphabetLevels,
  },
  {
    name: "Numbers",
    levels: numberLevels,
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
            <ChapterList />
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

function Lessons({ lessons, level }: { lessons: LessonInProgress[], level: Level }) {
  const [lessonsInProgress, setLessonsInProgress] =
    useState<LessonInProgress[]>(lessons);
  const [currentLesson, setCurrentLesson] = useState<LessonInProgress>(
    lessonsInProgress[0],
  );
  const [isLessonComplete, setIsLessonComplete] = useState<boolean>(false); // Initialize to false

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

  useEffect(() => {
    setIsLessonComplete(lessonsInProgress.every(
      (lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass,
  ));
  }, [lessonsInProgress]);

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
          level={level}
          setIsLessonComplete={setIsLessonComplete}
          onCompletion={() => handleLessonCompletion(currentLesson)}
        ></IndividualLesson>
      )}
    </>
  );
}

function IndividualLesson({
  lesson,
  level,
  setIsLessonComplete,
  onCompletion,
}: {
  lesson: LessonInProgress;
  level: Level;
  setIsLessonComplete: (value: boolean) => void;
  onCompletion: () => void;
}) {
  const [promptText, setPromptText] = useState<string>(lesson.prompt);
  const [inputText, setInputText] = useState<string>("");
  const [lessonStatus, setLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");
  const [livesRemaining, setLivesRemaining] = useState<number>(3); // Initialize lives remaining to 3

  const [showHint, setShowHint] = useState<boolean>(lesson.isFirstAppearance);

  const audio = new Audio(audioFile);

  let lastInputWasSpaceOrNewline = false;

  useEffect(() => {
    setPromptText(lesson.prompt);
  }, [lesson.prompt, lesson.numberOfSuccesses]);

  useEffect(() => {
    // Update showHint when lesson.isFirstAppearance changes
    setShowHint(lesson.isFirstAppearance);
  }, [lesson.isFirstAppearance]);

  useEffect(() => {
    if (showHint) {
      setPromptText(lesson.prompt + " " + lesson.hint);
    } else {
      setPromptText(lesson.prompt);
    }
  }, [lesson.hint, showHint]);

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
      setPromptText("Correct!");
      audio.play();
      setPromptText("Correct!");
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInputText("");
      onCompletion();

    } else if (lastInputWasSpaceOrNewline && newAsciiString !== lesson.correctInputMatch){
      setPromptText("Incorrect!");
      // Decrement livesRemaining if the answer is incorrect during a challenge
      if (level.name.includes("Challenge")) {
        setLivesRemaining((prevLives) => prevLives - 1);
        // End the level if no lives remaining
        if (livesRemaining === 0) {
          setIsLessonComplete(true);
        }
      }
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPromptText(lesson.prompt + " " + lesson.hint);
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <div className="text-center leading-tight text-2xl text-paigedarkgrey p-6" aria-live="assertive">
        {promptText}
      </div>{" "}
      {/* Display the question prompt and hint if showHint is true */}
      <BrailleLearnBox
        aria-live="off"
        onChange={onTextChange}
        value={inputText}
      ></BrailleLearnBox>
      <div className={` flex w-full ${
          level.name.includes("Challenge") ? "justify-between" : "justify-left"
        }`}
      >
        <button
          className=" button h-10 w-10"
          onClick={toggleHint}
        >
          {showHint ? <HintOn title="Hide hint" className="w-10 h-10" /> : <HintOff title="Show hint" className="w-10 h-10" />}
        </button>
        {level.name.includes("Challenge") ? 
          <div>
            {livesRemaining} 
            <Heart title="Lives" className="w-10 h-10" />
          </div> 
          : null 
        }
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
        {`${name.includes("Challenge") ? name : name + " - " + description}`}
      </Heading>
      <Lessons lessons={lessonsInProgress} level={level} />
    </div>
  );
}

function ChapterList() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeChapter, setActiveChapter] = useState<null | number>(0);

  const handleClick = (index: number) => {
    setActiveChapter(index === activeChapter ? null : index);
  };
  return (
    <>
      {selectedLevel === null && (
        <div className="py-6 md:py-12 px-4">
          <div className="bg-white flex justify-between items-end">
            <Heading css="text-start leading-tight text-primary">Learn</Heading>
          </div>
          <ul className="flex flex-col">
            {chapters.map((c, index) => (
              <li
                key={c.name}
                className="flex items-start flex-col py-4 gap-2 border-b border-paigedarkgrey"
              >
                <div
                  className="flex flex-row justify-between cursor-pointer w-full gap-4 items-center"
                  onClick={() => handleClick(index)}
                  aria-label={c.name}
                >
                  <h3 className="inline-flex text-xl md:text-xl font-bold leading-tight tracking-tight">
                    {c.name}
                  </h3>
                  <span className="text-gray-600 inline-flex text-xl md:text-2xl">
                    {index === activeChapter ? (
                      <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    ) : (
                      <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                    )}
                  </span>
                </div>
                <div
                  key={c.name}
                  className={`text-sm  ${
                    index === activeChapter
                      ? "flex w-full flex-col gap-2 visible"
                      : "hidden"
                  }`}
                >
                  <ul>
                    {c.levels.map((level) => (
                      <li key={level.name}>
                        <button
                          onClick={() => setSelectedLevel(level)}
                          className={` text-white font-bold rounded-md py-2 px-4 mt-2 ${
                            level.name.includes("Challenge") ? "bg-paigedarkblue hover:bg-blue-700" : "bg-primary hover:bg-blue-700"
                          }`}
                        >
                          {`${level.name.includes("Challenge") ? level.name : level.name + " - " + level.description}`}
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
