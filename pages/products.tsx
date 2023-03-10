import React, { useState } from "react";
import Image from "next/image";
import device from "../public/paigeconnect.png";
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
    <div className="flex flex-col sm:flex-row gap-6 sm:gap-0 sm:justify-between">
      <div className="flex flex-col justify-center items-start text-start gap-1 px-6">
        <Heading css="text-primary text-start text-xl lg:text-4xl leading-none">
          Paige Connect
        </Heading>
        <h2 className="text-gray-900 font-light mb-6 lg:mb-12 lg:text-lg">
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
          className="object-right object-contain md:h-48 lg:h-64 xl:h-72 w-auto"
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
            src="https://player.vimeo.com/video/806437026?portrait=0h=2b6f921de3"
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

        <SubscribePopup
          togglePopup={() => {
            setShowSubscribe(!showSubscribe);
          }}
          isVisible={showSubscribe}
        />
      </div>
    </Wrapper>
  );
}
