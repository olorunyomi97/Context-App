import React from "react";

const AboutImageComp = (props: any) => {
  const { image, name, position } = props;

  return (
    <div className=" ">
      {/* image */}
      <div className="mb-[16px]">
        <img src={image} className="w-full" alt=""></img>
      </div>
      {/* name and pos */}
      <div className="">
        <p className="font-medium text-[24px] leading-[34px] black-text-2 mb-1 sato">
          {name}
        </p>
        <p className="font-normal text-[16px] leading-[22px] black-text-2 sato">
          {position}
        </p>
      </div>
    </div>
  );
};

export default AboutImageComp;
