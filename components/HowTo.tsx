import React from "react";
import Heading from "../components/Heading";
import Icon1 from "../public/svg/Paige_Icon01.svg";
import Icon2 from "../public/svg/Paige_Icon02.svg";
import Icon3 from "../public/svg/Paige_Icon03.svg";

const HowToSection = (props: {
  number: number;
  image: React.ReactNode;
  title: string;
  instructionText: string;
}) => {
  return (
    <div className="w-full md:w-1/3 md:px-2">
      <div className="my-4 bg-blue-50 p-4 relative w-full h-48 flex flex-col justify-center items-center rounded-lg">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-lg font-bold absolute -top-4 left-4">
          {props.number}
        </div>
        {props.image}
      </div>
      <div className="font-bold text-left text-primary text-xl px-4">
        {props.title}
      </div>
      <div className="text-left text-sm text-paigedarkgrey px-4">
        {props.instructionText}
      </div>
    </div>
  );
};

const HowTo = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="pb-6">
        <Heading css="text-2xl text-start font-bold px-4 md:px-6 text-primary text-bold tracking-tight leading-tight">
          Easy as 1 - 2 - 3
        </Heading>
      </div>
      <div className="flex flex-wrap">
        <HowToSection
          number={1}
          image={<Icon1 />}
          title="Swap"
          instructionText="Swap the base of your braille writer with the Paige Connect board."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <HowToSection
          number={2}
          image={<Icon2 />}
          title="Connect"
          instructionText="View the print translation on a phone, tablet or laptop."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <HowToSection
          number={3}
          image={<Icon3 />}
          title="Share"
          instructionText="Collaborate with sighted peers, parents and teachers."
        />
      </div>
      {/* <div className="flex flex-col md:border md:border-paigedarkgrey rounded-b-lg">
        <p className="md:w-2/3 flex p-2 p-6 text-lg text-left font-light">
          Paige is committed to serving braille communities worldwide. We are
          supported by individuals and institutions well placed in the world of
          braille and entrepreneurship to achieve this goal:
        </p>
        <div className="grid gap-8 px-4 py-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <TeamMember
            imageSrc={Suparna}
            heading={"Suparna Biswas"}
            caption={"Chief Executive Officer at Kilimanjaro Blind Trust"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Jaime Aguilera"}
            caption={"Co-Founder of Inaglobe"}
          />
        </div>
      </div> */}
    </section>
  );
};

export default HowTo;
