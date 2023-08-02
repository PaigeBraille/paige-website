import React from "react";
import Graphic3 from "../public/svg/graphic-3.svg";

export default function NewsletterSection(props: {onClickSubscribe: () => void}) {
  return (
    <div className="flex flex-col md:flex-row bg-primary px-10 pt-4 mt-4 -mx-6 sm:p-6 sm:mx-0 sm:my-8 xl:mt-24 justify-between relative overflow-visible gap-4 sm:rounded-lg">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-white tracking-tight leading-tight text-xl md:text-xl">
          Stay up to date by subscribing to our
          newsletter!
        </h2>
        <button
          className="plausible-event-name=Join+the+newsletter ml-onclick-form font-bold text-primary bg-white px-8 py-2 text-sm mr-auto rounded-sm cursor-pointer"
          onClick={props.onClickSubscribe}
        >
          Subscribe
        </button>
      </div>
      <Graphic3 className="overflow-visible inline-flex h-44 xl:absolute xl:-right-0 bottom-0 xl:h-60" />
    </div>
  );
}
