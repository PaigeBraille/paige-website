import React, { useState } from "react";

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
};

type BrailleTextBoxProps = {
  // Listen for changes to the text box,
  onChange: (currentAsciiGlyphString: string) => void;
  // Map of 6 strings, each representing a dot of a braille character
  inputKeyMap: inputKeyMap;
};

export const BrailleTextBox = ({
  onChange,
  inputKeyMap = defaultInputKeyMap,
}: BrailleTextBoxProps) => {
  const [asciiGlyphString, setAsciiGlyphString] = useState<string>("");
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>(
    {},
  );

  const keys = Object.keys(inputKeyMap);

  return (
    <div className="w-full sm:w-1/2 p-4">
      <h2 className="tracking-tight leading-tight mb-2">Braille</h2>
      <textarea
        rows={6}
        cols={25}
        value={"hello"}
        className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
      />
    </div>
  );
};
