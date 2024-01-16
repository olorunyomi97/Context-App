import React from "react";
import { useNavigate } from "react-router-dom";

//icons
import arrowL from "assets/icons/arrow-left2.svg";

interface ShipmentTitleProps {
  openModal?: () => void;
  shipment_data?: any;
}

const ShipmentTitleUpload = ({
  shipment_data,
  openModal,
}: ShipmentTitleProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="pb-3 md:pb-6 md:border-solid md:border-b-[#F3F4F6] md:border-b-[1px] flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <div
            className="grey-text flex items-center gap-x-1 mb-2 font-light cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <span>
              <img src={arrowL} alt=""></img>
            </span>
            <p className="text-sm grey-text">Shipments</p>
          </div>
          <div className="text-sm sm:text-xl md:text-2xl flex items-center">
            <span className=" text-[#344336] mr-[6px]">Job Number</span>
            <span className="grey-text-1 font-light">
              {shipment_data?.job_number
                ? `#${shipment_data?.job_number}`
                : "N/A"}
            </span>
            <div
              className={`py-1 px-2 ml-1.5 rounded-full w-fit text-center ${
                shipment_data.shipment_status === "active"
                  ? "bg-green-100"
                  : shipment_data.shipment_status === "new booking"
                  ? "background-blue"
                  : shipment_data.shipment_status === "pending"
                  ? "background-blue"
                  : shipment_data.shipment_status === "invoice accepted"
                  ? "bg-[#FFFADF]"
                  : shipment_data.shipment_status === "completed"
                  ? "bg-[#FFFADF]"
                  : shipment_data.shipment_status === "cancelled"
                  ? "bg-red-100"
                  : ""
              }`}
            >
              <p
                className={`text-xs capitalize text-center ${
                  shipment_data.shipment_status === "new booking"
                    ? "text-[#4B83F0]"
                    : shipment_data.shipment_status === "pending"
                    ? "text-[#4B83F0]"
                    : shipment_data.shipment_status === "active"
                    ? "text-[#059C01]"
                    : shipment_data.shipment_status === "invoice accepted"
                    ? "text-[#C27500]"
                    : shipment_data.shipment_status === "completed"
                    ? "text-[#C27500]"
                    : shipment_data.shipment_status === "cancelled"
                    ? "text-red-600"
                    : ""
                }`}
              >
                {shipment_data.shipment_status}
              </p>
            </div>
          </div>
        </div>

        <div
          className="font-normal cursor-pointer text-sm blue-br px-4 py-[8px] text-center md:w-fit rounded-full"
          onClick={openModal}
        >
          View & Upload Documents
        </div>
      </div>
    </>
  );
};

export default ShipmentTitleUpload;
