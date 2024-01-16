import React from "react";
import { Link } from "react-router-dom";

// assests
import arrow from "assets/dock/arrow-right-white.svg";

const SectionOneServiceComp = (props: any) => {
  const { heading, body, image } = props;
  return (
    <div className="hidden lg:grid lg:grid-cols-4 mb-14 gap-[24px]">
      {/* box 1 */}
      <div className="green-gradient py-[40px] px-[24px] relative rounded-[10px]">
        <p className="text-white text-xl font-medium leading-[30px] mb-[24px] sato">
          {heading}
        </p>
        <p className="text-[#ffffffcc] text-sm leading-[21px] mb-[93px] sato">
          {body}
        </p>
        {/* buttom box */}
        <Link to="/signup" className="w-full absolute left-0 bottom-0 bg-[#3AB44A] rounded-t-[4px] rounded-b-[10px]">
          <div className="flex items-center justify-center gap-[10px] py-[16.5px]">
            <p className="text-white font-medium text-base leading-[19px] sato">
              Get started for free
            </p>
            <img src={arrow} alt="" className="" />
          </div>
        </Link>
      </div>
      {/* box 2 */}
      <div className="col-span-3">
        <img src={image} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default SectionOneServiceComp;
