import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import History1 from "../public/history/perkins.jpeg";
import History2 from "../public/history/braillenprint.jpeg";
import History3 from "../public/history/bbcmicro.jpeg";
import History4 from "../public/history/braildec.jpeg";
import History5 from "../public/history/perkinswindows.jpeg";
import History6 from "../public/history/paigeconnect.jpg";


const HistoryItem = (props: {
  title: string;
  text: string;
  idx: number;
  image: any;
}) => {
  return (
    <div className="md:border-x border-paigedarkgrey flex flex-col mb-2">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center px-0 lg:pl-4">
        <h3 className="lg:w-1/2 text-xl md:text-xl font-bold lg:mr-6 leading-tight mt-4 p-2 md:p-6 tracking-tight text-primary">
          {props.title}
        </h3>
        <p className="lg:w-1/2 flex p-2 md:p-6 text-sm">{props.text}</p>
        <Image
          className="w-auto lg:w-1/2 object-right min-h-0"
          src={props.image}
          alt={props.title}
          width={400}
          height={300}
          quality={25}
          priority
        />
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
        text='The most widely used mechanical braille writer in the world since its invention in 1951. It has been hailed as "the best machine ever invented to teach students braille".'
        idx={1951}
        image={History1}
      />
      <HistoryItem
        title="Braille-n-Print"
        text="The first adaptation for the Perkins braille writer was invented by Norman Wilson and allowed the user to produce both a braille copy and a print copy of the embossed paper."
        idx={1983}
        image={History2}
      />
      <HistoryItem
        title="Interfacing a Perkins Brailler to a BBC Micro"
        text="In 1984, John Spragg developed a means of transcribing grade II braille written on a Perkins braille witer to text automatically using a BBC Micro."
        idx={1984}
        image={History3}
      />
      <HistoryItem
        title="Braildec"
        text="In 1986, the company Sensotec launched their first ever product The Braildec, which decoded braille and converted it into writing. It was used by mainstream blind children in primary education until the end of the 1990s."
        idx={1986}
        image={History4}
      />
      <HistoryItem
        title="A Modified Perkins Brailler for Text Entry into Windows Applications"
        text="Gareth Evans, Stephen Pettitt, and Paul Blenkhorn developed a PCB that was mounted immediately below the base of the Perkins. This had nine optical receivers, one for each key, which recorded information that could be sent to a PC’s serial port."
        idx={2002}
        image={History5}
      />
      <HistoryItem
        title="Paige Connect"
        text="Paige Connect builds on a great a tradition of adaptations for the Perkins Brailler to enable instant collaboration with sighted teachers, family, and friends."
        idx={2023}
        image={History6}
      />
    </div>
  );
}
