import React, { useEffect, useState } from "react";
import { asciiBraille } from "./BrailleMapping";

type inputKeyMap = {
  "upper-left": string;
  "middle-left": string;
  "lower-left": string;
  "upper-right": string;
  "middle-right": string;
  "lower-right": string;
};

const defaultInputKeyMap: inputKeyMap = {
  "upper-left": "f",
  "middle-left": "d",
  "lower-left": "s",
  "upper-right": "j",
  "middle-right": "k",
  "lower-right": "l",
} as const;

type BrailleTextBoxProps = {
  // Listen for changes to the text box,
  onChange: (currentAsciiGlyphString: string) => void;
  // Map of 6 strings, each representing a dot of a braille character
  inputKeyMap?: inputKeyMap;
};

export const BrailleTextBox = ({
  onChange,
  inputKeyMap = defaultInputKeyMap,
}: BrailleTextBoxProps) => {
  // Used to hold the ascii glyph string of the input
  const [asciiGlyphString, _setAsciiGlyphString] = useState<string>("");
  // Used to hold the keys which are currently pressed
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>(
    {},
  );
  // Used to store the value of the keys that had been pressed once the last key has been unpressed
  const [paigePressed, setPaigePressed] = useState<number>(0);
  const [unicodeGlyphString, setUnicodeGlyphString] = useState<string>("");
  // I don't know why this is needed but is somehow is
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);

  // Sync the asciiGlyphString with the parent component
  function setAsciiGlyphString(asciiGlyphString: string): void {
    onChange(asciiGlyphString);
    _setAsciiGlyphString(asciiGlyphString);
  }

  const keys = [
    inputKeyMap["lower-left"],
    inputKeyMap["middle-left"],
    inputKeyMap["upper-left"],
    inputKeyMap["upper-right"],
    inputKeyMap["middle-right"],
    inputKeyMap["lower-right"],
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
        setPressedKeys((prevKeys) => [...prevKeys, key]);
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
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 0));
      }
      if (keys[1].includes(key)) {
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 1));
      }
      if (keys[0].includes(key)) {
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 2));
      }
      if (keys[3].includes(key)) {
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 3));
      }
      if (keys[4].includes(key)) {
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 4));
      }
      if (keys[5].includes(key)) {
        console.log({ key });
        setPaigePressed((prevValue) => prevValue | (1 << 5));
      }
      console.log(paigePressed);
      // Handle special keys
      if (key === " ") {
        e.preventDefault();
        const updatedText = asciiGlyphString + " ";
        setAsciiGlyphString(updatedText);
      } else if (key === "backspace") {
        const updatedText = asciiGlyphString.slice(0, -1);
        setAsciiGlyphString(updatedText);
      } else if (key === "enter") {
        const updatedText = asciiGlyphString + "\n";
        setAsciiGlyphString(updatedText);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys, keyPressedMap, setAsciiGlyphString]);

  useEffect(() => {
    const handleKeyPress = async () => {
      // All the inputs keys have been unpressed thus the user has finished typing the character
      // proceed to append the character to the text
      const allKeysUnpressed = Object.values(keyPressedMap).every(
        (value) => !value,
      );
      if (allKeysUnpressed && paigePressed !== 0) {
        console.log({ keyPressedMap });
        console.log({ paigePressed });
        const updatedText = asciiGlyphString + protocolAscii(paigePressed);
        const brailleText = updatedText
          .split("")
          .map((char) => asciiBraille[char]?.braille || char) // Use Braille mapping
          .join("");
        setAsciiGlyphString(brailleText);
        setPressedKeys([]);
        setPaigePressed(0);
      }
    };

    handleKeyPress();
  }, [keyPressedMap]);

  const protocolAscii = (keyMapping: number): string => {
    console.log(keyMapping);
    const entry = Object.entries(asciiBraille).find(
      ([_key, value]) => value.keyMapping === keyMapping,
    );
    if (!entry) return "";
    const [key] = entry;
    console.log(key);
    return key;
  };

  return (
    <div className="w-full sm:w-1/2 p-4">
      <h2 className="tracking-tight leading-tight mb-2">Braille</h2>
      <textarea
        rows={6}
        cols={25}
        value={asciiGlyphString}
        className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
      />
    </div>
  );
};
