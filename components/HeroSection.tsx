import Link from "next/link";

export default function HeroSection() {
  return (
    <div className="flex flex-col gap-4 w-full xl:flex-row">
      <div className="flex xl:max-w-1/3">
        <video
          src={"hero-video.mp4"}
          width="auto"
          height="400"
          autoPlay
          muted
          loop
          controls={false}
          preload="auto"
          className="shadow-none"
        >
          Video of paige connect showing the braille writer and the print
          translation in the accompanying app
        </video>
      </div>
      <div className="flex flex-col gap-4 text-center xl:text-start p-4 xl:pr-10 xl:pt-32">
        <h1 className="leading-tight text-xl font-bold tracking-tight font-extrabold">
          What is Paige Connect?
        </h1>
        <p className="text-gray-600">
          An adaptation for braille writers that lets you share the print
          translation.
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
