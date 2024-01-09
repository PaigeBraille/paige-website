// KeySelect.tsx

import React, { useState } from "react";

type KeyEditorProps = {
  onSave: (keys: string[]) => void;
};

const KeySelect: React.FC<KeyEditorProps> = ({ onSave }) => {
  const [keys, setKeys] = useState<string[]>(["s", "d", "f", "j", "k", "l"]);

  const handleKeyChange = (index: number, value: string) => {
    const updatedKeys = [...keys];
    updatedKeys[index] = value;
    setKeys(updatedKeys);
  };

  const handleSave = () => {
    onSave(keys);
  };

  return (
    <div className="flex flex-col bg-primary px-4 justify-between relative py-10 mb-4 gap-6 sm:rounded-lg">
      <div className="flex flex-col justify-between">
        <div className="font-bold text-white tracking-tight leading-tight text-center text-l sm:text-xl md:text-3xl">
          Edit input keys
          <div>
            {keys.map((key, index) => (
              <input
                className="text-primary bg-white m-1 w-10 py-1 text-center rounded"
                key={index}
                type="text"
                maxLength={1}
                value={key}
                onChange={(e) => handleKeyChange(index, e.target.value)}
              />
            ))}
          </div>
          <div className="text-white" aria-hidden="true">
            ⠄ ⠂ ⠁ &nbsp;&nbsp;&nbsp; ⠈ ⠐ ⠠
          </div>
          <button
            className="rounded-sm text-base px-4 py-2 sm:mt-6 font-bold focus:outline-none focus:shadow-outline text-center w-full xl:w-fit text-primary bg-white cursor-pointer"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeySelect;
