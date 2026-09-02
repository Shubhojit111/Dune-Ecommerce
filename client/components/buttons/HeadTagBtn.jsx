import React from "react";

const HeadTagBtn = ({text, className}) => {
  return (
    <p className={`text-[13px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-white/90 ${className}`}>
      {text || "ICONIC BASICS"}
    </p>
  );
};

export default HeadTagBtn;
