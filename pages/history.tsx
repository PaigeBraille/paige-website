import { Wrapper } from "../components/Wrapper";
import React from "react";
import path from "path";
import { getAllPosts, Post, PostsProps } from "../lib/posts";
import MissionSection from "../components/HistorySection";
import HistorySection from "../components/HistorySection";

const postsDirectory = path.join(process.cwd(), "content/news");

const HeroText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
      <h1 className="text-lg sm:text-xl md:text-3xl tracking-tight leading-tight md:w-2/3 font-extralight">
        <span className="font-extrabold text-primary">Paige Connect</span> builds on a 
        great a tradition of adaptations for the Perkins braille writer. 
      </h1>
    </div>
  );
};

export default function About({ posts }: PostsProps) {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <HeroText />
        <HistorySection />
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(postsDirectory);
  return { props: { posts } };
}
