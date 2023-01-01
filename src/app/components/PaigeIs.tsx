import React, { useEffect, useState } from "react";

export default function PaigeIs() {


  const COMPLETIONS = ["for everyone", "affordable", "braille", "paperless", "multiline"];  
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIdx((i) => {return (i + 1) % COMPLETIONS.length})
    }, 3000);
  }, [idx]);

  return (
    <h1 className="text-3.5xl text-start mt:6 md:mt-12 px-4 sm:px-8 sm:px-16 leading-tight tracking-tight sm:w-3xl font-light">
      <span className="font-extrabold text-primary">Paige</span> is {COMPLETIONS[idx]}
    </h1>
  );
}
