import React, { useEffect, useState } from "react";
import { brailleMap } from "./BrailleMapping";

export type InputKeyMap = {
  "lower-left": string;
  "middle-left": string;
  "upper-left": string;
  "upper-right": string;
  "middle-right": string;
  "lower-right": string;
};

const defaultInputKeyMap: InputKeyMap = {
  "lower-left": "s",
  "middle-left": "d",
  "upper-left": "f",
  "upper-right": "j",
  "middle-right": "k",
  "lower-right": "l",
} as const;

type BrailleTextBoxProps = {
  // Listen for changes to the text box,
  onChange: (currentAsciiGlyphString: string) => void;
  // Map of 6 strings, each representing a dot of a braille character
  InputKeyMap?: InputKeyMap;
  // Controlled ASCII value
  value: string;
};

export const BrailleTextBox = ({
  onChange,
  InputKeyMap = defaultInputKeyMap,
  value,
}: BrailleTextBoxProps) => {
  // Used to hold the keys which are currently pressed
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>(
    {},
  );
  // Used to store the value of the keys that had been pressed once the last key has been unpressed
  const [paigePressed, setPaigePressed] = useState<number>(0);
  const [unicodeGlyphString, setUnicodeGlyphString] = useState<string>("");

  useEffect(() => {
    // Sync the ASCII value with the parent component
    onChange(value);
    const brailleText = value
      .split("")
      .map((char) => brailleMap[char]?.braille || char) // Use Braille mapping
      .join("");
    setUnicodeGlyphString(brailleText);
  }, [value, onChange]);

  const keys = [
    InputKeyMap["lower-left"],
    InputKeyMap["middle-left"],
    InputKeyMap["upper-left"],
    InputKeyMap["upper-right"],
    InputKeyMap["middle-right"],
    InputKeyMap["lower-right"],
  ];

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // If the key is in the pressedKeys array, remove it
      setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: false }));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (keys.includes(key) && !keyPressedMap[key]) {
        setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: true }));
      }
      // Update paige_pressed based on the pressed key
      // This is a way to encode the pressed keys into a single integer
      // A example with the default keys is if:
      // "S" is pressed add 4 to paige_pressed, however the binary way does not repeatedly add 4
      // "D" is pressed add 2 to paige_pressed
      // "F" is pressed add 1 to paige_pressed
      // "J" is pressed add 8 to paige_pressed
      // "K" is pressed add 16 to paige_pressed
      // "L" is pressed add 32 to paige_pressed
      if (keys[2].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 0));
      }
      if (keys[1].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 1));
      }
      if (keys[0].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 2));
      }
      if (keys[3].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 3));
      }
      if (keys[4].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 4));
      }
      if (keys[5].includes(key)) {
        setPaigePressed((prevValue) => prevValue | (1 << 5));
      }
      // Handle special keys
      if (key === " ") {
        e.preventDefault();
        const updatedText = value + " ";
        onChange(updatedText);
      } else if (key === "backspace") {
        const updatedText = value.slice(0, -1);
        onChange(updatedText);
      } else if (key === "enter") {
        const updatedText = value + "\n";
        onChange(updatedText);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [value, keyPressedMap, onChange]);

  useEffect(() => {
    const handleKeyPress = async () => {
      // All the inputs keys have been unpressed thus the user has finished typing the character
      // proceed to append the character to the text
      const allKeysUnpressed = Object.values(keyPressedMap).every(
        (value) => !value,
      );
      if (allKeysUnpressed && paigePressed !== 0) {
        const updatedText = value + keyToUnicode(paigePressed);
        onChange(updatedText);
        setPaigePressed(0);
      }
    };

    handleKeyPress();
  }, [keyPressedMap]);

  const keyToUnicode = (keyMapping: number): string => {
    const entry = Object.entries(brailleMap).find(
      ([_key, value]) => value.keyMapping === keyMapping,
    );
    if (!entry) return "";
    const [, { braille }] = entry; // Destructure the braille property from the found entry
    return braille; // Return the braille Unicode
  };

  return (
    <textarea
      rows={15}
      cols={25}
      value={unicodeGlyphString}
      onChange={() => {}}
      className="rounded border font-braille border-paigedarkgrey outline-primary p-2 w-full"
      aria-hidden="true"
      aria-live="off"
      readOnly={true}
      disabled
    />
  );
};
