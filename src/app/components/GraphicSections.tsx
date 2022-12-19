import React from "react";
import Header from "./font/Header";
import Graphic from "../svg/graphic-1.svg";
import Graphic2 from "../svg/graphic-2.svg";

export function GraphicSection1() {
  return (
    <section className="flex flex-col bg-white gap-4 px-2 sm:px-8 my-8 sm:my-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full text-white bg-primary rounded-lg">
          <div className="inline-flex flex-col gap-4 max-w-xs p-4 sm:p-12 ">
            <Header css="text-center sm:text-start grow" color="white">
              Meet Paige
            </Header>
            <span>
              We are building the world's first low-cost, multiline braille
              display.
            </span>
            <button className="rounded-sm px-4 py-2 font-bold text-primary bg-white hover:bg-gray-300 focus:outline-none focus:shadow-outline text-center sm:w-2/3">
              Learn more
            </button>
          </div>
          <Graphic className="block sm:inline-flex w-auto my-auto" />
        </div>
      </div>
    </section>
  );
}

export function GraphicSection2() {
  return (
    <section className="flex flex-col bg-white gap-4 px-2 sm:px-8 my-8 sm:my-16">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-green-100 rounded-lg">
          <Graphic2 className="block sm:inline-flex w-auto my-auto mx-4" />
          <div className="inline-flex flex-col gap-4 max-w-xs text-start sm:text-end p-4 sm:p-12 ">
            <Header css="text-center sm:text-end grow" color="white">
              Braille matters
            </Header>
            <span>
              Braille is literacy and the Paige team is dedicated to achieving
              affordable access to braille worldwide.
            </span>
            <button className="rounded-sm px-4 py-2 font-bold text-white bg-gray-800 hover:bg-gray-600 focus:outline-none focus:shadow-outline text-center sm:w-2/3 sm:ml-auto">
              Learn more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
