import Link from "next/link";

export default function Success() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center gap-4 pb-32 pt-16 text-center">
      <h1 className="text-xl font-light leading-tight px-4">
        Thank you for subscribing to the Paige newsletter
      </h1>
      <Link href="/">
        <button className="font-bold text-white bg-primary px-8 py-2 text-sm rounded cursor-pointer">
          Back to home
        </button>
      </Link>
    </div>
  );
}
