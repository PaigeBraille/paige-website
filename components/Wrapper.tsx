import React, { ReactNode } from "react";
import Footer from "./Footer";
import PaigeHeader, { NavLinkInfo } from "./PaigeHeader";

const WEB_LINKS: NavLinkInfo[] = [
  {
    name: "About",
    location: "/about",
  },
  {
    name: "Testimonials",
    location: "/testimonials",
  },
  {
    name: "Resources",
    location: "/resources",
  },
  {
    name: "Translate",
    location: "/translate",
  },
  {
    name: "Products",
    location: "/products",
  },
];

export function Wrapper(props: { children?: ReactNode }) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <PaigeHeader links={WEB_LINKS} />
      {props.children}
      <Footer links={WEB_LINKS} />
    </div>
  );
}
