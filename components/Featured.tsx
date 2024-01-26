import React from "react";
import { PostProps } from "@/lib/posts";
import Link from "next/link";
import Image from "next/image";

export default function Featured() {
  return (
    <div className="flex flex-col md:flex-row bg-blue-50 px-6 p-6 md:p-6  justify-between relative overflow-visible gap-4 rounded-lg">
      <div className="flex md:w-2/5 md:h-full">
        <Image
          src="/testimonial-imgs/seren.jpeg"
          alt="Seated at a white table inside a university group study room, Seren wears a smile while trying out Paige Connect with a braille writer and her laptop. The laptop screen showcases the Paige Connect web application in action."
          width={500}
          height={300}
          quality={25}
          className="rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 md:w-3/5">
        <h2 className="text-l font-bold text-primary tracking-tight">
          Featured
        </h2>
        <h2 className="text-3xl font-bold tracking-tight">
          Seren Jaye
        </h2>
        <p className="text-sm mb-auto">&ldquo;I am such a nerd for new accessible technology and this was so cool!&rdquo;</p>
        <Link
          href="https://www.instagram.com/reel/C2X1KNUs0qz/?utm_source=ig_web_copy_link"
          className="text-xs border border-black rounded px-4 py-2 mr-auto"
          role="button"
        >
          Read full story
        </Link>
      </div>
    </div>
  );
}
