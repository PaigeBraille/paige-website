import Link from "next/link";
import Image from "next/image";
import { Post } from "lib/testimonials";

type Props = {
  post: Post;
};

export default function TestimonialPost({ post }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex md:w-1/2 md:h-full">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={640}
          height={360}
        />
      </div>
      <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg md:w-1/2">
        <h2 className="text-xl font-bold tracking-tight">{post.title}</h2>
        <p className="text-sm mb-auto">{post.excerpt}</p>
        <Link href={`/testimonials/${post.slug}`} className="text-xs border border-black rounded px-4 py-2 mr-auto">Read full story</Link>
      </div>
    </div>
  );
}