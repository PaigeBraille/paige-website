import React from "react";
import Heading from "./Heading";
import Ian from "../img/ian.jpeg";
import Jaime from "../img/jaime.png";
import Pascal from "../img/pascal.jpeg";
import Sean from "../img/sean.jpeg";

function TeamMember(props: {
  heading: string;
  caption: string;
  imageSrc: any;
}) {
  return (
    <div className="text-center text-gray-500 text-sm leading-snug">
      <img
        className="w-16 h-16 rounded-full m-auto mb-2"
        src={props.imageSrc}
        alt={props.heading}
      />
      <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 leading-tight">
        {props.heading}
      </h3>
      <p>{props.caption}</p>
    </div>
  );
}


export default function People() {
  return (
    <section className="bg-white py-8 mx-auto text-center lg:py-12">
      <div className="pb-0">
        <Heading css="text-2xl text-start font-bold px-4 md:px-6 py-4 bg-paigedarkblue text-white text-bold rounded-t-lg tracking-tight leading-tight">Meet our team</Heading>
      </div>
      <div className="border-x-2 border-gray-300 flex flex-col">
        <div className="grid gap-8 px-4 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <TeamMember
            imageSrc={Ian}
            heading={"Gregory Hargraves"}
            caption={"Founder"}
          />
          <TeamMember
            imageSrc={Sean}
            heading={"Carolina Gomes"}
            caption={"Electronics"}
          />
          <TeamMember
            imageSrc={Pascal}
            heading={"Sergi Gosalvez"}
            caption={"User Experience"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Nina Moutonnet"}
            caption={"Communications"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Javi Tarraga"}
            caption={"Branding"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Fran Capacete"}
            caption={"Graphics"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Nina Rimsky"}
            caption={"Software"}
          />
          <TeamMember
            imageSrc={Jaime}
            heading={"Benedict Carling"}
            caption={"Firmware"}
          />
        </div>
      </div>
      <div className="flex flex-col border-2 border-gray-300 rounded-b-lg ">
        <p className="md:w-2/3 flex p-2 md:p-6 text-lg text-left font-light">Paige is committed to serving braille communities worldwide. We are supported by individuals and institutions well placed in the world of braille and entrepreneurship to achieve this goal:</p>
        <div className="grid gap-8 px-4 py-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
          <TeamMember
            imageSrc={Ian}
            heading={"Sean Randall"}
            caption={"Accessibility Specialist at NCW "}
          />
          <TeamMember
            imageSrc={Sean}
            heading={"Suparna Biswas"}
            caption={"Chief Executive Officer at Kilimanjaro Blind Trust"}
          />
          <TeamMember
            imageSrc={Pascal}
            heading={"Jaime Aguilera"}
            caption={"Co-Founder of Inaglobe"}
          />
        </div>
      </div>
    </section>
  );
}
