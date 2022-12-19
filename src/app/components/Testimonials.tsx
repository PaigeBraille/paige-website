import React from "react";
import SpeechBubble from "../svg/speechBubble.svg";
import Header from "./font/Header";

const TESTIMONIALS = [
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
  {
    name: "Bob Bobson",
    text: "I recently purchased the XYZ product and I have to say, I am thoroughly impressed. ",
  },
];

const TestimonialsSection = () => {
  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto px-4 sm:px-8">
      <Header>Reading together</Header>
      <div className="overflow-x-auto pb-4">
        <div className="flex flex-row gap-12">
        {TESTIMONIALS.map((t) => {
          return (
            <div
              className="flex flex-col gap-2 relative overflow-y-clip h-full rounded-b-lg"
              key={t.name}
            >
              <SpeechBubble className="absolute top-0 left-0" />
              <h3 className="z-10 w-48 mt-8 mx-6">{t.name}</h3>
              <blockquote className="z-10 w-48 mx-6 text-sm">{t.text}</blockquote>
              <button className="z-10 mb-4 text-left mx-6 text-sm font-bold">Read more</button>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
