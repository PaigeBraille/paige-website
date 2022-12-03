import React, { useEffect, useState } from "react";
import Header from "./font/Header";
import Graphic from "../svg/graphic-1.svg";
import Graphic2 from "../svg/graphic-2.svg";

function Tick(props: { children: React.ReactNode }) {
  const tick = (
    <svg
      className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 text-green-500 mr-2"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );

  return (
    <li className="flex items-start mb-2">
      {tick}
      {props.children}
    </li>
  );
}

function EmojiPoint(props: { children: React.ReactNode; emoji: string }) {
  const point = (
    <span className="flex-shrink-0 w-7 h-7 text-green-500">{props.emoji}</span>
  );

  return (
    <li className="flex items-start mb-2">
      {point}
      {props.children}
    </li>
  );
}

export default function Info() {
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
          </div>
          <Graphic className="block sm:inline-flex" />
        </div>
        <ul className="text-sm md:text-base">
          <EmojiPoint emoji="👉">
            Worldwide, 43 million people are blind, with 174,000 people in the
            UK.
          </EmojiPoint>
          <EmojiPoint emoji="🖐️">
            The RNIB estimates that 15% of these people use braille.
          </EmojiPoint>
          <EmojiPoint emoji="💸">
            People access digital braille using displays which are prohibitively
            expensive, costing up to £9,000, and are limited to a single line of
            text.
          </EmojiPoint>
          <EmojiPoint emoji="📈">
            This makes them unsuited to subjects which require context or a
            spatial layout such as STEM, music, tables, and graphs, presenting a
            barrier to braille literacy and education worldwide.
          </EmojiPoint>
        </ul>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between w-full bg-gray-100 rounded-lg">
          <Graphic2 className="block sm:inline my-auto mx-4" />
          <div className="inline-flex flex-col gap-4 max-w-xs text-start sm:text-end p-4 sm:p-12 ">
            <Header css="text-center sm:text-end grow" color="white">
              Braille matters
            </Header>
            <span>
              Braille is literacy and the Paige team is dedicated to achieving
              affordable access to braille worldwide.
            </span>
          </div>
        </div>
        <ul className="text-sm md:text-base">
          <Tick>
            By reducing the cost per braille character, our display can deliver
            10 lines of braille.
          </Tick>
          <Tick>
            Paige can be used wirelessly alongside any device for reading,
            writing, and graphing.
          </Tick>
          <Tick>
            Our accompanying web app makes it easier for sighted peers and
            parents to collaborate with our users.
          </Tick>
          <Tick>
            We have tested our prototype at a school for the visually impaired
            and received compelling feedback that Paige could "alter the shape
            of access to literacy for hundreds of thousands".
          </Tick>
          <Tick>
            Our team is composed of 5 students from Imperial College London,
            alongside a strong advisory board.
          </Tick>
          <Tick>
            We receive social entrepreneurship support from UnLtd and are
            supported by a design for manufacture and IP firm.
          </Tick>
        </ul>
      </div>
    </section>
  );
}
