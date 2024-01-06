import { InstagramPost } from "../lib/instagram";

export type InstagramFeedProps = {
  posts: InstagramPost[];
};

const InstagramFeed: React.FC<InstagramFeedProps> = ({ posts }) => {
  return (
    <div className="w-full overflow-x-scroll">
      <div className="flex flex-row gap-2">
        {posts.map((post: InstagramPost) => (
          <div key={post.id} className="flex-none">
            <img
              src={post.media_url}
              alt={"Instagram Post with caption " + post.caption}
              className="w-48 h-48 cursor-pointer"
              onClick={() => {
                window.open(
                  "https://www.instagram.com/paigebraille/",
                  "_blank",
                );
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramFeed;
