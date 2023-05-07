import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-4 w-full lg:flex-row">
      <div className="flex lg:max-w-1/3 justify-center">
        <img
          src="animation.gif"
          alt="Animation of paige connect showing the braille writer and the print translation in the accompanying app"
          height="400"
          className="object-contain"
        />
      </div>
      <div className="flex flex-col gap-4 text-center lg:text-start p-4 lg:pr-10 lg:pt-32">
        <h1 className="leading-tight text-lg font-bold tracking-tight font-extrabold">
          What is Paige Connect?
        </h1>
        <p className="text-gray-600">
          An adaptation for braille writers that lets you share the print
          translation.
        </p>
        <Link
          href="/products"
          className="bg-primary text-white font-medium rounded-sm py-1 px-4 inline-flex mx-auto lg:mr-auto lg:ml-0 hover:bg-blue-900"
        >
          Find out more
        </Link>
      </div>
    </div>
  );
}
