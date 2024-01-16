import React from "react";

//components
import Button from "./Button";

//icons
import arrowR from "assets/dock/arrow-right-white.svg";

interface ServiceHeaderProps {
  text: string;
  subtext: string;
}
const ServiceHeader = ({ text, subtext }: ServiceHeaderProps) => {
  return (
    <div className="mt-[120px] mb-[56px]">
      <p className="lg:text-5xl capitalize text-[32px] text-[#111827] font-medium leading-[42px] lg:leading-[62px] lg:max-w-[790px] mb-6 sato">
        {text}
      </p>
      <p className="lg:text-lg text-[14px] text-[#6B7280] font-normal leading-[23px] lg:leading-[29px] lg:max-w-[662px] sato">
        {subtext}
      </p>
      {/* mobile view button */}
      <div className="block w-auto md:w-[342px] mt-[32px] lg:hidden">
        <Button
          title="Get started for free"
          icon={arrowR}
          iconRight={true}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default ServiceHeader;
