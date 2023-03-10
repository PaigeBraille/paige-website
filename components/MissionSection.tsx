import React from "react";
import Heading from "./Heading";

const MissionItem = (props: { title: string; text: string; idx: number }) => {
  return (
    <div className="md:border-x border-paigedarkgrey flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4">
        <h3 className="md:w-1/2 text-xl md:text-xl font-bold md:mr-6 leading-tight mt-4 p-2 md:p-6 tracking-tight text-primary">
          {props.title}
        </h3>
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">{props.text}</p>
      </div>
      <div className="border-b border-paigedarkgrey flex items-center relative px-4">
        <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center absolute -top-4 left-4">
          {props.idx}
        </div>
      </div>
    </div>
  );
};

export default function MissionSection() {
  return (
    <div className="pb-6">
      <Heading css="text-2xl font-bold px-4 md:px-6 py-4 bg-primary text-white text-bold md:rounded-t-lg tracking-tight leading-tight text-start">
        Our mission
      </Heading>

      <MissionItem
        title="We want to make braille affordable for everyone"
        text="At Paige, we believe that braille is a fundamental tool for literacy and communication for people who are visually impaired."
        idx={1}
      />
      <MissionItem
        title="We want to help people communicate better"
        text="Our technology focuses on enabling communication and collaboration with sighted peers, parents, and teachers."
        idx={2}
      />
      <MissionItem
        title="We want to engage with the braille community"
        text="It is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={3}
      />
    </div>
  );
}
