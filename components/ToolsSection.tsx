import React from "react";
import Graphic4 from "../public/svg/board-outline.svg";
import Link from "next/link";

export default function ToolsSection() {
  return (
    <div className="flex flex-col bg-white px-4 py-8 md:p-8 sm:my-8 justify-between relative gap-6 sm:rounded-lg">
      <div className="flex flex-col justify-between">
        <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-l sm:text-xl md:text-3xl text-center">
          Paige Connect works with your favourite {" "}
          <Link className="text-primary" href="/compatibility">
          braille tools
          </Link>!{"  "}
        </h2>
      </div>
      <Graphic4 className="object-contain inline-flex h-28 md:h-36 sm:mt-10 mt-4 " />
    </div>
  );
}
