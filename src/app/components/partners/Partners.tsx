import React from "react";
import Header from "../font/Header";
import Braillists from "../../img/braillists.png";
import NCW from "../../img/NCW.png";
import Imperial from "../../img/imperial.png";
import Kilimanjaro from "../../img/kbt.png";
import Unltd from "../../img/unltd.png";
import BEIBF from "../../img/eibc.png";
import RPD from "../../img/rpd.png";

function PartnerImage(props: { src: any }) {
  return <img src={props.src} className="object-contain w-24"/>;
}

export default function Partners() {
  return (
    <div className="p-8 lg:p-12 bg-primary flex flex-col gap-12 flex-wrap">
      <div>
        <Header color="text-white">Testing at</Header>
        <div className="flex gap-8 justify-center p-6">
          <PartnerImage src={NCW} />
          <PartnerImage src={Braillists} />
        </div>
      </div>

      <div>
        <Header color="text-white">Supported by</Header>
        <div className="flex gap-8 justify-center p-6 flex-wrap">
          <PartnerImage src={Imperial} />
          <PartnerImage src={Kilimanjaro} />
          <PartnerImage src={Unltd} />
          <PartnerImage src={BEIBF} />
          <PartnerImage src={RPD} />
        </div>
      </div>
    </div>
  );
}
