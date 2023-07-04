import React, { useState } from "react";
import Image from "next/image";
import device from "../public/board.png";
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
    question: "Why use Paige Connect?",
    answer: [
      "Paige Connect has several advantages. It allows users to integrate the classic braille tool with modern technology, providing a seamless transition between paper and digital documents. It also translates braille into print for collaboration with sighted peers, parents, and teachers.",
    ],
  },
  {
    question: "Is Paige Connect compatible with any device?",
    answer: [
      "Paige Connect is compatible with a range of devices, including phones, tablets, and laptops. Our web app opens in any browser including Chrome, Safari, and Firefox. This compatibility makes the upgrade accessible to a wide range of users, regardless of their preferred device or browser.",
    ],
  },
  {
    question: "How much will Paige Connect cost?",
    answer: [
      "At Paige, we believe that braille is a fundamental tool for literacy and communication. That's why we are committed to making braille technology more affordable and accessible for everyone. As engineers we work hard to ensure Paige Connect can be delivered at an affordable price whilst ensuring robustness and a seamless user experience.",
    ],
  },
  {
    question: "When will Paige Connect be available?",
    answer: [
      "Subscribe to our newletter to be the first to know when Paige Connect is available.",
    ],
  },
  // Add more questions here...
];

const HeroSection = (props: { onClickJoin: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 sm:justify-between relative max-w-screen px-4 sm:px-8">
      <div className="flex flex-col justify-center items-start text-start gap-1 sm:w-3/5">
        <Heading css="text-primary text-start text-xl lg:text-4xl leading-none">
          Paige Connect
        </Heading>
        <h2 className="text-gray-900 mb-2 font-light lg:text-lg">
          Coming soon
        </h2>
        <p className="text-gray-900 text-sm font-extralight">
          £100.00 + Shipping{" "}
        </p>
        <p className="text-gray-900 italic font-thin text-xs mb-6 lg:mb-12">
          Approximate pricing subject to change.
        </p>
        <button
          className="plausible-event-name=Join+the+waitlist bg-primary text-white font-medium rounded-sm py-2 px-4 mr-auto text-sm lg:text-lg"
          onClick={props.onClickJoin}
        >
          Join the Waitlist
        </button>
      </div>
      <div className="w-full md:w-1/2">
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/vf-0M0ug554?controls=0&rel=0&showinfo=0&loop=1&autoplay=1"
            title="Paige Connect"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
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
              Braille writers are mechanical devices that have been used for
              over 70 years to create braille. While they remain reliable, we
              want to modernise this iconic braille tool. We are building Paige
              Connect, an affordable upgrade for existing braille writers.
            </p>
            <p>
              Paige Connect is a small device that attaches underneath the
              braille writer and allows it to connect to a phone, tablet, or
              laptop. Once connected, the braille writer can be used as a
              keyboard, enabling users to type braille into a web app. The web
              app also includes software that translates braille into print for
              collaboration with sighted peers, parents, and teachers.
            </p>
          </div>
          <div className="flex flex-col justify-center items-end">
            <Image
              className="object-right object-contain ml-8 md:h-40 lg:h-44 xl:h-44 w-auto"
              src={device}
              alt="Paige Connect Device"
              aria-details="Paige connect device that fits underneath a braille writer. "
              width={700}
            />
          </div>
        </div>
      </div>
      <div className="border-t border-paigedarkgrey">
        <FAQ questions={questions} />
      </div>
      <p className="text-xs pb-2">
        *Paige Connect is not manufactured or endorsed by Perkins School for the
        Blind and Paige Braille is not affiliated with Perkins School for the
        Blind in any way.
      </p>
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
