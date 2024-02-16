import React, { ReactNode } from "react";
import Footer from "./Footer";
import PaigeHeader, { NavLinkInfo } from "./PaigeHeader";

const WEB_LINKS: NavLinkInfo[] = [
  {
    name: "About",
    location: "/about",
  },
  {
    name: "Stories",
    location: "/stories",
  },
  {
    name: "Support",
    location: "/support",
  },
  {
    name: "Translate",
    location: "/translate",
  },
  {
    name: "Learn",
    location: "/learn",
  },
  {
    name: "Buy",
    location: "/buy",
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
