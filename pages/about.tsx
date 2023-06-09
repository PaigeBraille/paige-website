import { Wrapper } from "../components/Wrapper";
import React from "react";
import People from "../components/People";
import path from "path";
import { getAllPosts, Post } from "../lib/posts";
import MissionSection from "../components/MissionSection";
import NewsSection from "../components/NewsSection";
import { getInstagramPosts, InstagramPost } from "../lib/instagram";
import InstagramFeed from "../components/InstagramFeed";

const postsDirectory = path.join(process.cwd(), "content/news");

const HeroText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
      <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight md:w-2/3 font-extralight">
        <span className="font-extrabold text-primary">Paige</span> was founded
        by a group of five Imperial College London engineers trying to
        understand the difficulties blind and partially sighted people face when
        accessing braille, but now we are more than that.
      </h1>
    </div>
  );
};

type AboutProps = {
  posts: Post[];
  instagram: InstagramPost[];
};

export default function About({ posts, instagram }: AboutProps) {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-4 md:px-6">
        <HeroText />
        <MissionSection />
        <People />
        <NewsSection posts={posts} />
        <InstagramFeed posts={instagram} />
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const posts = getAllPosts(postsDirectory);
  const instagram = await getInstagramPosts();
  return { props: { posts, instagram } };
}
