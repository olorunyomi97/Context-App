import React from "react";

//icons
import origin from "assets/icons/origin-house.svg";
import dest from "assets/icons/location-blue.svg";

interface DestinationProps {
  originText?: string;
  destText?: string;
  originData?: string;
  destData?: string;
  shipment_data?: any;
  alt_image?: any;
}

const DestinationBox = ({
  originText,
  destText,
  originData,
  destData,
  alt_image = false
}: DestinationProps) => (
  <div className="background-green p-4 border border-[#F3F4F6] rounded">
    {originText && (
      <div
        className={`flex items-center gap-x-[12px] ${
          destText ? "mb-6" : "mb-0"
        }`}
      >
        <div className="min-w-[32px]">
          <img src={!alt_image ? origin : dest} alt="" />
        </div>
        <div>
          <p className="text-sm font-light grey-text mb-2">{originText}</p>
          <p className="text-sm font-medium black-text-3 capitalize">
            {originData ? originData : "N/A"}
          </p>
        </div>
      </div>
    )}
    {destText && (
      <div className="flex items-center gap-x-[12px]">
        <div className="min-w-[32px]">
          <img src={dest} alt="" />
        </div>
        <div>
          <p className="text-sm font-light grey-text mb-2">{destText}</p>
          <p className="text-sm font-medium black-text-3 capitalize">
            {destData ? destData : "N/A"}
          </p>
        </div>
      </div>
    )}
  </div>
);

export default DestinationBox;
