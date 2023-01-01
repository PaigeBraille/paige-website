import React from "react";
import Heading from "./Heading";
import Graphic from "../svg/graphic-1.svg";
import Graphic2 from "../svg/graphic-2.svg";
import { Link } from "react-router-dom";

export function GraphicSection1() {
  return (
    <section className="flex flex-col bg-white gap-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full text-white bg-primary sm:rounded-lg">
          <div className="inline-flex flex-col gap-4 max-w-lg p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow" color="white">
              Meet Paige
            </Heading>
            <span>
            Paige was founded by a group of four Imperial College London engineers trying to understand the difficulties visually impaired face when accessing braille, but now we are more than that. 
            </span>
            <Link
              className="rounded-sm px-4 py-2 font-bold text-primary bg-white hover:bg-blue-100 focus:outline-none focus:shadow-outline text-center sm:w-2/3"
              to="/about"
            >
              Learn more
            </Link>
          </div>
          <Graphic className="block sm:inline-flex w-auto my-auto" />
        </div>
      </div>
    </section>
  );
}

export function GraphicSection2() {
  return (
    <section className="flex flex-col bg-white gap-4 w-full">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-green-100 sm:rounded-lg">
 
          <div className="inline-flex flex-col gap-4 max-w-xl text-start sm:text-start p-4 sm:p-12 ">
            <Heading css="text-center sm:text-start grow" color="white">
              Braille matters
            </Heading>
            <span>
            The United Nations Convention on the Rights of Persons with Disabilities (CRPD) defines braille as a means of communication and therefore essential in freedom of expression and access to information. Worldwide, 340 million people are blind or partially sighted and this figure is set to rise due to an ageing population. 
            </span>
            {/* <Link
              className="rounded-sm px-4 py-2 font-bold text-white bg-green-900 hover:bg-green-800 focus:outline-none focus:shadow-outline text-center sm:w-2/3 sm:ml-auto"
              to="/about"
            >
              Learn more
            </Link> */}
          </div>
          <Graphic2 className="block sm:inline-flex w-auto my-auto mx-4" />
        </div>
      </div>
    </section>
  );
}
