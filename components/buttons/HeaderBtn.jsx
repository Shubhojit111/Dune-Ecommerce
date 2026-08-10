import React from "react";

function HeaderBtn({text, className}) {
  return (
    <h3 className={`sm:mt-2 sm:mb-2 font-dune text-[40px] sm:text-4xl md:text-[56px] tracking-normal uppercase font-normal leading-[1.2] drop-shadow-sm ${className}`}>
      {text || "The Originals"}
    </h3>
  );
}

export default HeaderBtn;
