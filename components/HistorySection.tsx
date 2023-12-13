import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import Swap1 from "../public/support-imgs/swap-1.jpg";

const HistoryItem = (props: { title: string; text: string; idx: number; image: any; }) => {
  return (
    <div className="md:border-x border-paigedarkgrey flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4">
        <h3 className="md:w-1/2 text-xl md:text-xl font-bold md:mr-6 leading-tight mt-4 p-2 md:p-6 tracking-tight text-primary">
          {props.title}
        </h3>
        <Image  className="w-auto md:w-1/2 object-contain object-right min-h-0"
                src={props.image}
                alt={props.title}
                width={500}
                height={300}
                quality={25}
                priority />
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">{props.text}</p>
      </div>
      <div className="border-b border-paigedarkgrey flex items-center relative px-4">
        <div className="bg-primary text-white rounded-2xl p-2 flex items-center justify-center absolute -top-4 left-4">
          {props.idx}
        </div>
      </div>
    </div>
  );
};

export default function HistorySection() {
  return (
    <div className="pb-6">
      <Heading css="text-2xl font-bold px-4 md:px-6 py-4 bg-primary text-white text-bold md:rounded-t-lg tracking-tight leading-tight text-start">
        History
      </Heading>

      <HistoryItem
        title="Perkins Brailler"
        text="At Paige, we believe that braille is a fundamental tool for literacy and communication for people who are visually impaired."
        idx={1951}
        image={Swap1}
      />
      <HistoryItem
        title="Braille-n-Print"
        text="Our technology focuses on enabling communication and collaboration with sighted peers, parents, and teachers."
        idx={1983}
        image={Swap1}
      />
      <HistoryItem
        title="Interfacing a Perkins Brailler to a BBC Micro"
        text="It is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={1984}
        image={Swap1}
      />
      <HistoryItem
        title="Braildec"
        text="It is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={1985}
        image={Swap1}
      />
      <HistoryItem
        title="A Modified Perkins Brailler for Text Entry into Windows Applications"
        text="It is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={2002}
        image={Swap1}
      />
      <HistoryItem
        title="SMART Brailler"
        text="It is crucial that we work in close collaboration with people who use braille to ensure they have a say in the technology created for them and that the resulting design serves them in their daily lives."
        idx={2011}
        image={Swap1}
      />
    </div>
  );
}
