import React from "react";
import moment from "moment";

// icons
import arrowL from "assets/icons/arrow-left2.svg";
import divider from "assets/icons/divider.svg";

// helpers
import { useNavigate } from "react-router-dom";

//components
import ShipmentNotfication from "components/rate/ShipmentNotfication";

const BookingWarehousing = (props: any) => {
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
            <div>
              <img src={arrowL} alt=""></img>
            </div>
            <p className="text-sm grey-text">Bookings</p>
          </div>
          <div className="mb-6">
            <p className="text-2xl">Booking</p>
          </div>

          <div className="w-full h-[1px] bg-[#F3F4F6] mb-4"></div>

          {/* {shipment_data?.shipment_type === "export" &&
                                    (!shipment_data.goods_type || !shipment_data.shipment_type || !shipment_data?.container_details[0]?.container_type || !shipment_data?.container_details[0]?.container_size || !shipment_data.port_of_loading || !shipment_data.pickup_location || !shipment_data?.container_details[0]?.container_weight ||
                                        !shipment_data.warehousing_data.cargo_bagged || !shipment_data.warehousing_data.total_cargo_bags || !shipment_data.with_haulage || !shipment_data.is_product_hazardous || !shipment_data.warehousing_data.warehousing_duration || !shipment_data.branch) &&
                                    <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div>
                                }

                                {shipment_data?.shipment_type === "import" &&
                                    (!shipment_data.goods_type || !shipment_data.shipment_type || !shipment_data?.container_details[0]?.container_type || !shipment_data?.container_details[0]?.container_size || !shipment_data.with_haulage || !shipment_data.port_of_discharge ||
                                        !shipment_data?.container_details[0]?.container_weight ||
                                        !shipment_data.warehousing_data.cargo_bagged || !shipment_data.warehousing_data.total_cargo_bags || !shipment_data.is_product_hazardous || !shipment_data.warehousing_data.warehousing_duration || !shipment_data.branch) &&
                                    <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div>
                                } */}

          {/* details and charges */}
          <div className="flex flex-col gap-y-8 xl:gap-y-0 xl:flex-row gap-x-8 justify-between ">
            {/* details */}
            <div className="border border-[#F3F4F6] rounded p-6 w-full xl:w-[70%]">
              {/* header */}
              <div className="flex items-center gap-x-[4px] md:gap-x-[8px] mb-4">
                {shipment_data?.shipment_type === "export" && (
                  <p className="text-sm md:text-lg black-text-3">Export</p>
                )}
                {shipment_data?.shipment_type === "import" && (
                  <p className="text-sm md:text-lg black-text-3">Import</p>
                )}

                <img src={divider} alt="divider" />

                {shipment_data?.shipment_transport_type === "warehousing" && (
                  <p className="text-sm md:text-lg black-text-3">
                    Warehousing Details
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
                  {/* <DestinationBox
                                                    originText="Origin Port"
                                                    destText="Destination Port"
                                                    shipment_data={shipment_data}
                                                /> */}

                  {/* <div className="w-full h-[1px] bg-[#F3F4F6] my-4" /> */}

                  {/* down */}
                  <div className="">
                    {/* <div className=" mb-6">
                                                        <p className="text-sm font-light grey-text mb-1">Value of Goods</p>
                                                        <p className="text-base black-text-3 font-medium">₦0.00</p>
                                                    </div> */}

                    <div
                      className={`grid grid-cols-2 text-sm gap-y-[26px] gap-x-10 ${
                        bookCategory === "importwarehousing"
                          ? "mb-1"
                          : "md:mb-14"
                      }`}
                    >
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Commodity Type
                        </p>
                        <p className="black-text-3 capitalize">
                          {shipment_data?.goods_type
                            ? shipment_data?.goods_type
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Shipment Type
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.shipment_type
                            ? shipment_data?.shipment_type
                                .charAt(0)
                                .toUpperCase() +
                              shipment_data?.shipment_type.slice(1)
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Container Type
                        </p>
                        <p className="black-text-3 capitalize">
                          {shipment_data?.container_details[0]?.container_type
                            ? shipment_data?.container_details[0]
                                ?.container_type
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Container Size
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.container_details[0]?.container_size
                            ? shipment_data?.container_details[0]
                                ?.container_size
                            : "N/A"}
                        </p>
                      </div>
                      {bookCategory === "importwarehousing" && (
                        <>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Pickup Required
                            </p>
                            <p className="black-text-3 whitespace-normal">
                              {shipment_data?.with_haulage === undefined
                                ? "N/A"
                                : shipment_data?.with_haulage === true
                                ? "Yes"
                                : "No"}
                            </p>
                          </div>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Port of Discharge
                            </p>
                            <p className="black-text-3">
                              {shipment_data?.port_of_discharge
                                ? shipment_data?.port_of_discharge
                                : "N/A"}
                            </p>
                          </div>
                        </>
                      )}
                      {bookCategory === "exportwarehousing" && (
                        <>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Pick up Location
                            </p>
                            <p className="black-text-3 whitespace-normal">
                              {shipment_data?.pickup_location
                                ? shipment_data?.pickup_location
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="grey-text font-light pb-1.5">
                              Port of Loading
                            </p>
                            <p className="black-text-3">
                              {shipment_data?.port_of_loading
                                ? shipment_data?.port_of_loading
                                : "N/A"}
                            </p>
                          </div>
                        </>
                      )}
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Weight of Cargo (KG)
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.container_details[0]?.container_weight
                            ? shipment_data?.container_details[0]
                                ?.container_weight
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          Is the Cargo Bagged
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.warehousing_data?.cargo_bagged ===
                          undefined
                            ? "N/A"
                            : shipment_data?.warehousing_data?.cargo_bagged ===
                              true
                            ? "Yes"
                            : "No"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light pb-1.5">
                          No. of Bags
                        </p>
                        <p className="black-text-3">
                          {shipment_data?.warehousing_data?.total_cargo_bags
                            ? shipment_data?.warehousing_data?.total_cargo_bags
                            : "N/A"}
                        </p>
                      </div>
                      {/* {bookCategory === "importwarehousing" &&
                                                            <div>
                                                                <p className="grey-text font-light pb-1.5">Pickup Required</p>
                                                                <p className="black-text-3">N/A</p>
                                                            </div>
                                                        } */}
                      {/* {bookCategory === "importwarehousing" &&
                                                            <>
                                                                <div>
                                                                    <p className="grey-text font-light pb-1.5">Port of Destination</p>
                                                                    <p className="black-text-3">N/A</p>
                                                                </div>
                                                                <div>
                                                                    <p className="grey-text font-light pb-1.5">Shipment Line</p>
                                                                    <p className="black-text-3">N/A</p>
                                                                </div>
                                                            </>
                                                        } */}
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
                    {bookCategory === "importwarehousing" ? (
                      <div className="grid grid-cols-2 text-sm gap-y-[26px] gap-x-10 border-solid border-t-[1px] pt-6 md:pt-0 md:border-none border-[#F3F4F6] ">
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Warehousing Duration
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.warehousing_data
                              ?.warehousing_duration
                              ? shipment_data?.warehousing_data
                                  ?.warehousing_duration
                              : "N/A"}{" "}
                            {shipment_data?.warehousing_data
                              ?.warehousing_duration && "weeks"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Hazardous Cargo
                          </p>
                          <p className="black-text-3 whitespace-normal">
                            {shipment_data?.is_product_hazardous === undefined
                              ? "N/A"
                              : shipment_data?.is_product_hazardous === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Office Branch
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.branch
                              ? shipment_data?.branch === "LOS"
                                ? "Lagos"
                                : shipment_data?.branch === "PHC"
                                ? "Port Hacourt"
                                : shipment_data?.branch === "KAN"
                                ? "Kano"
                                : "N/A"
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 text-sm gap-y-[26px] gap-x-10 border-solid border-t-[1px] pt-6 md:pt-0 md:border-none border-[#F3F4F6] ">
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Pickup Required
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.with_haulage
                              ? shipment_data?.with_haulage === true
                                ? "Yes"
                                : "No"
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Hazardous Cargo
                          </p>
                          <p className="black-text-3 whitespace-normal">
                            {shipment_data?.is_product_hazardous === undefined
                              ? "N/A"
                              : shipment_data?.is_product_hazardous === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Warehousing Duration
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.warehousing_data
                              ?.warehousing_duration
                              ? shipment_data?.warehousing_data
                                  ?.warehousing_duration
                              : "N/A"}{" "}
                            {shipment_data?.warehousing_data
                              ?.warehousing_duration && "weeks"}
                          </p>
                        </div>
                        <div>
                          <p className="grey-text font-light pb-1.5">
                            Office Branch
                          </p>
                          <p className="black-text-3">
                            {shipment_data?.branch
                              ? shipment_data?.branch === "LOS"
                                ? "Lagos"
                                : shipment_data?.branch === "PHC"
                                ? "Port Hacourt"
                                : shipment_data?.branch === "KAN"
                                ? "Kano"
                                : "N/A"
                              : "N/A"}
                          </p>
                        </div>
                      </div>
                    )}
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

export default BookingWarehousing;
