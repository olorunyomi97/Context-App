import React from "react";

//icons
import bigArrow from "assets/icons/bigarrow-right.svg";

//helpers
import { formatCurrency } from "helpers";

const Details = ({ shipdata, booking, shipCategory }) => (
  <div
    className={`grid grid-cols-1 gap-y-6 xl:gap-y-8 xl:grid-cols-3 xl:gap-x-8 ${
      shipCategory === "importair_freight" ? "mb-10 xl:mb-0" : ""
    }`}
  >
    <div className="col-span-2 solid-br rounded">
      <div className="pt-6 pb-6 xl:pt-[17px] xl:pb-[9px] border-solid border-b-[#F3F4F6] border-b-[1px]">
        <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
          <p className="black-text-3 px-6 font-normal xl:w-[45%]">
            {shipdata?.shipment_type?.charAt(0).toUpperCase() +
              shipdata?.shipment_type?.slice(1)}{" "}
            {shipdata?.shipment_transport_type === "air_freight"
              ? "Air Freight Details (Door to Door)"
              : shipdata?.shipment_transport_type === "ocean_freight"
              ? "(Ocean Freight Details)"
              : shipdata?.shipment_transport_type === "haulage"
              ? "(Haulage Details)"
              : ""}
          </p>
          {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          {shipCategory === "exportair_freight" && (
            <div className="flex justify-between items-center gap-x-6 px-6 xl:w-[55%]">
              <div>
                <p className="text-sm font-light grey-text">Pickup Location</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.pickup_location ? shipdata.pickup_location : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Delivery Address</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.delivery_location
                    ? shipdata.delivery_location
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
          {shipCategory === "importair_freight" && (
            <div className="flex justify-between items-center gap-x-6 px-6 xl:w-[55%]">
              <div>
                <p className="text-sm font-light grey-text">Pickup Location</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.pickup_location ? shipdata.pickup_location : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Delivery Address</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.delivery_location
                    ? shipdata.delivery_location
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 pb-10 px-6">
        <div
          className={`mb-6 ${
            shipCategory === "importair_freight"
              ? "border-solid border-b-[1px] border-[#F3F4F6] pb-6"
              : ""
          }`}
        >
          <p className="text-sm grey-text font-light">Total value of goods</p>
          <p className="text-xl black-text-3">
            {shipdata.goods_value
              ? formatCurrency(
                  shipdata.goods_value,
                  shipdata.goods_value_currency
                )
              : "N/A"}
          </p>
        </div>

        {shipCategory === "exportair_freight" ? (
          <div className="grid grid-cols-2 gap-y-6 xl:gap-y-0 xl:grid-cols-4">
            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Postal Code
              </p>
              <p className="black-text-3 text-sm whitespace-normal">
                {booking?.ocean_freight?.rates_data?.carrier_name
                  ? booking?.ocean_freight?.rates_data?.carrier_name
                  : "N/A"}
              </p>
            </div> */}
            {/* 
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Ready Time</p>
              <p className="black-text-3 text-sm">
                {booking?.ocean_freight?.rates_data?.route_schedule[0]
                  ?.transitTime
                  ? booking?.ocean_freight?.rates_data?.route_schedule[0]
                    ?.transitTime
                  : "N/A"}
              </p>
            </div> */}

            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Closed TIme
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.is_product_hazardous === undefined
                  ? "N/A"
                  : shipdata?.is_product_hazardous === true
                    ? "Yes"
                    : "No"}
              </p>
            </div> */}

            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Date</p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.goods_type ? shipdata?.goods_type : "N/A"}
              </p>
            </div> */}
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Origin Airport
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.origin_port_code
                  ? shipdata?.origin_port_code
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Destination Airport
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.destination_port_code
                  ? shipdata?.destination_port_code
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Airline</p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata.air_freight_data?.airline
                  ? shipdata.air_freight_data?.airline
                  : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-6 xl:gap-y-9 xl:grid-cols-4">
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light border-solid">
                Origin Airport
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.origin_port_code
                  ? shipdata?.origin_port_code
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Destination Airport
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.destination_port_code
                  ? shipdata?.destination_port_code
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Goods Type</p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata.goods_type ? shipdata.goods_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Consignee Name
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata.air_freight_data?.sender_name
                  ? shipdata.air_freight_data?.sender_name
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Phone Number
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata.air_freight_data?.sender_phone
                  ? shipdata.air_freight_data?.sender_phone
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Pickup Medium
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata.air_freight_data?.package_pickup_medium
                  ? shipdata.air_freight_data?.package_pickup_medium
                  : "N/A"}
              </p>
            </div>
            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Delivery Postal Code</p>
              <p className="black-text-3 text-sm capitalize">{"N/A"}</p>
            </div> */}
          </div>
        )}
      </div>
    </div>

    <div className="solid-br rounded no-inner">
      <p className="black-text-3 p-6 pb-[18px] font-normal bottom-divider-2">
        {shipCategory === "exportair_freight"
          ? "Delivery Details"
          : "Shipment Details"}
      </p>
      <div className="grid grid-cols-2 text-sm pt-6 pb-10 px-6 gap-y-[26px]">
        {shipCategory === "exportair_freight" ? (
          <>
            <div>
              <p className="grey-text font-light pb-1.5">Consignee Name</p>
              <p className="black-text-3">
                {shipdata.air_freight_data?.consignee_name
                  ? shipdata.air_freight_data?.consignee_name
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Consignee Number</p>
              <p className="black-text-3">
                {shipdata.air_freight_data?.consignee_phone
                  ? shipdata.air_freight_data?.consignee_phone
                  : "N/A"}
              </p>
            </div>
            {/* <div>
              <p className="grey-text font-light pb-1.5">Postal Code</p>
              <p className="black-text-3">{"N/A"}</p>
            </div> */}
          </>
        ) : (
          <>
            <div>
              <p className="grey-text font-light pb-1.5">No. of Cargo</p>
              <p className="black-text-3">
                {shipdata?.air_cargo_details?.length
                  ? shipdata?.air_cargo_details?.length
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text font-light pb-1.5">Hazardous Cargo?</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.is_product_hazardous === undefined
                  ? "N/A"
                  : shipdata?.is_product_hazardous === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text font-light pb-1.5">Weight (Tons)</p>
              <p className="black-text-3">
                {shipdata.air_cargo_details[0]?.container_weight
                  ? shipdata.air_cargo_details[0]?.container_weight
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text font-light pb-1.5">Length(Inches)</p>
              <p className="black-text-3">
                {shipdata?.air_cargo_details[0]?.container_length
                  ? shipdata?.air_cargo_details[0]?.container_length
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text font-light pb-1.5">Width (Inches)</p>
              <p className="black-text-3">
                {shipdata.air_cargo_details[0]?.container_width
                  ? shipdata.air_cargo_details[0]?.container_width
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text font-light pb-1.5">Height (Inches)</p>
              <p className="black-text-3">
                {shipdata.air_cargo_details[0]?.container_height
                  ? shipdata.air_cargo_details[0]?.container_height
                  : "N/A"}
              </p>
            </div>
          </>
        )}
      </div>
    </div>

    {shipCategory === "exportair_freight" && (
      <div className="col-span-2 solid-br rounded mb-10 xl:mb-0">
        <div className="pt-[17px] pb-[9px] xl:border-solid xl:border-b-[#F3F4F6] xl:border-b-[1px]">
          <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
            <p className="black-text-3 px-6 font-normal border-solid border-b-[#F3F4F6] border-b-[1px] xl:border-none pb-4 xl:pb-0">
              Shipment Details
            </p>
            {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          </div>
        </div>

        <div className="pt-6 pb-10 px-6">
          <div className="grid grid-cols-2 gap-y-6 xl:gap-y-9 xl:grid-cols-4">
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light border-solid">
                No. of Cargo
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.air_cargo_details?.length
                  ? shipdata?.air_cargo_details?.length
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light border-solid border-b-[#F3F4F6] border-b-[1px] xl:border-none">
                Hazardous Cargo?
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.is_product_hazardous === undefined
                  ? "N/A"
                  : shipdata?.is_product_hazardous === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div className="">
              <p className="grey-text text-sm  pb-1.5 font-light">
                Commodity Type
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata.goods_type ? shipdata.goods_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Weight (KG)
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.air_cargo_details[0]?.container_weight
                  ? shipdata?.air_cargo_details[0]?.container_weight
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Length (Inches)
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.air_cargo_details[0]?.container_length
                  ? shipdata?.air_cargo_details[0]?.container_length
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Width (Inches)
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.air_cargo_details[0]?.container_width
                  ? shipdata?.air_cargo_details[0]?.container_width
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Height (Inches)
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.air_cargo_details[0]?.container_height
                  ? shipdata?.air_cargo_details[0]?.container_height
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);

const ShipmentDetailAirDoor = ({ shipdata, booking, shipCategory }) => {
  return (
    <>
      <Details
        shipdata={shipdata}
        booking={booking}
        shipCategory={shipCategory}
      />
    </>
  );
};

export default ShipmentDetailAirDoor;
