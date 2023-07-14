import React from "react";
import Graphic4 from "../public/svg/graphic-4.svg";

export default function NewsletterSection(props: {onClickSubscribe: () => void}) {
  return (
    <div className="flex flex-col md:flex-row bg-paigedarkblue px-4 pt-4 md:p-8 sm:my-8 justify-between relative overflow-visible gap-4 xl:rounded-lg">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-white tracking-tight leading-tight text-xl md:text-2xl">
          Stay up to date by subscribing to our
          newsletter!
        </h2>
        <button
          className="plausible-event-name=Join+the+newsletter ml-onclick-form font-bold text-primary bg-white px-8 py-2 bg-white text-sm mr-auto rounded-sm cursor-pointer"
          onClick={props.onClickSubscribe}
        >
          Subscribe
        </button>
      </div>
      <Graphic4 className="overflow-visible inline-flex h-64 xl:absolute xl:right-2 -bottom-0 xl:h-64" />
    </div>
  );
}
