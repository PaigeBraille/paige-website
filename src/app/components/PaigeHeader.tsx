import React from "react";
import Paige from "../svg/paige.svg";

export default function PaigeHeader() {
  return (
    <section className="bg-primary flex justify-center content-center flex-col" style={{height: "95vh"}}>
      <div className="flex w-full gap-4 justify-center items-center">
        <Paige />
      </div>
    </section>
  );
}
