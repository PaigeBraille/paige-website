import React, { ReactHTMLElement } from "react";
import Image from "next/image";
import Swap1 from "../public/support-imgs/swap-1.jpg";
import Swap2 from "../public/support-imgs/swap-2.jpg";
import Swap3 from "../public/support-imgs/swap-3.jpg";
import Connect1 from "../public/support-imgs/connect-1.png";
import Connect2 from "../public/support-imgs/connect-2.png";
import Connect3 from "../public/support-imgs/connect-3.jpg";
import Share1 from "../public/support-imgs/share-1.jpg";
import Share2 from "../public/support-imgs/share-2.png";
import Share3 from "../public/support-imgs/share-3.png";
import Update1 from "../public/support-imgs/update-1.png";
import Update2 from "../public/support-imgs/update-2.png";
import Update3 from "../public/support-imgs/update-3.png";


function DownloadSection(){
  return(
    <div className="flex mt-4 justify-center">
      <a 
        className="mr-2 bg-primary hover:bg-paigedarkblue text-white font-bold py-2 px-4 rounded-sm"
        href="https://github.com/PaigeBraille/paige-web-app/releases"
        target="_blank"
        rel="noreferrer"
      >
        Download Interface
      </a>
      <a 
        className="bg-primary hover:bg-paigedarkblue text-white font-bold py-2 px-4 rounded-sm"
        href="https://github.com/PaigeBraille/paige-firmware/releases"
        target="_blank"
        rel="noreferrer"
      >
        Download Firmware 
      </a>
    </div>
  );
}


const SupportSection = (props: {
  number: number;
  image: any;
  alt: any;
  instructionText?: string;
  buttons?: JSX.Element;

}) =>  {
  return (
    <div className="w-full md:w-1/3 md:px-2">
      <div className="my-4 relative w-full h-48 flex flex-col justify-center items-center">
        {/* <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-lg font-bold absolute -top-4 left-4">
          {props.number}
        </div> */}
        <Image
            className=" w-full object-contain min-h-0"
            alt={props.alt}
            src={props.image}
            quality={40}
        />
      </div>
      <div className="text-left text-sm text-paigedarkgrey">{props.instructionText}</div>
      {props.buttons}
    </div>
  );
};

export const Swap = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="flex flex-wrap">
        <SupportSection
          number={1}
          image={Swap1}
          alt="Upturned braille writer having its base unscrewed."
          instructionText="Unscrew the base of your braille writer"
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={Swap2}
          alt="Upturned braille writer with Paige Connect board."
          instructionText="Replace it with the Paige Connect board, only tightening all screws at the end."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={Swap3}
          alt="Braille writer with a USB cable sitting on a desk."
          instructionText="Plug in the USB cable."
        />
      </div>
    </section>
  );
};

export const Connect = () => {
    return (
      <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
        <div className="flex flex-wrap">
          <SupportSection
            number={1}
            image={Connect1}
            alt="Screenshot of 'Paige' appearing as a Wi-Fi network."
            instructionText="Connect to the Paige Wi-Fi network. Enter the password 12345678."
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={2}
            image={Connect2}
            alt="Screenshot of the Paige Connect set up wizard."
            instructionText="Follow the instructions and give your board a unique name."
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={3}
            image={Connect3}
            alt="Braille writer sitting next to a laptop on a desk."
            instructionText="If Paige no longer appears as a Wi-Fi network, your Paige Connect is ready to use."
          />
        </div>
      </section>
    );
  };

  export const Share = () => {
    return (
      <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
        <div className="flex flex-wrap">
          <SupportSection
            number={1}
            image={Share1}
            alt="Braille writer with a person pressing the keys."
            instructionText="Press and hold new line on your braille writer to start a file (one beep) and save a file (two beeps)."
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={2}
            image={Share2}
            alt="Screenshot of the Paige Connect web app's main tab."
            instructionText="Connect to the web app by typing http://name.local into your browser (using your boards name)."
            
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={3}
            image={Share3}
            alt="Screenshot of the Paige Connect web app's files tab."
            instructionText="You can delete and download files in the files tab of the web app."
          />
        </div>
      </section>
    );
  };

  export const Update = () => {
    return (
      <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
        <div className="flex flex-wrap">
          <SupportSection
            number={1}
            image={Update1}
            alt="Download icon showing a cloud and downfacing arrow."
            buttons=<DownloadSection />
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={2}
            image={Update2}
            alt="Screenshot of the Paige Connect web app's update interface pop up."
            instructionText="To update the interface press the Update Interface button. Select the file (index.html.gz) and click update."
          />
          <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
          <SupportSection
            number={3}
            image={Update3}
            alt="Screenshot of the Paige Connect web app's update firmware pop up."
            instructionText="To update the firmware, press the Update Firmware button. Select the file (firmware.bin) and click update."
          />
        </div>
      </section>
    );
  };
