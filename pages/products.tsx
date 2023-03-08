import React, { useState } from "react";
import Image from "next/image";
import device from "../public/device2.png";
import Heading from "../components/Heading";
import FAQ, { FAQuestion } from "../components/FAQ";
import HowTo from "../components/HowTo";
import NewsletterSection from "../components/NewsletterSection";
import SubscribePopup from "../components/SubscribePopup";
import { Wrapper } from "../components/Wrapper";

const questions: FAQuestion[] = [
  {
    question: "How does Paige Connect work?",
    answer: [],
    fragment: <HowTo />,
  },
  {
    question: "When will Paige Connect be available?",
    answer: [
      "Reach out at hello@paigebraille.com to find out more information about the release timeline.",
    ],
  },
  {
    question: "Who is it intended for?",
    answer: [
      "It is intended for partially or non sighted people who use an electronic brailler.",
    ],
  },
  // Add more questions here...
];

const HeroSection = (props: { onClickJoin: () => void }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between h-96">
      <div className="flex flex-col justify-center items-start ml-4 md:ml-8 text-start gap-1">
        <Heading css="text-primary text-start text-xl lg:text-4xl leading-none">
          Paige Connect
        </Heading>
        <h2 className="text-gray-900 font-light mb-6 sm:mb-12 sm:text-lg">
          Coming soon
        </h2>
        <button
          className="bg-primary text-white font-medium rounded-sm py-2 px-4 mr-auto text-sm lg:text-lg"
          onClick={props.onClickJoin}
        >
          Join the Waitlist
        </button>
      </div>
      <div className="flex flex-col justify-center items-end">
        <Image
          className="object-scale-down object-right overflow-clip overscroll-none w-64 md:w-96 xl:absolute xl:right-0 xl:top-0"
          src={device}
          alt="Paige Connect Device"
        />
      </div>
    </div>
  );
};

const ProductSection = () => {
  return (
    <div className="max-w-5xl mx-auto gap-4 flex flex-col p-4 md:p-8">
      <Heading css="text-start">Products</Heading>
      <div className="border-primary border-t-2 py-4">
        <h2 className="text-primary text-lg font-light mb-4">Paige Connect</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="lg:w-1/2 flex flex-col gap-4 text-sm">
            <p>
              Are you tired of being restricted by the limitations of
              traditional braille writers? Look no further than Paige Connect!
              Our innovative device is the perfect upgrade for your existing
              braille writer, allowing you to produce digital copies of your
              embossed braille on paper. With Paige Connect, you can take your
              braille writing to the next level, allowing you to collaborate
              more effectively with sighted peers, parents, and teachers.
            </p>
            <p>
              The Paige Connect web app is hosted locally on the device and can
              be accessed wirelessly from any browser on your phone, tablet, or
              laptop. This feature allows you to work more efficiently and with
              greater ease, making it an excellent choice for professionals and
              students alike.
            </p>
          </div>
          <iframe
            src="https://player.vimeo.com/video/558179147?h=855e29fb55&title=0&byline=0&portrait=0"
            height="360"
            allow="autoplay; fullscreen; picture-in-picture"
            className="lg:w-1/2"
          ></iframe>
        </div>
      </div>
      <div className="border-t border-paigedarkgrey">
      <FAQ questions={questions} />
      </div>
    </div>
  );
};

export default function Products() {
  const [showSubscribe, setShowSubscribe] = useState(false);
  return (
    <Wrapper>
      <div className="relative">
        <div className="max-w-5xl mx-auto flex flex-col">
          <HeroSection onClickJoin={() => setShowSubscribe(true)} />
        </div>
        <ProductSection />
        <div className="max-w-5xl mx-auto flex flex-col bg-white p-4 md:p-8">
          <NewsletterSection onClickSubscribe={() => setShowSubscribe(true)} />
        </div>
        {showSubscribe && (
          <SubscribePopup
            onDismiss={() => {
              setShowSubscribe(false);
            }}
          />
        )}
      </div>
    </Wrapper>
  );
}
