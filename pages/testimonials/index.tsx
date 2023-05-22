import React from "react";
import { getAllPosts, PostsProps } from "../../lib/posts";

import TestimonialPost from "../../components/TestimonialPost";
import Heading from "../../components/Heading";
import { Wrapper } from "../../components/Wrapper";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/testimonials");

export default function Testimonials({ posts }: PostsProps) {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8 flex flex-col gap-4 mb-8">
        <Heading css="text-start leading-tight">Stories</Heading>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <TestimonialPost key={post.slug} post={post} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center h-screen m-4">
      <iframe
        id="iframe"
        src="https://www.instagram.com/paigebraille/embed"
        className="rounded-lg w-full h-full"
      />
    </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(postsDirectory);
  return { props: { posts } };
}
