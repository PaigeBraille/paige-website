import Heading from "@/components/Heading";
import Image from "next/image";
import Time from "../../public/svg/time.svg";
import People from "../../public/svg/people.svg";
import Technology from "../../public/svg/Technology.svg";
import Information from "../../public/svg/Information.svg";
import Literacy from "../../public/svg/Literacy.svg";
import Communication from "../../public/svg/Communication.svg";
import Link from "next/link";
import {
  getPostBySlug,
  getAllPosts,
  PostProps,
  SlugParams,
} from "../../lib/posts";
import { Wrapper } from "../../components/Wrapper";
import path from "path";

const postsDirectory = path.join(process.cwd(), "content/activities");

function displaySkills(skills: string) {
  var selectedOptions = skills;
  var selectedValues = selectedOptions.split(",").map((value) => value.trim());

  return (
    <div>
      {selectedValues.includes("1") && (
        <div className="text-xs inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto my-2">
          <Communication title="Communication" className="w-4 h-4 mr-2" />
          <p className="">
            Communication - develop social communication skills.{" "}
          </p>
        </div>
      )}
      {selectedValues.includes("2") && (
        <div className="text-xs inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto my-2">
          <Literacy title="Literacy" className="w-4 h-4 mr-2" />
          <p className="">Literacy - develop literacy skills. </p>
        </div>
      )}
      {selectedValues.includes("3") && (
        <div className="text-xs inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto my-2">
          <Information title="Accessing Information" className="w-4 h-4 mr-2" />
          <p className="">
            Information - access, produce and manage information independently.
          </p>
        </div>
      )}
      {selectedValues.includes("4") && (
        <div className="text-xs inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto my-2">
          <Technology title="Technology" className="w-4 h-4 mr-2" />
          <p className="">
            Technology - using technology with as much independence as possible.{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default function BlogPost({ post }: PostProps) {
  return (
    <Wrapper>
      <div className="max-w-5xl mx-auto p-4 md:px-8">
        <Link href="/activities" className="text-primary text-xs font-light">
          ← Go back
        </Link>
        <Heading css="text-start">{post.title}</Heading>
        <p className="text-xs font-light">{post.date}</p>
        <div className="text-xs text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-auto my-6">
          <Time title="Time" className="w-4 h-4 mr-2" />
          {post.time}
          <People title="People" className="w-4 h-4 mx-2" />
          {post.people}
        </div>
        <div className="flex flex-col  mb-4 md:mb-8 md:flex-row gap-4">
          <div className="flex md:w-1/2 md:h-full">
            <Image
              src={post.coverImage}
              alt={post.alt}
              width={400}
              height={250}
              quality={30}
            />
          </div>
          <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg md:w-1/2">
            <p className="text-sm font-bold">
              You will work in these areas of the curriculum framework for
              children with vision impairment:
            </p>
            {displaySkills(post.skills)}
          </div>
        </div>
        {/* <div className="py-4 md:py-8 w-1/2">
          <Image
            src={post.coverImage}
            alt={post.alt}
            width={500}
            height={300}
            quality={30}
          />
        </div> */}
        <div
          dangerouslySetInnerHTML={{ __html: post.content ?? "" }}
          className="testimonial-post"
        />
      </div>
    </Wrapper>
  );
}

export async function getStaticPaths() {
  const paths = getAllPosts(postsDirectory).map((post) => ({
    params: { slug: post.slug },
  }));
  return { paths, fallback: false };
}

export async function getStaticProps(p: SlugParams) {
  const post = getPostBySlug(p.params.slug, postsDirectory);
  return { props: { post } };
}
