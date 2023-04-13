import Image from "next/image";
import HeroImage from "../public/home_connect.png";
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
      <div className="flex flex-col gap-4 text-center xl:text-start p-4 sm:p-0">
        <h1 className="leading-tight text-3xl font-bold tracking-tight font-extrabold">
          What is Paige?
        </h1>
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
          condimentum, nisl eget ultricies tincidunt, nunc elit lacinia nisl,
          nec aliquam massa nunc eget lorem. Sed euismod, nisl eget ultricies
          tincidunt, nunc elit lacinia nisl, nec aliquam massa nunc eget lorem.
        </p>
        <Link
          href="/products"
          className="bg-primary text-white font-medium rounded-sm py-1 px-4 inline-flex mx-auto xl:mr-auto xl:ml-0 hover:bg-blue-900"
        >
          Buy now
        </Link>
      </div>
    </div>
  );
}
