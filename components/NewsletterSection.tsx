import React from "react";
import Graphic1 from "../public/svg/graphic-1.svg";
import { useEffect } from "react";

const MAILERLITE_SCRIPT = `
  (function(w,d,e,u,f,l,n){
    w[f]=w[f]||function(){(w[f].q=w[f].q||[]).push(arguments);},
    l=d.createElement(e),l.async=1,l.src=u,
    n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);
  })
  (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
  ml('account', '337189');
`;

export default function NewsletterSection() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const script = document.createElement("script");
      script.innerHTML = MAILERLITE_SCRIPT;
      document.head.appendChild(script);
    }
  }, []);
  return (
    <div className="flex flex-col md:flex-row bg-primary px-4 pt-4 md:p-8 justify-between relative overflow-visible gap-4 rounded-md">
      <div className="flex flex-col justify-between md:w-1/2 gap-4">
        <h2 className="font-bold text-white tracking-tight leading-tight text-xl md:text-2xl">
          Do you want to be up to date with new news? Subscribe to our
          newsletter!
        </h2>
        <a
          className="ml-onclick-form font-bold text-primary bg-white px-8 py-2 bg-white text-sm mr-auto rounded cursor-pointer"
          onClick={() => ml("show", "yzlLlG", true)}
        >
          Subscribe
        </a>
      </div>
      <Graphic1 className="object-right w-48 mx-auto md:w-72 lg:w-96 md:absolute md:-bottom-4 md:-right-12 lg:-bottom-5 lg:-right-5" />
    </div>
  );
}
