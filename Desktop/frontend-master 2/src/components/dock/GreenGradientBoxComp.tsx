import React from "react";
import { useNavigate } from "react-router-dom";

// assests
import waves from "assets/dock/waves.svg";
import chevron from "assets/dock/chevron-right.svg";

const GreenGradientBoxComp = () => {
  const navigate = useNavigate();

  return (
    <div className="green-gradientTwo lg:p-[40px] py-[40px] px-[24px] relative rounded-[10px]">
      <p className="text-white font-medium leading-[38px] lg:leading-[51px] text-[24px] lg:text-[32px] mb-[24px] sato">
        Start shipping internationally and locally
      </p>
      <p className="text-[#ffffffcc] font-light leading-[32px] text-[20px] mb-[40px] max-w-[566px] sato">
        We offer tailored, cost-effective freight services for all types of
        transportation, leveraging the world's major airlines and charter
        operators to deliver seamless import and export international freight
        services.
      </p>

      {/* waves */}
      <div className="absolute right-0 bottom-0 z-0">
        <img src={waves} className="h-full" alt="" />
      </div>

      {/* button */}
      <div
        className="border-[1px] border-[#E5E7EB] z-10 rounded-[30px] py-[8px] px-[16px] w-full sm:w-[350px] mb-[186px] lg:mb-0 cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        <div className="flex justify-center items-center">
          <p className="text-white text-[16px] sm:text-[20px] leading-[27px] font-light">
            Start shipping with us today
          </p>
          <img src={chevron} alt="" />
        </div>
      </div>
    </div>
  );
};

export default GreenGradientBoxComp;
