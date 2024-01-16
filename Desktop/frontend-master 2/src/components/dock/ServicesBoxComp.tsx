import React from "react";
import { useNavigate } from "react-router-dom";

// assests
import chevronB from "assets/dock/chevron-black.svg";

const ServicesBoxComp = (props: any) => {
  const { image, header, body, button } = props;
  const navigate = useNavigate();

  return (
    <div className="p-[24px] border-[1px] border-solid border-[#E5E7EB] lg:border-[#F3F4F6] rounded-[10px] bg-[#F3F4F6]">
      <div className="  ">
        <div className="mb-[40px] w-full">
          <img src={image} alt="" className="w-full" />
        </div>
        <p className="leading-[26px] lg:leading-[32px] text-[16px] sm:text-[20px] font-medium green-text-3 mb-[24px] sato">
          {header}
        </p>
        <p className="leading-[32px] min-h-[114px] lg:leading-[38px] text-[20px] sm:text-[24px] text-[#4B5563] font-light mb-[24px] sato">
          {body}
        </p>

        {/* button */}
        <div className="cursor-pointer pb-5" onClick={() => navigate("/signup")}>
          <div className="flex items-center gap-x-9">
            <p className="font-normal leading-[22px] lg:leading-[27px] text-[16px] sm:text-[20px] text-[#1F2937] sato">
              {button}
            </p>
            <img src={chevronB} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesBoxComp;
