import React, { useState } from "react";
import { getAllPosts, Post } from "../../lib/posts";

import TestimonialPost from "../../components/TestimonialPost";
import Heading from "../../components/Heading";
import { Wrapper } from "../../components/Wrapper";
import path from "path";
import { getInstagramPosts, InstagramPost } from "../../lib/instagram";
import InstagramFeed from "../../components/InstagramFeed";
import NewsletterSection from "../../components/NewsletterSection";
import SubscribePopup from "../../components/SubscribePopup";
import Graphic3 from "../../public/svg/graphic-3.svg";

const postsDirectory = path.join(process.cwd(), "content/testimonials");

export default function Stories({
  posts,
  instagram,
}: {
  posts: Post[];
  instagram: InstagramPost[];
}) {

  const [showSubscribe, setShowSubscribe] = useState(false);
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8 flex flex-col gap-4">
        <InstagramFeed posts={instagram} />
        <Heading css="text-start leading-tight">Stories</Heading>
        <div className="flex flex-col gap-4">
          {posts.map((post) => (
            <TestimonialPost key={post.slug} post={post} />
          ))}
        </div>
        <NewsletterSection onClickSubscribe={() => setShowSubscribe(true)} />
        <SubscribePopup
          togglePopup={() => {
            setShowSubscribe(!showSubscribe);
          }}
          isVisible={showSubscribe}
        />
        {/* <div className="flex flex-col">
          <Heading css="text-grey text-center text-lg lg:text-3xl leading-none mt-8 sm:mt-12">
            Do you want to tell us your story?<br></br>
            Reach out to us at <a className="text-primary" href = "mailto: hello@paigebraille.com">hello@paigebraille.com</a>
          </Heading>
          <Graphic3 className="overflow-visible -mb-4 mt-8 h-48 sm:h-64" />
        </div> */}
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const posts = getAllPosts(postsDirectory);
  const instagram = await getInstagramPosts();
  return { props: { posts, instagram } };
}
