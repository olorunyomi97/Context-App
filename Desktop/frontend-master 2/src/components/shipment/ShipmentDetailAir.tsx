import React, { useState } from "react";
import { useParams } from "react-router-dom";

//libraries

//components
import ShipmentTitleUpload from "components/shipment/ShipmentTitleUpload";
import DocumentUploadModal from "components/shipment/DocumentUploadModal";
import ShipmentDetailAirDoor from "components/shipment/ShipmentDetailAirDoor";

//icons
import bigArrow from "assets/icons/bigarrow-right.svg";

//helpers
import { formatCurrency } from "helpers";
import moment from "moment";

const Details = ({ shipdata, booking, shipCategory }) => (
  <div className="grid grid-cols-1 gap-y-6 xl:gap-y-8 xl:grid-cols-3 xl:gap-x-8 mb-10 xl:mb-0">
    <div className="col-span-2 solid-br rounded">
      <div className="pt-6 pb-6 xl:pt-[17px] xl:pb-[9px] border-solid border-b-[#F3F4F6] border-b-[1px]">
        <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
          <p className="black-text-3 px-6 font-normal pb-4 xl:pb-0 xl:w-[45%]">
            {shipdata?.shipment_type?.charAt(0).toUpperCase() +
              shipdata?.shipment_type?.slice(1)}{" "}
            {shipdata?.shipment_transport_type === "air_freight"
              ? "Air Freight Details (Airport Delivery)"
              : shipdata?.shipment_transport_type === "ocean_freight"
              ? "(Ocean Freight Details)"
              : shipdata?.shipment_transport_type === "haulage"
              ? "(Haulage Details)"
              : ""}
          </p>
          {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          {shipCategory === "exportair_freight" && (
            <div className="flex justify-between items-center gap-x-6 pr-6 xl:w-[55%] pl-6 xl:pl-0">
              <div>
                <p className="text-sm font-light grey-text">Origin Airport</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.origin_port_code
                    ? shipdata.origin_port_code
                    : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Destination Port</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.destination_port_code
                    ? shipdata.destination_port_code
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
          {shipCategory === "importair_freight" && (
            <div className="flex justify-between items-center gap-x-6 pr-6 xl:w-[55%] pl-6 xl:pl-0">
              <div>
                <p className="text-sm font-light grey-text">Origin Airport</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.origin_port_code
                    ? shipdata.origin_port_code
                    : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Destination Port</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.destination_port_code
                    ? shipdata.destination_port_code
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 pb-10 px-6">
        <div className="mb-6">
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

        <div className="grid grid-cols-2 gap-y-6 gap-x-4 xl:gap-y-9 xl:grid-cols-4">
          <div>
            <p className="grey-text text-sm font-light pb-1.5">
              Airport Drop-off Date
            </p>
            <p className="black-text-3 text-sm whitespace-normal capitalize">
              {shipdata?.cargo_pickup_date
                ? moment(shipdata?.cargo_pickup_date).format("DD-MM-YYYY")
                : "N/A"}
            </p>
          </div>

          {/* <div>
            <p className="grey-text text-sm  pb-1.5 font-light border-solid">Preferred Airline</p>
            <p className="black-text-3 text-sm whitespace-normal capitalize">
              {shipdata.air_freight_data?.airline ? shipdata.air_freight_data?.airline : "N/A"}
            </p>
          </div> */}
          <div>
            <p className="grey-text text-sm font-light pb-1.5">No. of Cargo</p>
            <p className="black-text-3 text-sm whitespace-normal capitalize">
              {shipdata.air_cargo_details?.length
                ? shipdata.air_cargo_details?.length
                : "N/A"}
            </p>
          </div>

          <div>
            <p className="grey-text text-sm font-light pb-1.5">
              Hazardous Cargo
            </p>
            <p className="black-text-3 text-sm whitespace-normal capitalize">
              {shipdata?.is_product_hazardous === undefined
                ? "N/A"
                : shipdata?.is_product_hazardous === true
                ? "Yes"
                : "No"}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="solid-br rounded no-inner">
      <p className="black-text-3 p-6 pb-[18px] font-normal bottom-divider-2">
        {"Shipment Details"}
      </p>
      <div className="grid grid-cols-2 text-sm pt-6 pb-10 gap-x-4 px-6 gap-y-[26px]">
        <>
          <div>
            <p className="grey-text font-light pb-1.5">Weight (KG)</p>
            <p className="black-text-3">
              {shipdata.air_cargo_details[0]?.container_weight
                ? shipdata.air_cargo_details[0]?.container_weight
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="grey-text font-light pb-1.5">
              Width of Cargo (Inches)
            </p>
            <p className="black-text-3">
              {shipdata.air_cargo_details[0]?.container_width
                ? shipdata.air_cargo_details[0]?.container_width
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="grey-text font-light pb-1.5">
              Height of Cargo (Inches)
            </p>
            <p className="black-text-3">
              {shipdata.air_cargo_details[0]?.container_height
                ? shipdata.air_cargo_details[0]?.container_height
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="grey-text font-light pb-1.5">
              Length of Cargo (Inches)
            </p>
            <p className="black-text-3">
              {shipdata.air_cargo_details[0]?.container_length
                ? shipdata.air_cargo_details[0]?.container_length
                : "N/A"}
            </p>
          </div>

          {/* <div>
                            <p className="grey-text font-light pb-1.5">Height (FT)</p>
                            <p className="black-text-3">{shipdata.air_cargo_details[0]?.container_height ? shipdata.air_cargo_details[0]?.container_height : "N/A"}</p>
                        </div> */}
          <div>
            <p className="grey-text font-light pb-1.5">
              Commodity Description{" "}
            </p>
            <p className="black-text-3">
              {shipdata.goods_type ? shipdata.goods_type : "N/A"}
            </p>
          </div>

          <div>
            <p className="grey-text font-light pb-1.5">Additional Comments</p>
            <p className="black-text-3">
              {shipdata.additional_comments
                ? shipdata.additional_comments
                : "N/A"}
            </p>
          </div>
        </>
      </div>
    </div>
  </div>
);

const ShipmentDetailAir = (props: any) => {
  const params = useParams();
  const { id } = params;

  const { shipment_data, booking_summary, shipCategory } = props;

  //modal states
  const [isOpen, setIsOpen] = useState(false);

  //modals functions
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
      <>
        <ShipmentTitleUpload
          shipment_data={shipment_data}
          openModal={openModal}
        />
        {shipment_data?.air_freight_data?.air_freight_type ===
        "door to door" ? (
          <ShipmentDetailAirDoor
            shipdata={shipment_data}
            booking={booking_summary}
            shipCategory={shipCategory}
          />
        ) : (
          <Details
            shipdata={shipment_data}
            booking={booking_summary}
            shipCategory={shipCategory}
          />
        )}
        <DocumentUploadModal
          id={id}
          isOpen={isOpen}
          closeModal={closeModal}
          documents={shipment_data?.document_details}
        />
      </>
    </main>
  );
};

export default ShipmentDetailAir;
