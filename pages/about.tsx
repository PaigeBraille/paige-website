import Heading from "../components/Heading";
import { Wrapper } from "../components/Wrapper";
import React from "react";
import FAQ, { FAQuestion } from "../components/FAQ";
import People from "../components/People";
import path from "path";
import { getAllPosts, PostsProps } from "@/lib/posts";
import MissionSection from "@/components/MissionSection";
import NewsSection from "@/components/NewsSection";
import { useEffect } from "react";
import { logPageView } from '../lib/analytics';

const questions: FAQuestion[] = [
  {
    question: "What are you working on?",
    answer: [
      "Our first product, Paige Connect, is getting ready for certification! It is an upgrade for existing braille writers which produces digital copies of the braille that is embossed on paper.",
      "A web app is hosted locally on Paige Connect and can be accessed wirelessly using any browser on a phone, tablet, or laptop. This enables collaboration with sighted peers, parents, and teachers.",
      "We are also developing a multiline paperless alternative to existing braille writers, which is currently under testing with users.",
    ],
  },
  {
    question: "Can I help test Paige?",
    answer: [
      "Yes! Reach out at hello@paigebraille.com if you want to have a say in the technology created for you.",
    ],
  },
  {
    question: "Got another question?",
    answer: [
      "You can ask any questions you have about Paige at hello@paigebraille.com.",
    ],
  },
  // Add more questions here...
];

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

export default function About({ posts }: PostsProps) {
  useEffect(() => {
    logPageView();
  }, []);

  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-4 md:px-6">
        <HeroText />
        <MissionSection />
        <People />
        {/* <div className="mb-6">
          <Heading css="text-start w-full px-4 md:px-6 py-4 bg-paigelightgreen md:rounded-t-lg">
            FAQ
          </Heading>

          <FAQ questions={questions} />
        </div> */}
        <NewsSection posts={posts} />
      </div>
    </Wrapper>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(postsDirectory);
  return { props: { posts } };
}
