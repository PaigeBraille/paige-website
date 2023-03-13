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
      "Subscribe to our newletter to be the first to know when Paige Connect is available.",
    ],
  },
  {
    question: "Who is Paige Connect intended for?",
    answer: [
      "It is intended for blind and partially sighted people who already use or want to learn braille on a braille writer. As it allows users to integrate the classic braille tool with modern technology, providing a seamless transition between paper and digital documents. It also translates braille into print for collaboration with sighted peers, parents, and teachers.",
    ],
  },
  {
    question: "Is Paige Connect compatible with any device?",
    answer: [
      "Paige Connect is compatible with a range of devices, including phones, tablets, and laptops. Our web app opens in any browser including Chrome, Safari, and Firefox. This compatibility makes the upgrade accessible to a wide range of users, regardless of their preferred device or browser.",
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
      <iframe
        src="https://www.youtube-nocookie.com/embed/vf-0M0ug554"
        title="Paige Connect Demo Video"
        allow="accelerometer; fullscreen; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        height="360"
        className="lg:w-1/2 mx-6"
      ></iframe>
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
            Braille writers are mechanical devices that have been used for over 70 years to create braille. While they remain reliable, we want to modernise this iconic braille tool. We built Paige Connect, an affordable upgrade for existing braille writers.
            </p>
            <p>
            Paige Connect is a small device that attaches underneath the braille writer and allows it to connect to a phone, tablet, or laptop. Once connected, the braille writer can be used as a keyboard, enabling users to type braille into a web app. The web app also includes software that translates braille into print for collaboration with sighted peers, parents, and teachers.
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <Image
              className="object-right object-contain md:h-48 lg:h-64 xl:h-64 w-auto"
              src={device}
              alt="Paige Connect Device"
              aria-details="Paige connect device positioned underneath a brailler machine. "
            />
          </div>
        </div>
      </div>
      <div className="border-t border-paigedarkgrey pb-4">
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
