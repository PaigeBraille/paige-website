import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";
import { asciiBraille } from "../components/BrailleMapping";
import { translateAndUpdate } from "../components/TranslationUtils";
import Copy from "../public/svg/Copy.svg";
import KeySelect from "../components/KeySelect";
import { BrailleTextBox } from "@/components/BrailleTextBox";

type TextBoxProps = {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setPrintText: React.Dispatch<React.SetStateAction<string>>;
  selectedTable: string;
  /*
   * Holds the state of the keys that are currently pressed
   */
  keyPressedMap: Record<string, boolean>;
  setKeyPressedMap: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
  pressedKeys: string[];
  setPressedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  paigePressed: number;
  setPaigePressed: React.Dispatch<React.SetStateAction<number>>;
  setSpokenFeedback: React.Dispatch<React.SetStateAction<string>>;
};

const TextBox = ({
  inputText,
  setInputText,
  setPrintText,
  selectedTable,
  keyPressedMap,
  setKeyPressedMap,
  pressedKeys,
  setPressedKeys,
  paigePressed,
  setPaigePressed,
  setSpokenFeedback,
}: TextBoxProps) => {
  useEffect(() => {
    const handleKeyPress = async () => {
      // All the inputs keys have been unpressed thus the user has finished typing the character
      // proceed to append the character to the text
      const allKeysUnpressed = Object.values(keyPressedMap).every(
        (value) => !value,
      );
      if (allKeysUnpressed && paigePressed !== 0) {
        const updatedText = inputText + protocolAscii(paigePressed);
        const brailleText = updatedText
          .split("")
          .map((char) => asciiBraille[char]?.braille || char) // Use Braille mapping
          .join("");
        setInputText(brailleText);
        translateAndUpdate(updatedText, selectedTable, setPrintText, null);
        setPressedKeys([]);
        setPaigePressed(0);
      }
    };

    handleKeyPress();
  }, [
    pressedKeys,
    keyPressedMap,
    paigePressed,
    setPaigePressed,
    setInputText,
    setPrintText,
  ]);

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
        value={inputText}
        className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
      />
    </div>
  );
};

export default function Translate() {
  // Used to store the braille input text
  const [inputText, setInputText] = useState<string>("");
  // Used to store the print test displayed when the braille input is translated
  const [printText, setPrintText] = useState<string>("");
  // Used to store the selected table
  const [selectedTable, setSelectedTable] = useState<string>("en-ueb-g1.ctb"); // Initial table
  // Used to store the state of the key editor
  const [showKeyEditor, setShowKeyEditor] = useState(false);
  // Used to store the keys that are currently being used
  const [keys, setKeys] = useState<string[]>(["s", "d", "f", "j", "k", "l"]);
  // Used to store the spoken feedback, the text which gets read to aria assertive
  const [spokenFeedback, setSpokenFeedback] = useState<string>("");

  const handleTableChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTable(event.target.value);
  };

  const handleSaveKeys = (newKeys: string[]) => {
    setKeys(newKeys);
    console.log("Updated keys:", keys);
    setShowKeyEditor(false);
  };

  // const handleKeyEdit = () => {
  //   setShowKeyEditor(true);
  // };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(printText)
      .then(() => {
        // alert('Copied to clipboard!');
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  const onTextChange = (newAsciiString: string) => {
    setInputText(newAsciiString);
    translateAndUpdate(
      newAsciiString,
      selectedTable,
      setPrintText,
      setSpokenFeedback,
    );
  };

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <div className="bg-white flex flex-col md:flex-row justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">
            Translate
          </Heading>
          <select
            onChange={handleTableChange}
            value={selectedTable}
            className="border rounded p-2 my-4 md:my-0 max-w-[300px]"
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
            <option className="break-all" value="zhcn-cbs.ctb">
              Chinese common braille (simplified Chinese characters)
            </option>
            <option className="break-all" value="zh-chn.ctb">
              Chinese (China, Mandarin) Current Braille System (no tones)
            </option>
            <option className="break-all" value="zhcn-g1.ctb">
              Chinese (China, Mandarin) Current Braille System
            </option>
            <option className="break-all" value="zhcn-g2.ctb">
              Chinese (China, Mandarin) Double-phonic Braille System
            </option>
            <option className="break-all" value="zh-hk.ctb">
              Chinese (Hong Kong, Cantonese)
            </option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row justify-between py-4 md:py-6">
          <div className="w-full sm:w-1/2 p-4">
            <h2 className="tracking-tight leading-tight mb-2">Braille</h2>
            <BrailleTextBox onChange={onTextChange} />
          </div>
          {/* <TextBox
            inputText={inputText}
            setInputText={setInputText}
            setPrintText={setPrintText}
            selectedTable={selectedTable}
            keyPressedMap={keyPressedMap}
            setKeyPressedMap={setKeyPressedMap}
            pressedKeys={pressedKeys}
            setPressedKeys={setPressedKeys}
            paigePressed={paigePressed}
            setPaigePressed={setPaigePressed}
            setSpokenFeedback={setSpokenFeedback}
          /> */}
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
        <div className="flex flex-col md:flex-row justify-between p-4 py-2 md:py-4">
          <div>
            <div className="tracking-tight font-bold leading-tight py-2 md:py-0">
              Spoken feedback:
            </div>
            <div aria-live="assertive">{spokenFeedback}</div>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 h-8 w-8 bg-primary text-white rounded"
          >
            <Copy title="Copy" className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-col bg-white px-4 justify-between relative py-10 gap-6 sm:rounded-lg">
          <div className="flex flex-col justify-between">
            <div className="font-bold text-paigedarkgrey tracking-tight leading-tight text-l sm:text-xl md:text-3xl text-center">
              Type braille with your keyboard
              <div className="mt-2 text-primary">
                {keys.map((key, index) => (
                  <span key={index}>
                    {key.toUpperCase()}
                    {index % 3 === 2 && index !== keys.length - 1
                      ? "\u00A0\u00A0\u00A0 "
                      : " "}
                  </span>
                ))}
              </div>
              <div className="text-primary" aria-hidden="true">
                ⠄ ⠂ ⠁ &nbsp; ⠈ ⠐ ⠠
              </div>
            </div>
            {/* <button
              tabIndex={-1}
              onClick={handleKeyEdit}
              aria-label="Edit input keys"
              className="m-2 bg-primary text-white font-bold rounded-full h-8 w-8 flex items-center justify-center"
            >
              ?
            </button> */}
          </div>
        </div>
        {showKeyEditor && <KeySelect onSave={handleSaveKeys} />}
      </div>
    </Wrapper>
  );
}
