import React from "react";
import moment from "moment";

// icons
import arrowL from "assets/icons/arrow-left2.svg";
import divider from "assets/icons/divider.svg";

// helpers
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "helpers";

//components
import ShipmentNotfication from "components/rate/ShipmentNotfication";
import DestinationBox from "components/booking/DestinationBox";
import CBTNotification from "components/rate/exportOcean/CBTNotification";

//helpers
import { getPortNameByCode } from "helpers";

const _Json = require("sea-ports");


const BookingCBT = (props: any) => {
  const navigate = useNavigate();
  const { shipment_data, booking_summary, bookCategory } = props;

  console.log("first>>", shipment_data)

  return (
    <>
      <div className="dashboard-content-scroll">
        <div className="mx-7 lg:mx-11 md:mx-7 mt-8">
          <div className="flex items-center gap-x-1 mb-2 cursor-pointer w-fit" onClick={() => navigate(-1)} >
            <div><img src={arrowL} alt=""></img></div>
            <p className="text-sm grey-text">Bookings</p>
          </div>
          <p className="text-2xl mb-6">Booking</p>
          <div className="w-full h-[1px] bg-[#F3F4F6] mb-4" />

          {/* {shipment_data?.shipment_type === "export" &&
                                    (!shipment_data.origin_port_code || !shipment_data.delivery_location || !shipment_data.goods_value || !shipment_data.customs_brokerage_data.mode_of_transport ||
                                        !shipment_data.goods_type || !shipment_data.bl_number || !shipment_data.customs_brokerage_data.nepc_number || !shipment_data.customs_brokerage_data.consignee_name ||
                                        !shipment_data.customs_brokerage_data.consignee_address || !shipment_data.terminal_handling) &&
                                    <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div>
                                }
                                {shipment_data?.shipment_type === "import" &&
                                    (!shipment_data.pickup_location || !shipment_data.destination_port_code || !shipment_data.goods_value || !shipment_data.customs_brokerage_data.mode_of_transport ||
                                        !shipment_data.customs_brokerage_data.brokerage_type || !shipment_data.bl_number || !shipment_data.goods_type || !shipment_data.customs_brokerage_data.sender_name || !shipment_data.customs_brokerage_data.sender_address) &&
                                    <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div>
                                } */}
          {/* details and charges */}
          <div className="flex flex-col gap-y-8 xl:gap-y-0 xl:flex-row gap-x-8 justify-between ">
            <div className="border border-[#F3F4F6] rounded p-6 w-full xl:w-[70%]">
              <div className="flex items-center gap-x-[4px] md:gap-x-[8px] mb-4">
                {shipment_data?.shipment_type === "export" && (
                  <p className="text-[13px] sm:text-base md:text-lg black-text-3">
                    Export
                  </p>
                )}
                {shipment_data?.shipment_type === "import" && (
                  <p className="text-[13px] sm:text-base md:text-lg black-text-3">
                    Import
                  </p>
                )}

                <img src={divider} alt="divider" />
                {/* 
                                            {shipment_data?.shipment_transport_type === "ocean_freight" && (<p className="text-base md:text-lg black-text-3">Ocean Freight Details</p>)} */}
                {shipment_data?.shipment_transport_type ===
                  "customs_brokerage" && (
                  <p className="text-[13px] sm:text-base md:text-lg black-text-3">
                    Custom Brokerage
                  </p>
                )}
                {/* {shipment_data?.shipment_transport_type === "haulage" && (<p className="text-base md:text-lg black-text-3">Haulage Details</p>)} */}

                {/* awaiting */}
                <div
                  className={`ml-auto md:ml-0 py-1 px-2 rounded-full ${
                    shipment_data?.shipment_status === "pending approval"
                      ? "background-green"
                      : shipment_data?.shipment_status === "new booking"
                      ? "background-blue"
                      : shipment_data?.shipment_status === "awaiting quotes"
                      ? "bg-[#FFFADF]"
                      : shipment_data?.shipment_status === "cancelled"
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  <p
                    className={`text-xs capitalize text-center ${
                      shipment_data?.shipment_status === "new booking"
                        ? "text-[#4B83F0]"
                        : shipment_data?.shipment_status === "pending approval"
                        ? "text-[#059C01]"
                        : shipment_data?.shipment_status === "awaiting quotes"
                        ? "text-[#C27500]"
                        : shipment_data?.shipment_status === "cancelled"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {shipment_data?.shipment_status}
                  </p>
                </div>
              </div>

              {/* line */}
              <div className="w-full h-[1px] bg-[#F3F4F6] mb-6"></div>

              {/* main */}
              <div className="flex flex-col md:flex-row h-fit">
                {/* left */}
                <div className="w-full md:w-[50%]">
                  {/* {bookCategory === "exportcustoms_brokerage" ? ( */}
                    <DestinationBox
                      originText="Port Name"
                      destText=""
                      originData={
                        shipment_data?.shipment_type === "import"
                          ? getPortNameByCode(_Json.JSON, shipment_data?.port_of_discharge)
                          : getPortNameByCode(_Json.JSON, shipment_data?.port_of_loading)
                      }
                      alt_image={true}
                      // destData={
                      //   shipment_data?.destination_port_code
                      //     ? getPortNameByCode(_Json.JSON, shipment_data?.destination_port_code)
                      //     : "N/A"
                      // }
                    />
                  {/* ) : ( */}
                    {/* <DestinationBox
                      originText="Country of Origin"
                      destText="Destination Port"
                      originData={
                        shipment_data?.pickup_location
                          ? shipment_data?.pickup_location
                          : "N/A"
                      }
                      destData={
                        shipment_data?.destination_port_code
                          ? shipment_data?.destination_port_code
                          : "N/A"
                      }
                    />
                  )} */}

                  <div className="w-full h-[1px] bg-[#F3F4F6] my-4" />

                  {/* down */}
                  <div className="">
                    <div className=" mb-6">
                      <p className="text-sm font-light grey-text mb-1">
                        Value of Goods
                      </p>
                      <p className="text-base black-text-3 font-medium">
                        {shipment_data?.goods_value
                          ? formatCurrency(
                              shipment_data?.goods_value,
                              shipment_data?.goods_value_currency
                            )
                          : "N/A"}
                      </p>
                    </div>

                
                      <div className="grid grid-cols-2 text-sm gap-y-[26px] gap-x-10">
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Transport Mode
                          </p>
                          <p className="black-text-3 capitalize">
                            {shipment_data?.customs_brokerage_data
                              ?.mode_of_transport
                              ? shipment_data?.customs_brokerage_data
                                  ?.mode_of_transport
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Commodity Type
                          </p>
                          <p className="black-text-3 whitespace-normal capitalize">
                            {shipment_data?.goods_type
                              ? shipment_data?.goods_type
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            B/L Number
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.bl_number
                              ? shipment_data?.bl_number
                              : "N/A"}
                          </p>
                        </div>
                        {bookCategory === "exportcustoms_brokerage" ? 
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            NEPC Number
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.customs_brokerage_data?.nepc_number
                              ? shipment_data?.customs_brokerage_data
                                  ?.nepc_number
                              : "N/A"}
                          </p>
                        </div> :
                        <div>
                          <p className="grey-text font-light pb-1.5">CB Type</p>
                          <p className="black-text-3 whitespace-normal capitalize">
                            {shipment_data?.customs_brokerage_data
                              ?.brokerage_type
                              ? shipment_data?.customs_brokerage_data
                                  ?.brokerage_type
                              : "N/A"}
                          </p>
                        </div>}
                      </div>
                 
                  </div>
                </div>

                {/* vertical line */}
                <div className=" hidden md:block h-[full] w-[1px] bg-[#F3F4F6] mx-4"></div>

                {/* right */}
                <div className="ml-auto md:ml-4 mt-6 md:mt-4 w-full md:w-[50%] ">
                  {/* up */}
                  <div className="">
                    {/* <p className="border-solid border-t-[1px] pt-4 md:pt-0 md:border-none border-[#F3F4F6] text-base mb-6 black-text-3">Shipment Details</p> */}
                    {/* {bookCategory === "exportcustoms_brokerage" ? ( */}
                      <div className="grid grid-cols-2 text-sm gap-y-[26px] gap-x-10">
                        <div>
                          <p className="grey-text font-light pb-1.5">Container Size & Type</p>
                          <p className="black-text-3 capitalize">
                          <span>
                              {shipment_data?.container_details ? shipment_data?.container_details[0]?.container_size
                              ? shipment_data?.container_details[0]
                                  ?.container_size
                              : "N/A" : "N/A"}
                              </span> {" "}
                            <span className="capitalize inline-block">{shipment_data?.container_details ? shipment_data?.container_details[0]?.container_type
                              ? shipment_data?.container_details[0]
                                  ?.container_type
                              : "N/A" : "N/A"}</span>
                          </p>
                        </div>
                      
                        <div>
                          <p className="grey-text font-light pb-1.5">Container Count</p>
                          <p className="black-text-3 whitespace-normal capitalize">{shipment_data?.container_details ? shipment_data?.container_details[0]?.container_count : "N/A"}</p>
                        </div>

                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Container Weight (Tons)
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.container_details ? shipment_data?.container_details[0]
                              ?.container_weight
                              ? shipment_data?.container_details[0]
                                  ?.container_weight
                              : "N/A" : "N/A"}
                          </p>
                        </div>

                        {bookCategory === "exportcustoms_brokerage" && 
                        <>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Consignee Name
                            </p>
                            <p className="black-text-3">
                              {shipment_data?.customs_brokerage_data
                                ?.consignee_name
                                ? shipment_data?.customs_brokerage_data
                                    ?.consignee_name
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Consignee Address
                            </p>
                            <p className="black-text-3 whitespace-normal">
                              {shipment_data?.customs_brokerage_data
                                ?.consignee_address
                                ? shipment_data?.customs_brokerage_data
                                    ?.consignee_address
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                          <p className="grey-text font-light pb-1.5">
                            Terminal Handling
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.terminal_handling === undefined
                              ? "N/A"
                              : shipment_data?.terminal_handling === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div>
                        <p className="grey-text font-light pb-1.5">
                          Hazardous Goods
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.is_product_hazardous === undefined
                            ? "N/A"
                            : shipment_data?.is_product_hazardous === true
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                        </>}
                        {bookCategory === "importcustoms_brokerage" && <>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Sender Name
                            </p>
                            <p className="black-text-3 whitespace-normal capitalize">
                              {shipment_data?.customs_brokerage_data?.sender_name
                                ? shipment_data?.customs_brokerage_data
                                    ?.sender_name
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Sender Address
                            </p>
                            <p className="black-text-3 whitespace-normal">
                              {shipment_data?.customs_brokerage_data
                                ?.sender_address
                                ? shipment_data?.customs_brokerage_data
                                    ?.sender_address
                                : "N/A"}
                            </p>
                          </div>
                        </>}
                        <div>
                        <p className="grey-text font-light pb-1.5">Office/Branch</p>
                        <p className="black-text-3 whitespace-normal">
                          {shipment_data?.branch
                            ? shipment_data?.branch === "LOS"
                              ? "Lagos"
                              : shipment_data?.branch === "PHC"
                              ? "Port Hacourt"
                              : shipment_data?.branch === "KAN"
                              ? "Kano"
                              : shipment_data?.branch === "NBO"
                              ? "Nairobi"
                              : shipment_data?.branch === "ACC"
                              ? "Accra"
                              : "N/A"
                            : "N/A"}
                        </p>
                      </div>
                        <div>
                        <p className="grey-text font-light pb-1.5">Additional Comments</p>
                        <p className="black-text-3">
                          {shipment_data?.additional_comments ? shipment_data?.additional_comments : "N/A"}
                        </p>
                      </div>
                      </div>
               
                   
                     
         
            
                  </div>
                </div>
              </div>
            </div>

            {/* charges/disclaimer */}
            <div className="w-full xl:w-[30%]">
              {/* <div className="border border-[#FBFBFB] bg-[#FBFBFB] p-6 mb-6">
                   
                                            <p className="text-lg">Charges</p>
                                            <div className="w-full h-[1px] bg-[#F3F4F6] my-4" />
                                            <div className="flex flex-col gap-y-6">
                                                <>
                                                    {booking_summary?.ocean_freight?.charges[0] ?
                                                        <>
                                                            {booking_summary?.ocean_freight?.charges[0]?.map(
                                                                (data, index) => (
                                                                    <div
                                                                        className="flex items-center justify-between "
                                                                        key={index}
                                                                    >
                                                                        <p className="text-sm grey-text font-light w-[50%]">{data.description}</p>
                                                                        <p className="text-sm font-medium w-[50%] text-right">{formatCurrency(data.amountUsd, "USD")}</p>
                                                                    </div>
                                                                )
                                                            )}
                                                        </> : <p className="grey-text font-light text-center">Your charge breakdown will be displayed here</p>}
                                                </>
                                                {booking_summary?.marine_insurance?.charges?.amount && <div className="flex justify-between items-center">
                                                    <p className="text-sm grey-text font-light">Insurance</p>
                                                    <p className="text-sm font-medium">{formatCurrency(booking_summary?.marine_insurance?.charges?.amount, "NGN")}</p>
                                                </div>}

                                            </div>
                                        </div> */}

              {/* disclaimer */}
              {/* {shipment_data?.shipment_status !== "cancelled" &&
                shipment_data?.shipment_status === "new booking" && (
                  <ShipmentNotfication
                    subtext={"Please Note"}
                    text={"Your booking will be confirmed shortly."}
                    style={{}}
                  />
                )}
              {shipment_data?.shipment_status !== "cancelled" &&
                shipment_data?.shipment_status === "awaiting quotes" && (
                  <ShipmentNotfication
                    subtext={"Please Note"}
                    text={"Your quote will be sent shortly."}
                    style={{}}
                  />
                )} */}
            </div>
          </div>

          {/* container Details */}
          {/* desktop */}
          {/* <div className="desktop-only border border-[#F3F4F6] p-6 mt-8 mb-8">
                                    <p className="mb-4">Container Details</p>
                                    {shipment_data?.container_details?.length < 0 ?
                                        <table className="booking-details">
                                            <tr>
                                                <th>#</th>
                                                <th>Cont. Count</th>
                                                <th>Cont. Size(FT)</th>
                                                <th>Cont. Weight(Tons)</th>
                                                <th>Cont. Type</th>
                                            </tr>
                                            <tbody>
                                                {shipment_data?.container_details?.map((data, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{data.container_count}</td>
                                                        <td>{data.container_size}</td>
                                                        <td>{data.container_weight}</td>
                                                        <td>{data.container_type}</td>
                                                    </tr>
                                                ))
                                                }
                                            </tbody>
                                        </table> :
                                        <>
                                            <table className="booking-details">
                                                <tr>
                                                    <th>#</th>
                                                    <th>Cont. Count</th>
                                                    <th>Cont. Size(FT)</th>
                                                    <th>Cont. Weight(Tons)</th>
                                                    <th>Cont. Type</th>
                                                </tr>
                                            </table>
                                            <div className="flex flex-col justify-center items-center gap-y-2 mt-10 mb-11">
                                                <p className="grey-text text-xl">No Container(s)</p>
                                                <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">Kindly be patient as our sales representative uploads your container details</p>
                                            </div>
                                        </>
                                    }
                                </div> */}
        </div>
      </div>
    </>
  );
};

export default BookingCBT;
