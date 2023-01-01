import React, { useState } from "react";
import { Link } from "react-router-dom";
import Paige from "../svg/paige.svg";

export type NavLinkInfo = {
  name: string;
  location: string;
  isExternal?: boolean;
};

function NavLink(props: NavLinkInfo) {
  return (
    <li key={props.name}>
      {props.isExternal ? (
        <a
          href={props.location}
          className="text-sm sm:text-xs block md:py-2 text-primary rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 cursor-pointer font-light"
        >
          {props.name}
        </a>
      ) : (
        <Link
          to={props.location}
          className="text-sm sm:text-xs block md:py-2 text-primary rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 cursor-pointer font-light"
        >
          {props.name}
        </Link>
      )}
    </li>
  );
}

export default function PaigeHeader(props: { links: NavLinkInfo[] }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <section className="bg-white flex justify-top flex-col max-w-5xl mx-auto">
      <nav className="px-8">
        <div className="flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center text-primary pr-2">
            <Paige />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={() => {
              setShowMenu((m) => !m);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            className={`${showMenu ? "" : "hidden"} w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="flex flex-col border border-gray-300 p-4 md:p-0 rounded-lg mb-6 md:mb-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-50 md:bg-white">
              {props.links.map((l) => {
                return <NavLink {...l} key={l.name} />;
              })}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
