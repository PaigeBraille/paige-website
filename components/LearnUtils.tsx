import React, { useState, useEffect } from "react";
import { BrailleLearnBox } from "@/components/BrailleLearnBox";
import AudioFile from "../public/sounds/correct.mp3";
import HintOn from "../public/svg/hint-on.svg";
import HintOff from "../public/svg/hint-off.svg";
import Heart from "../public/svg/heart.svg";
import ProgressBar from "./ProgressBar";
import { LessonInProgress, Level} from "../pages/learn";

function LevelProgressBar({
  lessonsInProgress,isReview,
}: {
  lessonsInProgress: LessonInProgress[];
  isReview: boolean;
}) {
  const totalLevels = isReview
    ? Math.min
    (
      lessonsInProgress.reduce((total, lesson) => total + lesson.numberOfSuccessesToPass,0),
      10
    )
    : lessonsInProgress.reduce((total, lesson) => total + lesson.numberOfSuccessesToPass,0);

  const totalProgress = lessonsInProgress.reduce(
    (total, lesson) => total + lesson.numberOfSuccesses,
    0,
  );

  return <ProgressBar currentLevel={totalProgress} totalLevels={totalLevels} />;
}

function selectRandomLesson(lessons: LessonInProgress[]) {
  const incompleteLessons = lessons.filter(
    (lesson) => lesson.numberOfSuccesses < lesson.numberOfSuccessesToPass
  );

  const randomLessonIndex = Math.floor(
    Math.random() * incompleteLessons.length
  );

  return incompleteLessons[randomLessonIndex];
}

export function Lessons({ lessons, level, isReview}: { lessons: LessonInProgress[]; level: Level; isReview: boolean }) {
  const [lessonsInProgress, setLessonsInProgress] = useState<LessonInProgress[]>(lessons);
  const [currentLesson, setCurrentLesson] = useState<LessonInProgress>(
    lessonsInProgress[0]
  );
  const [challengeFail, setChallengeFail] = useState<boolean>(false);

  const handleLessonCompletion = (lesson: LessonInProgress) => {
    // Increment the number of successes for the old lesson
    const updatedLessonsInProgress = lessonsInProgress.map((prevLesson) => prevLesson.prompt === lesson.prompt
      ? {
        ...prevLesson,
        numberOfSuccesses: prevLesson.numberOfSuccesses + 1,
        isFirstAppearance: false,
      }
      : prevLesson
    );
    setLessonsInProgress(updatedLessonsInProgress);

    // Get a new random lesson
    const newRandomLesson = selectRandomLesson(updatedLessonsInProgress);
    setCurrentLesson(newRandomLesson);
  };

  // End level
  const isLevelComplete =  isReview 
    ? lessonsInProgress.every((lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass) 
      // If level is a review it ends after 10 words have been introduced
      || lessonsInProgress.filter((lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass).length >= 10 
    : lessonsInProgress.every((lesson) => lesson.numberOfSuccesses >= lesson.numberOfSuccessesToPass) ;

  return (
    <>
      <LevelProgressBar lessonsInProgress={lessonsInProgress} isReview={isReview} />
      {isLevelComplete ? (
        <div className="text-center leading-tight text-2xl text-paigedarkgrey p-2" aria-live="assertive">
          Level completed!
        </div>
      ) : challengeFail ? (
        <div className="text-center leading-tight text-2xl text-paigedarkgrey p-2" aria-live="assertive">
          Challenge failed!
        </div>
      ) : (
        <IndividualLesson
          lesson={currentLesson}
          level={level}
          setChallengeFail={setChallengeFail}
          onCompletion={() => handleLessonCompletion(currentLesson)}
          isReview={isReview}
        ></IndividualLesson>
      )}
    </>
  );
}

export function IndividualLesson({
  lesson, level, setChallengeFail, onCompletion, isReview
}: {
  lesson: LessonInProgress;
  level: Level;
  setChallengeFail: (value: boolean) => void;
  onCompletion: () => void;
  isReview: boolean;
}) {
  const [promptText, setPromptText] = useState<string>(lesson.prompt);
  const [inputText, setInputText] = useState<string>("");
  const [livesRemaining, setLivesRemaining] = useState<number>(5); // Initialize lives remaining to 3

  const [showHint, setShowHint] = useState<boolean>(lesson.isFirstAppearance);

  const audio = new Audio(AudioFile);

  let lastInputWasSpaceOrNewline = false;

  useEffect(() => {
    setPromptText(lesson.prompt);
  }, [lesson.prompt, lesson.numberOfSuccesses]);

  useEffect(() => {
    // Update showHint when lesson.isFirstAppearance changes
    setShowHint(lesson.isFirstAppearance);
  }, [lesson.isFirstAppearance, lesson]);

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
      setPromptText("Correct!");
      audio.play();
      setPromptText("Correct!");
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInputText("");
      onCompletion();

    } else if (lastInputWasSpaceOrNewline && newAsciiString !== lesson.correctInputMatch) {
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
        setPromptText("Incorrect!");
      }
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setInputText("");
      setPromptText(lesson.prompt + " " + lesson.hint);
      setShowHint(false);
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
      <div className={` flex w-full ${level.name.includes("Challenge") ? "justify-between" : "justify-left"}`}
      >
        {!isReview ?
          <button
            className=" button h-10 w-10"
            onClick={toggleHint}
          >
            {showHint ? <HintOn title="Hide hint" className="w-10 h-10" /> : <HintOff title="Show hint" className="w-10 h-10" />}
          </button>
        : null}
        {level.name.includes("Challenge") ?
          <div className="relative flex items-center justify-center w-10 h-10">
            <span className="text-2xl z-10 text-white">{livesRemaining}</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart title="Lives" className="w-10 h-10" />
            </div>
          </div>
        : null}
      </div>

    </>
  );
}
