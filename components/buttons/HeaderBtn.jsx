import React from "react";

function HeaderBtn({text, className}) {
  return (
    <h3 className={`mt-3.5 mb-3 font-dune text-4xl sm:text-5xl tracking-normal uppercase font-normal leading-tight drop-shadow-sm ${className}`}>
      {text || "The Originals"}
    </h3>
  );
}

export default HeaderBtn;
