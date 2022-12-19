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
    <section className="bg-white py-8 px-4 mx-auto text-center lg:py-12 lg:px-12">
      <div className="mx-auto pb-6 px-6 lg:px-12">
        <Heading css="mb-2">Meet our team</Heading>
      </div>
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <TeamMember
          imageSrc={Ian}
          heading={"Dr. Ian Radcliffe"}
          caption={"Teaching Fellow at Imperial College London"}
        />
        <TeamMember
          imageSrc={Sean}
          heading={"Sean Randall"}
          caption={"Accessibility Specialist at New College Worcester"}
        />
        <TeamMember
          imageSrc={Pascal}
          heading={"Paschal Egan"}
          caption={"Electronics Engineer at Imperial College London"}
        />
        <TeamMember
          imageSrc={Jaime}
          heading={"Jaime Aguilera"}
          caption={"Co-founder of InAGlobe"}
        />
      </div>
    </section>
  );
}
