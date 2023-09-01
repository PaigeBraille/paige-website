import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getAllPosts, PostProps, SlugParams } from "../../lib/posts";
import { Wrapper } from "../../components/Wrapper";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/testimonials");

export default function BlogPost({ post }: PostProps) {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8">
        <Link href="/stories" className="text-primary text-xs font-light">
          ← Go back
        </Link>
        <Heading css="text-start">{post.title}</Heading>
        <p className="text-xs font-light">{post.date}</p>
        <div className="py-4 md:py-8">
          <Image
            src={post.coverImage}
            alt={post.alt}
            width={500}
            height={300}
            quality={30}
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          className="testimonial-post"
        />
      </div>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const paths = getAllPosts(postsDirectory).map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(p: SlugParams) {
  const post = getPostBySlug(p.params.slug, postsDirectory);
  return { props: { post } };
}
