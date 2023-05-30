import Image from "next/image";
import HeroImage from "../public/hero.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-4 xl:my-10 w-full xl:flex-row">
      <div className="basis-3/5 min-w-1/2">
        <Image
          src={HeroImage}
          alt="Paige Connect web app showing translated braille."
          className="max-h-72 object-contain overflow-clip"
        />
      </div>
      <div className="flex basis-2/5 flex-col gap-4 text-center xl:text-start px-10 xl:pt-24">
        <h1 className="leading-tight text-xl font-bold tracking-tight font-extrabold">
          What is Paige Connect?
        </h1>
        <p className="text-gray-600">
          An adaptation for braille writers that lets you share the print translation.
        </p>
        <Link
          href="/products"
          className="bg-primary text-white font-medium rounded-sm py-1 px-4 inline-flex mx-auto xl:mr-auto xl:ml-0 hover:bg-blue-900"
        >
          Find out more
        </Link>
      </div>
    </div>
  );
}
