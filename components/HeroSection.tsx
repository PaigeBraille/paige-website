import Image from "next/image";
import HeroImage from "../public/hero_connect.png";
import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-4 w-full xl:flex-row">
      <div className="flex min-w-1/2">
        <Image
          src={HeroImage}
          alt="Hero Image"
          className="max-h-96 object-contain overflow-clip"
        />
      </div>
      <div className="flex flex-col gap-4 text-center xl:w-3/5 xl:text-start p-4 xl:pr-10 xl:pt-32">
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
