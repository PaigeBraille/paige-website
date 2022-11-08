import React from "react";

export default function PaigeHeader() {
  return (
    <section className="bg-primary flex justify-center content-center flex-col" style={{height: "95vh"}}>
      <div className="flex w-full gap-4 justify-center items-center">
        <svg
          width="80"
          height="80"
          viewBox="0 0 160 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M36 0C16.1177 0 0 16.1178 0 36V124C0 143.882 16.1178 160 36 160H124C143.882 160 160 143.882 160 124V36C160 16.1177 143.882 0 124 0H36ZM50 134C61.598 134 71 124.598 71 113C71 101.402 61.598 92 50 92C38.402 92 29 101.402 29 113C29 124.598 38.402 134 50 134ZM110 134C121.598 134 131 124.598 131 113C131 101.402 121.598 92 110 92C98.402 92 89 101.402 89 113C89 124.598 98.402 134 110 134Z"
            fill="white"
          />
        </svg>
        <h1 className="text-4xl sm:text-5xl text-white text-center font-extrabold">
          Paige
        </h1>
      </div>
    </section>
  );
}
