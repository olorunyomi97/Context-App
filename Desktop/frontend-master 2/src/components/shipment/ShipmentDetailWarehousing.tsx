import React, { useState } from "react";
import { useParams } from "react-router-dom";

import ShipmentTitleUpload from "components/shipment/ShipmentTitleUpload";
import DocumentUploadModal from "components/shipment/DocumentUploadModal";

//icons
import bigArrow from "assets/icons/bigarrow-right.svg";

const Details = ({ shipdata, booking, shipCategory }) => (
  <div className="grid grid-cols-1 gap-y-6 xl:gap-y-0 xl:grid-cols-3 xl:gap-x-8 mb-10 xl:mb-0">
    <div className="col-span-2 solid-br rounded">
      <div className="pt-6 pb-6 xl:pt-[17px] xl:pb-[9px] border-solid border-b-[#F3F4F6] border-b-[1px]">
        <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
          <p className="black-text-3 px-6 font-normal xl:w-[45%]">
            {shipdata?.shipment_type?.charAt(0).toUpperCase() +
              shipdata?.shipment_type?.slice(1)}{" "}
            {shipdata?.shipment_transport_type === "warehousing"
              ? "(Warehousing Details)"
              : shipdata?.shipment_transport_type === "ocean_freight"
              ? "(Ocean Freight Details)"
              : shipdata?.shipment_transport_type === "haulage"
              ? "(Haulage Details)"
              : ""}
          </p>
          {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          {shipCategory === "exportwarehousing" && (
            <div className="flex justify-between items-center gap-x-6 px-6 xl:[w-55%]">
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
                <p className="text-sm font-light grey-text">Port of Loading</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.port_of_loading ? shipdata.port_of_loading : "N/A"}
                </p>
              </div>
            </div>
          )}
          {shipCategory === "importwarehousing" && (
            <div className="xl:flex xl:justify-end pl-6 xl:pl-0 xl:pr-6 w-[55%]">
              <div>
                <p className="text-sm font-light grey-text">
                  Port of Discharge
                </p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.port_of_discharge
                    ? shipdata.port_of_discharge
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
            shipCategory === "importwarehousing"
              ? "border-solid border-b-[1px] border-[#F3F4F6] pb-6"
              : "border-solid border-b-[1px] border-[#F3F4F6] pb-6 xl:border-none xl:pb-0"
          }`}
        >
          <p className="text-sm grey-text font-light">Warehousing Duration</p>
          <p className="text-xl black-text-3">
            {shipdata?.warehousing_data?.warehousing_duration
              ? shipdata?.warehousing_data?.warehousing_duration
              : "N/A"}{" "}
            {shipdata?.warehousing_data?.warehousing_duration &&
            shipdata?.warehousing_data?.warehousing_duration === "1"
              ? "week"
              : "weeks"}
          </p>
        </div>

        {shipCategory === "exportwarehousing" ? (
          <div className="grid grid-cols-2 gap-y-6 gap-x-5 xl:gap-x-[50px] xl:gap-y-8 xl:grid-cols-4">
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Pickup Required
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.with_haulage === undefined
                  ? "N/A"
                  : shipdata?.with_haulage === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Shipment Type
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.shipment_type ? shipdata?.shipment_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Count
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details?.length
                  ? shipdata?.container_details?.length
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Type
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_type
                  ? shipdata?.container_details[0]?.container_type
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Size(FT)
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_size
                  ? shipdata?.container_details[0]?.container_size
                  : "N/A"}
              </p>
            </div>

            <div className="">
              <p className="grey-text text-sm  pb-1.5 font-light">
                Weight of Cargo(Tons)
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_weight
                  ? shipdata?.container_details[0]?.container_weight
                  : "N/A"}
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
              <p className="grey-text text-sm  pb-1.5 font-light border-solid">
                No. of Bags
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.warehousing_data?.total_cargo_bags
                  ? shipdata?.warehousing_data?.total_cargo_bags
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light border-solid">
                Is Cargo Bagged
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.warehousing_data?.cargo_bagged === undefined
                  ? "N/A"
                  : shipdata?.warehousing_data?.cargo_bagged === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light border-solid">
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

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Office/Branch
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.branch
                  ? shipdata?.branch === "LOS"
                    ? "Lagos"
                    : shipdata?.branch === "PHC"
                    ? "Port Hacourt"
                    : shipdata?.branch === "KAN"
                    ? "Kano"
                    : "N/A"
                  : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-6 gap-x-5 xl:gap-x-[50px] xl:gap-y-8 xl:grid-cols-4">
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Shipment Type
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.shipment_type ? shipdata?.shipment_type : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Type
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_type
                  ? shipdata?.container_details[0]?.container_type
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Count
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details?.length
                  ? shipdata?.container_details?.length
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Container Size(FT)
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_size
                  ? shipdata?.container_details[0]?.container_size
                  : "N/A"}
              </p>
            </div>

            <div className="">
              <p className="grey-text text-sm  pb-1.5 font-light">
                Est. Cargo Wt(Tons)
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.container_details[0]?.container_weight
                  ? shipdata?.container_details[0]?.container_weight
                  : "N/A"}
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
                Is Cargo Bagged
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.warehousing_data?.cargo_bagged === undefined
                  ? "N/A"
                  : shipdata?.warehousing_data?.cargo_bagged === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                No. of Bags
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.warehousing_data?.total_cargo_bags
                  ? shipdata?.warehousing_data?.total_cargo_bags
                  : "N/A"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
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

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Pickup Required
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.with_haulage === undefined
                  ? "N/A"
                  : shipdata?.with_haulage === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Additional Comments
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.additional_comments
                  ? shipdata?.additional_comments
                  : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

    {/* {shipCategory === "exportwarehousing" &&
            <div className="solid-br rounded no-inner">
                <p className="black-text-3 p-6 pb-[18px] font-normal bottom-divider-2">Additional Information</p>
                <div className="grid grid-cols-2 text-sm pt-6 pb-10 px-6 gap-y-[26px] gap-x-[20px]">

                    <>
                        <div className=''>
                            <p className="grey-text text-sm  pb-1.5 font-light">Weight of Cargo(Tons)</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">{shipdata?.container_details[0]?.container_weight ? shipdata?.container_details[0]?.container_weight : "N/A"}</p>
                        </div>
                        <div className=''>
                            <p className="grey-text text-sm  pb-1.5 font-light">Commodity Type</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">{shipdata.goods_type ? shipdata.goods_type : "N/A"}</p>
                        </div>
                        <div>
                            <p className="grey-text text-sm  pb-1.5 font-light border-solid">Is Cargo Bagged</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">{shipdata?.warehousing_data?.cargo_bagged === undefined ? "N/A" : shipdata?.warehousing_data?.cargo_bagged === true ? "Yes" : "No"}</p>
                        </div>
                        <div>
                            <p className="grey-text text-sm  pb-1.5 font-light border-solid">No. of Bags</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">{shipdata?.warehousing_data?.total_cargo_bags ? shipdata?.warehousing_data?.total_cargo_bags : "N/A"}</p>
                        </div>
                        <div>
                            <p className="grey-text text-sm  pb-1.5 font-light border-solid">Hazardous Cargo</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">{shipdata?.is_product_hazardous === undefined ? "N/A" : shipdata?.is_product_hazardous === true ? "Yes" : "No"}</p>
                        </div>
                        <div className=''>
                            <p className="grey-text text-sm  pb-1.5 font-light">Office/Branch</p>
                            <p className="black-text-3 text-sm whitespace-normal capitalize">
                                {shipdata?.branch ? shipdata?.branch === "LOS" ? "Lagos" :
                                    shipdata?.branch === "PHC" ? "Port Hacourt" :
                                        shipdata?.branch === "KAN" ? "Kano" : "N/A" : "N/A"}
                            </p>
                        </div>

                    </>
                </div>
            </div>} */}
  </div>
);

const ShipmentDetailWarehousing = (props: any) => {
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

export default ShipmentDetailWarehousing;
