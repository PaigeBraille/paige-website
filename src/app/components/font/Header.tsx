import React from "react";

export default function Header(props: {
  children: React.ReactNode;
  css?: string;
  color?: string;
}) {
  return (
    <h2
      className={`text-center leading-tight text-2xl font-bold tracking-tight font-extrabold ${
        props.color ? props.color : "text-gray-900"
      } ${props.css}`}
    >
      {props.children}
    </h2>
  );
}
