import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faX, faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Logo from "../public/svg/Paige_logo.svg";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-toastify";

// Register font awesome icons
library.add(faBars);
library.add(faX);
library.add(faUser);

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
          href={props.location}
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [links, setLinks] = useState<NavLinkInfo[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setLinks(
          props.links.filter(
            (link) => link.name !== "Sign up" && link.name !== "Log in",
          ),
        );
      } else {
        setIsLoggedIn(false);
        setLinks(props.links);
      }
    });

    return () => unsubscribe();
  }, [props.links]);

  return (
    <section className="bg-white flex justify-top flex-col max-w-5xl mx-auto">
      <nav className="px-4 md:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <Link href="/" className="flex items-center text-primary pr-2" aria-label="Home">
            <Logo/>
          </Link>
          <button
            type="button"
            className="inline-flex items-center ml-3 text-sm text-primary rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-100 px-2 py-1"
            aria-controls="paige-navbar"
            aria-expanded={showMenu}
            onClick={() => {
              setShowMenu((m) => !m);
            }}
          >
            <span className="sr-only">
              {showMenu ? "Close main menu" : "Open main menu"}
            </span>
            {showMenu ? (
              <FontAwesomeIcon icon={faX} size="xl" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="xl" />
            )}
          </button>
          <div
            className={`${showMenu ? "" : "hidden"} w-full md:block md:w-auto`}
            id="paige-navbar"
          >
            <ul className="flex flex-col border border-gray-300 p-4 md:p-0 rounded-lg mb-6 md:mb-0 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 bg-gray-50 md:bg-white">
              {links.map((l) => {
                return <NavLink {...l} key={l.name} />;
              })}
              {isLoggedIn ? (
                <li>
                  <button
                    type="button"
                    className="text-sm sm:text-xs block md:py-2 text-primary rounded md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:p-0 cursor-pointer font-light"
                    onClick={() => {
                      setShowMenu((m) => !m);
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      size="lg"
                      className="mr-2 cursor-pointer"
                    />
                  </button>
                  <ul
                    className={`${
                      showMenu ? "" : "hidden"
                    } absolute right-0 mt-2 py-2 w-38 bg-white rounded-md shadow-lg`}
                  >
                    <li>
                      <button
                        type="button"
                        className="text-sm sm:text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full" // BEGIN: Update logout button styling
                        onClick={() => {
                          const toastId = toast.loading("Logging out");
                          signOut(auth)
                            .then(() => {
                              toast.update(toastId, {
                                render: "Logged out successfully",
                                type: "success",
                                isLoading: false,
                              });
                            })
                            .catch((error) => {
                              toast.update(toastId, {
                                render: "Error logging out",
                                type: "error",
                                isLoading: false,
                              });
                            })
                            .finally(() => {
                              setTimeout(() => {
                                toast.dismiss(toastId);
                              }, 5000);
                            });
                        }}
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="text-sm sm:text-xs block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full" // BEGIN: Update logout button styling
                        onClick={() => {
                          const user = auth.currentUser;
                          if (user) {
                            const toastId = toast.loading("Deleting account");
                            user
                              .delete()
                              .then(() => {
                                toast.update(toastId, {
                                  render: "Account deleted successfully",
                                  type: "success",
                                  isLoading: false,
                                });
                              })
                              .catch((error) => {
                                toast.update(toastId, {
                                  render: "Error deleting account",
                                  type: "error",
                                  isLoading: false,
                                });
                              })
                              .finally(() => {
                                setTimeout(() => {
                                  toast.dismiss(toastId);
                                }, 5000);
                              });
                          }
                        }}
                      >
                        Delete Account
                      </button>
                    </li>
                  </ul>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
}
