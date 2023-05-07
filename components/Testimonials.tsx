import React from "react";
import Image from "next/image";
import Heading from "./Heading";
import SpeechBubble from "../public/svg/speechBubble.svg";
import Link from "next/link";

const TESTIMONIALS = [
  {
    name: "Wendy Eaton",
    text: " As a sensory needs service it would be very good to use in our schools ",
  },
  {
    name: "Sean Randall",
    text: "Paige connects the braille learner to a sighted family member or teacher like nothing seen before. ",
  },
  {
    name: "Suparna Biswas",
    text: "We are very proud to be associated with such a committed and innovative team. ",
  },
  {
    name: "Braille User",
    text: "Oh my gosh! ... my wife can view what I'm typing! ",
  },
  {
    name: "Braille User",
    text: "I remember far more of what I actively read in braille than I do when listening. ",
  },
  // Add more testimonials here
];

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-4 sm:px-8">
      <Heading css="text-center sm:text-start grow"> Reading together</Heading>
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-row gap-4">
          {TESTIMONIALS.map((t, i) => {
            return (
              <div
                className="flex flex-col gap-2 relative overflow-y-clip h-36 rounded-b-lg"
                key={t.name + i.toString()}
              >
                <SpeechBubble className="absolute top-0 left-0" />
                <h3 className="z-10 w-52 mt-8 mx-6 font-bold">{t.name}</h3>
                <blockquote className="z-10 w-52 mx-6 text-sm">
                  {t.text}
                </blockquote>
                {/* <button className="z-10 mb-4 text-left mx-6 text-sm font-bold">Read more</button> */}
              </div>
            );
          })}
        </div>
      </div>
      <Link
        className="border rounded-sm border-paigedarkgrey px-4 py-2 text-center w-full sm:w-fit sm:mt-4"
        href="/testimonials"
      >
        Read full stories
      </Link>
    </div>
  );
};

export default TestimonialsSection;
