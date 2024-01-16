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

const BookingExportAirDoor = (props: any) => {
  const navigate = useNavigate();

  const { shipment_data, booking_summary, bookCategory } = props;

  return (
    <>
      <div className="dashboard-content-scroll">
        <div className="mx-7 lg:mx-11 md:mx-7 mt-8">
          {/* back button */}
          <div
            className="flex items-center gap-x-1 mb-2 cursor-pointer w-fit"
            onClick={() => navigate(-1)}
          >
            {/* image */}
            <div>
              <img src={arrowL} alt=""></img>
            </div>
            <p className="text-sm grey-text">Bookings</p>
          </div>
          {/* header */}
          <div className=" mb-6">
            <p className="text-2xl">Booking</p>
          </div>

          {/* line */}
          <div className="w-full h-[1px] bg-[#F3F4F6] mb-4"></div>
          {/* <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div> */}

          {/* details and charges */}
          <div className="flex flex-col gap-y-8 xl:gap-y-0 xl:flex-row gap-x-8 justify-between mb-16">
            {/* details */}
            <div className="border border-[#F3F4F6] rounded p-6 w-full xl:w-[70%]">
              {/* header */}
              <div className="flex items-center gap-x-[6px] md:gap-x-[8px] mb-4">
                {shipment_data?.shipment_type === "export" && (
                  <p className="text-sm md:text-lg black-text-3">Export</p>
                )}
                {shipment_data?.shipment_type === "import" && (
                  <p className="text-sm md:text-lg black-text-3">Import</p>
                )}

                <img src={divider} alt="divider" />
                {/* 
                                            {shipment_data?.shipment_transport_type === "ocean_freight" && (<p className="text-base md:text-lg black-text-3">Ocean Freight Details</p>)} */}
                {shipment_data?.shipment_transport_type === "air_freight" && (
                  <p className="text-sm md:text-lg black-text-3">
                    Air Freight Details (Door to Door)
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
                <div className=" w-full md:w-[50%]">
                  {bookCategory === "exportair_freight" ? (
                    <DestinationBox
                      originText="Pickup Location"
                      destText="Delivery Address"
                      originData={shipment_data?.pickup_location}
                      destData={shipment_data?.delivery_location}
                    />
                  ) : (
                    <DestinationBox
                      originText="Pickup Location"
                      destText="Delivery Address"
                      originData={shipment_data?.pickup_location}
                      destData={shipment_data?.delivery_location}
                    />
                  )}

                  {/* h-line */}
                  <div className="w-full h-[1px] bg-[#F3F4F6] my-4"></div>

                  {/* down */}
                  <div className="">
                    <div className=" mb-6">
                      <p className="text-sm font-light grey-text mb-1">
                        Value of Goods
                      </p>
                      <p className="text-base black-text-3 font-medium">
                        {shipment_data.goods_value
                          ? formatCurrency(
                              shipment_data.goods_value,
                              shipment_data.goods_value_currency
                            )
                          : "N/A"}
                      </p>
                    </div>
                    {bookCategory === "exportair_freight" && (
                      <div className="grid grid-cols-2 text-sm gap-y-6">
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Cargo Pickup Date
                          </p>
                          <p className="text-sm black-text-3 font-normal">
                            {shipment_data?.cargo_pickup_date
                              ? moment(shipment_data?.caro_pickup_date).format(
                                  "DD-MM-YYYY"
                                )
                              : "N/A"}
                          </p>
                        </div>
                        {/* <div>
                                                            <p className="text-sm font-light grey-text mb-2">Ready Time</p>
                                                            <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-light grey-text mb-2">Closed Time</p>
                                                            <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-light grey-text mb-2">Date</p>
                                                            <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        </div> */}
                      </div>
                    )}
                  </div>

                  {/* h-line */}
                  <div className="w-full h-[1px] bg-[#F3F4F6] my-4"></div>

                  {/* down */}
                  <div className="">
                    <p className="black-text-3 mb-6 text-base">
                      Delivery Details
                    </p>
                    {bookCategory === "exportair_freight" ? (
                      <div className="grid grid-cols-2 text-sm gap-y-6">
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Consignee Name
                          </p>
                          <p className="text-sm black-text-3 font-normal capitalize">
                            {shipment_data?.air_freight_data?.consignee_name
                              ? shipment_data?.air_freight_data?.consignee_name
                              : "N/A"}
                          </p>
                        </div>
                        {/* <div>
                                                                <p className="text-sm font-light grey-text mb-2">Contact Name</p>
                                                                <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                            </div> */}
                        {/* <div>
                                                                <p className="text-sm font-light grey-text mb-2">Postal Code</p>
                                                                <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                            </div> */}
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Consignee Number
                          </p>
                          <p className="text-sm black-text-3 font-normal">
                            {shipment_data?.air_freight_data?.consignee_phone
                              ? shipment_data?.air_freight_data?.consignee_phone
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 text-sm gap-y-6">
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Consignee Name
                          </p>
                          <p className="text-sm black-text-3 font-normal capitalize">
                            {shipment_data?.air_freight_data?.sender_name
                              ? shipment_data?.air_freight_data?.sender_name
                              : "N/A"}
                          </p>
                        </div>
                        {/* <div>
                                                                <p className="text-sm font-light grey-text mb-2">Contact Name</p>
                                                                <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-light grey-text mb-2">Postal Code</p>
                                                                <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                            </div> */}
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Consignee Number
                          </p>
                          <p className="text-sm black-text-3 font-normal">
                            {shipment_data?.air_freight_data?.sender_phone
                              ? shipment_data?.air_freight_data?.sender_phone
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* vertical line */}
                <div className=" hidden md:block h-[full] w-[1px] bg-[#F3F4F6] mx-4"></div>

                {/* right */}
                <div className="ml-auto md:ml-4 mt-4 w-full md:w-[50%] ">
                  {/* up */}
                  <div className="">
                    <p className="border-solid border-t-[1px] pt-4 md:pt-0 md:border-none border-[#F3F4F6] text-base mb-6 black-text-3">
                      Shipment Details
                    </p>
                    <div className="grid grid-cols-2 text-sm gap-y-6">
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Origin Airport
                        </p>
                        <p className="text-sm black-text-3 font-normal capitalize">
                          {shipment_data?.origin_port_code
                            ? shipment_data?.origin_port_code
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Destination Airport
                        </p>
                        <p className="text-sm black-text-3 font-norma capitalize">
                          {shipment_data?.destination_port_code
                            ? shipment_data?.destination_port_code
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          No. of Cargo
                        </p>
                        <p className="text-sm black-text-3 font-normal">
                          {shipment_data?.air_cargo_details[0]?.container_count
                            ? shipment_data?.air_cargo_details[0]
                                ?.container_count
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Hazardous Cargo?
                        </p>
                        <p className="text-sm black-text-3 font-normal">
                          {shipment_data?.is_product_hazardous === undefined
                            ? "N/A"
                            : shipment_data?.is_product_hazardous === true
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Commodity Desc.
                        </p>
                        <p className="text-sm black-text-3 font-normal capitalize">
                          {shipment_data?.goods_type
                            ? shipment_data?.goods_type
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Weight (Kg)
                        </p>
                        <p className="text-sm black-text-3 font-normal">
                          {shipment_data?.air_cargo_details[0]?.container_weight
                            ? shipment_data?.air_cargo_details[0]
                                ?.container_weight
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                    {/* // <div className="grid grid-cols-2 text-sm gap-y-6">
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Pieces</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Hazardous Cargo?</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Weight (KG)</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Length (Inches)</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Width (Inches)</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        //     <div>
                                                        //         <p className="text-sm font-light grey-text mb-2">Heigth (Inches)</p>
                                                        //         <p className="text-sm black-text-3 font-normal">{"N/A"}</p>
                                                        //     </div>
                                                        // </div>} */}
                  </div>

                  {/* h-line */}
                  {/* <div className="w-full h-[1px] bg-[#F3F4F6] my-6"></div> */}
                  {bookCategory === "exportair_freightdoor" && (
                    <div className="md:border-t-[1px] my-6 border-solid md:border-t-[#F3F4F6]" />
                  )}

                  {/* down */}
                  <div className="">
                    {bookCategory === "exportair_freightdoor" ? (
                      <div className="grid grid-cols-2 text-sm gap-y-6">
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Length
                          </p>
                          <p className="text-sm black-text-3 font-medium">
                            {"N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Width
                          </p>
                          <p className="text-sm black-text-3 font-medium">
                            {"N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Height
                          </p>
                          <p className="text-sm black-text-3 font-medium">
                            {"N/A"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 text-sm gap-y-6">
                        {/* <div>
                                                                <p className="text-sm font-light grey-text mb-2">Width</p>
                                                                <p className="text-sm black-text-3 font-medium">{"N/A"}</p>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-light grey-text mb-2">Height</p>
                                                                <p className="text-sm black-text-3 font-medium">{"N/A"}</p>
                                                            </div> */}
                      </div>
                    )}
                  </div>
                  {bookCategory === "importair_freightdoor" && (
                    <div className="md:border-t-[1px] md:mt-6 border-solid  md:border-[#F3F4F6]" />
                  )}
                </div>
              </div>
            </div>

            {/* charges/disclaimer */}
            <div className="w-full xl:w-[30%]">
              {/* disclaimer */}
              {shipment_data?.shipment_status !== "cancelled" &&
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
                )}
              <div className="mb-14 md:hidden" />
            </div>
          </div>

          {/* container Details */}
          {/* desktop */}
          {/* <div className="desktop-only border border-[#F3F4F6] p-6 mt-8 mb-8">
                                    <p className="mb-4">Container Details</p>
                                    {shipment_data?.air_cargo_details?.length > 0 ?
                                        <table className="booking-details">
                                            <tr>
                                                <th>#</th>
                                                <th>Cont. Count</th>
                                                <th>Cont. Size(FT)</th>
                                                <th>Cont. Weight(Tons)</th>
                                                <th>Cont. Type</th>
                                            </tr>
                                            <tbody>
                                                {shipment_data?.air_cargo_details?.map((data, index) => (
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

export default BookingExportAirDoor;
