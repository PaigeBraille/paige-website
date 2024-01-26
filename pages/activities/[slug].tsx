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

const instagramBlockquoteStyle = {
  background: "#FFF",
  border: "0",
  borderRadius: "3px",
  boxShadow: "0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)",
  margin: "1px",
  maxWidth: "540px",
  minWidth: "326px",
  padding: "0",
  width: "99.375%",
  WebkitCalc: "(100% - 2px)",
  calc: "(100% - 2px)"
};

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
              quality={25}
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
      <blockquote
          className="instagram-media"
          data-instgrm-captioned
          data-instgrm-permalink="https://www.instagram.com/reel/C2X1KNUs0qz/?utm_source=ig_embed&amp;utm_campaign=loading"
          data-instgrm-version="14"
          style={instagramBlockquoteStyle}
        >
          <div style={{ padding: "16px" }}>
            <a
              href="https://www.instagram.com/reel/C2X1KNUs0qz/?utm_source=ig_embed&amp;utm_campaign=loading"
              style={{
                background: "#FFFFFF",
                lineHeight: "0",
                padding: "0 0",
                textAlign: "center",
                textDecoration: "none",
                width: "100%"
              }}
              target="_blank"
              rel="noreferrer"
            >
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "50%",
                    flex: "0",
                    height: "40px",
                    marginRight: "14px",
                    width: "40px"
                  }}
                ></div>
                <div style={{ display: "flex", flexDirection: "column", flexGrow: "1", justifyContent: "center" }}>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "4px",
                      flex: "0",
                      height: "14px",
                      marginBottom: "6px",
                      width: "100px"
                    }}
                  ></div>
                  <div style={{ backgroundColor: "#F4F4F4", borderRadius: "4px", flex: "0", height: "14px", width: "60px" }}></div>
                </div>
              </div>
              <div style={{ padding: "19% 0" }}></div>
              <div style={{ display: "block", height: "50px", margin: "0 auto 12px", width: "50px" }}>
                <svg width="50px" height="50px" viewBox="0 0 60 60" version="1.1" xmlns="https://www.w3.org/2000/svg" xmlnsXlink="https://www.w3.org/1999/xlink">
                  {/* ... (your SVG path data) ... */}
                </svg>
              </div>
              <div style={{ paddingTop: "8px" }}>
                <div style={{ color: "#3897f0", fontFamily: "Arial, sans-serif", fontSize: "14px", fontStyle: "normal", fontWeight: "550", lineHeight: "18px" }}>
                  View this post on Instagram
                </div>
              </div>
              <div style={{ padding: "12.5% 0" }}></div>
              <div style={{ display: "flex", flexDirection: "row", marginBottom: "14px", alignItems: "center" }}>
                <div>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "50%",
                      height: "12.5px",
                      width: "12.5px",
                      transform: "translateX(0px) translateY(7px)"
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      height: "12.5px",
                      transform: "rotate(-45deg) translateX(3px) translateY(1px)",
                      width: "12.5px",
                      flexGrow: "0",
                      marginRight: "14px",
                      marginLeft: "2px"
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "50%",
                      height: "12.5px",
                      width: "12.5px",
                      transform: "translateX(9px) translateY(-18px)"
                    }}
                  ></div>
                </div>
                <div style={{ marginLeft: "8px" }}>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      borderRadius: "50%",
                      flex: "0",
                      height: "20px",
                      width: "20px"
                    }}
                  ></div>
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "2px solid transparent",
                      borderLeft: "6px solid #f4f4f4",
                      borderBottom: "2px solid transparent",
                      transform: "translateX(16px) translateY(-4px) rotate(30deg)"
                    }}
                  ></div>
                </div>
                <div style={{ marginLeft: "auto" }}>
                  <div
                    style={{
                      width: "0px",
                      borderTop: "8px solid #F4F4F4",
                      borderRight: "8px solid transparent",
                      transform: "translateY(16px)"
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#F4F4F4",
                      flex: "0",
                      height: "12px",
                      width: "16px",
                      transform: "translateY(-4px)"
                    }}
                  ></div>
                  <div
                    style={{
                      width: "0",
                      height: "0",
                      borderTop: "8px solid #F4F4F4",
                      borderLeft: "8px solid transparent",
                      transform: "translateY(-4px) translateX(8px)"
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: "1",
                  justifyContent: "center",
                  marginBottom: "24px"
                }}
              >
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "4px",
                    flexGrow: "0",
                    height: "14px",
                    marginBottom: "6px",
                    width: "224px"
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "#F4F4F4",
                    borderRadius: "4px",
                    flexGrow: "0",
                    height: "14px",
                    width: "144px"
                  }}
                ></div>
              </div>
            </a>
            <p
              style={{
                color: "#c9c8cd",
                fontFamily: "Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "17px",
                marginBottom: "0",
                marginTop: "8px",
                overflow: "hidden",
                padding: "8px 0 7px",
                textAlign: "center",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }}
            >
              <a
                href="https://www.instagram.com/reel/C2X1KNUs0qz/?utm_source=ig_embed&amp;utm_campaign=loading"
                style={{
                  color: "#c9c8cd",
                  fontFamily: "Arial, sans-serif",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "normal",
                  lineHeight: "17px",
                  textDecoration: "none"
                }}
                target="_blank"
                rel="noreferrer"
              >
                A post shared by Otters Have Pockets (@otters.have.pockets)
              </a>
            </p>
          </div>
        </blockquote>
        <script async src="//www.instagram.com/embed.js"></script>
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
