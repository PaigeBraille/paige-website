import React from "react";
import Graphic4 from "../public/svg/board-outline.svg";

export default function ManualSection() {
  return (
    <div className="flex flex-col md:flex-row px-4 pt-4 md:p-8 my-4 sm:my-8 justify-between relative overflow-visible gap-4 xl:rounded-lg">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold tracking-tight leading-tight text-xl md:text-2xl">
          You can also download the the Paige Connect manual in PDF format
        </h2>
        <a
          className="border rounded-sm bg-primary font-bold text-center text-white px-4 py-2 w-full sm:w-fit"
          href="https://netorg11918157-my.sharepoint.com/:b:/g/personal/sergio_paigebraille_com/EV4iLbw6aEBAnQyevU344S8BmCnKJgtboKHURFjvwjOnag"
          target="_blank"
          rel="noreferrer"
        >
          Download PDF
        </a>


      </div>
      <Graphic4 className="m-auto w-1/3 object-contain  min-h-0" />
    </div>
  );
}