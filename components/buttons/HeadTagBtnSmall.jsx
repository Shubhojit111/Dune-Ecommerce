import React from "react";

const HeadTagBtnSmall = ({text, className}) => {
  return (
    <p className={`text-[12px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-black ${className}`}>
      {text || "ICONIC BASICS"}
    </p>
  );
};

export default HeadTagBtnSmall;
