import React, { useState, useEffect } from "react";
import { Wrapper } from "../components/Wrapper";
import Heading from "../components/Heading";

type TextBoxProps = {
  setPrintText: (text: string) => void;
};


const TextBox = ({ setPrintText }: TextBoxProps) => {
  const [inputText, setInputText] = useState("");
  const [keyPressedMap, setKeyPressedMap] = useState<Record<string, boolean>>({});
  const [pressedKeys, setPressedKeys] = useState<string[]>([]);
  const [paige_pressed, setPaigePressed] = useState<number>(0);



  const handleKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    // If the key is in the pressedKeys array, remove it
    setKeyPressedMap((prevMap) => ({ ...prevMap, [key]: false }));

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const key = e.key.toLowerCase();
    setInputText(" ");
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
  };


  useEffect(() => {
    if (Object.values(keyPressedMap).every((value) => !value) && pressedKeys.length > 0) {
      setInputText(protocolAscii(paige_pressed));
      // Clear pressed keys after sending the string
      setPressedKeys([]);
      setPaigePressed(0);
    }
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
        <h2 className="tracking-tight leading-tight mb-2">Input Text</h2>
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
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-primary">Learn</Heading>
        </div>
        <TextBox setPrintText={setPrintText}/>
        <div className="w-full p-4">
          <h2 className="tracking-tight leading-tight mb-2">Mapped Number</h2>
          <textarea
            rows={4}
            cols={25}
            value={printText}
            readOnly
            className="rounded border border-paigedarkgrey outline-primary p-2 w-full"
          />
        </div>
      </div>
    </Wrapper>
  );
}











