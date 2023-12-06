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
  selectedTable: string;
};

const translateAndUpdate = async (inputText: string, selectedTable: string, setPrintText: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const translation = await backtranslateToASCII(inputText, selectedTable);
    if (translation !== null) {
      setPrintText(translation);
    }
  } catch (error) {
    console.error('Error during translation:', error);
    console.log("Fail");
  }
};


const TextBox = ({ setPrintText, selectedTable }: TextBoxProps) => {
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
      const updatedInputText = inputText + " ";
      setInputText(updatedInputText);
      // Translate 
      translateAndUpdate(updatedInputText, selectedTable, setPrintText);
    } else if (key === "backspace") {
      // Remove the last character
      const updatedInputText = inputText.slice(0, -1);
      setInputText(updatedInputText);
      //tranbslate
      translateAndUpdate(updatedInputText, selectedTable, setPrintText);
    } else if (key === "enter") {
      // Append a newline character
      const updatedInputText = inputText + "\n";
      setInputText(updatedInputText);
      // Translate 
      translateAndUpdate(updatedInputText, selectedTable, setPrintText);
    }
  };


  useEffect(() => {
    const handleKeyPress = async () => {
      if (Object.values(keyPressedMap).every((value) => !value) && pressedKeys.length > 0) {
        // Append the new character to the existing input text
        const updatedInputText = inputText + protocolAscii(paige_pressed);
        // Display the equivalent Braille Unicode in the input text
        const brailleText = updatedInputText
        .split('')
        .map(char => alphabetToBraille[char]?.braille || char)  // Use Braille mapping
        .join('');
        setInputText(brailleText);  // Update input text after translation
        // Translate 
        translateAndUpdate(updatedInputText, selectedTable, setPrintText);
        // Clear pressed keys
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
    <div className="w-full sm:w-1/2 p-4">
      <h2 className="tracking-tight leading-tight mb-2 " >Braille</h2>
        <textarea
          rows={6}
          cols={25}
          value={inputText}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
        />
    </div>
  );
};

export default function Translate() {
  const [printText, setPrintText] = useState("");

  const [selectedTable, setSelectedTable] = useState<string>('en-ueb-g1.ctb'); // Initial table

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
  };

  const handleSave = () => {
    const fileName = printText.split(' ')[0];
    const blob = new Blob([printText], { type: 'text/plain' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex flex-col md:flex-row justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Translate</Heading>
          <select
            id="translationTable"
            onChange={handleTableChange}
            value={selectedTable}
            className="border rounded p-2 my-4"
          >
            <option value="en-ueb-g1.ctb">English (Grade 1)</option>
            <option value="en-ueb-g2.ctb">English (Grade 2)</option>
            <option value="ar-ar-g1.utb">Arabic (Grade 1)</option>
            <option value="ar-ar-g2.ctb">Arabic (Grade 2)</option>
            <option value="zhcn-g1.ctb">Chinese (Grade 1)</option>
            <option value="zhcn-g2.ctb">Chinese (Grade 2)</option>
            <option value="fr-bfu-comp6.utb">French (Grade 1)</option>
            <option value="fr-bfu-g2.ctb">French (Grade 2)</option>
            <option value="de-g0-detailed.utb">German (Grade 0)</option> 
            <option value="de-g1.ctb">German (Grade 1)</option>
            <option value="de-g2.ctb">German (Grade 2)</option>
            <option value="es-g1.ctb">Spanish (Grade 1)</option>
            <option value="es-g2.ctb">Spanish (Grade 2)</option>
            <option value="sv-g1.ctb">Swedish (Grade 1)</option>
            <option value="sv-g2.ctb">Swedish (Grade 2)</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="flex flex-col md:flex-row justify-between py-4 md:py-6">
          <TextBox setPrintText={setPrintText} selectedTable={selectedTable}/>
          <div className="w-full sm:w-1/2 p-4">
            <h2 className="tracking-tight leading-tight mb-2">Print</h2>
            <textarea
              rows={6}
              cols={25}
              value={printText}
              className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
            />
          </div>
        </div>
        <div className="flex pb-4 px-4">
          <button onClick={handleSave} className="mt-4 p-2 bg-blue-500 text-white rounded">
                Download file
          </button>
        </div>
        <div className="flex flex-col bg-white px-4 justify-between relative py-10 gap-6 sm:rounded-lg">
          <div className="flex flex-col justify-between">
            <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-l sm:text-xl md:text-3xl text-center">
            Type braille with Paige Connect or your keyboard         
              <div className="mt-2 text-primary">S D F &nbsp; J K L</div>
              <div className="text-primary">⠄ ⠂ ⠁ &nbsp;  ⠈ ⠐ ⠠</div>
            </h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}











