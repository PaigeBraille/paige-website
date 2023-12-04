import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import Link from "next/link";
import graphic from "../public/graphicbraille.png";

const WRITE_WITH_US_CONTENT =
  "How to get started with Paige Connect, including playful instructions and ideas for activities. We support the Curriculum Framework for Children and Young People with Vision Impairment (CFVI), enabling teachers to create playful braille lesson plans.";
  
export default function WriteWithUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center md:justify-between w-full px-4 sm:px-8">
      <div className="flex flex-col gap-6 items-center sm:items-start">
        <Heading css="sm:text-start">Write with us</Heading>
        <span>{WRITE_WITH_US_CONTENT}</span>
        <Link
          className="border rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit sm:mt-4"
          href="/translate_2"
        >
          Activities
        </Link>
      </div>
      <div>
        <Image
          src={graphic}
          className="max-w-64 sm:max-w-xs md:max-w-sm"
          alt="Paige Device"
          height={240}
          quality={25}
          width={400}
        />
      </div>
    </div>
  );
}
