// Parse testimonial files

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/testimonials");

export type Post = {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  content?: string;
  excerpt?: string;
};

export const getAllPosts = (): Post[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    return {
      slug,
      title: data.title,
      date: data.date,
      coverImage: data.coverImage,
      excerpt: data.excerpt,
    };
  });
  return allPosts;
};

export function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const htmlContent = unified()
    .use(remarkParse)
    .use(remarkHtml)
    .processSync(content);

  return {
    slug: slug,
    title: data.title,
    date: data.date,
    coverImage: data.coverImage,
    content: htmlContent.toString(),
  };
}
