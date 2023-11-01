import React, { useState, ChangeEvent, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import next from "next";

type BrailleMapping = {
  [key: string]: {
    braille: string;
    introducedCount: number;
  };
};

// Define the type for the TextBoxProps
type TextBoxProps = {
  nextSuggestion: { letter: string; braille: string; introducedCount: number };
  setNextSuggestion: (suggestion: { letter: string; braille: string; introducedCount:number }) => void;
  printText: string;
  setPrintText: (text: string) => void;
  alphabetToBraille: BrailleMapping;
  setAlphabetToBraille: React.Dispatch<React.SetStateAction<BrailleMapping>>;
};

const TextBox = ({
  nextSuggestion,
  setNextSuggestion,
  printText,
  setPrintText,
  alphabetToBraille,
  setAlphabetToBraille,
}: TextBoxProps) => {
  const [brailleText, setBrailleText] = useState("");

  // Define the difficulty level (adjust as needed)
  const difficultyLevel = 0.1;

  const getRandomSuggestion = (alphabetToBraille: BrailleMapping) => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    // Use the difficulty level to control randomness
    let letter = alphabet.charAt(
      Math.floor(Math.random() * alphabet.length * difficultyLevel)
    );
    return { letter, braille: alphabetToBraille[letter].braille, introducedCount: alphabetToBraille[letter].introducedCount };
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    var newText = e.target.value;
    newText = newText.charAt(newText.length - 1);

    // Update the "Braille" text with the last letter
    setBrailleText(newText);

    if (newText === nextSuggestion.letter) {
      // If the input matches the expected Braille character, update the "Print" text
      setPrintText(`Correct!`);
      // Trigger the effect after a successful match
      setTimeout(() => {
        const newSuggestion = getRandomSuggestion(alphabetToBraille);
        setNextSuggestion(newSuggestion);

        const letter = newSuggestion.letter.toLowerCase();
        if (alphabetToBraille[letter].introducedCount >= 1) {
          // If the letter has been introduced 5 times, print only the letter
          setPrintText(`${letter}`);
        } else {
          setPrintText(`${letter} is ${alphabetToBraille[letter].braille}`);
          // Increase the introducedCount for the letter
          alphabetToBraille[letter].introducedCount++;
          // Update the state to reflect the increased count
          setAlphabetToBraille({ ...alphabetToBraille });
        }
      }, 2000);
    } else {
      // If the input is incorrect, show a "Try Again" message
      setPrintText("Try Again!");
      setTimeout(() => {
        setPrintText(`${nextSuggestion.letter} is ${nextSuggestion.braille}`);
      }, 2000);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <h2>Braille</h2>
          <textarea
            rows={4}
            cols={25}
            value={brailleText}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <h2>Print</h2>
          <textarea rows={4} cols={25} value={printText} readOnly />
        </div>
      </div>
    </div>
  );
};

export default function Learn() {
  // Initialize nextSuggestion to a non-random value initially
  const [nextSuggestion, setNextSuggestion] = useState({
    letter: "a",
    braille: "⠁",
    introducedCount: 1,
  });
  const [printText, setPrintText] = useState(`${nextSuggestion.letter} is ${nextSuggestion.braille}`);
  const [alphabetToBraille, setAlphabetToBraille] = useState<BrailleMapping>({
    a: { braille: "⠁", introducedCount: 1 },
    b: { braille: "⠃", introducedCount: 0 },
    c: { braille: "⠉", introducedCount: 0 },
    d: { braille: "⠙", introducedCount: 0 },
    e: { braille: "⠑", introducedCount: 0 },
    f: { braille: "⠋", introducedCount: 0 },
    g: { braille: "⠛", introducedCount: 0 },
    h: { braille: "⠓", introducedCount: 0 },
    i: { braille: "⠊", introducedCount: 0 },
    j: { braille: "⠚", introducedCount: 0 },
    k: { braille: "⠅", introducedCount: 0 },
    l: { braille: "⠇", introducedCount: 0 },
    m: { braille: "⠍", introducedCount: 0 },
    n: { braille: "⠝", introducedCount: 0 },
    o: { braille: "⠕", introducedCount: 0 },
    p: { braille: "⠏", introducedCount: 0 },
    q: { braille: "⠟", introducedCount: 0 },
    r: { braille: "⠗", introducedCount: 0 },
    s: { braille: "⠎", introducedCount: 0 },
    t: { braille: "⠞", introducedCount: 0 },
    u: { braille: "⠥", introducedCount: 0 },
    v: { braille: "⠧", introducedCount: 0 },
    w: { braille: "⠺", introducedCount: 0 },
    x: { braille: "⠭", introducedCount: 0 },
    y: { braille: "⠽", introducedCount: 0 },
    z: { braille: "⠵", introducedCount: 0 },
  });

  useEffect(() => {
    setPrintText(`${nextSuggestion.letter} is ${nextSuggestion.braille}`);
  }, []);

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex justify between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Learn</Heading>
        </div>
        <TextBox
          nextSuggestion={nextSuggestion}
          setNextSuggestion={setNextSuggestion}
          printText={printText}
          setPrintText={setPrintText}
          alphabetToBraille={alphabetToBraille}
          setAlphabetToBraille={setAlphabetToBraille}
        />
      </div>
    </Wrapper>
  );
}









