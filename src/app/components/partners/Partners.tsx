import React from "react";
import Header from "../font/Header";
import P1 from "../../svg/partners/1.svg";
import P2 from "../../svg/partners/2.svg";
import P3 from "../../svg/partners/3.svg";
import P4 from "../../svg/partners/4.svg";
import P5 from "../../svg/partners/5.svg";
import P6 from "../../svg/partners/6.svg";
import P7 from "../../svg/partners/7.svg";

export default function Partners() {
  return (
    <div className="p-8 bg-white flex flex-col gap-8 max-w-5xl mx-auto">
        <Header>Thanks to</Header>
        <div className="flex flex-col sm:flex-row gap-6 justify-center p-6 flex-wrap">
          <P1 />
          <P2 />
          <P3 />
          <P4 />
          <P5 />
          <P6 />
          <P7 />
        </div>
    </div>
  );
}
