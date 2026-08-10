import React from "react";

const SubTextBtn = ({text, className}) => {
  return (
    <p className={`text-xs sm:text-[12.5px] tracking-wider text-white/90 leading-relaxed font-bold mb-4 ${className}`}>
      {text || "Timeless pieces that define your wardrobe."}
    </p>
  );
};

export default SubTextBtn;
