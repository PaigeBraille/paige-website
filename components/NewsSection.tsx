import { Post, PostsProps } from "@/lib/posts";
import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

export default function NewsSection({ posts }: PostsProps) {
  return (
    <div className="flex flex-col pb-6">
      <Heading css="text-2xl font-bold px-4 md:px-6 py-4 bg-paigeyellow text-bold md:rounded-t-lg tracking-tight leading-tight text-start">
        News
      </Heading>
      <div className="flex flex-col gap-6 md:flex-row p-6 md:border-x md:border-b rounded-b-lg border-paigedarkgrey">
        <div className="flex flex-col gap-4 md:w-2/3">
          <Image
            src={posts[0].coverImage}
            alt={posts[0].title}
            width={640}
            height={360}
          />
          <h2 className="text-xl font-bold tracking-tight leading-tight">
            {posts[0].title}
          </h2>
          <p className="text-sm">{posts[0].excerpt}</p>
          <Link href={`/news/${posts[0].slug}`} className="text-xs border border-black rounded px-4 py-2 mr-auto">Read full article</Link>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="bg-paigeyellow font-bold tracking-tight leading-tight px-4 py-2">
            Latest Posts
          </h3>
          <ul className="flex flex-col gap-2">
            {posts.map((p: Post) => {
              return (
                <li key={p.title} className="bg-yellow-100 px-4 py-2 text-sm">
                  <Link href={`/news/${p.slug}`}>{p.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
