import React, { useState } from "react";
import { useParams } from "react-router-dom";

//libraries
import moment from "moment";

//components
import ShipmentTitleUpload from "components/shipment/ShipmentTitleUpload";
import DocumentUploadModal from "components/shipment/DocumentUploadModal";
import ShipmentDetailsTable from "components/shipment/ShipmentDetailsTable";

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
          <p className="black-text-3 px-6 font-normal pb-4 xl:pb-0 xl:w-[45%]">
            {shipdata?.shipment_type?.charAt(0).toUpperCase() +
              shipdata?.shipment_type?.slice(1)}{" "}
            {shipdata?.shipment_transport_type === "air_freight"
              ? "(Air Freight Details)"
              : shipdata?.shipment_transport_type === "ocean_freight"
              ? "(Ocean Freight Details)"
              : shipdata?.shipment_transport_type === "haulage"
              ? "(Haulage Details)"
              : ""}
          </p>
          {/* <div className="h-[1px] w-full bg-[#F3F4F6] pr-[-6px]" /> */}
          {shipCategory === "exporthaulage" && (
            <div className="flex justify-between items-center gap-x-6 px-6 xl:w-[55%]">
              <div>
                <p className="text-sm font-light grey-text">
                  Stuffing Location
                </p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.stuffing_location
                    ? shipdata.stuffing_location
                    : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">Destination Port</p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.terminal_port ? shipdata.terminal_port : "N/A"}
                </p>
              </div>
            </div>
          )}
          {shipCategory === "importhaulage" && (
            <div className="flex justify-between items-center gap-x-6 pr-6 xl:w-[55%] pl-6 xl:pl-0">
              <div>
                <p className="text-sm font-light grey-text">
                  Port of Discharge
                </p>
                <p className="text-sm black-text-3 font-medium">
                  {shipdata.pickup_location ? shipdata.pickup_location : "N/A"}
                </p>
              </div>
              <div>
                <img src={bigArrow} alt="" />
              </div>
              <div>
                <p className="text-sm font-light grey-text">
                  Delivery Location
                </p>
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

        {shipCategory === "exporthaulage" ? (
          <div className="grid grid-cols-2 gap-y-6 xl:gap-y-0 xl:grid-cols-4">
            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Carrier</p>
              <p className="black-text-3 text-sm whitespace-normal">
                {booking?.ocean_freight?.rates_data?.carrier_name ? booking?.ocean_freight?.rates_data?.carrier_name : "N/A"}
              </p>
            </div> */}

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Origin Port
              </p>
              <p className="black-text-3 text-sm">
                {shipdata.origin_port_code ? shipdata.origin_port_code : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">
                Stuffing Date
              </p>
              <p className="black-text-3 text-sm">
                {shipdata.stuffing_date
                  ? moment(shipdata.stuffing_date).format("DD-MM-YYYY")
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
                Commodity Desc.
              </p>
              <p className="black-text-3 text-sm capitalize">
                {shipdata?.goods_type ? shipdata?.goods_type : "N/A"}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-y-6 xl:gap-y-0 xl:grid-cols-4">
            {/* <div>
              <p className="grey-text text-sm  pb-1.5 font-light">Carrier</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {"N/A"}
              </p>
            </div> */}
            <div className="">
              <p className="grey-text text-sm  pb-1.5 font-light">
                Commodity Descr.
              </p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata.goods_type ? shipdata.goods_type : "N/A"}
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
              <p className="grey-text text-sm  pb-1.5 font-light">TBL</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.with_tbl === undefined
                  ? "N/A"
                  : shipdata?.with_tbl === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>

            <div>
              <p className="grey-text text-sm  pb-1.5 font-light">TBL Type</p>
              <p className="black-text-3 text-sm whitespace-normal capitalize">
                {shipdata?.tbl_type ? shipdata?.tbl_type : "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="solid-br rounded no-inner">
      <p className="black-text-3 p-6 pb-[18px] font-normal bottom-divider-2">
        Additional Information
      </p>
      <div className="grid grid-cols-2 text-sm pt-6 pb-10 px-6 gap-y-[26px]">
        {shipCategory === "exporthaulage" ? (
          <>
            <div>
              <p className="grey-text font-light pb-1.5">Office/Branch</p>
              <p className="black-text-3">
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
            <div>
              <p className="grey-text font-light pb-1.5">Tracking</p>
              <p className="black-text-3 whitespace-normal">
                {shipdata?.with_tracker === undefined ? (
                  "N/A"
                ) : shipdata?.with_tracker === true ? (
                  <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                    Included
                  </p>
                ) : (
                  <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">
                    Not Included
                  </p>
                )}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Haulage Escort</p>
              <p className="black-text-3 capitalize">
                {shipdata?.with_escort === undefined
                  ? "N/A"
                  : shipdata?.with_escort === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Additional Comments</p>
              <p className="black-text-3 capitalize">
                {shipdata?.additional_comments
                  ? shipdata?.additional_comments
                  : "N/A"}
              </p>
            </div>
          </>
        ) : (
          <>
            <div>
              <p className="grey-text font-light pb-1.5">TDO Written Date</p>
              <p className="black-text-3">
                {shipdata?.tdo_written_date
                  ? moment(shipdata?.tdo_written_date).format("DD-MM-YYYY")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">TDO Expiration Date</p>
              <p className="black-text-3 whitespace-normal">
                {shipdata?.tdo_expiry
                  ? moment(shipdata?.tdo_expiry).format("DD-MM-YYYY")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">CBT</p>
              <p className="black-text-3 capitalize">
                {shipdata?.customs_brokerage === undefined
                  ? "N/A"
                  : shipdata?.customs_brokerage === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Brokerage Type</p>
              <p className="black-text-3 capitalize">
                {shipdata?.brokerage_type ? shipdata?.brokerage_type : "N/A"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Haulage Escort</p>
              <p className="black-text-3 capitalize">
                {shipdata?.with_escort === undefined
                  ? "N/A"
                  : shipdata?.with_escort === true
                  ? "Yes"
                  : "No"}
              </p>
            </div>
            <div>
              <p className="grey-text font-light pb-1.5">Haulage Tracker</p>
              <p className="black-text-3 whitespace-normal">
                {shipdata?.with_tracker === undefined ? (
                  "N/A"
                ) : shipdata?.with_tracker === true ? (
                  <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                    Included
                  </p>
                ) : (
                  <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">
                    Not Included
                  </p>
                )}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
);

const ShipmentDetailHaulage = (props: any) => {
  const params = useParams();
  const { id } = params;

  const { shipment_data, booking_summary, shipCategory } = props;

  //table state
  const [tab, setTab] = useState("con-details");

  //modal states
  const [isOpen, setIsOpen] = useState(false);

  //modals functions
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // console.log("shipbyID🔱", shipment_data)
  // console.log("bookingbyID🔱", booking_summary);
  // console.log("shipcat>>>", shipCategory)

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
        <ShipmentDetailsTable
          tab={tab}
          setTab={setTab}
          shipment_data={shipment_data}
        />
      </>
    </main>
  );
};

export default ShipmentDetailHaulage;
