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
    prompt: 'comma',
    hint: "is dot 2",
    correctInputMatch: "1",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "apostrophe",
    hint: "is dot 3",
    correctInputMatch: "'",
    numberOfSuccessesToPass: 3,
  },
  // Level 2
  {
    prompt: "colon",
    hint: "is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "semicolon",
    hint: "is dot 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "hyphen",
    hint: "is dots 3 6",
    correctInputMatch: "-",
    numberOfSuccessesToPass: 3,
  },
  //Halfway
  //Level 3
  {
    prompt: "full stop",
    hint: "is dots 2 5 6",
    correctInputMatch: "4",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "exclamation mark",
    hint: "is dots 2 3 5",
    correctInputMatch: "6",
    numberOfSuccessesToPass: 3,
  },
  // Level 4
  {
    prompt: "question mark",
    hint: "is dots 2 3 6",
    correctInputMatch: "8",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: 'opening quotation mark',
    hint: 'is dots 2 3 6',
    correctInputMatch: "8",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: 'closing quotation mark',
    hint: 'is dots  3 5 6',
    correctInputMatch: "0",
    numberOfSuccessesToPass: 3,
  },
  // Level 5
  {
    prompt: "opening parenthesis",
    hint: "is dot 5, dots 1 2 6",
    correctInputMatch: '"<',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "closing parenthesis",
    hint: "is dot 5, dots 3 4 5",
    correctInputMatch: '">',
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Level 1
  {
    prompt: "<",
    hint: "is dot 4, dots 1 2 6",
    correctInputMatch: "`<",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: ">",
    hint: "is dot 4, dots 3 4 5",
    correctInputMatch: "`>",
    numberOfSuccessesToPass: 3,
  },
  // Level 2
  {
    prompt: "@",
    hint: "is dot 4, dot 1",
    correctInputMatch: "`a",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "&",
    hint: "is dot 4, dots 1 2 3 4 6",
    correctInputMatch: "`&",
    numberOfSuccessesToPass: 3,
  },
  //Halfway
  //Level 3
  {
    prompt: "+",
    hint: "is dot 5, dots 2 3 5",
    correctInputMatch: '"6',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "=",
    hint: "is dot 5, dots 2 3 5 6",
    correctInputMatch: '"7',
    numberOfSuccessesToPass: 3,
  },
  // Level 4
  {
    prompt: "%",
    hint: "is dots 4 6, dots 3 5 6",
    correctInputMatch: ".0",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "#",
    hint: "is dots 4 5 6, dots 1 4 5 6",
    correctInputMatch: "_?",
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  {
    prompt: "b: but",
    hint: "is dots 1 2",
    correctInputMatch: "b",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "c: can",
    hint: "is dots 1 4",
    correctInputMatch: "c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "d: do",
    hint: "is dots 1 4 5",
    correctInputMatch: "d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "e: every",
    hint: "is dots 1 5",
    correctInputMatch: "e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "f: from",
    hint: "is dots 1 2 4",
    correctInputMatch: "f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "g: go",
    hint: "is dots 1 2 4 5",
    correctInputMatch: "g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "h: have",
    hint: "is dots 1 2 5",
    correctInputMatch: "h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "j: just",
    hint: "is dots 2 4 5",
    correctInputMatch: "j",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "k: knowledge",
    hint: "is dots 1 3",
    correctInputMatch: "k",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "l: like",
    hint: "is dots 1 2 3",
    correctInputMatch: "l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "m: more",
    hint: "is dots 1 3 4",
    correctInputMatch: "m",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "n: not",
    hint: "is dots 1 3 4 5",
    correctInputMatch: "n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "p: people",
    hint: "is dots 1 2 3 4",
    correctInputMatch: "p",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "q: quite",
    hint: "is dots 1 2 3 4 5",
    correctInputMatch: "q",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "r: rather",
    hint: "is dots 1 2 3 5",
    correctInputMatch: "r",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "s: so",
    hint: "is dots 2 3 4",
    correctInputMatch: "s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "t: that",
    hint: "is dots 2 3 4 5",
    correctInputMatch: "t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "u: us",
    hint: "is dots 1 3 6",
    correctInputMatch: "u",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "v: very",
    hint: "is dots 1 2 3 6",
    correctInputMatch: "v",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "w: will",
    hint: "is dots 2 4 5 6",
    correctInputMatch: "w",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "x: it",
    hint: "is dots 1 3 4 6",
    correctInputMatch: "x",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "y: you",
    hint: "is dots 1 3 4 5 6",
    correctInputMatch: "y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "z: as",
    hint: "is dots 1 3 5 6",
    correctInputMatch: "z",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "and",
    hint: "is dots 1 2 3 4 6",
    correctInputMatch: "&",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "for",
    hint: "is dots 1 2 3 4 5 6",
    correctInputMatch: "=",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "of",
    hint: "is dots 1 2 3 5 6",
    correctInputMatch: "(",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "the",
    hint: "is dots 2 3 4 6",
    correctInputMatch: "!",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "with",
    hint: "is dots 2 3 4 5 6",
    correctInputMatch: ")",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "child",
    hint: "is dots 1 6",
    correctInputMatch: "*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "shall",
    hint: "is dots 1 4 6",
    correctInputMatch: "%",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "this",
    hint: "is dots 1 4 5 6",
    correctInputMatch: "?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "which",
    hint: "is dots 1 5 6",
    correctInputMatch: ":",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "out",
    hint: "is dots 1 2 5 6",
    correctInputMatch: "|",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "still",
    hint: "is dots 3 4",
    correctInputMatch: "/",
    numberOfSuccessesToPass: 3,
  },
  // Strong Groupsigns
  {
    prompt: "ch",
    hint: "is dots 1 6",
    correctInputMatch: "*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "sh",
    hint: "is dots 1 4 6",
    correctInputMatch: "%",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "th",
    hint: "th is dots 1 4 5 6",
    correctInputMatch: "?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "wh",
    hint: "is dots 1 5 6",
    correctInputMatch: ":",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ou",
    hint: "is dots 1 2 5 6",
    correctInputMatch: "|",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "st",
    hint: "is dots 3 4",
    correctInputMatch: "/",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "gh",
    hint: "is dots 1 2 6",
    correctInputMatch: "<",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ed",
    hint: "is dots 1 2 4 6",
    correctInputMatch: "$",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "er",
    hint: "is dots 1 2 4 5 6",
    correctInputMatch: "}",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ow",
    hint: "is dots 2 4 6",
    correctInputMatch: "{",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ar",
    hint: "is dots 3 4 5",
    correctInputMatch: ">",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ing",
    hint: "is dots 3 4 6",
    correctInputMatch: "+",
    numberOfSuccessesToPass: 3,
  },

  // Lower Groupsigns
  {
    prompt: "ea",
    hint: "is dot 2",
    correctInputMatch: "1",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bb",
    hint: "is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "cc",
    hint: "is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ff",
    hint: "is dots 2 3 5",
    correctInputMatch: "6",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "gg",
    hint: "is dots 2 3 5 6",
    correctInputMatch: "7",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "be",
    hint: "is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "con",
    hint: "is dots 2 5",
    correctInputMatch: "3",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "dis",
    hint: "is dots 2 5 6",
    correctInputMatch: "4",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "en",
    hint: "is dots 2 6",
    correctInputMatch: "5",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "in",
    hint: "is dots 3 5",
    correctInputMatch: "9",
    numberOfSuccessesToPass: 3,
  },

  // Lower Wordsigns
  {
    prompt: "be",
    hint: "is dots 2 3",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "enough",
    hint: "is dots 2 6",
    correctInputMatch: "5",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "were",
    hint: "is dots 2 3 5 6",
    correctInputMatch: "7",
    numberOfSuccessesToPass: 3,
  },
  // Halfway
  {
    prompt: "his",
    hint: "is dots 2 3 6",
    correctInputMatch: "8",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "in",
    hint: "is dots 3 5",
    correctInputMatch: "9",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "was",
    hint: "is dots 3 5 6",
    correctInputMatch: "0",
    numberOfSuccessesToPass: 3,
  },
  // Initial letter contractions
  // Level 1
  {
    prompt: "day",
    hint: "is dot 5, dots 1 4 5",
    correctInputMatch: '"d',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ever",
    hint: "is dot 5, dots 1 5",
    correctInputMatch: '"e',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "father",
    hint: "is dot 5, dots 1 2 4",
    correctInputMatch: '"f',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "here",
    hint: "is dot 5, dots 1 2 5",
    correctInputMatch: '"h',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "know",
    hint: "is dot 5, dots 1 3",
    correctInputMatch: '"k',
    numberOfSuccessesToPass: 3,
  },
  // Level 2
  {
    prompt: "lord",
    hint: "is dot 5, dots 1 2 3",
    correctInputMatch: '"l',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "mother",
    hint: "is dot 5, dots 1 3 4",
    correctInputMatch: '"m',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "name",
    hint: "is dot 5, dots 1 3 4 5",
    correctInputMatch: '"n',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "one",
    hint: "is dot 5, dots 1 3 5",
    correctInputMatch: '"o',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "part",
    hint: "is dot 5, dots 1 2 3 4",
    correctInputMatch: '"p',
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Level 3
  {
    prompt: "question",
    hint: "is dot 5, dots 1 2 3 4 5",
    correctInputMatch: '"q',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "right",
    hint: "is dot 5, dots 1 2 3 5",
    correctInputMatch: '"r',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "some",
    hint: "is dot 5, dots 2 3 4",
    correctInputMatch: '"s',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "time",
    hint: "is dot 5, dots 2 3 4 5",
    correctInputMatch: '"t',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "under",
    hint: "is dot 5, dots 1 3 6",
    correctInputMatch: '"u',
    numberOfSuccessesToPass: 3,
  },
  // Level 4
  {
    prompt: "work",
    hint: "is dot 5, dots 2 4 5 6",
    correctInputMatch: '"w',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "young",
    hint: "is dot 5, dots 1 3 4 5 6",
    correctInputMatch: '"y',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "there",
    hint: "is dot 5, dots 2 3 4 6",
    correctInputMatch: '"!',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "character",
    hint: "is dot 5, dots 1 6",
    correctInputMatch: '"*',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "through",
    hint: "is dot 5, dots 1 4 5 6",
    correctInputMatch: '"?',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "where",
    hint: "is dot 5, dots 1 5 6",
    correctInputMatch: '":',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ought",
    hint: "is dot 5, dots 1 2 5 6",
    correctInputMatch: '"|',
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Level 5
  {
    prompt: "upon",
    hint: "is dots 4 5, dots 1 3 6",
    correctInputMatch: '~u',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "word",
    hint: "is dots 4 5, dots 2 4 5 6",
    correctInputMatch: '~w',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "these",
    hint: "is dots 4 5, dots 2 3 4 6",
    correctInputMatch: '~!',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "those",
    hint: "is dots 4 5, dots 1 4 5 6",
    correctInputMatch: '~?',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "whose",
    hint: "is dots 4 5, dots 1 5 6",
    correctInputMatch: '~:',
    numberOfSuccessesToPass: 3,
  },
  // Level 6
  {
    prompt: "cannot",
    hint: "is dots 4 5 6, dots 1 4",
    correctInputMatch: '_c',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "had",
    hint: "is dots 4 5 6, dots 1 2 5",
    correctInputMatch: '_h',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "many",
    hint: "is dots 4 5 6, dots 1 3 4",
    correctInputMatch: '_m',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "spirit",
    hint: "is dots 4 5 6, dots 2 3 4",
    correctInputMatch: '_s',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "world",
    hint: "is dots 4 5 6, dots 2 4 5 6",
    correctInputMatch: '_w',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "their",
    hint: "is dots 4 5 6, dots 2 3 4 6",
    correctInputMatch: '_!',
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Final letter groupsigns
  // Level 1
  {
    prompt: "ound",
    hint: "is dots 4 6, dots 1 4 5",
    correctInputMatch: '.d',
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ance",
    hint: "is dots 4 6, dots 1 5",
    correctInputMatch: ".e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "sion",
    hint: "is dots 4 6, dots 1 3 4 5",
    correctInputMatch: ".n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "less",
    hint: "is dots 4 6, dots 2 3 4",
    correctInputMatch: ".s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ount",
    hint: "is dots 4 6, dots 2 3 4 5",
    correctInputMatch: ".t",
    numberOfSuccessesToPass: 3,
  },
  // Level 2
  {
    prompt: "ence",
    hint: "is dots 5 6, dots 1 5",
    correctInputMatch: ";e",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ong",
    hint: "is dots 5 6, dots 1 2 4 5",
    correctInputMatch: ";g",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ful",
    hint: "is dots 5 6, dots 1 2 3",
    correctInputMatch: ";l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "tion",
    hint: "is dots 5 6, dots 1 3 4 5",
    correctInputMatch: ";n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ness",
    hint: "is dots 5 6, dots 2 3 4",
    correctInputMatch: ";s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ment",
    hint: "is dots 5 6, dots 2 3 4 5",
    correctInputMatch: ";t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ity",
    hint: "is dots 5 6, dots 1 3 4 5 6",
    correctInputMatch: ";y",
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Short forms
  // Level 1
  {
    prompt: "ab: about",
    hint: "is dot 1, dots 1 2",
    correctInputMatch: "2",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "abv: above",
    hint: "is dot 1, dots 1 2, dots 1 2 3 6",
    correctInputMatch: "abv",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ac: according",
    hint: "is dot 1, dots 1 4",
    correctInputMatch: "ac",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "acr: across",
    hint: "is dot 1, dots 1 4, dots 1 2 3 5",
    correctInputMatch: "acr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "af: after",
    hint: "is dot 1, dots 1 2 4",
    correctInputMatch: "af",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "afn: afternoon",
    hint: "is dot 1, dots 1 2 4, dots 1 3 4 5",
    correctInputMatch: "afn",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "afw: afterward",
    hint: "is dot 1, dots 1 2 4, dots 2 4 5 6",
    correctInputMatch: "afw",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ag: again",
    hint: "is dot 1, dots 1 2 4 5",
    correctInputMatch: "ag",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "agst: against",
    hint: "is dot 1, dots 1 2 4 5, dots 3 4",
    correctInputMatch: "ag/",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "alm: almost",
    hint: "is dot 1, dots 1 2 3, dots 1 3 4",
    correctInputMatch: "alm",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "alr: already",
    hint: "is dot 1, dots 1 2 3, dots 1 2 3 5",
    correctInputMatch: "alr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "al: also",
    hint: "is dot 1, dots 1 2 3",
    correctInputMatch: "al",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "alth: although",
    hint: "is dot 1, dots 1 2 3, dots 1 4 5 6",
    correctInputMatch: "al?",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "alt: altogether",
    hint: "is dot 1, dots 1 2 3, dots 2 3 4 5",
    correctInputMatch: "alt",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "alw: always",
    hint: "is dot 1, dots 1 2 3, dots 2 4 5 6",
    correctInputMatch: "alw",
    numberOfSuccessesToPass: 3,
  },
  // Level 2
  {
    prompt: "bec: because",
    hint: "is dots 2 3, dots 1 4",
    correctInputMatch: "2c",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bef: before",
    hint: "is dots 2 3, dots 1 2 4",
    correctInputMatch: "2f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "beh: behind",
    hint: "is dots 2 3, dots 1 2 5",
    correctInputMatch: "2h",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bel: below",
    hint: "is dots 2 3, dots 1 2 3",
    correctInputMatch: "2l",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ben: beneath",
    hint: "is dots 2 3, dots 1 3 4 5",
    correctInputMatch: "2n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bes: beside",
    hint: "is dots 2 3, dots 2 3 4",
    correctInputMatch: "2s",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bet: between",
    hint: "is dots 2 3, dots 2 3 4 5",
    correctInputMatch: "2t",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bey: beyond",
    hint: "is dots 2 3, dots 1 3 4 5 6",
    correctInputMatch: "2y",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "bl: blind",
    hint: "is dots 1 2, dots 1 2 3",
    correctInputMatch: "bl",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "brl: braille",
    hint: "is dots 1 2, dots 1 2 3 5, dots 1 2 3",
    correctInputMatch: "brl",
    numberOfSuccessesToPass: 3,
  },
  // Challenge
  // Level 3
  {
    prompt: "chn: children",
    hint: "is dots 1 6, dots 1 3 4 5",
    correctInputMatch: "*n",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "concv: conceive",
    hint: "is dots 2 5, dots 1 4, dots 1 2 3 6",
    correctInputMatch: "3cv",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "concvg: conceiving",
    hint: "is dots 2 5, dots 1 4, dots 1 2 3 6, dots 1 2 4 5",
    correctInputMatch: "3cvg",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "cd: could",
    hint: "is dots 1 4, dots 1 4 5",
    correctInputMatch: "cd",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "dcv: deceive",
    hint: "is dots 1 4 5, dots 1 4, dots 1 2 3 6",
    correctInputMatch: "dcv",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "dcvg: deceiving",
    hint: "is dots 1 4 5, dots 1 4, dots 1 2 3 6, dots 1 2 4 5",
    correctInputMatch: "dcvg",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "dcl: declare",
    hint: "is dots 1 4 5, dots 1 4, dots 1 2 3",
    correctInputMatch: "dcl",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "dclg: declaring",
    hint: "is dots 1 4 5, dots 1 4, dots 1 2 3, dots 1 2 4 5",
    correctInputMatch: "dclg",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ei: either",
    hint: "is dots 1 5, dots 2 4",
    correctInputMatch: "ei",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "fst: first",
    hint: "is dots 1 2 4, dots 3 4",
    correctInputMatch: "f/",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "fr: friend",
    hint: "is dots 1 2 4, dots 1 2 3 5",
    correctInputMatch: "fr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "gd: good",
    hint: "is dots 1 2 4 5, dots 1 4 5",
    correctInputMatch: "gd",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "grt: great",
    hint: "is dots 1 2 4 5, dots 1 2 3 5, dots 2 3 4 5",
    correctInputMatch: "grt",
    numberOfSuccessesToPass: 3,
  },
  // Level 4
  {
    prompt: "herf: herself",
    hint: "is dots 1 2 5, dots 1 2 4 5 6, dots 1 2 4",
    correctInputMatch: "h}f",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "hm: him",
    hint: "is dots 1 2 5, dots 1 3 4",
    correctInputMatch: "hm",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "hmf: himself",
    hint: "is dots 1 2 5, dots 1 3 4, dots 1 2 4",
    correctInputMatch: "hmf",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "imm: immediate",
    hint: "is dots 2 4, dots 1 3 4, dots 1 3 4",
    correctInputMatch: "imm",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "xs: its",
    hint: "is dots 1 3 4 6, dots 2 3 4",
    correctInputMatch: "xs",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "xf: itself",
    hint: "is dots 1 3 4 6, dots 1 2 4",
    correctInputMatch: "xf",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "lr: letter",
    hint: "is dots 1 2 3, dots 1 2 3 5",
    correctInputMatch: "lr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "ll: little",
    hint: "is dots 1 2 3, dots 1 2 3",
    correctInputMatch: "ll",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "mch: much",
    hint: "is dots 1 3 4, dots 1 6",
    correctInputMatch: "m*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "mst: must",
    hint: "is dots 1 3 4, dots 3 4",
    correctInputMatch: "m/",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "myf: myself",
    hint: "is dots 1 3 4, dots 1 3 4 5 6, dots 1 2 4",
    correctInputMatch: "myf",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "nec: necessary",
    hint: "is dots 1 3 4 5, dots 1 5, dots 1 4",
    correctInputMatch: "nec",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "nei: neither",
    hint: "is dots 1 3 4 5, dots 1 5, dots 2 4",
    correctInputMatch: "nei",
    numberOfSuccessesToPass: 3,
  },
    // Level 5
    {
      prompt: "onef: oneself",
      hint: "is dot 5, dots 1 3 5, dots 1 2 4",
      correctInputMatch: '"of',
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "ourvs: ourselves",
      hint: "is dots 1 2 4 5, dots 1 2 3 5, dots 1 2 3 6, dots 2 3 4",
      correctInputMatch: "|rvs",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "pd: paid",
      hint: "is dots 1 2 3 4, dots 1 4 5",
      correctInputMatch: "pd",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "percv: perceive",
      hint: "is dots 1 2 3 4, dots 1 2 4 5 6, dots 1 4, dots 1 2 3 6",
      correctInputMatch: "p}cv",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "percvg: perceiving",
      hint: "is dots 1 2 3 4, dots 1 2 4 5 6, dots 1 4, dots 1 2 3 6, dots 1 2 4 5",
      correctInputMatch: "p}cvg",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "perh: perhaps",
      hint: "is dots 1 2 3 4, dots 1 2 4 5 6, dots 1 2 5",
      correctInputMatch: "p}h",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "qk: quick",
      hint: "is dots 1 2 3 4 5, dots 1 3",
      correctInputMatch: "qk",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "rcv: receive",
      hint: "is dots 1 2 3 5, dots 1 4, dots 1 2 3 6",
      correctInputMatch: "rcv",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "rcvg: receiving",
      hint: "is dots 1 2 3 5, dots 1 4, dots 1 2 3 6, dots 1 2 4 5",
      correctInputMatch: "rcvg",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "rjc: rejoice",
      hint: "is dots 1 2 3 5, dots 2 4 5, dots 1 4",
      correctInputMatch: "rjc",
      numberOfSuccessesToPass: 3,
    },
    {
      prompt: "rjcg: rejoicing",
      hint: "is dots 1 2 3 5, dots 2 4 5, dots 1 4, dots 1 2 4 5",
      correctInputMatch: "rjcg",
      numberOfSuccessesToPass: 3,
    },
    // Level 6
      // Level 4
  {
    prompt: "sd: said",
    hint: "is dots 2 3 4, dots 1 4 5",
    correctInputMatch: "sd",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "shd: should",
    hint: "is dots 1 4 6, dots 1 4 5",
    correctInputMatch: "%d",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "sch: such",
    hint: "is dots 2 3 4, dots 1 6",
    correctInputMatch: "s*",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "themvs: themselves",
    hint: "is dots 2 3 4 6, dots 1 3 4, dots 1 2 3 6, dots 2 3 4",
    correctInputMatch: "!mvs",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "thyf: thyself",
    hint: "is dots 1 4 5 6, dots 1 3 4 5 6, dots 1 2 4",
    correctInputMatch: "?yf",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "td: today",
    hint: "is dots 2 3 4 5, dots 1 4 5",
    correctInputMatch: "td",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "tgr: together",
    hint: "is dots 2 3 4 5, dots 1 2 4 5, dots 1 2 3 5",
    correctInputMatch: "tgr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "tm: tomorrow",
    hint: "is dots 2 3 4 5, dots 1 3 4",
    correctInputMatch: "tm",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "tn: tonight",
    hint: "is dots 2 3 4 5, dots 1 3 4 5",
    correctInputMatch: "tn",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "wd: would",
    hint: "is dots 2 4 5 6, dots 1 4 5",
    correctInputMatch: "wd",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "yr: your",
    hint: "is dots 1 3 4 5 6, dots 1 2 3 5",
    correctInputMatch: "yr",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "yrf: yourself",
    hint: "is dots 1 3 4 5 6, dots 1 2 3 5, dots 1 2 4",
    correctInputMatch: "yrf",
    numberOfSuccessesToPass: 3,
  },
  {
    prompt: "yrvs: yourselves",
    hint: "is dots 1 3 4 5 6, dots 1 2 3 5, dots 1 2 3 6, dots 2 3 4",
    correctInputMatch: "yrvs",
    numberOfSuccessesToPass: 3,
  },
];

const ALPHABET: Level[] = [
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

const NUMBERS: Level[] = [
  {
    name: "Level 1",
    description: "1, 2, 3",
    lessons: [ LESSONS[26], LESSONS[27], LESSONS[28]],
  },
  {
    name: "Level 2",
    description: "4, 5, 6",
    lessons: [ LESSONS[29], LESSONS[30], LESSONS[31]],
  },
  {
    name: "Level 3",
    description: "7, 8, 9, 0",
    lessons: [ LESSONS[32], LESSONS[33], LESSONS[34], LESSONS[35]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[26],LESSONS[27], LESSONS[28], LESSONS[29], LESSONS[30], LESSONS[31], LESSONS[32],LESSONS[33], LESSONS[34], LESSONS[35]],
  },
];

const PUNCTUATION: Level[] = [
  {
    name: "Level 1",
    description: 'comma, apostrophe ',
    lessons: [LESSONS[36], LESSONS[37]],
  },
  {
    name: "Level 2",
    description: 'colon, semicolon, hyphen',
    lessons: [LESSONS[38], LESSONS[39], LESSONS[40]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [ LESSONS[36], LESSONS[37], LESSONS[38], LESSONS[39], LESSONS[40]],
  },
  {
    name: "Level 3",
    description: 'full stop, exclamation mark',
    lessons: [LESSONS[41], LESSONS[42]],
  },
  {
    name: "Level 4",
    description: 'interrogation mark, opening and closing quotation mark',
    lessons: [LESSONS[43], LESSONS[44], LESSONS[45]],
  },
  {
    name: "Level 5",
    description: 'opening and closing parenthesis',
    lessons: [LESSONS[46], LESSONS[47]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [ LESSONS[36], LESSONS[37], LESSONS[38], LESSONS[39], LESSONS[40], LESSONS[41], LESSONS[42], LESSONS[43], LESSONS[44], LESSONS[45], LESSONS[46], LESSONS[47]],
  },
];

const SYMBOLS: Level[] = [
  {
    name: "Level 1",
    description: '< and >',
    lessons: [LESSONS[48], LESSONS[49]],
  },
  {
    name: "Level 2",
    description: '@ and & ',
    lessons: [LESSONS[50], LESSONS[51]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[48], LESSONS[49], LESSONS[50], LESSONS[51]],
  },
  {
    name: "Level 3",
    description: '+ and =',
    lessons: [LESSONS[52], LESSONS[53]],
  },
  {
    name: "Level 4",
    description: '% and #',
    lessons: [LESSONS[54], LESSONS[55]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [LESSONS[48], LESSONS[49], LESSONS[50], LESSONS[51], LESSONS[52], LESSONS[53], LESSONS[54], LESSONS[55]],
  },
];

const ALPHABETIC_WORDSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'b, c, d, e, f, g',
    lessons: [LESSONS[56], LESSONS[57], LESSONS[58], LESSONS[59], LESSONS[60], LESSONS[61]],
  },
  {
    name: "Level 2",
    description: 'h, j, k, l, m, n',
    lessons: [LESSONS[62], LESSONS[63], LESSONS[64], LESSONS[65], LESSONS[66], LESSONS[67]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[56], LESSONS[57], LESSONS[58], LESSONS[59], LESSONS[60], LESSONS[61], LESSONS[62], LESSONS[63], LESSONS[64], LESSONS[65], LESSONS[66], LESSONS[67]],
  },
  {
    name: "Level 3",
    description: 'p, q, r, s, t, u',
    lessons: [LESSONS[68], LESSONS[69], LESSONS[70], LESSONS[71], LESSONS[72], LESSONS[73]],
  },
  {
    name: "Level 4",
    description: 'v, w, x, y, z',
    lessons: [LESSONS[74], LESSONS[75], LESSONS[76], LESSONS[77], LESSONS[78]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [LESSONS[68], LESSONS[69], LESSONS[70], LESSONS[71], LESSONS[72], LESSONS[73], LESSONS[74], LESSONS[75], LESSONS[76], LESSONS[77], LESSONS[78]],
  },
];

const STRONG_CONTRACTIONS: Level[] = [
  {
    name: "Level 1",
    description: 'and, for, of',
    lessons: [LESSONS[79], LESSONS[80], LESSONS[81]],
  },
  {
    name: "Level 2",
    description: 'the, with',
    lessons: [LESSONS[82], LESSONS[83]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[79], LESSONS[80], LESSONS[81], LESSONS[82], LESSONS[83]],
  },
];

const STRONG_WORDSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'child, shall, this',
    lessons: [LESSONS[84], LESSONS[85], LESSONS[86]],
  },
  {
    name: "Level 2",
    description: 'which, out, still',
    lessons: [LESSONS[87], LESSONS[88], LESSONS[89]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[84], LESSONS[85], LESSONS[86], LESSONS[87], LESSONS[88], LESSONS[89]],
  },
];

const STRONG_GROUPSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'ch, sh, th',
    lessons: [LESSONS[90], LESSONS[91], LESSONS[92]],
  },
  {
    name: "Level 2",
    description: 'wh, ou, st',
    lessons: [LESSONS[93], LESSONS[94], LESSONS[95]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[90], LESSONS[91], LESSONS[92], LESSONS[93], LESSONS[94], LESSONS[95]],
  },
  {
    name: "Level 3",
    description: 'gh, ed, er',
    lessons: [LESSONS[96], LESSONS[97], LESSONS[98]],
  },
  {
    name: "Level 4",
    description: 'ow, ar, ing',
    lessons: [LESSONS[99], LESSONS[100], LESSONS[101]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [LESSONS[90], LESSONS[91], LESSONS[92], LESSONS[93], LESSONS[94], LESSONS[95], LESSONS[96], LESSONS[97], LESSONS[98], LESSONS[99], LESSONS[100], LESSONS[101]],
  },
];

const LOWER_GROUPSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'ea, bb, cc, ff, gg',
    lessons: [LESSONS[102], LESSONS[103], LESSONS[104], LESSONS[105], LESSONS[106]],
  },
  {
    name: "Level 2",
    description: 'be, con dis, en, in',
    lessons: [LESSONS[107], LESSONS[108], LESSONS[109], LESSONS[110], LESSONS[111]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[102], LESSONS[103], LESSONS[104], LESSONS[105], LESSONS[106], LESSONS[107], LESSONS[108], LESSONS[109], LESSONS[110], LESSONS[111]],
  },
];

const LOWER_WORDSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'be, enough, were',
    lessons: [LESSONS[112], LESSONS[113], LESSONS[114]],
  },
  {
    name: "Level 2",
    description: 'his, in, was',
    lessons: [LESSONS[115], LESSONS[116], LESSONS[117]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[112], LESSONS[113], LESSONS[114], LESSONS[115], LESSONS[116], LESSONS[117]],
  },
];

const INITIAL_LETTER_CONTRACTIONS: Level[] = [
  {
    name: "Level 1",
    description: 'day, ever, father, here, know',
    lessons: [LESSONS[118], LESSONS[119], LESSONS[120], LESSONS[121], LESSONS[122]],
  },
  {
    name: "Level 2",
    description: 'lord, mother, name, one, part',
    lessons: [LESSONS[123], LESSONS[124], LESSONS[125], LESSONS[126], LESSONS[127]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[118], LESSONS[119], LESSONS[120], LESSONS[121], LESSONS[122], LESSONS[123], LESSONS[124], LESSONS[125], LESSONS[126], LESSONS[127]],
  },
  {
    name: "Level 3",
    description: 'question, right, some, time, under',
    lessons: [LESSONS[128], LESSONS[129], LESSONS[130], LESSONS[131], LESSONS[132]],
  },
  {
    name: "Level 4",
    description: 'work, young, there, character, through, where, ought',
    lessons: [LESSONS[133], LESSONS[134], LESSONS[135], LESSONS[136], LESSONS[137], LESSONS[138], LESSONS[139]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [LESSONS[118], LESSONS[119], LESSONS[120], LESSONS[121], LESSONS[122], LESSONS[123], LESSONS[124], LESSONS[125], LESSONS[126], LESSONS[127], LESSONS[128], LESSONS[129], LESSONS[130], LESSONS[131], LESSONS[132], LESSONS[133], LESSONS[134], LESSONS[135], LESSONS[136], LESSONS[137], LESSONS[138], LESSONS[139]],
  },
  {
    name: "Level 5",
    description: 'upon, word, these, those, whose',
    lessons: [LESSONS[140], LESSONS[141], LESSONS[142], LESSONS[143], LESSONS[144]],
  },
  {
    name: "Level 6",
    description: 'cannot, had, many, spirit, world, their',
    lessons: [LESSONS[145], LESSONS[146], LESSONS[147], LESSONS[148], LESSONS[149]],
  },
  {
    name: "Challenge 3",
    description: "",
    lessons: [LESSONS[118], LESSONS[119], LESSONS[120], LESSONS[121], LESSONS[122], LESSONS[123], LESSONS[124], LESSONS[125], LESSONS[126], LESSONS[127], LESSONS[128], LESSONS[129], LESSONS[130], LESSONS[131], LESSONS[132], LESSONS[133], LESSONS[134], LESSONS[135], LESSONS[136], LESSONS[137], LESSONS[138], LESSONS[139], LESSONS[140], LESSONS[141], LESSONS[142], LESSONS[143], LESSONS[144], LESSONS[145], LESSONS[146], LESSONS[147], LESSONS[148], LESSONS[149]],
  },
];

const FINAL_LETTER_GROUPSIGNS: Level[] = [
  {
    name: "Level 1",
    description: 'ound, ance, sion, less, ount',
    lessons: [LESSONS[150], LESSONS[151], LESSONS[152], LESSONS[153], LESSONS[154]],
  },
  {
    name: "Level 2",
    description: 'ence, ong, ful, tion, ness, ment, ity',
    lessons: [LESSONS[155], LESSONS[156], LESSONS[157], LESSONS[158], LESSONS[159], LESSONS[160], LESSONS[161]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[150], LESSONS[151], LESSONS[152], LESSONS[153], LESSONS[154], LESSONS[155], LESSONS[156], LESSONS[157], LESSONS[158], LESSONS[159], LESSONS[160], LESSONS[161]],
  },
];

const SHORT_FORMS: Level[] = [
  {
    name: "Level 1",
    description: 'ab - alw',
    lessons: [LESSONS[161], LESSONS[162], LESSONS[163], LESSONS[164], LESSONS[165], LESSONS[166], LESSONS[167], LESSONS[168], LESSONS[169], LESSONS[170], LESSONS[171], LESSONS[172],  LESSONS[173], LESSONS[174], LESSONS[175]],
  },
  {
    name: "Level 2",
    description: 'bec - brl',
    lessons: [LESSONS[176], LESSONS[177], LESSONS[178], LESSONS[179], LESSONS[180], LESSONS[181], LESSONS[182], LESSONS[183], LESSONS[184], LESSONS[185]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[161], LESSONS[162], LESSONS[163], LESSONS[164], LESSONS[165], LESSONS[166], LESSONS[167], LESSONS[168], LESSONS[169], LESSONS[170], LESSONS[171], LESSONS[172],  LESSONS[173], LESSONS[174], LESSONS[175], LESSONS[176], LESSONS[177], LESSONS[178], LESSONS[179], LESSONS[180], LESSONS[181], LESSONS[182], LESSONS[183], LESSONS[184], LESSONS[185]],
  },
  {
    name: "Level 3",
    description: 'chn - grt',
    lessons: [LESSONS[187], LESSONS[188], LESSONS[189], LESSONS[190], LESSONS[191], LESSONS[192], LESSONS[193], LESSONS[194], LESSONS[195], LESSONS[196], LESSONS[197], LESSONS[198], LESSONS[199]],
  },
  {
    name: "Level 4",
    description: 'herf - nei',
    lessons: [LESSONS[200], LESSONS[201], LESSONS[202], LESSONS[203], LESSONS[204], LESSONS[205], LESSONS[206], LESSONS[207], LESSONS[208], LESSONS[209], LESSONS[210], LESSONS[211], LESSONS[212]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [LESSONS[187], LESSONS[188], LESSONS[189], LESSONS[190], LESSONS[191], LESSONS[192], LESSONS[193], LESSONS[194], LESSONS[195], LESSONS[196], LESSONS[197], LESSONS[198], LESSONS[199], LESSONS[200], LESSONS[201], LESSONS[202], LESSONS[203], LESSONS[204], LESSONS[205], LESSONS[206], LESSONS[207], LESSONS[208], LESSONS[209], LESSONS[210], LESSONS[211], LESSONS[212]],
  },
  {
    name: "Level 5",
    description: 'onef - rjcg',
    lessons: [LESSONS[213], LESSONS[214], LESSONS[215], LESSONS[216], LESSONS[217], LESSONS[218], LESSONS[219], LESSONS[220], LESSONS[221], LESSONS[222], LESSONS[223]],
  },
  {
    name: "Level 6",
    description: 'sd - yrvs',
    lessons: [LESSONS[224], LESSONS[225], LESSONS[226], LESSONS[227], LESSONS[228], LESSONS[229], LESSONS[230], LESSONS[231], LESSONS[232], LESSONS[233], LESSONS[234], LESSONS[235], LESSONS[236]],
  },
  {
    name: "Challenge 3",
    description: "",
    lessons: [LESSONS[213], LESSONS[214], LESSONS[215], LESSONS[216], LESSONS[217], LESSONS[218], LESSONS[219], LESSONS[220], LESSONS[221], LESSONS[222], LESSONS[223], LESSONS[224], LESSONS[225], LESSONS[226], LESSONS[227], LESSONS[228], LESSONS[229], LESSONS[230], LESSONS[231], LESSONS[232], LESSONS[233], LESSONS[234], LESSONS[235], LESSONS[236]],
  },
];

const chapters:Chapter[] = [
  {
    name: "Alphabet",
    levels: ALPHABET,
  },
  {
    name: "Numbers",
    levels: NUMBERS,
  },
  {
    name: "Punctuation",
    levels: PUNCTUATION,
  },
  {
    name: "Symbols",
    levels: SYMBOLS,
  },
  {
    name: "Alphabetic wordsigns",
    levels: ALPHABETIC_WORDSIGNS,
  },
  {
    name: "Strong contractions",
    levels: STRONG_CONTRACTIONS,
  },
  {
    name: "Strong wordsigns",
    levels: STRONG_WORDSIGNS,
  },
  {
    name: "Strong groupsigns",
    levels: STRONG_GROUPSIGNS,
  },
  {
    name: "Lower groupsigns",
    levels: LOWER_GROUPSIGNS,
  },
  {
    name: "Lower wordsigns",
    levels: LOWER_WORDSIGNS,
  },
  {
    name: "Initial letter contractions",
    levels: INITIAL_LETTER_CONTRACTIONS,
  },
  {
    name: "Final letter groupsigns",
    levels: FINAL_LETTER_GROUPSIGNS,
  },
  {
    name: "Short forms",
    levels: SHORT_FORMS,
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
        <div className="px-4">
          <div className="bg-white flex justify-between items-end py-6 md:py-12">
            <Heading css="text-start leading-tight text-primary">Learn</Heading>
          </div>
           <div className="border-t border-paigedarkgrey  md:mb-6">
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
  const [challengeFail, setChallengeFail] = useState<boolean>(false); 

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
        <div  className="text-center leading-tight text-2xl text-paigedarkgrey p-2" aria-live="assertive">
          Level completed!
        </div>
      ) : challengeFail ? (
        <div  className="text-center leading-tight text-2xl text-paigedarkgrey p-2" aria-live="assertive">
          Challenge failed!
        </div>
      ) : (
        <IndividualLesson
          lesson={currentLesson}
          level={level}
          setChallengeFail={setChallengeFail}
          onCompletion={() => handleLessonCompletion(currentLesson)}
        ></IndividualLesson>
      )}
    </>
  );
}

function IndividualLesson({
  lesson,
  level,
  setChallengeFail,
  onCompletion,
}: {
  lesson: LessonInProgress;
  level: Level;
  setChallengeFail: (value: boolean) => void;
  onCompletion: () => void;
}) {
  const [promptText, setPromptText] = useState<string>(lesson.prompt);
  const [inputText, setInputText] = useState<string>("");
  const [lessonStatus, setLessonStatus] = useState<
    "correct" | "incorrect" | "pending"
  >("pending");
  const [livesRemaining, setLivesRemaining] = useState<number>(5); // Initialize lives remaining to 3

  const [showHint, setShowHint] = useState<boolean>(lesson.isFirstAppearance);

  const audio = new Audio(audioFile);

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
      setLessonStatus("correct");
      setPromptText("Correct!");
      audio.play();
      setPromptText("Correct!");
      // await 500ms before moving on to the next lesson
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setInputText("");
      onCompletion();

    } else if (lastInputWasSpaceOrNewline && newAsciiString !== lesson.correctInputMatch){
      // Decrement livesRemaining if the answer is incorrect during a challenge
      if (level.name.includes("Challenge")) {
        setLivesRemaining((prevLives) => {
          const newLives = prevLives - 1;
          // End the level if no lives remaining
          if (newLives === 0) {
            setChallengeFail(true);
          } else if (newLives === 1) {
            setPromptText(newLives + " life remaining" ); // Display the number of lives remaining
          } else {
            setPromptText(newLives + " lives remaining" ); // Display the number of lives remaining
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
        <div className="relative flex items-center justify-center w-10 h-10">
          <span className="text-2xl z-10 text-white">{livesRemaining}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Heart title="Lives" className="w-10 h-10" />
          </div>
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
