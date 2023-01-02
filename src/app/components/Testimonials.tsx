import React from "react";
import SpeechBubble from "../svg/speechBubble.svg";
import Heading from "./Heading";

const TESTIMONIALS = [
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
    text: "I remember far more of what I actively read in braille than I do when listening. ",
  },
  {
    name: "Lynn Cox",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  // Add more testimonials here
];

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col gap-6 w-full px-4 sm:p-0">
      <Heading css="text-center sm:text-start grow"> Reading together</Heading>
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-row gap-4">
        {TESTIMONIALS.map((t) => {
          return (
            <div
              className="flex flex-col gap-2 relative overflow-y-clip h-36 rounded-b-lg"
              key={t.name}
            >
              <SpeechBubble className="absolute top-0 left-0" />
              <h3 className="z-10 w-52 mt-8 mx-6 font-bold">{t.name}</h3>
              <blockquote className="z-10 w-52 mx-6 text-sm">{t.text}</blockquote>
              {/* <button className="z-10 mb-4 text-left mx-6 text-sm font-bold">Read more</button> */}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
