import React from "react";

export default function TeamMember(props: {
  heading: string;
  caption: string;
  imageSrc: any;
}) {
  return (
    <div className="text-center text-gray-500 text-sm leading-snug">
      <img
        className="w-16 h-16 rounded-full m-auto mb-2"
        src={props.imageSrc}
        alt={props.heading}
      />
      <h3 className="mb-1 text-lg font-bold tracking-tight text-gray-900 leading-tight">
        {props.heading}
      </h3>
      <p>{props.caption}</p>
    </div>
  );
}
