import React from "react";
import Graphic1 from "../public/svg/graphic-1.svg";

export default function NewsletterSection(props: {onClickSubscribe: () => void}) {
  return (
    <div className="flex flex-col md:flex-row bg-primary px-4 pt-4 md:p-8 justify-between relative overflow-visible gap-4 rounded-md">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-white tracking-tight leading-tight text-xl md:text-2xl">
          Do you want to be up to date with new news? Subscribe to our
          newsletter!
        </h2>
        <button
          className="ml-onclick-form font-bold text-primary bg-white px-8 py-2 bg-white text-sm mr-auto rounded cursor-pointer"
          onClick={props.onClickSubscribe}
        >
          Subscribe
        </button>
      </div>
      <Graphic1 className="object-right w-48 mx-auto md:w-72 lg:w-96 md:absolute md:-bottom-4 md:-right-12 lg:-bottom-5 lg:-right-5" />
    </div>
  );
}
