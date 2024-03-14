import React, { useState, useEffect } from "react";
import { BrailleLearnBox } from "@/components/BrailleLearnBox";
import AudioFile from "../public/sounds/correct.mp3";
import HintOn from "../public/svg/hint-on.svg";
import HintOff from "../public/svg/hint-off.svg";
import Heart from "../public/svg/heart.svg";
import ProgressBar from "./ProgressBar";
import { LessonInProgress, Level } from "../pages/learn";

function LevelProgressBar({
  lessonsInProgress,
  isReview,
}: {
  lessonsInProgress: LessonInProgress[];
  isReview: boolean;
}) {
  const totalLevels = isReview
    ? Math.min(
        lessonsInProgress.reduce(
          (total, lesson) => total + lesson.numberOfSuccessesToPass,
          0,
        ),
        10,
      )
    : lessonsInProgress.reduce(
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

function selectNextLesson(lessons: LessonInProgress[]) {
  return;
}

export function Lessons({
  lessons,
  level,
  isReview,
  isRead,
  nextLevel,
}: {
  lessons: LessonInProgress[];
  level: Level;
  isReview: boolean;
  isRead: boolean;
  nextLevel: () => void;
}) {
  const [lessonsInProgress, setLessonsInProgress] =
    useState<LessonInProgress[]>(lessons);
  const [countLessons, setCountLessons] = useState<number>(1);
  const [currentLesson, setCurrentLesson] = useState<LessonInProgress>(
    lessonsInProgress[0],
  );
  const [challengeFail, setChallengeFail] = useState<boolean>(false);
  const [completionMessages] = useState<string[]>([
    "Level completed - Congratulations!",
    "Crushing it!",
    "Nicely done!",
  ]);

  useEffect(() => {
    setLessonsInProgress(lessons);
    setCurrentLesson(lessons[0]);
  }, [level, lessons, isReview, isRead]);

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

    // Ensure level.read is initialized as an array with the current lesson
    if (!isRead && !isReview) {
      if (level.read) {
        // Append the last completed lesson to level.read
        level.read = [...level.read, lesson];
      }
    }

    // Increment the countLessons for read levels
    if (isRead) {
      setCountLessons((prevCount) => prevCount + 1);
      // Get the next lesson based on the updated countLessons
      const newRandomLesson = lessonsInProgress[countLessons];
      setCurrentLesson(newRandomLesson);
    } else {
      // Get a new random lesson
      const newRandomLesson = selectRandomLesson(updatedLessonsInProgress);
      setCurrentLesson(newRandomLesson);
    }
  };

  // End level
  const isLevelComplete = isReview
    ? lessonsInProgress.every(
        (lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass,
      ) ||
      // If level is a review it ends after 10 words have been introduced
      lessonsInProgress.filter(
        (lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass,
      ).length >= 10
    : lessonsInProgress.every(
        (lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass,
      );

  useEffect(() => {
    // Delay before calling nextLevel function (e.g., 2 seconds)

    if (isLevelComplete) {
      const timeoutId = setTimeout(() => {
        nextLevel(); // Call nextLevel function after the delay
      }, 2000);
      return () => clearTimeout(timeoutId); // Clear the timeout if the component unmounts
    }
  }, [isLevelComplete]);

  return (
    <>
      <LevelProgressBar
        lessonsInProgress={lessonsInProgress}
        isReview={isReview}
      />
      {isLevelComplete ? (
        <div
          className="text-center leading-tight text-2xl text-paigedarkgrey p-2"
          aria-live="assertive"
        >
          {
            completionMessages[
              Math.floor(Math.random() * completionMessages.length)
            ]
          }
        </div>
      ) : challengeFail ? (
        <div
          className="text-center leading-tight text-2xl text-paigedarkgrey p-2"
          aria-live="assertive"
        >
          Keep practicing and try again!
        </div>
      ) : (
        <IndividualLesson
          lesson={currentLesson}
          level={level}
          setChallengeFail={setChallengeFail}
          onCompletion={() => handleLessonCompletion(currentLesson)}
          isReview={isReview}
          isRead={isRead}
          countLessons={countLessons}
        ></IndividualLesson>
      )}
    </>
  );
}

export function IndividualLesson({
  lesson,
  level,
  setChallengeFail,
  onCompletion,
  isReview,
  isRead,
  countLessons,
}: {
  lesson: LessonInProgress;
  level: Level;
  setChallengeFail: (value: boolean) => void;
  onCompletion: () => void;
  isReview: boolean;
  isRead: boolean;
  countLessons: number;
}) {
  const [promptText, setPromptText] = useState<string>(lesson.prompt);
  const [inputText, setInputText] = useState<string>("");
  const [livesRemaining, setLivesRemaining] = useState<number>(5); // Initialize lives remaining to 3
  const [correctMessages] = useState<string[]>([
    "Correct!",
    "Excellent!",
    "Nice!",
    "Keep going!",
  ]);
  const [incorrectMessages] = useState<string[]>([
    "Incorrect!",
    "Oops, that’s not correct!",
    "Not quite!",
    "Try again!",
  ]);
  const [showHint, setShowHint] = useState<boolean>(lesson.isFirstAppearance);

  const audio = new Audio(AudioFile);

  let lastInputWasSpaceOrNewline = false;

  useEffect(() => {
    if (isRead) {
      setPromptText("Write letter " + countLessons);
    } else {
      setPromptText(lesson.prompt);
    }
  }, [lesson.prompt, lesson.numberOfSuccesses, lesson, isRead, isReview]);

  useEffect(() => {
    // Update showHint when lesson.isFirstAppearance changes
    setShowHint(lesson.isFirstAppearance);
  }, [lesson.isFirstAppearance, lesson]);

  useEffect(() => {
    if (showHint && !isRead) {
      setPromptText(lesson.prompt + " " + lesson.hint);
    } else if (!isRead) {
      setPromptText(lesson.prompt);
    }
  }, [lesson.hint, showHint]);

  async function onTextChange(newAsciiString: string) {
    // Update lastInputWasSpaceOrNewline based on the current input
    lastInputWasSpaceOrNewline =
      newAsciiString.endsWith(" ") || newAsciiString.endsWith("\n");

    // Remove the last character if the last input was space bar or newline
    if (lastInputWasSpaceOrNewline) {
      newAsciiString = newAsciiString.slice(0, -1);
    }

    setInputText(newAsciiString);

    // Check if the last input was space bar or newline
    if (
      lastInputWasSpaceOrNewline &&
      newAsciiString === lesson.correctInputMatch
    ) {
      const randomIndex = Math.floor(Math.random() * correctMessages.length);
      setPromptText(correctMessages[randomIndex]);
      audio.play();
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInputText("");
      onCompletion();
    } else if (
      lastInputWasSpaceOrNewline &&
      newAsciiString !== lesson.correctInputMatch
    ) {
      // Decrement livesRemaining if the answer is incorrect during a challenge
      if (level.name.includes("Challenge")) {
        setLivesRemaining((prevLives) => {
          const newLives = prevLives - 1;
          // End the level if no lives remaining
          if (newLives === 0) {
            setChallengeFail(true);
          } else if (newLives === 1) {
            setPromptText(newLives + " life remaining"); // Display the number of lives remaining
          } else {
            setPromptText(newLives + " lives remaining"); // Display the number of lives remaining
          }
          return newLives; // Remove this line
        });
      } else {
        const randomIndex = Math.floor(
          Math.random() * incorrectMessages.length,
        );
        setPromptText(incorrectMessages[randomIndex]);
      }
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setInputText("");
      if (isRead) {
        setPromptText("Write letter " + countLessons);
      } else {
        setPromptText(lesson.prompt + " " + lesson.hint);
        setShowHint(false);
      }
    }
  }

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  return (
    <>
      <div
        className="text-center leading-tight text-2xl text-paigedarkgrey p-6"
        aria-live="assertive"
      >
        {promptText}
      </div>{" "}
      {/* Display the question prompt and hint if showHint is true */}
      <BrailleLearnBox
        aria-live="off"
        onChange={onTextChange}
        value={inputText}
      ></BrailleLearnBox>
      <div
        className={` flex w-full ${
          level.name.includes("Challenge") ? "justify-between" : "justify-left"
        }`}
      >
        {!isReview && !isRead ? (
          <button className=" button h-10 w-10" onClick={toggleHint}>
            {showHint ? (
              <HintOn title="Hide hint" className="w-10 h-10" />
            ) : (
              <HintOff title="Show hint" className="w-10 h-10" />
            )}
          </button>
        ) : null}
        {level.name.includes("Challenge") ? (
          <div className="relative flex items-center justify-center w-10 h-10">
            <span className="text-2xl z-10 text-white">{livesRemaining}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart title="Lives" className="w-10 h-10" />
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
