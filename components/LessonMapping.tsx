import { Lesson } from "../pages/learn";

export const LESSONS: Lesson[] = [
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
  // REVIEW
  {
    prompt: "lad",
    hint: "",
    correctInputMatch: "lad",
    numberOfSuccessesToPass: 3,
  },
];

