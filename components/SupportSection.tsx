import React, { ReactHTMLElement } from "react";
import Image from "next/image";
import Swap1 from "../public/support-imgs/swap-1.jpg";
import Swap2 from "../public/support-imgs/swap-2.jpeg";
import Swap3 from "../public/support-imgs/swap-3.jpeg";
import ConnectA1 from "../public/support-imgs/connect-1.png";
import ConnectA2 from "../public/support-imgs/connect-2.png";
import Translate2 from "../public/support-imgs/translate-2.png";
import Translate3 from "../public/support-imgs/translate-3.png";
import Learn2 from "../public/support-imgs/learn-2.png";
import Learn3 from "../public/support-imgs/learn-3.png";
// import ConnectA3 from "../public/support-imgs/connect-2.jpg";
import ConnectB1 from "../public/support-imgs/connect-1.png";
import ConnectB2 from "../public/support-imgs/connect-b-2.png";
import ConnectB3 from "../public/support-imgs/connect-b-3.png";
import Share1 from "../public/support-imgs/share-1.jpg";
import Share2 from "../public/support-imgs/share-2.png";
import Share3 from "../public/support-imgs/share-3.png";
import Update1 from "../public/support-imgs/update-1.png";
import Update2 from "../public/support-imgs/update-2.png";
import Update3 from "../public/support-imgs/update-3.png";
import Name1 from "../public/support-imgs/name-1.png";
import Name2 from "../public/support-imgs/name-2.png";
import Name3 from "../public/support-imgs/name-3.jpg";

function DownloadSection() {
  return (
    <div className="flex mt-4 justify-center">
      <a
        className=" bg-primary hover:bg-paigedarkblue text-white font-bold py-2 px-20 rounded-sm"
        href="https://github.com/PaigeBraille/paige-web-app/releases"
        target="_blank"
        rel="noreferrer"
      >
        Download Software
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
}) => {
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
          width={500}
          height={300}
          quality={25}
        />
      </div>
      <div className="text-left text-sm text-paigedarkgrey">
        {props.instructionText}
      </div>
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
          instructionText="Unscrew the base of your braille writer."
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

export const Translate = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="flex flex-wrap">
        <SupportSection
          number={1}
          image={ConnectA1}
          alt="Bluetooth symbol."
          instructionText="On your phone, tablet or laptop, turn Bluetooth on and pair with Paige Connect."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={Translate2}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="Go to our website at paigebraille.com/translate"
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={Translate3}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="Start writing braille to see or hear what you emboss!"
        />
      </div>
    </section>
  );
};

export const Learn = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="flex flex-wrap">
        <SupportSection
          number={1}
          image={ConnectA1}
          alt="Bluetooth symbol."
          instructionText="On your phone, tablet or laptop, turn Bluetooth on and pair with Paige Connect."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={Learn2}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="Go to our website at paigebraill.com/learn"
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={Learn3}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="Start learning braille with curated online exercises!"
        />
      </div>
    </section>
  );
};


export const ConnectB = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="flex flex-wrap">
        <SupportSection
          number={1}
          image={ConnectB1}
          alt="Wi-Fi symbol."
          instructionText="Connect to the Paige Wi-Fi network. Enter the password 12345678."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={ConnectB2}
          alt="Screenshot of the Paige Connect web app open in a browser with the Settings tab selected"
          instructionText="Set your Wi-Fi network and password in the Settings tab and press the restart button. If succesful, Paige should no longer appear as a Wi-Fi network."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={ConnectB3}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="Connect to the web app by typing http://paige.local into your browser."
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
          alt="Braille writer with a person pressing the new line key."
          instructionText="Press and hold new line on your braille writer to start a file (one beep) and save a file (two beeps)."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={Share2}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="The print translation will be displayed in the Home tab of the web app."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={Share3}
          alt="Screenshot of the Paige Connect web app open in a browser with the Files tab selected."
          instructionText="You can delete and download files in the Files tab of the web app."
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

export const Name = () => {
  return (
    <section className="bg-white py-2 mx-6 sm:mx-0 text-center">
      <div className="flex flex-wrap">
        <SupportSection
          number={1}
          image={Name1}
          alt="Screenshot of the Paige Connect web app open in a browser with the Settings tab selected."
          instructionText="If you have more than one board you can give each a unique name in the Settings tab and restart."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={2}
          image={Name2}
          alt="Screenshot of the Paige Connect web app open in a browser."
          instructionText="You can then follow the manual replacing Paige with the name you have chosen."
        />
        <div className="w-px h-full bg-gray-400 my-4 md:hidden"></div>
        <SupportSection
          number={3}
          image={Name3}
          alt="Braille writer with a person pressing the back space key."
          instructionText="If you forget the name of your board, holding down back space on your braille writer for ten seconds will re-name your board as Paige."
        />
      </div>
    </section>
  );
};
