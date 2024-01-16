import React from "react";

//icon set
import afex from "assets/dock/afex.svg";
import dangote from "assets/dock/dangote.svg";
import olam from "assets/dock/olam.svg";
import recyclan from "assets/dock/recyclan.svg";
import terratiza from "assets/dock/terratiza.svg";

interface PartnersProp {
  isDock: boolean;
}

const Partners = ({ isDock = false }: PartnersProp) => {
  return (
    <div
      className={`${
        isDock ? "bg-[#10170F]" : "bg-transparent"
      } pt-14 pb-[118px]`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <p
          className={`text-xl font-normal sato text-center ${
            isDock ? "grey-text-1" : "black-text-4"
          } mb-20`}
        >
          Oneport365 has supported these top companies
        </p>
        <div className="marquee">
          <div className="flex items-center marquee__content">
            <div>
              <img className={`${isDock ? "" : "invert"}`} src={afex} alt="" />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={recyclan}
                alt=""
              />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={terratiza}
                alt=""
              />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={dangote}
                alt=""
              />
            </div>
            <div>
              <img className={`${isDock ? "" : "invert"}`} src={olam} alt="" />
            </div>
          </div>
          <div className="lg:hidden flex items-center marquee__content">
            <div>
              <img className={`${isDock ? "" : "invert"}`} src={afex} alt="" />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={recyclan}
                alt=""
              />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={terratiza}
                alt=""
              />
            </div>
            <div>
              <img
                className={`${isDock ? "" : "invert"}`}
                src={dangote}
                alt=""
              />
            </div>
            <div>
              <img className={`${isDock ? "" : "invert"}`} src={olam} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
