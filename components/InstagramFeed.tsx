import { InstagramPost } from "../lib/instagram";
import Image from "next/image";

export type InstagramFeedProps = {
  posts: InstagramPost[];
};

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  return (
    <div className="w-full flex flex-row gap-4 flex-wrap justify-center py-8">   
      {posts.map((post: InstagramPost) => (
        <div key={post.id}>
          <Image
            src={post.media_url}
            alt={"Instagram Post with caption " + post.caption}
            width={200}
            height={200}
            quality={40}
          />

        </div>
      ))}
    </div>
  );
};

export default InstagramFeed;
