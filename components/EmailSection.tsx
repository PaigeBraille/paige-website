import React from "react";
import Graphic4 from "../public/svg/graphic-4.svg";

export default function NewsletterSection(props: {
  onClickSubscribe: () => void;
}) {
  return (
    <div className="flex flex-col lg:flex-row bg-paigedarkblue px-6 pt-4 md:p-12 sm:my-6 justify-between relative overflow-visible gap-4 sm:rounded-lg">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-white tracking-tight leading-tight text-l sm:text-xl">
          If you have any questions, get in touch at{" "}
          <a href="mailto: hello@paigebraille.com">
            hello@paigebraille.com
          </a>
        </h2>
      </div>
      <Graphic4 className="overflow-visible inline-flex h-48 xl:h-64 xl:absolute xl:right-6 xl:-bottom-0" aria-hidden="true" aria-label="Illustration of Paige Connect being delivered to you." />
    </div>
  );
}
