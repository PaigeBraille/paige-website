import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../../components/Wrapper";
import Heading from "../../components/Heading";
import Login from "../../components/Login"; // Import the Login component
import {
  faChevronDown,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Lessons } from "../../components/LearnUtils";
import { LESSONS } from "../../components/LessonMapping";
import { CHAPTERS, SECTIONS } from "../../components/ChapterMapping";
import ToolsSection from "../../components/ToolsSection";

import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { auth, getUserCompletedLessons } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
export interface Lesson {
  prompt: string;
  hint: string;
  correctInputMatch: string;
  numberOfSuccessesToPass: number;
}

export interface LessonInProgress extends Lesson {
  numberOfSuccesses: number;
  isFirstAppearance: boolean;
}

export interface Level {
  name: string;
  description: string;
  lessons: Lesson[];
  review?: Lesson[];
  read?: Lesson[];
}

export type Chapter = {
  name: string;
  levels: Level[];
};

export type Section = {
  name: string;
  image: React.ReactNode;
  color: string;
  chapters: Chapter[];
};

function ChapterList() {
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(null);
  const [isReview, setIsReview] = useState(false);
  const [isRead, setIsRead] = useState(false);
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeChapter, setActiveChapter] = useState<null | number>(0);
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [activeSection, setActiveSection] = useState<number | null>(0);
  // Set initial value to null to default to all collapsed, or any index to default to that question being open
  const [indexLevel, setIndexLevel] = useState<[number | null, number | null]>([
    0,
    null,
  ]);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleClickC = (index: number) => {
    setActiveChapter(index === activeChapter ? null : index);
    console.log(activeChapter);
  };

  const handleClickS = (index: number) => {
    setActiveSection(index === activeSection ? null : index);
    console.log(activeSection);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDetails = await getUserCompletedLessons(user.uid);
        const completedLessonsIds = userDetails.completedLessons.map(
          (lesson) => lesson.id,
        );
        setCompletedLessons(completedLessonsIds);
      } else {
        setCompletedLessons([]);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      if (!auth.currentUser) {
        return;
      }
      const userDetails = await getUserCompletedLessons(auth.currentUser.uid);
      const completedLessonsIds = userDetails.completedLessons.map(
        (lesson) => lesson.id,
      );
      setCompletedLessons(completedLessonsIds);
    };
    fetchData();
  }, [selectedLevel, auth.currentUser]);

  return (
    <>
      {selectedLevel === null && (
        <div>
          {SECTIONS.map((s, index) => (
            <li key={s.name} className="flex items-start flex-col gap-2 my-2">
              <div
                className={`flex flex-row justify-between cursor-pointer rounded-md p-4 w-full gap-4 items-center bg-${s.color}`}
                onClick={() => handleClickS(index)}
                aria-label={s.name}
              >
                <div className="flex felx-row" aria-hidden="true">
                  {s.image}
                  <h3 className="inline-flex text-xl md:text-2xl font-bold leading-tight tracking-tight text-white my-4">
                    {s.name}
                  </h3>
                </div>
                <span className="text-white inline-flex text-xl md:text-2xl">
                  {index === activeSection ? (
                    <FontAwesomeIcon icon={faChevronDown} size="xs" />
                  ) : (
                    <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                  )}
                </span>
              </div>
              <div
                key={s.name}
                className={`text-sm  ${
                  index === activeSection
                    ? "flex w-full flex-col gap-2 visible"
                    : "hidden"
                }`}
              >
                <ul className="flex flex-col">
                  {CHAPTERS.map((c, index) => (
                    <li
                      key={c.name}
                      className="flex items-start flex-col py-4 gap-2 border-b border-paigedarkgrey"
                    >
                      <div
                        className="flex flex-row justify-between cursor-pointer w-full gap-4 items-center"
                        onClick={() => handleClickC(index)}
                        aria-label={c.name}
                      >
                        <h3 className="inline-flex text-xl md:text-xl font-bold leading-tight tracking-tight">
                          {c.name}
                        </h3>
                        {index === activeChapter ? (
                          <FontAwesomeIcon icon={faChevronDown} size="xs" />
                        ) : (
                          <FontAwesomeIcon icon={faChevronLeft} size="xs" />
                        )}
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
                              {level.name.includes("Challenge") ? (
                                <button
                                  onClick={() => {
                                    setSelectedLevel(level);
                                    setIsReview(false);
                                    setIsRead(false);
                                  }}
                                  className="text-center text-white font-bold bg-paigedarkblue hover:bg-blue-700 rounded-md py-4 px-4 mt-2 w-full"
                                >
                                  {level.name}
                                </button>
                              ) : (
                                <div className="relative flex justify-between bg-primary rounded-md py-2 px-4 mt-2 gap-6 ">
                                  <div className="font-bold text-white  py-2 px-4">
                                    {level.name + " - " + level.description}
                                    {completedLessons.includes(
                                      `${level.name}${level.description}`,
                                    ) && (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="lg"
                                        className="text-green-500 ml-2 font-semibold"
                                      />
                                    )}
                                  </div>
                                  <div>
                                    <button
                                      onClick={() => {
                                        setSelectedLevel(level);
                                        setIsReview(false);
                                        setIsRead(false);
                                        level.read = [];
                                      }}
                                      className="text-white font-bold rounded-md py-2 px-4 bg-primary hover:bg-blue-700"
                                    >
                                      Write
                                    </button>
                                    {level.read ? (
                                      <button
                                        onClick={() => {
                                          setSelectedLevel(level);
                                          setIsReview(false);
                                          setIsRead(true);
                                        }}
                                        className={` text-white font-bold rounded-md py-2 px-4 bg-primary hover:bg-blue-700  ${
                                          level.read.length >=
                                          level.lessons.length * 3
                                            ? ""
                                            : "opacity-50 cursor-not-allowed"
                                        }`}
                                        disabled={
                                          level.read.length <
                                          level.lessons.length * 3
                                        }
                                        aria-disabled={
                                          level.read.length <
                                          level.lessons.length * 3
                                        }
                                      >
                                        Read
                                      </button>
                                    ) : null}
                                    {level.review ? (
                                      <button
                                        onClick={() => {
                                          setSelectedLevel(level);
                                          setIsReview(true);
                                          setIsRead(false);
                                        }}
                                        className="text-white font-bold rounded-md py-2 px-4 bg-primary hover:bg-blue-700"
                                      >
                                        Review
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <ToolsSection />
        </div>
      )}
      {selectedLevel && (
        <Level
          level={selectedLevel}
          setSelectedLevel={setSelectedLevel}
          isReview={isReview}
          setIsReview={setIsReview}
          isRead={isRead}
          setIsRead={setIsRead}
          indexLevel={indexLevel}
          setIndexLevel={setIndexLevel}
        />
      )}
    </>
  );
}

function Level({
  level,
  setSelectedLevel,
  isReview,
  setIsReview,
  isRead,
  setIsRead,
  indexLevel,
  setIndexLevel,
}: {
  level: Level;
  setSelectedLevel: React.Dispatch<React.SetStateAction<Level | null>>;
  isReview: boolean;
  setIsReview: React.Dispatch<React.SetStateAction<boolean>>;
  isRead: boolean;
  setIsRead: React.Dispatch<React.SetStateAction<boolean>>;
  indexLevel: [number | null, number | null];
  setIndexLevel: React.Dispatch<
    React.SetStateAction<[number | null, number | null]>
  >;
}) {
  const [lessons, setLessons] = useState<Lesson[]>(
    isReview ? level.review || [] : isRead ? level.read || [] : level.lessons,
  );
  const [lessonInProgress, setLessonInProgress] = useState<LessonInProgress[]>(
    lessons.map((lesson) => ({
      ...lesson,
      numberOfSuccesses: 0,
      isFirstAppearance: true,
    })),
  );

  useEffect(() => {
    // Update lessonInProgress when lessons change
    setLessonInProgress(
      lessons.map((lesson) => ({
        ...lesson,
        numberOfSuccesses: 0,
        isFirstAppearance: true,
      })),
    );
  }, [lessons, isRead, isReview]);

  const goBack = () => {
    setSelectedLevel(null);
  };

  const nextLevel = () => {
    if (indexLevel[0] !== null && indexLevel[1] !== null) {
      if (level.read || level.review) {
        var j = indexLevel[1] + 1;
        if (CHAPTERS[indexLevel[0]].levels.length < j + 1) {
          console.log("End");
          j = 0;
          var i = indexLevel[0] + 1;
          setIndexLevel([i, j]);
          setSelectedLevel(CHAPTERS[i].levels[j]);
          setLessons(CHAPTERS[i].levels[j].lessons);
        } else {
          console.log("Next");
          if (
            isReview ||
            (isRead && !level.review) ||
            (!level.review &&
              level.read &&
              !(level.read.length >= level.lessons.length * 3))
          ) {
            console.log("Write");
            setIsReview(false);
            setIsRead(false);
            setIndexLevel([indexLevel[0], j]);
            setSelectedLevel(CHAPTERS[indexLevel[0]].levels[j]);
            setLessons(CHAPTERS[indexLevel[0]].levels[j].lessons);
            setLessonInProgress(
              CHAPTERS[indexLevel[0]].levels[j].lessons.map((lesson) => ({
                ...lesson,
                numberOfSuccesses: 0,
                isFirstAppearance: true,
              })),
            );
          } else if (
            level.review &&
            (isRead ||
              (level.read && !(level.read.length >= level.lessons.length * 3)))
          ) {
            console.log("Review");
            setIsReview(true);
            setIsRead(false);
            setIndexLevel([indexLevel[0], indexLevel[1]]);
            setSelectedLevel(CHAPTERS[indexLevel[0]].levels[indexLevel[1]]);
            setLessons(
              CHAPTERS[indexLevel[0]].levels[indexLevel[1]].review || [],
            );
            setLessonInProgress(
              CHAPTERS[indexLevel[0]].levels[indexLevel[1]].lessons.map(
                (lesson) => ({
                  ...lesson,
                  numberOfSuccesses: 0,
                  isFirstAppearance: true,
                }),
              ),
            );
          } else if (
            level.read &&
            level.read.length >= level.lessons.length * 3
          ) {
            console.log("Read");
            setIsRead(true);
            setIndexLevel([indexLevel[0], indexLevel[1]]);
            setSelectedLevel(CHAPTERS[indexLevel[0]].levels[indexLevel[1]]);
            setLessons(
              CHAPTERS[indexLevel[0]].levels[indexLevel[1]].read || [],
            );
            setLessonInProgress(
              CHAPTERS[indexLevel[0]].levels[indexLevel[1]].lessons.map(
                (lesson) => ({
                  ...lesson,
                  numberOfSuccesses: 0,
                  isFirstAppearance: true,
                }),
              ),
            );
          }
        }
      } else {
        var j = indexLevel[1] + 1;
        console.log("Here");
        if (CHAPTERS[indexLevel[0]].levels.length < j + 1) {
          console.log("End");
          j = 0;
          var i = indexLevel[0] + 1;
          setIndexLevel([i, j]);
          setSelectedLevel(CHAPTERS[i].levels[j]);
          setLessons(CHAPTERS[i].levels[j].lessons);
        } else {
          console.log("Next");
          setIndexLevel([indexLevel[0], j]);
          setSelectedLevel(CHAPTERS[indexLevel[0]].levels[j]);
          setLessons(CHAPTERS[indexLevel[0]].levels[j].lessons);
          setLessonInProgress(
            CHAPTERS[indexLevel[0]].levels[j].lessons.map((lesson) => ({
              ...lesson,
              numberOfSuccesses: 0,
              isFirstAppearance: true,
            })),
          );
        }
      }
    }
  };

  return (
    <div className="py-6 md:py-12 px-4">
      <div className="flex justify-between">
        <button
          onClick={goBack}
          className="text-left text-primary text-xs font-light"
        >
          ← Go back
        </button>
        <button
          onClick={nextLevel}
          className="text-left text-primary text-xs font-light"
        >
          Next Level →
        </button>
      </div>
      <Heading css="text-center text-primary">
        {`${
          level.name.includes("Challenge")
            ? level.name
            : isReview
              ? level.name + " review"
              : level.name + " - " + level.description
        }`}
      </Heading>
      <Lessons
        lessons={lessonInProgress}
        level={level}
        isReview={isReview}
        isRead={isRead}
        nextLevel={nextLevel}
      />
    </div>
  );
}

export default function LearnPage() {
  // Add a state to track if the user is authenticated
  const [authenticated, setAuthenticated] = useState(true);

  // Define a function to set the authenticated state
  const handleAuthentication = (value: boolean) => {
    setAuthenticated(value);
  };

  const writeInProgress: LessonInProgress[] = LESSONS.map((lesson) => ({
    ...lesson,
    numberOfSuccesses: 0,
    isFirstAppearance: true,
  }));
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        {authenticated ? (
          <div className="px-4">
            <div className="bg-white flex justify-between items-end py-6 md:py-12">
              <Heading css="text-start leading-tight text-primary">
                Learn
              </Heading>
            </div>
            <div className=" md:mb-6">
              <ChapterList />
            </div>
          </div>
        ) : (
          // Render the Login component when not authenticated
          <Login setAuthenticated={handleAuthentication} />
        )}
      </div>
    </Wrapper>
  );
}
