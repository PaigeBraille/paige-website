import React from "react";
import FAQ from "../components/FAQ";
import People from "../components/People";

const HeroText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-6 md:py-12">
      <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight md:w-2/3 font-extralight">
        <span className="font-extrabold text-primary">Paige</span> was founded
        by a group of four Imperial College London engineers trying to
        understand the difficulties blind and partially sighted face when accessing
        braille, but now we are more than that.
      </h1>
    </div>
  );
};

const MissionItem = (props: { title: string; text: string; idx: number }) => {
  return (
    <div className="border-x border-paigedarkgrey flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <h3 className="md:w-1/2 text-xl md:text-xl font-bold md:mr-6 leading-tight mt-4 p-2 md:p-6 tracking-tight text-primary">{props.title}</h3>
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">{props.text}</p>
      </div>
      <div className="border-b border-paigedarkgrey flex items-center relative">
        <div className="bg-primary text-white rounded-full h-8 w-8 flex items-center justify-center absolute -top-4 left-4">
          {props.idx}
        </div>
      </div>
    </div>
  );
};

const MissionSection = () => {
  return (
    <div className="pb-6">
      <h2 className="text-2xl font-bold px-4 md:px-6 py-4 bg-primary text-white text-bold rounded-t-lg tracking-tight leading-tight">Our mission</h2>
      <MissionItem
        title="We want to make braille affordable for everyone"
        text="At Paige, we believe that braille is a fundamental tool for literacy and communication for people who are visually impaired. That's why we are committed to making braille technology more affordable and accessible for everyone."
        idx={1}
      />
      <MissionItem
        title="We want to help people communicate better"
        text= "Communication is the act of giving, receiving, and sharing information and it is not possible without mutually understood signs or symbols. Our technology focuses on enabling communication and collaboration with sighted peers, parents, and teachers."
        idx={2}
      />
      <MissionItem
        title="We want to engage with the braille community"
        text="As engineers without lived experience of sight loss, it is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={3}
      />
    </div>
  );
};

export default function About() {
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-6">
      <HeroText />
      <MissionSection />
      <People />
      <FAQ />
    </div>
  );
}
