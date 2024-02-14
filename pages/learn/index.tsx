import React, { useState, ChangeEvent } from "react";
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
}

export type Chapter = {
  name: string;
  levels: Level[];
};

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
    lessons: [LESSONS[145], LESSONS[146], LESSONS[147], LESSONS[148], LESSONS[149], LESSONS[150]],
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
    lessons: [LESSONS[151], LESSONS[152], LESSONS[153], LESSONS[154], LESSONS[155]],
  },
  {
    name: "Level 2",
    description: 'ence, ong, ful, tion, ness, ment, ity',
    lessons: [LESSONS[156], LESSONS[157], LESSONS[158], LESSONS[159], LESSONS[160], LESSONS[161], LESSONS[162]],
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
    lessons: [LESSONS[163], LESSONS[164], LESSONS[165], LESSONS[166], LESSONS[167], LESSONS[168], LESSONS[169], LESSONS[170], LESSONS[171], LESSONS[172],  LESSONS[173], LESSONS[174], LESSONS[175], LESSONS[176], LESSONS[177]],
  },
  {
    name: "Level 2",
    description: 'bec - brl',
    lessons: [LESSONS[178], LESSONS[179], LESSONS[180], LESSONS[181], LESSONS[182], LESSONS[183], LESSONS[184], LESSONS[185], LESSONS[186], LESSONS[187]],
  },
  {
    name: "Challenge 1",
    description: "",
    lessons: [LESSONS[163], LESSONS[164], LESSONS[165], LESSONS[166], LESSONS[167], LESSONS[168], LESSONS[169], LESSONS[170], LESSONS[171], LESSONS[172],  LESSONS[173], LESSONS[174], LESSONS[175], LESSONS[176], LESSONS[177], LESSONS[178], LESSONS[179], LESSONS[180], LESSONS[181], LESSONS[182], LESSONS[183], LESSONS[184], LESSONS[185], LESSONS[186], LESSONS[187]],
  },
  {
    name: "Level 3",
    description: 'chn - grt',
    lessons: [LESSONS[188], LESSONS[189], LESSONS[190], LESSONS[191], LESSONS[192], LESSONS[193], LESSONS[194], LESSONS[195], LESSONS[196], LESSONS[197], LESSONS[198], LESSONS[199], LESSONS[200]],
  },
  {
    name: "Level 4",
    description: 'herf - nei',
    lessons: [LESSONS[201], LESSONS[202], LESSONS[203], LESSONS[204], LESSONS[205], LESSONS[206], LESSONS[207], LESSONS[208], LESSONS[209], LESSONS[210], LESSONS[211], LESSONS[212], LESSONS[213]],
  },
  {
    name: "Challenge 2",
    description: "",
    lessons: [ LESSONS[188], LESSONS[189], LESSONS[190], LESSONS[191], LESSONS[192], LESSONS[193], LESSONS[194], LESSONS[195], LESSONS[196], LESSONS[197], LESSONS[198], LESSONS[199], LESSONS[200], LESSONS[201], LESSONS[202], LESSONS[203], LESSONS[204], LESSONS[205], LESSONS[206], LESSONS[207], LESSONS[208], LESSONS[209], LESSONS[210], LESSONS[211], LESSONS[212], LESSONS[213]],
  },
  {
    name: "Level 5",
    description: 'onef - rjcg',
    lessons: [LESSONS[214], LESSONS[215], LESSONS[216], LESSONS[217], LESSONS[218], LESSONS[219], LESSONS[220], LESSONS[221], LESSONS[222], LESSONS[223], LESSONS[224]],
  },
  {
    name: "Level 6",
    description: 'sd - yrvs',
    lessons: [LESSONS[225], LESSONS[226], LESSONS[227], LESSONS[228], LESSONS[229], LESSONS[230], LESSONS[231], LESSONS[232], LESSONS[233], LESSONS[234], LESSONS[235], LESSONS[236], LESSONS[237]],
  },
  {
    name: "Challenge 3",
    description: "",
    lessons: [LESSONS[214], LESSONS[215], LESSONS[216], LESSONS[217], LESSONS[218], LESSONS[219], LESSONS[220], LESSONS[221], LESSONS[222], LESSONS[223], LESSONS[224], LESSONS[225], LESSONS[226], LESSONS[227], LESSONS[228], LESSONS[229], LESSONS[230], LESSONS[231], LESSONS[232], LESSONS[233], LESSONS[234], LESSONS[235], LESSONS[236], LESSONS[237]],
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