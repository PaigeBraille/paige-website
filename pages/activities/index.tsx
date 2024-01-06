import React, { useState } from "react";
import { getAllPosts, Post } from "../../lib/posts";

import Heading from "../../components/Heading";
import { Wrapper } from "../../components/Wrapper";
import path from "path";
import NewsletterSection2 from "../../components/NewsletterSection2";
import SubscribePopup from "../../components/SubscribePopup";
import ActivitiesPost from "@/components/ActivitiesPost";

const postsDirectory = path.join(process.cwd(), "content/activities");

export default function Activities({ posts }: { posts: Post[] }) {
  const [showSubscribe, setShowSubscribe] = useState(false);
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto md:px-6 flex flex-col">
        <div className="bg-white flex justify-between items-end py-6 md:py-12 px-4">
          <Heading css="text-start leading-tight text-paigedarkgrey">
            Activities
          </Heading>
        </div>
        <div className="px-6 md:px-0">
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <ActivitiesPost key={post.slug} post={post} />
            ))}
          </div>
          <NewsletterSection2 onClickSubscribe={() => setShowSubscribe(true)} />
        </div>
        {/* <div className="flex flex-col">
          <Heading css="text-grey text-center text-lg lg:text-3xl leading-none mt-8 sm:mt-12">
            Do you want to tell us your story?<br></br>
            Reach out to us at <a className="text-primary" href = "mailto: hello@paigebraille.com">hello@paigebraille.com</a>
          </Heading>
          <Graphic3 className="overflow-visible -mb-4 mt-8 h-48 sm:h-64" />
        </div> */}
      </div>
      <SubscribePopup
        togglePopup={() => {
          setShowSubscribe(!showSubscribe);
        }}
        isVisible={showSubscribe}
      />
    </Wrapper>
  );
}

export async function getServerSideProps() {
  const posts = getAllPosts(postsDirectory);
  return { props: { posts } };
}
