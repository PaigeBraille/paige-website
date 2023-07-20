import React from "react";
import Graphic4 from "../public/svg/graphic-2.svg";

export default function NewsletterSection(props: {onClickSubscribe: () => void}) {
  return (
    <div className="flex flex-col md:flex-row bg-paigelightgreen px-4 pt-4 md:p-8 sm:my-8 justify-between relative overflow-visible gap-4 rounded-lg">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-paigedarkgrey tracking-tight leading-tight text-xl md:text-2xl">
          Stay up to date by subscribing to our
          newsletter!
        </h2>
        <button
          className="plausible-event-name=Join+the+newsletter ml-onclick-form font-bold text-white bg-green-900 px-8 py-2 text-sm mr-auto rounded-sm cursor-pointer"
          onClick={props.onClickSubscribe}
        >
          Subscribe
        </button>
      </div>
      <Graphic4 className="overflow-visible inline-flex h-64 xl:absolute xl:-right-0 xl:-bottom-9" />
    </div>
  );
}
