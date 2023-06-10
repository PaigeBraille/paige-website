import React from "react";
import { getAllPosts, Post } from "../../lib/posts";

import TestimonialPost from "../../components/TestimonialPost";
import Heading from "../../components/Heading";
import { Wrapper } from "../../components/Wrapper";
import path from "path";
import { getInstagramPosts, InstagramPost } from "../../lib/instagram";
import InstagramFeed from "../../components/InstagramFeed";

const postsDirectory = path.join(process.cwd(), "content/testimonials");

export default function Testimonials({
  posts,
  instagram,
}: {
  posts: Post[];
  instagram: InstagramPost[];
}) {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8 flex flex-col gap-4 mb-8">
      <InstagramFeed posts={instagram} />
        <Heading css="text-start leading-tight">Stories</Heading>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <TestimonialPost key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const posts = getAllPosts(postsDirectory);
  const instagram = await getInstagramPosts();
  return { props: { posts, instagram } };
}
