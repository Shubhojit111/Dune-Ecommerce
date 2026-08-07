import React from 'react'

const ExploreBtn = ({text, className}) => {
  return (
    <button className={`inline-flex items-center justify-center rounded-full px-5 py-[10px] text-[11px] md:text-[12.5px] uppercase tracking-[0.25em] font-bold text-white transition-all duration-300 shadow-md bg-[#2C292A] hover:bg-[#111111] hover:scale-102 cursor-pointer ${className}`}>{text || "EXPLORE"}</button>
  )
}

export default ExploreBtn