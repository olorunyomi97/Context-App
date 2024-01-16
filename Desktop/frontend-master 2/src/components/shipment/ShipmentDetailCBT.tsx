import React, { useState } from "react";
import { useParams } from "react-router-dom";

//components

import ShipmentTitleUpload from "components/shipment/ShipmentTitleUpload";
import DocumentUploadModal from "components/shipment/DocumentUploadModal";

//icons
import bigArrow from "assets/icons/bigarrow-right.svg";

//helpers
import { formatCurrency } from "helpers";

//details section
//details
const Details = ({ shipdata, booking, shipCategory }) => (
  <div className="grid grid-cols-1 gap-y-6 xl:gap-y-0 xl:grid-cols-3 xl:gap-x-8">
    <div className="col-span-2 solid-br rounded">
      <div className="pt-6 pb-6 xl:pt-[17px] xl:pb-[9px] border-solid border-b-[#F3F4F6] border-b-[1px]">
        <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
          <p className="black-text-3 px-6 font-normal  xl:w-[45%]">
            {shipdata?.shipment_type?.charAt(0).toUpperCase() +
              shipdata?.shipment_type?.slice(1)}{" "}
            {shipdata?.shipment_transport_type === "customs_brokerage"
              ? "(Custom Brokerage Details)"
              : shipdata?.shipment_transport_type === "ocean_freight"
              ? "(Ocean Freight Details)"
              : shipdata?.shipment_transport_type === "haulage"
              ? "(Haulage Details)"
              : ""}
          </p>
          {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          {shipCategory === "exportcustoms_brokerage" && (
            <div className="flex justify-between items-center gap-x-6 px-6">
              <div>
                <p className="text-sm font-light grey-text">Origin Port</p>
                <p className="text-sm black-text-3 font-medium capitalize">
                  {shipdata.origin_port_code
                    ? shipdata.origin_port_code
                    : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">
                  Destination Country
                </p>
                <p className="text-sm black-text-3 font-medium capitalize">
                  {shipdata.delivery_location
                    ? shipdata.delivery_location
                    : "N/A"}
                </p>
              </div>
            </div>
          )}
          {shipCategory === "importcustoms_brokerage" && (
            <div className="flex justify-between items-center gap-x-6 pl-6 xl:pl-0 pr-6 xl:w-[55%]">
              <div>
                <p className="text-sm font-light grey-text">
                  Country of Origin
                </p>
                <p className="text-sm black-text-3 font-medium capitalize">
                  {shipdata.pickup_location ? shipdata.pickup_location : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Destination Port</p>
                <p className="text-sm black-text-3 font-medium capitalize">
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
        <div className="mb-6 border-solid border-b-[1px] border-[#F3F4F6] pb-6 xl:border-none xl:pb-0">
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

        {shipCategory === "exportcustoms_brokerage" ? (
          <div className="grid grid-cols-2 gap-y-6 gap-x-5 xl:grid-cols-4 xl:gap-x-[50px] xl:gap-y-8">
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Mode of Transportation
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.mode_of_transport
                  ? shipdata?.customs_brokerage_data?.mode_of_transport
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Goods Type</p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.goods_type ? shipdata?.goods_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Consignee Name
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.consignee_name
                  ? shipdata?.customs_brokerage_data?.consignee_name
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Consignee Address
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.consignee_address
                  ? shipdata?.customs_brokerage_data?.consignee_address
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                NEPC Number
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.nepc_number
                  ? shipdata?.customs_brokerage_data?.nepc_number
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">B/L Number</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.bl_number ? shipdata?.bl_number : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Terminal Handling
              </p>
              {shipdata?.with_tracker === undefined ? (
                "N/A"
              ) : shipdata?.with_tracker ? (
                <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                  Included
                </p>
              ) : (
                <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">
                  Not Included
                </p>
              )}
            </div>

            <div>
              <p className="grey-text text-sm pb-1.5 font-light">
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
        ) : (
          <div className="grid grid-cols-2 gap-y-6 gap-x-5 xl:grid-cols-4 xl:gap-x-[50px] xl:gap-y-8">
            <div>
              <p className="grey-text text-sm pb-1.5 font-light">
                Mode of Transportation
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.mode_of_transport
                  ? shipdata?.customs_brokerage_data?.mode_of_transport
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm font-light pb-1.5">CBT</p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.customs_brokerage === undefined
                  ? "N/A"
                  : shipdata?.customs_brokerage === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm pb-1.5 font-light">CB Type</p>
              <p className="black-text-3 text-sm whitespace-normal">
                {shipdata?.customs_brokerage_data?.brokerage_type
                  ? shipdata?.customs_brokerage_data?.brokerage_type
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm pb-1.5 font-light">
                Commodity Type
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.goods_type ? shipdata?.goods_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">B/L Number</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.bl_number ? shipdata?.bl_number : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Manufacturer/Supplier Name
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.sender_name
                  ? shipdata?.customs_brokerage_data?.sender_name
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Manufacturer/Supplier Address
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.customs_brokerage_data?.sender_address
                  ? shipdata?.customs_brokerage_data?.sender_address
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm pb-1.5 font-light">
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
        )}
      </div>
    </div>

    {/* <div className="solid-br rounded no-inner">
            <p className="black-text-3 p-6 pb-[18px] font-normal bottom-divider-2">Additional Information</p>
            <div className="grid grid-cols-2 text-sm pt-6 pb-10 px-6 gap-y-[26px]">
                {shipCategory === "exporthaulage" ?
                    <>
                        <div>
                            <p className="grey-text font-light pb-1.5">Office/Branch</p>
                            <p className="black-text-3">
                                {shipdata?.branch ? shipdata?.branch === "LOS" ? "Lagos" :
                                    shipdata?.branch === "PHC" ? "Port Hacourt" :
                                        shipdata?.branch === "KAN" ? "Kano" : "N/A" : "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="grey-text font-light pb-1.5">Tracking</p>
                            <p className="black-text-3 whitespace-normal">
                                {shipdata?.with_tracker ?
                                    <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">Included</p>
                                    :
                                    <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">Not Included</p>
                                }
                            </p>
                        </div>

                    </> :
                    <>
                        <div>
                            <p className="grey-text font-light pb-1.5">TDO Written Date</p>
                            <p className="black-text-3">
                                {shipdata?.stuffing_date ? moment(shipdata?.stuffing_date).format("DD-MM-YYYY") : "N/A"}
                            </p>
                        </div>

                        <div>
                            <p className="grey-text font-light pb-1.5">TDO Expiration Date</p>
                            <p className="black-text-3 whitespace-normal">{shipdata?.stuffing_date ? moment(shipdata?.stuffing_date).format("DD-MM-YYYY") : "N/A"}</p>
                        </div>

                        <div>
                            <p className="grey-text font-light pb-1.5">CBT</p>
                            <p className="black-text-3">{shipdata.origin_port_code ? shipdata.origin_port_code : "N/A"}</p>
                        </div>
                    </>}
            </div>
        </div> */}
  </div>
);

const ShipmentDetailCBT = (props: any) => {
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

  console.log("KIll>>>", shipment_data);

  return (
    <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
      <>
        <ShipmentTitleUpload
          shipment_data={shipment_data}
          openModal={openModal}
        />
        <DocumentUploadModal
          id={id}
          isOpen={isOpen}
          closeModal={closeModal}
          documents={shipment_data?.document_details}
        />
        <Details
          shipdata={shipment_data}
          booking={booking_summary}
          shipCategory={shipCategory}
        />
      </>
    </main>
  );
};

export default ShipmentDetailCBT;
