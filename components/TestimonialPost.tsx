import Link from "next/link";
import Image from "next/image";
import { PostProps } from "@/lib/posts";

export default function TestimonialPost({ post }: PostProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:w-1/2 md:h-full">
        <Image
          src={post.coverImage}
          alt={post.alt}
          width={500}
          height={300}
          quality={25}
        />
      </div>
      <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg md:w-1/2">
        <h2 className="text-xl font-bold tracking-tight" id={post.title}>
          {post.title}
        </h2>
        <p className="text-sm mb-auto">{post.excerpt}</p>
        <Link
          href={`/stories/${post.slug}`}
          className="text-xs border border-black rounded px-4 py-2 mr-auto"
          role="button"
          aria-labelledby={post.title}
        >
          Read full story
        </Link>
      </div>
    </div>
  );
}
