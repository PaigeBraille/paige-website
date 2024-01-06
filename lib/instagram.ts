export type InstagramPost = {
  id: string;
  media_url: string;
  caption?: string; // Caption can be optional
  media_type: string;
};

export async function getInstagramPosts() {
  const url = `https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type,thumbnail_url,permalink&access_token=${process.env.INSTAGRAM_ACCESS_TOKEN}&limit=12`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error);
    }

    const imageData = data.data as InstagramPost[];

    // Filter out anything that's not an image
    const imagePosts = imageData.filter(
      (post) =>
        post.media_type === "IMAGE" || post.media_type === "CAROUSEL_ALBUM",
    );

    return imagePosts;
  } catch (error) {
    console.error(error);

    return [];
  }
}
