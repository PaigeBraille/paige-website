import Image from "next/image";
import HeroImage from "../public/hero.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-4 w-full lg:flex-row justify-center items-center lg:justify-between xl:py-12">
      <div className="basis-3/5 min-w-1/2">
        <Image
          src={HeroImage}
          alt="Paige Connect web app showing translated braille."
          className="max-h-72 object-contain overflow-clip"
          height={500}
        />
      </div>
      <div className="flex basis-2/5 flex-col gap-4 text-center lg:text-start px-10">
        <h1 className="leading-tight text-xl font-bold tracking-tight font-extrabold">
          What is Paige Connect?
        </h1>
        <p className="text-gray-600">
          An adaptation for braille writers that lets you share the print translation.
        </p>
        <Link
          href="/buy"
          className="bg-primary plausible-event-name=To+buy text-white font-medium rounded-sm py-1 px-4 inline-flex mx-auto lg:mr-auto lg:ml-0 hover:bg-blue-700"
        >
          Find out more
        </Link>
      </div>
    </div>
  );
}
