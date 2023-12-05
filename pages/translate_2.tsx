import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";

//Translate 
import { translateToPrint, backtranslateToASCII } from "../components/TranslationUtils";

type BrailleMapping = {
  [key: string]: {
    braille: string;
  };
};

type TextBoxProps = {
  setPrintText: React.Dispatch<React.SetStateAction<string>>;
};


const TextBox = ({ setPrintText }: TextBoxProps) => {
  const [inputText, setInputText] = useState<string>("");
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>({});
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [paige_pressed, setPaigePressed] = useState<number>(0);

    // Initialize and declare the ASCII to Braille map
    const [alphabetToBraille, setAlphabetToBraille] = useState<BrailleMapping>({
      ' ': { braille: "⠀" },
      '!': { braille: "⠮" },
      '"': { braille: "⠐" },
      '#': { braille: "⠼" },
      '$': { braille: "⠫" },
      '%': { braille: "⠩" },
      '&': { braille: "⠯" },
      '\'': { braille: "⠄" },
      '(': { braille: "⠷" },
      ')': { braille: "⠾" },
      '*': { braille: "⠡" },
      '+': { braille: "⠬" },
      ',': { braille: "⠠" },
      '-': { braille: "⠤" },
      '.': { braille: "⠨" },
      '/': { braille: "⠌" },
      '0': { braille: "⠴" },
      '1': { braille: "⠂" },
      '2': { braille: "⠆" },
      '3': { braille: "⠒" },
      '4': { braille: "⠲" },
      '5': { braille: "⠢" },
      '6': { braille: "⠖" },
      '7': { braille: "⠶" },
      '8': { braille: "⠦" },
      '9': { braille: "⠔" },
      ':': { braille: "⠱" },
      ';': { braille: "⠰" },
      '<': { braille: "⠣" },
      '=': { braille: "⠿" },
      '>': { braille: "⠜" },
      '?': { braille: "⠹" },
      '@': { braille: "⠈" },
      'a': { braille: "⠁" },
      'b': { braille: "⠃" },
      'c': { braille: "⠉" },
      'd': { braille: "⠙" },
      'e': { braille: "⠑" },
      'f': { braille: "⠋" },
      'g': { braille: "⠛" },
      'h': { braille: "⠓" },
      'i': { braille: "⠊" },
      'j': { braille: "⠚" },
      'k': { braille: "⠅" },
      'l': { braille: "⠇" },
      'm': { braille: "⠍" },
      'n': { braille: "⠝" },
      'o': { braille: "⠕" },
      'p': { braille: "⠏" },
      'q': { braille: "⠟" },
      'r': { braille: "⠗" },
      's': { braille: "⠎" },
      't': { braille: "⠞" },
      'u': { braille: "⠥" },
      'v': { braille: "⠧" },
      'w': { braille: "⠺" },
      'x': { braille: "⠭" },
      'y': { braille: "⠽" },
      'z': { braille: "⠵" },
      '[': { braille: "⠪" },
      '\\': { braille: "⠳" },
      ']': { braille: "⠻" },
      '^': { braille: "⠘" },
      '_': { braille: "⠸" },
    });



  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    // If the key is in the pressedKeys array, remove it
    setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: false }));

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    if (["s", "d", "f", "j", "k", "l"].includes(key) && !keyPressedMap[key]) {
      setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: true }));
      setPressedKeys((prevKeys) => [...prevKeys, key]);

    }
    // Update paige_pressed based on the pressed key
    if (["f"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 0));
    }
    if (["d"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 1));
    }
    if (["s"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 2));
    }
    if (["j"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 3));
    }
    if (["k"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 4));
    }
    if (["l"].includes(key)) {
      setPaigePressed((prevValue) => prevValue | (1 << 5));
    }
    // Handle special keys
    if (key === " ") {
      // Append a space
      setInputText((prevText) => prevText + " ");
      setPrintText((prevText: string) => prevText + " ");
    } else if (key === "backspace") {
      // Remove the last character
      setInputText((prevText) => prevText.slice(0, -1));
      setPrintText((prevText: string) => prevText.slice(0, -1));
    } else if (key === "enter") {
      // Append a newline character
      setInputText((prevText) => prevText + "\n");
      setPrintText((prevText: string) => prevText + "\n");
    }
  };


  useEffect(() => {
    const handleKeyPress = async () => {
      if (Object.values(keyPressedMap).every((value) => !value) && pressedKeys.length > 0) {
        // Append the new character to the existing input text
        const updatedInputText = inputText + protocolAscii(paige_pressed);
        try {
          const translation = await backtranslateToASCII(updatedInputText);
          if (translation !== null) {
            // Display the equivalent Braille Unicode in the input text
            const brailleText = updatedInputText
            .split('')
            .map(char => alphabetToBraille[char]?.braille || char)  // Use Braille mapping
            .join('');
            setPrintText(translation);
            setInputText(brailleText);  // Update input text after translation
            console.log("Success");
            console.log(translation);
          } else {
            console.error('Translation failed.');
            console.log("Fail");
          }
        } catch (error) {
          console.error('Error during translation:', error);
          console.log("Fail");
        }
        // Clear pressed keys after sending the string
        setPressedKeys([]);
        setPaigePressed(0);
      }
    };
  
    handleKeyPress();
  }, [pressedKeys,keyPressedMap, setInputText, setPrintText]);

  const protocolAscii = (key: number): string => {
    const ASCII = [
      ' ', 'a', '1', 'b', '\'', 'k', '2', 'l',
      '@', 'c', 'i', 'f', '/', 'm', 's', 'p',
      '"', 'e', '3', 'h', '9', 'o', '6', 'r',
      '^', 'd', 'j', 'g', '>', 'n', 't', 'q',
      ',', '*', '5', '<', '-', 'u', '8', 'v',
      '.', '%', '[', '$', '+', 'x', '!', '&',
      ';', 'B', '4', '\\', '0', 'z', '7', '(',
      '_', '?', 'w', ']', '#', 'y', ')', '=', '\n'
    ];
    
    return ASCII[key];
  };

  return (
    <div className="flex flex-col justify-between py-6 md:py-8">
      <div className="w-full p-4">
        <h2 className="tracking-tight leading-tight mb-2">Braille</h2>
        <textarea
          rows={4}
          cols={25}
          value={inputText}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
        />
      </div>
    </div>
  );
};

export default function Learn() {
  const [printText, setPrintText] = useState("");

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex justify-between items-end pb-4 pt-6 md:pt-12 px-4">
          <Heading css="text-start leading-tight text-primary">Translate</Heading>
        </div>
        <TextBox setPrintText={setPrintText}/>
        <div className="w-full p-4">
          <h2 className="tracking-tight leading-tight mb-2">Print</h2>
          <textarea
            rows={4}
            cols={25}
            value={printText}
            className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
          />
        </div>
      </div>
    </Wrapper>
  );
}











