import React from "react";
import Heading from "./Heading";
import BrailleGraphic from "../img/graphicbraille.png";

const WRITE_WITH_US_CONTENT =
  "Writing together can be a lot of fun! It allows you to collaborate with others, share ideas, and bounce ideas off each other. It can also be a great way to improve your writing skills, as you can learn from the others you are working with and get feedback on your own writing. ";

export default function WriteWithUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center md:justify-between w-full px-4 sm:px-0">
      <div className="flex flex-col gap-6 items-center sm:items-start">
        <Heading css="sm:text-start">Write with us</Heading>
        <span>{WRITE_WITH_US_CONTENT}</span>
        <a className="border-2 rounded-sm border-gray-700 px-4 py-2 text-center w-full sm:w-fit" href="https://paigetranslate.netlify.app/" target="_blank">
          Translation tool
        </a>
      </div>
      <div>
        <img
          src={BrailleGraphic}
          className="max-w-64 sm:max-w-xs md:max-w-sm"
        />
      </div>
    </div>
  );
}
