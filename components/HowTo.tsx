import React from "react";
import Icon1 from "../public/svg/Paige_Icon01.svg";
import Icon2 from "../public/svg/Paige_Icon02.svg";
import Icon3 from "../public/svg/Paige_Icon03.svg";

const HowToSection = (props: {
  number: number;
  image: React.ReactNode;
  instructionText: string;
}) => {
  return (
    <div className="w-full md:w-1/3 md:px-2">
      <div className="my-4 bg-blue-50 p-4 relative w-full h-48 flex flex-col justify-center items-center">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-lg font-bold absolute -top-4 left-4">
          {props.number}
        </div>
        {props.image}
      </div>
      <div className="text-left text-sm">{props.instructionText}</div>
    </div>
  );
};

const HowTo = () => {
  return (
    <div className="flex flex-wrap">
      <HowToSection
        number={1}
        image={<Icon1 />}
        instructionText="Unscrew the base of your brailler and replace it with Paige Connect."
      />
      <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
      <HowToSection
        number={2}
        image={<Icon2 />}
        instructionText="Plug it in and connect to the web app tapping the NFC tag."
      />
      <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
      <HowToSection
        number={3}
        image={<Icon3 />}
        instructionText="Start sharing! Sighted children or adults can see the print translation as you are brailling."
      />
    </div>
  );
};

export default HowTo;
