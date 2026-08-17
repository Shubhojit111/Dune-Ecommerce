import Link from "next/link";
import React from "react";

function HeaderBtn({href, text, className}) {
  const classes = `sm:mt-2 sm:mb-2 font-dune text-[40px] sm:text-4xl md:text-[56px] tracking-normal uppercase font-normal leading-[1.2] drop-shadow-sm ${className}`;

  if (href) {
    return (
      <Link href={href || "/"} className={classes}>
        {text || "The Originals"}
      </Link>
    );
  }

  return (
    <div className={classes}>
      {text || "The Originals"}
    </div>
  );
}

export default HeaderBtn;