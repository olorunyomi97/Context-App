import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//libraries
import moment from "moment";

//icons
// import arrowL from "assets/icons/arrow-left2.svg";
// import divider from "assets/icons/divider.svg";
import bigArrow from "assets/icons/bigarrow-right.svg";

//components
import CBTNotification from "components/rate/exportOcean/CBTNotification";
import DocumentUploadModal from "components/shipment/DocumentUploadModal";
import ShipmentTitleUpload from "components/shipment/ShipmentTitleUpload";
import ShipmentDetailsTable from "components/shipment/ShipmentDetailsTable";

//helpers
import { formatCurrency } from "helpers";
import Carousel, { CarouselItem } from "helpers/carousel/Carousel";

//additional services
const AdditionalService = ({ shipdata, booking }) => (
  <div className="solid-br rounded w-auto xl:w-[350px] xl:ml-8 mt-6 xl:mt-0">
    <p className="black-text-3 p-6 pb-[18px] font-light bottom-divider-2">
      Additional Services
    </p>
    <div className="grid grid-cols-2 text-sm pt-6 pb-10 pl-6 gap-y-[26px]">
      <div className="flex items-center">
        <div>
          <p className="grey-text font-light pb-1.5">Insurance Provider</p>
          <p className="black-text-3">
            {booking?.marine_insurance?.insurance_details?.data?.insurer?.name
              ? booking?.marine_insurance?.insurance_details?.data?.insurer
                  ?.name
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="grey-text font-light pb-1.5">Insurance Type</p>
          <p className="black-text-3">
            {booking?.marine_insurance?.insurance_details?.data?.clause_type
              ? booking?.marine_insurance?.insurance_details?.data?.clause_type
              : "N/A"}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="grey-text font-light pb-1.5">Warehousing</p>
          {shipdata?.warehousing ? (
            <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
              Included
            </p>
          ) : (
            <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">
              Not Included
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center">
        <div>
          <p className="grey-text font-light pb-1.5">Tracking</p>
          {shipdata?.with_tracker ? (
            <p className="text-xs text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
              Included
            </p>
          ) : (
            <p className="text-xs text-[#C27500] py-1 px-2 rounded-md bg-[#ffe75d33] w-fit">
              Not Included
            </p>
          )}
        </div>
      </div>
    </div>
  </div>
);

//details
const Details = ({ shipdata, booking, shipCategory }) => (
  <div className="grid grid-cols-1 gap-y-6 xl:gap-y-0 xl:grid-cols-3 xl:gap-x-8">
    <div className="col-span-2 solid-br rounded">
      <div className="pt-6 pb-6 xl:pt-[17px] xl:pb-[9px] border-solid border-b-[#F3F4F6] border-b-[1px]">
        <div className="flex flex-col gap-y-4 xl:gap-x-0 xl:flex-row xl:justify-between xl:items-center">
          <p className="black-text-3 px-6 font-normal xl:pb-0 xl:w-[45%]">
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
          {shipCategory === "exportocean_freight" && (
            <div className="flex justify-between items-center gap-x-6 px-6">
              <div>
                <p className="text-sm font-light grey-text">Origin Port</p>
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
          {shipCategory === "importocean_freight" && (
            <div className="flex justify-between items-center gap-x-6 pr-6 xl:w-[55%] pl-6 xl:pl-0">
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

        <div className="grid grid-cols-2 gap-y-6 gap-x-5 xl:gap-y-0 xl:grid-cols-4">
          {shipCategory === "exportocean_freight" ? (
            <>
              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">Carrier</p>
                <p className="black-text-3 text-sm whitespace-normal">
                  {booking?.ocean_freight?.rates_data?.carrier_name
                    ? booking?.ocean_freight?.rates_data?.carrier_name
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Transit Time
                </p>
                <p className="black-text-3 text-sm">
                  {booking?.ocean_freight?.rates_data?.route_schedule[0]
                    ?.transitTime
                    ? booking?.ocean_freight?.rates_data?.route_schedule[0]
                        ?.transitTime
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Cargo Pickup Date
                </p>
                <p className="black-text-3 text-sm">
                  {shipdata?.cargo_pickup_date
                    ? moment(shipdata?.cargo_pickup_date).format("DD-MM-YYYY")
                    : "N/A"}
                </p>
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Est. Shipment Date
                </p>
                <p className="black-text-3 text-sm">
                  {shipdata?.createdAt
                    ? moment(shipdata?.createdAt).format("DD-MM-YYYY")
                    : "N/A"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Goods Type
                </p>
                <p className="black-text-3 text-sm whitespace-normal capitalize">
                  {shipdata.goods_type ? shipdata.goods_type : "N/A"}
                </p>
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Custom Brokerage
                </p>
                {shipdata.with_tbl ? (
                  <p className="text-sm text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                    Included
                  </p>
                ) : (
                  <p className="text-sm text-[#C27500] py-1 px-2 rounded-md bg-[#FFFADF] w-fit">
                    Not Included
                  </p>
                )}
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">
                  Warehousing{" "}
                </p>
                {shipdata.warehousing ? (
                  <p className="text-sm text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                    Included
                  </p>
                ) : (
                  <p className="text-sm text-[#C27500] py-1 px-2 rounded-md bg-[#FFFADF] w-fit">
                    Not Included
                  </p>
                )}
              </div>

              <div>
                <p className="grey-text text-sm  pb-1.5 font-light">Tracking</p>
                {shipdata.with_tracker ? (
                  <p className="text-sm text-[#059C01] py-1 px-2 rounded-md bg-[#99ff7d1a] w-fit">
                    Included
                  </p>
                ) : (
                  <p className="text-sm text-[#C27500] py-1 px-2 rounded-md bg-[#FFFADF] w-fit">
                    Not Included
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    <div className="solid-br rounded no-inner">
      <p className="black-text-3 p-6 pb-[18px] bottom-divider-2">
        Haulage Details
      </p>
      <div className="grid grid-cols-2 text-sm pt-6 pb-10 px-6 gap-y-[26px] gap-x-4">
        <div>
          <p className="grey-text font-light pb-1.5">Hazardous Cargo?</p>
          <p className="black-text-3">
            {shipdata?.is_product_hazardous === undefined
              ? "N/A"
              : shipdata?.is_product_hazardous === true
              ? "Yes"
              : "No"}
          </p>
        </div>
        <div>
          <p className="grey-text font-light pb-1.5">Pickup Required</p>
          <p className="black-text-3 whitespace-normal">
            {shipdata?.with_haulage === undefined
              ? "N/A"
              : shipdata?.with_haulage === true
              ? "Yes"
              : "No"}
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
          <p className="grey-text text-sm  pb-1.5 font-light">
            Additional Comments
          </p>
          <p className="black-text-3 text-sm whitespace-normal capitalize">
            {shipdata.additional_comments
              ? shipdata.additional_comments
              : "N/A"}
          </p>
        </div>

        {/* <div>
          <p className="grey-text font-light pb-1.5">Destination Port</p>
          <p className="black-text-3">
            {shipdata.origin_port_code ? shipdata.origin_port_code : "N/A"}
          </p>
        </div> */}
      </div>
    </div>
  </div>
);

const ImportOceanDetails = ({
  id,
  isOpen,
  tab,
  setTab,
  shipment_data,
  openModal,
  closeModal,
  loading,
  getting_shipments,
  booking_summary,
  shipCategory,
}) => (
  <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
    <>
      <ShipmentTitleUpload
        shipment_data={shipment_data}
        openModal={openModal}
      />
      <Details
        shipdata={shipment_data}
        booking={booking_summary}
        shipCategory={shipCategory}
      />
      <DocumentUploadModal
        id={id}
        isOpen={isOpen}
        closeModal={closeModal}
        documents={shipment_data?.document_details}
      />
      <ShipmentDetailsTable
        tab={tab}
        setTab={setTab}
        shipment_data={shipment_data}
      />
    </>
  </main>
);

const ShipmentsDetails = (props: any) => {
  const params = useParams();
  const { id } = params;

  //modal states
  const [isOpen, setIsOpen] = useState(false);

  const {
    loading,
    shipment_data,
    booking_summary,
    getting_shipments,
    shipCategory,
  } = props;

  //tab states
  const [tab, setTab] = useState("con-details");

  //modals functions
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (shipCategory === "importocean_freight") {
    return (
      <ImportOceanDetails
        id={id}
        isOpen={isOpen}
        closeModal={closeModal}
        shipment_data={shipment_data}
        openModal={openModal}
        loading={loading}
        shipCategory={shipCategory}
        getting_shipments={getting_shipments}
        booking_summary={booking_summary}
        tab={tab}
        setTab={setTab}
      />
    );
  }

  // console.log("shipbyID🔱", shipment_data)
  // console.log("conDetails🏔️", container_details)
  // console.log("bookSummary📔", booking_summary)

  return (
    <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
      <>
        <ShipmentTitleUpload
          shipment_data={shipment_data}
          openModal={openModal}
        />

        <CBTNotification
          width="70%"
          haulage={false}
          text="Please note this shipment includes CBT"
        />
        <div className="pb-4" />
        {/* desktop  */}
        <div className="hidden xl:block">
          <Carousel>
            <CarouselItem width={{}}>
              <Details
                shipdata={shipment_data}
                booking={booking_summary}
                shipCategory={shipCategory}
              />
            </CarouselItem>
            <CarouselItem width={{}}>
              <AdditionalService
                shipdata={shipment_data}
                booking={booking_summary}
              />
            </CarouselItem>
          </Carousel>
        </div>

        {/* mobile */}
        <div className="xl:hidden">
          <Details
            shipdata={shipment_data}
            booking={booking_summary}
            shipCategory={shipCategory}
          />
        </div>
        <div className="xl:hidden">
          <AdditionalService
            shipdata={shipment_data}
            booking={booking_summary}
          />
        </div>

        <ShipmentDetailsTable
          tab={tab}
          setTab={setTab}
          shipment_data={shipment_data}
        />

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

export default ShipmentsDetails;

// {/* <div className="mt-6 solid-br rounded mb-9">
// <div className="flex items-center gap-x-4 pt-4 px-6 pb-[17px]">
//     <p
//         className={`${tab === "con-details" ? "text-[#005C00] font-normal" : "grey-text-1 font-light"} text-sm cursor-pointer`}
//         onClick={() => setTab("con-details")}
//     >
//         Container Details
//     </p>
//     <p><img src={divider} alt="" /></p>
//     <p
//         className={`${tab === "con-tracking" ? "text-[#005C00] font-normal" : "grey-text-1 font-light"} text-sm cursor-pointer`}
//         onClick={() => setTab("con-tracking")}
//     >
//         Container Tracking
//     </p>
// </div>
// <>
//     {tab === "con-details" ?
//         <>
//             <div className="hidden xl:block">
//                 {shipment_data?.container_details?.length > 0 ?
//                     <table className="booking-details shipment-details">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Cont. Number</th>
//                                 <th>Seal Number</th>
//                                 <th>Cont. Size (FT)</th>
//                                 <th>BL Number</th>
//                                 <th>Stuffing Date</th>
//                                 <th>Status</th>
//                                 <th>Remarks</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {shipment_data?.container_details?.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td className="uppercase">{item.container_number ? item.container_number : "N/A"}</td>
//                                     <td className="uppercase">{item.shipping_line_seal_number ? item.shipping_line_seal_number : "N/A"}</td>
//                                     <td>{item.container_size ? item.container_size?.slice(0, 2) : "N/A"}</td>
//                                     <td>{shipment_data.bl_number ? shipment_data.bl_number : "N/A"}</td>
//                                     <td>{item.date_stuffed ? item.date_stuffed : "N/A"}</td>
//                                     <td>
//                                         {
//                                             item.container_status ? item.container_status === "NEW" ? <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">New</p> :
//                                                 item.container_status === "In Transit" ? <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">In Transit</p> :
//                                                     item.container_status === "File Closed" ? <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">File Closed</p> :
//                                                         item.container_status === "File Opening" ? <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">File Opening</p> :
//                                                             <p className="text-xs py-1 px-2 font-normal w-fit">{item.container_status}</p> : "N/A"
//                                         }
//                                     </td>
//                                     <td>N/A</td>
//                                 </tr>
//                             ))}

//                             {/* <tr>
//                             <td>2</td>
//                             <td>COB3442217</td>
//                             <td>11094</td>
//                             <td>40</td>
//                             <td>N/A</td>
//                             <td>22-11-2022</td>
//                             <td><p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">New</p> </td>
//                             <td>Container has left the warehouse</td>
//                         </tr> */}

//                         </tbody>
//                     </table> :
//                     <>
//                         <table className="booking-details shipment-details">
//                             <tr>
//                                 <th>#</th>
//                                 <th>Cont. Number</th>
//                                 <th>Seal Number</th>
//                                 <th>Cont. Size (FT)</th>
//                                 <th>BL Number</th>
//                                 <th>Stuffing Date</th>
//                                 <th>Status</th>
//                                 <th>Remarks</th>
//                             </tr>
//                         </table>
//                         <div className="flex flex-col justify-center items-center gap-y-2 mt-10 mb-11">
//                             <p className="grey-text text-xl">No Container(s)</p>
//                             <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">Kindly be patient as our sales representative uploads your container details</p>
//                         </div>
//                     </>
//                 }
//             </div>

//             <div className="xl:hidden">
//                 {shipment_data?.container_details?.length > 0 ?
//                     shipment_data?.container_details?.map((item, idx) => (
//                         <div>
//                             <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load {idx + 1}</p>
//                             <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Cont. Number</p>
//                                     <p className="black-text text-sm uppercase">{item.container_number ? item.container_number : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Seal Number</p>
//                                     <p className="black-text text-sm">{item.shipping_line_seal_number ? item.shipping_line_seal_number : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
//                                     <p className="black-text text-sm">{item.container_size ? item.container_size?.slice(0, 2) : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
//                                     <p className="black-text text-sm">{shipment_data.bl_number ? shipment_data.bl_number : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
//                                     <p className="black-text text-sm">
//                                         {
//                                             item.container_status ? item.container_status === "NEW" ? <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">New</p> :
//                                                 item.container_status === "In Transit" ? <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">In Transit</p> :
//                                                     item.container_status === "File Closed" ? <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">File Closed</p> :
//                                                         item.container_status === "File Opening" ? <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">File Opening</p> :
//                                                             <p className="text-xs py-1 px-2 font-normal w-fit">{item.container_status}</p> : "N/A"
//                                         }
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Stuffing Date</p>
//                                     <p className="black-text text-sm">{item.date_stuffed ? item.date_stuffed : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Remarks</p>
//                                     <p className="black-text text-sm">N/A</p>
//                                 </div>

//                             </div>
//                         </div>
//                     )) :
//                     <>
//                         <div className="bg-grey px-6 py-[18px] ">
//                             <p className="text-sm text-[#004900] font-medium">Load 1</p>
//                         </div>
//                         <div className="flex flex-col justify-center items-center gap-y-2 mt-8 my-6">
//                             <p className="grey-text text-xl">No Container(s)</p>
//                             <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">Kindly be patient as our sales representative uploads your container details</p>
//                         </div>
//                     </>
//                 }
//                 {/* <div>
//             <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load 2</p>
//             <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Cont. Number</p>
//                     <p className="black-text text-sm">COB3442217</p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Seal Number</p>
//                     <p className="black-text text-sm">11094</p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
//                     <p className="black-text text-sm">40</p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
//                     <p className="black-text text-sm">302465193</p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
//                     <p className="black-text text-sm">In Transit </p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Stuffing Date</p>
//                     <p className="black-text text-sm">22-11-2022</p>
//                 </div>

//                 <div>
//                     <p className="grey-text text-sm  pb-1.5 font-light">Remarks</p>
//                     <p className="black-text text-sm">Stuffing Completed</p>
//                 </div>
//             </div>
//         </div> */}
//             </div>
//         </>
//         :
//         <>
//             <div className="hidden xl:block">
//                 {shipment_data?.container_details?.length > 0 ?
//                     <table className="booking-details shipment-details">
//                         <thead>
//                             <tr>
//                                 <th>#</th>
//                                 <th>Job Number</th>
//                                 <th>Cont. Size (FT)</th>
//                                 <th>BL Number</th>
//                                 <th>Container Status</th>
//                                 <th>Status Update Date</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {shipment_data?.container_details?.map((item, idx) => (
//                                 <tr key={idx}>
//                                     <td>{idx + 1}</td>
//                                     <td>{shipment_data.job_number ? shipment_data.job_number : "N/A"}</td>
//                                     <td>{item.container_size ? item.container_size?.slice(0, 2) : "N/A"}</td>
//                                     <td>{shipment_data.bl_number ? shipment_data.bl_number : "N/A"}</td>
//                                     <td>
//                                         {
//                                             item.container_status ? item.container_status === "NEW" ? <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">New</p> :
//                                                 item.container_status === "In Transit" ? <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">In Transit</p> :
//                                                     item.container_status === "File Closed" ? <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">File Closed</p> :
//                                                         item.container_status === "File Opening" ? <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">File Opening</p> :
//                                                             <p className="text-xs py-1 px-2 font-normal w-fit">{item.container_status}</p> : "N/A"
//                                         }
//                                     </td>
//                                     <td>{item.updatedAt ? item?.updatedAt?.slice(0, 10) : "N/A"}</td>
//                                 </tr>
//                             ))}
//                             {/* <tr>
//                             <td>2</td>
//                             <td>Dummy Text</td>
//                             <td>20</td>
//                             <td>1000</td>
//                             <td><p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">New</p></td>
//                             <td>22-11-2022</td>
//                         </tr> */}

//                         </tbody>
//                     </table> :
//                     <>
//                         <table className="booking-details shipment-details">
//                             <tr>
//                                 <th>#</th>
//                                 <th>Job Number</th>
//                                 <th>Cont. Size (FT)</th>
//                                 <th>BL Number</th>
//                                 <th>Container Status</th>
//                                 <th>Status Update Date</th>
//                             </tr>
//                         </table>
//                         <div className="flex flex-col justify-center items-center gap-y-2 mt-10 mb-11">
//                             <p className="grey-text text-xl">No Container(s)</p>
//                             <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">Kindly be patient as our sales representative uploads your container details</p>
//                         </div>
//                     </>
//                 }
//             </div>
//             <div className="xl:hidden">
//                 {shipment_data?.container_details?.length > 0 ?
//                     shipment_data?.container_details?.map((item, idx) => (
//                         <div>
//                             <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load {idx + 1}</p>
//                             <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Job Number</p>
//                                     <p className="black-text text-sm">{shipment_data.job_number ? shipment_data.job_number : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
//                                     <p className="black-text text-sm">{item.container_size ? item.container_size?.slice(0, 2) : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
//                                     <p className="black-text text-sm">{shipment_data.bl_number ? shipment_data.bl_number : "N/A"}</p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
//                                     <p className="black-text text-sm">
//                                         {
//                                             item.container_status ? item.container_status === "NEW" ? <p className="text-xs text-[#059C01] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">New</p> :
//                                                 item.container_status === "In Transit" ? <p className="text-xs text-[#0047A9] py-1 px-2 rounded-full bg-[#d0f5ff4d] font-normal w-fit">In Transit</p> :
//                                                     item.container_status === "File Closed" ? <p className="text-xs text-[#7B3A00] py-1 px-2 rounded-full bg-[#ffe75d1a] font-normal w-fit">File Closed</p> :
//                                                         item.container_status === "File Opening" ? <p className="text-xs text-[#005D00] py-1 px-2 rounded-full bg-[#99ff7d1a] font-normal w-fit">File Opening</p> :
//                                                             <p className="text-xs py-1 px-2 font-normal w-fit">{item.container_status}</p> : "N/A"
//                                         }
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <p className="grey-text text-sm  pb-1.5 font-light">Status Update Date</p>
//                                     <p className="black-text text-sm">{item.updatedAt ? item?.updatedAt?.slice(0, 10) : "N/A"}</p>
//                                 </div>

//                             </div>
//                         </div>
//                     )) :
//                     <>
//                         <div className="bg-grey px-6 py-[18px] ">
//                             <p className="text-sm text-[#004900] font-medium">Load 1</p>
//                         </div>
//                         <div className="flex flex-col justify-center items-center gap-y-2 mt-8 my-6">
//                             <p className="grey-text text-xl">No Container(s)</p>
//                             <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">Kindly be patient as our sales representative uploads your container details</p>
//                         </div>
//                     </>
//                 }

//                 {/* <div>
//                     <p className="px-6 py-[17px] text-sm grey-text bg-[#F9FAFB]">Load 2*</p>
//                     <div className="px-6 py-5 grid grid-cols-2 gap-y-6">
//                         <div>
//                             <p className="grey-text text-sm  pb-1.5 font-light">Cont. Number</p>
//                             <p className="black-text text-sm">Dummy Text</p>
//                         </div>

//                         <div>
//                             <p className="grey-text text-sm  pb-1.5 font-light">Seal Number</p>
//                             <p className="black-text text-sm">11094</p>
//                         </div>

//                         <div>
//                             <p className="grey-text text-sm  pb-1.5 font-light">Cont. Size (FT)</p>
//                             <p className="black-text text-sm">40</p>
//                         </div>

//                         <div>
//                             <p className="grey-text text-sm  pb-1.5 font-light">BL Number</p>
//                             <p className="black-text text-sm">302465193</p>
//                         </div>

//                         <div>
//                             <p className="grey-text text-sm  pb-1.5 font-light">Container Status</p>
//                             <p className="black-text text-sm">In Transit </p>
//                         </div>

//                     </div>
//                 </div> */}
//             </div>

//         </>
//     }
// </>
// <div className="py-7 hidden xl:block" />
// </div> */}
