import React from "react";
import sean from "../img/sean.jpeg";

export default function Quote() {
  return (
    <section className="text-center px-6 lg:px-12 leading-tight">
      <svg
        aria-hidden="true"
        className="mx-auto mb-3 w-8 h-8 text-primary"
        viewBox="0 0 24 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
          fill="currentColor"
        />
      </svg>
      <blockquote>
        <p className="text-lg italic font-medium text-gray-900">
        I'm still in awe of the readability of your prototype
        </p>
      </blockquote>
      <div className="flex justify-center items-center mt-6 flex-wrap gap-3">
        <img
          className="w-8 h-8 rounded-full"
          src={sean}
          alt="Sean Randall profile picture"
        />
        <div className="flex items-center divide-gray-500 divide-x-2">
          <span className="text-gray-900 pr-2">
          Sean Randall
          </span>
          <span className="text-sm text-gray-500 pl-2">
          Accessibility Specialist
          </span>
        </div>
      </div>
    </section>
  );
}
