import React from "react";

const AboutStoryComp = (props: any) => {
  const { year, head, body } = props;
  return (
    <div className="border-r-0 md:border-r border-[#D9D9D9] pt-[48px] pr-[47px] pl-[32px] w-[100%] min-w-[100%] md:min-w-[45.33%] md:w-[45.33%] lg:min-w-[30.33%] lg:w-[30.33%] pb-[85px]">
      {/* year */}
      <p className="text-4xl  leading-[47px] font-bold black-text-4 mb-[60px] sato">
        {year}
      </p>
      {/* head */}
      <p className="text-[30px] leading-[39px] font-medium text-[#007003] h-[78px] mb-12 sato">
        {head}
      </p>
      {/* body */}
      <p className="text-xl  leading-[32px] black-text sato">{body}</p>
    </div>
  );
};

export default AboutStoryComp;
