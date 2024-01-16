import React, { useState } from "react";

// /helpers
import { formatCurrency } from "helpers";

function SingleInsurance(props) {
  const { insuranceDetails, selectedInsurance, setSelectedInsurance } = props;

  return (
    <div
      className={
        "last-responsive p-2 md:p-4 cursor-pointer border-grey-2 rounded-lg flex items-center gap-x-2 md:gap-x-4 min-h-[107px] max-h-[107px]"
      }
      onClick={() => setSelectedInsurance(insuranceDetails.id)}
    >
      <div
        className={`flex self-center justify-center items-center min-w-[14px] border-[1px] h-[14px] rounded-full
          ${
            selectedInsurance === insuranceDetails.id
              ? "border-[#109B32]"
              : "border-[#9AA1B1] "
          }
          `}
      >
        <div
          className={
            selectedInsurance === insuranceDetails.id
              ? "w-[6px] h-[6px] rounded-full bg-[#109B32]"
              : " "
          }
        ></div>
      </div>

      <div className="w-[100%] mb-1">
        <p className="text-xs text-[#6B7280] font-normal uppercase">
          {insuranceDetails?.insurer?.name}
        </p>
        <p className="text-xl  lg:text-2xl lg:text-[#1F2937] font-medium">
          {formatCurrency(insuranceDetails?.premium, "NGN")}
          {/* <i className="not-italic text-[12px] font-normal">
            <span className="font-bold">.</span>00
          </i> */}
        </p>
        <p className="text-xs font-normal grey-text">
          Clause {insuranceDetails?.clause}
        </p>
      </div>
    </div>
  );
}

export default SingleInsurance;
