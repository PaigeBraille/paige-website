import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import Sean from "../public/sean.jpeg";
import Greg from "../public/greg.png";
import Carolina from "../public/carolina.png";
import Sergi from "../public/sergi.png";
import Nina from "../public/nina.png";
import NinaR from "../public/ninarimsky.png";

function TeamMember(props: {
  heading: string;
  caption: string;
  imageSrc: any;
}) {
  return (
    <div className="text-center font-light text-sm leading-snug">
      <Image
        className="w-16 h-16 rounded-full m-auto mb-2"
        src={props.imageSrc}
        alt={props.heading}
        width={64}
        height={64}
        quality={25}
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
        <Heading css="text-2xl text-start font-bold px-4 md:px-6 py-4 bg-paigedarkblue text-white text-bold md:rounded-t-lg tracking-tight leading-tight">
          Meet our team
        </Heading>
      </div>
      <div className="flex flex-col md:border-x md:border-b md:border-paigedarkgrey rounded-b-lg">
        <div className="grid gap-8 md:px-4 py-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <TeamMember
            imageSrc={Greg}
            heading={"Gregory Hargraves"}
            caption={"Founder"}
          />
          <TeamMember
            imageSrc={Carolina}
            heading={"Carolina Gomes"}
            caption={"Electronics"}
          />
          <TeamMember
            imageSrc={Sergi}
            heading={"Sergio Gosalvez"}
            caption={"Operations"}
          />
          <TeamMember
            imageSrc={Nina}
            heading={"Nina Moutonnet"}
            caption={"Development"}
          />
          <TeamMember
            imageSrc={NinaR}
            heading={"Nina Rimsky"}
            caption={"Software"}
          />
          {/* <TeamMember
            imageSrc={Sean}
            heading={"Sean Randall"}
            caption={"Accessibility"}
          /> */}
        </div>
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
}
