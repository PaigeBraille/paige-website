import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import asciiBraille from "../components/BrailleMapping";
import { translateAndUpdate } from "../components/TranslationUtils";
import Copy from "../public/svg/Copy.svg"

type TextBoxProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setPrintText: React.Dispatch<React.SetStateAction<string>>;
  selectedTable: string;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  keyPressedMap: Record<string, boolean>;
  setKeyPressedMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  pressedKeys: string[];
  setPressedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  paigePressed: number;
  setPaigePressed: React.Dispatch<React.SetStateAction<number>>;
};

const TextBox = ({
  inputText,
  setInputText,
  setPrintText,
  selectedTable,
  text,
  setText,
  keyPressedMap,
  setKeyPressedMap,
  pressedKeys,
  setPressedKeys,
  paigePressed,
  setPaigePressed,
}: TextBoxProps) => {
  useEffect(() => {
    const handleKeyPress = async () => {
      if (Object.values(keyPressedMap).every((value) => !value) && paigePressed !== 0) {
        const updatedText = text + protocolAscii(paigePressed);
        const brailleText = updatedText
          .split('')
          .map((char) => asciiBraille[char]?.braille || char) // Use Braille mapping
          .join('');
        setText(brailleText);
        setInputText(brailleText);
        translateAndUpdate(updatedText, selectedTable, setPrintText);
        setPressedKeys([]);
        setPaigePressed(0);
      }
    };

    handleKeyPress();
  }, [pressedKeys, keyPressedMap, paigePressed, setPaigePressed, setInputText, setPrintText]);

  const protocolAscii = (key: number): string => {
    const ASCII = [
      ' ', 'a', '1', 'b', '\'', 'k', '2', 'l',
      '@', 'c', 'i', 'f', '/', 'm', 's', 'p',
      '"', 'e', '3', 'h', '9', 'o', '6', 'r',
      '^', 'd', 'j', 'g', '>', 'n', 't', 'q',
      ',', '*', '5', '<', '-', 'u', '8', 'v',
      '.', '%', '[', '$', '+', 'x', '!', '&',
      ';', ':', '4', '\\', '0', 'z', '7', '(',
      '_', '?', 'w', ']', '#', 'y', ')', '=', '\n'
    ];

    return ASCII[key];
  };

  return (
    <div className="w-full sm:w-1/2 p-4">
      <h2 className="tracking-tight leading-tight mb-2">Braille</h2>
      <textarea
        rows={6}
        cols={25}
        value={inputText}
        className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
      />
    </div>
  );
};

export default function Translate() {
  const [text, setText] = useState("");
  const [inputText, setInputText] = useState<string>("");
  const [printText, setPrintText] = useState("");
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>({});
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [paigePressed, setPaigePressed] = useState<number>(0);

  const [selectedTable, setSelectedTable] = useState<string>('en-ueb-g1.ctb'); // Initial table

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
  };

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      // If the key is in the pressedKeys array, remove it
      setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: false }));

    };

    const handleKeyDown = (e: KeyboardEvent) => {
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
        // Prevent the default action for the spacebar key
        e.preventDefault();
        // Append a space
        const updatedText = text + " ";
        setText(updatedText);
        setInputText(updatedText);
        // Translate 
        translateAndUpdate(updatedText, selectedTable, setPrintText);
      } else if (key === "backspace") {
        // Remove the last character
        const updatedText = text.slice(0, -1);
        setText(updatedText);
        setInputText(updatedText);
        //tranbslate
        translateAndUpdate(updatedText, selectedTable, setPrintText);
      } else if (key === "enter") {
        // Append a newline character
        const updatedText = text + "\n";
        setText(updatedText);
        setInputText(updatedText);
        // Translate 
        translateAndUpdate(updatedText, selectedTable, setPrintText);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
        // Clean up event listeners when the component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
          window.removeEventListener('keyup', handleKeyUp);
        };

  }, [pressedKeys, keyPressedMap, setInputText, setPrintText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(printText).then(() => {
      alert('Copied to clipboard!');
    }).catch((err) => {
      console.error('Unable to copy to clipboard', err);
    });
  };

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex flex-col md:flex-row justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Translate</Heading>
          <select
            onChange={handleTableChange}
            value={selectedTable}
            className="border rounded p-2 my-4 md:my-0"
            style={{ WebkitAppearance: "none" }}
          >
            <option value="en-ueb-g1.ctb">English (Grade 1)</option>
            <option value="en-ueb-g2.ctb">English (Grade 2)</option>
            <option value="ar-ar-g1.utb">Arabic (Grade 1)</option>
            <option value="ar-ar-g2.ctb">Arabic (Grade 2)</option>
            <option value="fr-bfu-comp6.utb">French (Grade 1)</option>
            <option value="fr-bfu-g2.ctb">French (Grade 2)</option>
            <option value="de-g0-detailed.utb">German (Grade 0)</option> 
            <option value="de-g1.ctb">German (Grade 1)</option>
            <option value="de-g2.ctb">German (Grade 2)</option>
            <option value="es-g1.ctb">Spanish (Grade 1)</option>
            <option value="es-g2.ctb">Spanish (Grade 2)</option>
            <option value="sv-g1.ctb">Swedish (Grade 1)</option>
            <option value="sv-g2.ctb">Swedish (Grade 2)</option>
            <option value="zhcn-cbs.ctb">Chinese common braille (simplified Chinese characters)</option>
            <option value="zh-chn.ctb">Chinese (China, Mandarin) Current Braille System (no tones)</option>
            <option value="zhcn-g1.ctb">Chinese (China, Mandarin) Current Braille System</option>
            <option value="zhcn-g2.ctb">Chinese (China, Mandarin) Double-phonic Braille System</option>
            <option value="zh-hk.ctb">Chinese (Hong Kong, Cantonese)</option>
            <option value="zh-tw.ctb">Chinese (Taiwan, Mandarin)</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row justify-between py-4 md:py-6">
          <TextBox
            inputText={inputText}
            setInputText={setInputText}
            setPrintText={setPrintText}
            selectedTable={selectedTable}
            text={text}
            setText={setText}
            keyPressedMap={keyPressedMap}
            setKeyPressedMap={setKeyPressedMap}
            pressedKeys={pressedKeys}
            setPressedKeys={setPressedKeys}
            paigePressed={paigePressed}
            setPaigePressed={setPaigePressed}
          />
          <div className="w-full sm:w-1/2 p-4">
            <h2 className="tracking-tight leading-tight mb-2">Print</h2>
            <textarea
              rows={6}
              cols={25}
              value={printText}
              className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
              //aria-live="assertive"
            />
          </div>
        </div>
        <div className="flex justify-end pb-4 px-4">
          <button type="button" onClick={handleCopy} className="mt-4 p-2 bg-blue-500 text-white rounded">
            <Copy title="Copy" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col bg-white px-4 justify-between relative py-10 gap-6 sm:rounded-lg">
          <div className="flex flex-col justify-between">
            <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-l sm:text-xl md:text-3xl text-center">
              Type braille with your keyboard
              <div className="mt-2 text-primary">S D F &nbsp; J K L</div>
              <div className="text-primary">⠄ ⠂ ⠁ &nbsp;  ⠈ ⠐ ⠠</div>
            </h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}











