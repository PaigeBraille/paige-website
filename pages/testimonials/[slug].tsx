import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { Post, getPostBySlug, getAllPosts } from "../../lib/testimonials";
import { Wrapper } from "../../components/Wrapper";

type Props = {
  post: Post;
};

type Params = {
  params: {
    slug: string;
  };
};

export default function BlogPost({ post }: Props) {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8">
        <Link href="/testimonials" className="text-primary text-xs font-light">
          ← Go back
        </Link>
        <Heading css="text-start">{post.title}</Heading>
        <p className="text-xs font-light">{post.date}</p>
        <div className="py-4 md:py-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={640}
            height={360}
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
  const paths = getAllPosts().map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(p: Params) {
  const post = getPostBySlug(p.params.slug);
  return { props: { post } };
}
