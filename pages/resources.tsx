import { Wrapper } from "../components/Wrapper";
import React from "react";
import {
  ResourceSection1,
  ResourceSection2,
  ResourceSection3,
} from "../components/ResourcesLinks";

const ResourceText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-6 px-4 md:py-12">
      <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight md:w-2/3 font-extralight">
        There are so many cool organisations and{" "}
        <span className="font-light text-primary">resources</span> out there for
        the visually impaired community, that we thought we&apos;d share our
        favourites with you.
      </h1>
    </div>
  );
};

export default function Resources() {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <ResourceText />
        <ResourceSection1 />
        <ResourceSection2 />
        <ResourceSection3 />
      </div>
    </Wrapper>
  );
}
