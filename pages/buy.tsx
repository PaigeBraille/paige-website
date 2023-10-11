import React, { useState } from "react";
import Image from "next/image";
import device from "../public/paige-connect.jpg";
import Heading from "../components/Heading";
import HowTo from "../components/HowTo";
import NewsletterSection from "../components/NewsletterSection";
import SubscribePopup from "../components/SubscribePopup";
import Link from "next/link";
import { Wrapper } from "../components/Wrapper";


const FeatureItem = (props: { title: string; text: string; idx: number }) => {
  return (
    <div className="md:border-x border-paigedarkgrey flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-4">
        <h3 className="md:w-1/2 text-xl md:text-xl font-bold md:mr-6 leading-tight mt-4 p-2 md:p-6 tracking-tight text-paigedarkgrey">
          {props.title}
        </h3>
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">{props.text}</p>
      </div>
      <div className="border-b border-paigedarkgrey flex items-center relative px-4">
        <div className="bg-paigeyellow text-paigedarkgrey rounded-full h-8 w-8 flex items-center justify-center absolute -top-4 left-4">
          {props.idx}
        </div>
      </div>
    </div>
  );
};

function FeatureSection() {
  return (
    <div className="pb-6">
      <Heading css="text-2xl font-bold px-4 md:px-6 py-4 bg-paigeyellow text-paigedarkgrey text-bold md:rounded-t-lg tracking-tight leading-tight text-start">
        Features
      </Heading>

      <FeatureItem
        title="Communication"
        text="Paige Connect is powered by Liblouis, the braille translator created by the community."
        idx={1}
      />
      <FeatureItem
        title="Literacy"
        text="Paige Connect retrofits to classic braille writers to foster and develop literacy skills."
        idx={2}
      />
      <FeatureItem
        title="Accessing Information"
        text="Paige Connect creates braille files that can be stored, downloaded, and shared."
        idx={3}
      />
      <FeatureItem
        title="Technology"
        text="Paige Connect can be navigated with a screen reader on any device and browser."
        idx={4}
      />
    </div>
  );
}

const HeroSection = (props: { onClickJoin: () => void }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 sm:justify-between relative max-w-screen px-4 sm:px-8">
      <div className="flex flex-col justify-center items-start text-start gap-1 sm:w-3/5">
        <Heading css="text-primary text-start lg:text-4xl leading-none">
          Paige Connect
        </Heading>
        <p className="text-gray-900 text-xl font-extralight">
          £200.00
        </p>
        <button
          className="plausible-event-name=Join+the+waitlist bg-primary text-white font-medium rounded-sm py-2 px-4 mt-4 mr-auto sm:mt-12 lg:mt-20 text-sm lg:text-lg"
          onClick={props.onClickJoin}
        >
          Join the waitlist
        </button>
      </div>
      <div className="w-full md:w-2/3">
        <div
          className="relative w-full overflow-hidden"
          style={{ paddingTop: "56.25%" }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/vf-0M0ug554?controls=0&rel=0&showinfo=0&loop=1&autoplay=1&mute=1"
            title="Paige Connect in action translating embossed braille."
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
    <section className="flex flex-col bg-white gap-4 w-full">
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-col lg:flex-row items-center justify-between w-full sm:rounded-lg sm:overflow-visible relative gap-4 xl:gap-0 px-4 py-8 bg-primary text-white `}
        >
          <div
            className={`inline-flex flex-col xl:max-w-1/2 gap-4 sm:mr-0 relative sm:px-4 xl:px-6 xl:m-0`}
          >
            <Heading
              css="text-center sm:text-start grow"
              color="text-white"
            >
              Braille for everyone
            </Heading>
            <span
              className={
                `text-white`
              }
            >
              From the kitchen table to the classroom, we make braille accessible and affordable for everyone.
            </span>
            <span
              className={
                `text-white`
              }
            >
              Paige Connect transforms the classic braille writer, letting you view the print translation instantly on any device.
            </span>
            <Link
                className="rounded-sm font-bold text-primary bg-white hover:bg-blue-100 px-4 py-2 text-center  w-full sm:w-fit sm:mt-4"
                target="_blank" 
                rel="noreferrer"
                href="https://calendly.com/sergio-paige/paige-connect-demo"
            >
                Book a demo
            </Link>
          </div>
          <Image
              className="w-auto md:w-1/2 object-contain object-right min-h-0  rounded-lg"
              src={device}
              alt="Paige Connect Device"
              aria-details="Paige connect device that fits underneath a braille writer. "
              width={700}
              priority
            />
        </div>
      </div>
    </section>
    
    //   <p className="text-xs pb-2">
    //     *Paige Connect is not manufactured or endorsed by Perkins School for the
    //     Blind and Paige Braille is not affiliated with Perkins School for the
    //     Blind in any way.
    //   </p>
    // </div>
  );
};

export default function Buy() {
  
  const [showSubscribe, setShowSubscribe] = useState(false);
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto sm:mb-6 flex flex-col gap-12 sm:gap-16 sm:px-6 pt-6 overflow-clip">
        <HeroSection onClickJoin={() => setShowSubscribe(true)} />
        <ProductSection />
        <HowTo />
        <FeatureSection />
        <NewsletterSection onClickSubscribe={() => setShowSubscribe(true)} /> 
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
