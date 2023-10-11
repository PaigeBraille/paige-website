import Link from "next/link";
import Image from "next/image";
import Time from "../public/svg/time.svg";
import People from "../public/svg/people.svg";
import { PostProps } from "@/lib/posts";

export default function ActivitiesPost({ post }: PostProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:w-1/2 md:h-full">
        <Image
          src={post.coverImage}
          alt={post.alt}
          width={400}
          height={250}
          quality={25}
        />
      </div>
      <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg md:w-1/2">
        <h2 className="text-xl font-bold tracking-tight" id={post.title}>
          {post.title}
        </h2>
        <p className="text-sm mb-auto">{post.excerpt}</p>
        <div className="text-xs text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto mb-2">
          <Time title="Time" className="w-4 h-4 mr-2"/>
          {post.time}
          <People title="People" className="w-4 h-4 mx-2"/>
          {post.people}
          <Link
            href={`/activities/${post.slug}`}
            className="text-xs border border-black rounded px-4 py-2 mx-10"
            role="button"
          >
            Start
          </Link>
        </div>
      </div>
    </div>
  );
}
