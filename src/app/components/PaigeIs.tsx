import React, { useEffect, useState } from "react";

export default function PaigeIs() {


  const COMPLETIONS =["for everyone", "affordable", "braille"];  
  const [idx, setIdx] = useState(0);
 

  useEffect(() => {
    setTimeout(() => {
      setIdx((i) => {return (i + 1) % COMPLETIONS.length})
    }, 3000);
  }, [idx]);

  return (
    <h1 className=" text-xl py-24 md:text-5xl font-extralight text-center md:pt-36 md:pb-40 px-4 sm:px-16 leading-tight tracking-tight">
      <span className="font-extrabold text-primary">Paige</span> is {COMPLETIONS[idx]}
    </h1>
  );
}
