import React from "react";

//icons
import disclaimer from "assets/icons/disclaimer.svg";
import disclaimerWhite from "assets/icons/disclaimer-white.svg";

const ShipmentNotfication = ({ subtext, text, style }) => {
  return (
    <div
      className="flex items-center gap-x-3 py-4 px-6 black-br bg-[#002E89] text-white"
      style={style}
    >
      <span className="self-start mt-1">
        <img src={disclaimerWhite} alt="" className="min-w-[16px]" />
      </span>
      <div className="black-text-3 text-sm md:text-sm">
        <span className="font-semibold text-sm text-white">{subtext}</span>{" "}
        <span className="font-light text-white">{text}</span>
      </div>
    </div>
  );
};

export default ShipmentNotfication;
