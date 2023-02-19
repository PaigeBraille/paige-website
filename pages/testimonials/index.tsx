import React from "react";
import { getAllPosts, Post } from "../../lib/testimonials";

import TestimonialPost from "../../components/TestimonialPost";
import Heading from "@/components/Heading";

type Props = {
  posts: Post[];
};

export default function Testimonials({ posts }: Props) {
  return (
    <div className="max-w-5xl mx-auto p-4 md:px-8 flex flex-col gap-4 mb-8">
      <Heading css="text-start">Testimonials</Heading>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <TestimonialPost key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}
