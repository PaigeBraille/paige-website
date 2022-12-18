import React from "react";
import Header from "../font/Header";
import TeamMember from "./TeamMember";
import Ian from "../../img/ian.jpeg";
import Jaime from "../../img/jaime.png";
import Pascal from "../../img/pascal.jpeg";
import Sean from "../../img/sean.jpeg";

export default function People() {
  return (
    <section className="bg-white py-8 px-4 mx-auto text-center lg:py-12 lg:px-12">
      <div className="mx-auto pb-6 px-6 lg:px-12">
        <Header css="mb-2">Meet our team</Header>
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
