import { Wrapper } from "../components/Wrapper";
import React from "react";

const ResourceText = () => {
  return (
    <div className="bg-white flex justify-between items-end py-4 px-6">
      <h1 className="text-3xl text-gray-900 tracking-tight leading-tight md:w-2/3 font-extrabold">
        Contributing to{" "}
        <span className="font-bold text-primary">Paige</span>
      </h1>
    </div>
  );
};

export default function Resources() {
  return (
    <Wrapper>
      <div className="mx-auto max-w-5xl md:px-6">
        <ResourceText />
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">
          Thank you very much for your interest in Paige. Unfortunately, we are not currently hiring. We appreciate it’s no substitute, but there are ways you can still contribute to NVDA if you wish. Being open source means we can accept input from anyone, anywhere in the world. We have a valued community of motivated volunteer contributors, welcoming of new participants. Some of the ways you can help include:
        </p>
        <ul className="list-disc md:w-1/2 px-4 md:px-8 text-sm">
          <li>Investigate issues on our GitHub issue tracker, to add details and confirm their status</li>
          <li>Create new issues to write up any unreported bugs you find</li>
          <li>Write the code to fix an open issue and create a pull request</li>
          <li>If you have an idea which might not fit in NVDA core, you might consider creating an NVDA add-on for it</li>
          <li>Investigate issues on our GitHub issue tracker, to add details and confirm their status</li>
          <li>Investigate issues on our GitHub issue tracker, to add details and confirm their status</li>
        </ul>
        <p className="md:w-1/2 flex p-2 md:p-6 text-sm">
          Future job opportunities will be listed on the NV Access Careers page, so do please check back. We also share vacancies on Twitter and Facebook, and via our In-Process blog.
        </p>
      </div>
    </Wrapper>
  );
}
