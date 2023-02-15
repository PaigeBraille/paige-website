import React from "react";
import Link from "next/link";
import { NavLinkInfo } from "./PaigeHeader";
import Logo from "../public/svg/paige.svg";

const Footer = (props: { links: NavLinkInfo[] }) => {
  return (
    <footer className="bg-zinc-700 text-white text-xs w-full p-4 gap-4">
      <div className="container mx-auto flex flex-wrap items-top">
        <div className="w-full md:w-1/4 text-center md:text-left mb-4 p-2">
          <Link href="/">
            <Logo
              className="inline-block h-auto"
              alt="Paige Logo"
            />
          </Link>
          <p>© Paige 2022. All rights reserved.</p>
        </div>
        <div className="w-full md:w-1/4  text-center md:text-left md:border-l md:border-white p-2">
          <h5 className="mb-4 font-bold">Web</h5>
          <ul className="mb-4">
            <li className="mt-2">
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            {props.links.map((l) => {
              return (
                <li key={l.name} className="mt-2">
                  {l.isExternal ? (
                    <a href={l.location} className="hover:underline">
                      {l.name}
                    </a>
                  ) : (
                    <Link href={l.location} className="hover:underline">
                      {l.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full md:w-1/4 text-center md:text-left md:border-l md:border-white p-2">
          <h5 className="mb-4 font-bold">Legal</h5>
          <ul className="mb-4">
            <li className="mt-2">
              <a href="#" className="hover:underline">
                Terms & Conditions
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li className="mt-2">
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-1/4 text-center md:text-left md:border-l md:border-white p-2">
          <h5 className="mb-4 font-bold">Social</h5>
          <ul className="mb-4">
            <li className="mt-2">
              <a
                href="https://www.instagram.com/paigebraille/"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>
            <li className="mt-2">
              <a
                href="https://twitter.com/paigebraille"
                className="hover:underline"
              >
                Twitter
              </a>
            </li>
            <li className="mt-2">
              <a
                href="https://www.linkedin.com/company/paige-braille/"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
