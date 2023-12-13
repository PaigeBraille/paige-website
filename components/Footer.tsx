import React from "react";
import Link from "next/link";
import { NavLinkInfo } from "./PaigeHeader";
import Logo from "../public/svg/paige.svg";

const Footer = (props: { links: NavLinkInfo[] }) => {
  return (
    <footer className="bg-zinc-700 text-white text-xs w-full p-4 lg:p-8 leading-tight flex flex-wrap">
      <div className="w-full md:w-1/4 text-center md:text-left pb-4 md:pr-4">
        <Link href="/">
          <Logo className="inline-block h-auto" alt="Paige Logo" />
        </Link>
        <p className="mb-4">Contact us at: <a className="text-white" href = "mailto: hello@paigebraille.com">hello@paigebraille.com</a></p>
        <form
          className="flex flex-col gap-2 items-center md:items-start overflow-clip"
          name="footer-subscribe"
          method="POST"
          data-netlify="true"
          action="/success"
        >
          <label className="font-medium" htmlFor="email">
            Subscribe to our newsletter:
          </label>
          <input type="hidden" name="form-name" value="footer-subscribe" />
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Enter email here"
            className="py-1 px-2 font-light text-black outline-none"
          />
        </form>
        <p className="mb-4 mt-4">© Paige Braille Ltd 2023. All rights reserved. Company no. 14311624.</p>
      </div>
      <div className="w-full md:w-1/4 text-center md:text-left md:border-l md:border-white p-2">
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
            <Link href="/Return & Refund Policy.pdf" className="hover:underline">
              Returns
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/privacy-policy.pdf" className="hover:underline">
              Privacy Policy
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/Terms of Service.pdf" className="hover:underline">
              Terms of Service 
            </Link>
          </li>
          <li className="mt-2">
            <Link href="/careers" className="hover:underline">
              Careers
            </Link>
          </li>
          {/* <li className="mt-2">
            <Link href="/buy" className="hover:underline">
              FAQ
            </Link>
          </li> */}
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
          <li className="mt-2">
            <a
              href="https://youtube.com/@paigebraille"
              className="hover:underline"
            >
              YouTube
            </a> 
          </li>
          <li className="mt-2">
            <Link href="https://drive.google.com/drive/folders/1AqTR1wjvtb7O3ZdATcOG1L05cEgAxj9O?usp=drive_link" target="_blank" rel="noreferrer"className="hover:underline">
              Press
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
