import React from "react";
import Heading from "./Heading";
import Image from "next/image";
import Link from "next/link";
import graphic from "../public/graphicbraille.png";

const WRITE_WITH_US_CONTENT =
  "Type braille with your keyboard! Our translation is powered by Liblouis, the braille translator created by the community.";

export default function WriteWithUs() {
  return (
    <div className="flex flex-col lg:flex-row gap-6 justify-center md:justify-between w-full px-4 sm:px-8">
      <div className="flex flex-col gap-6 items-center sm:items-start">
        <Heading css="sm:text-start">Write with us</Heading>
        <span>{WRITE_WITH_US_CONTENT}</span>
        <Link
          className="rounded-sm px-4 py-2 sm:mt-6 font-bold border border-paigedarkgrey focus:outline-none focus:shadow-outline text-center w-full xl:w-fit"
          href="/translate"
        >
          Translate
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
