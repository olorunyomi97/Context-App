import moment from "moment";
import { useSelector } from "react-redux";

// icons
import arrowL from "assets/icons/arrow-left2.svg";
import divider from "assets/icons/divider.svg";

// helpers
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "helpers";

//components
import ShipmentNotfication from "components/rate/ShipmentNotfication";
import DestinationBox from "components/booking/DestinationBox";

const BookingDetails = (props: any) => {
  const navigate = useNavigate();
  const { shipment_data, booking_summary, bookCategory } = props;

  let country = useSelector((state: any) => state.auth.user_country);

  return (
    <>
      <div className="dashboard-content-scroll">
        <div className=" mx-7 lg:mx-11 md:mx-7 mt-8">
          {/* back button */}
          <div
            className="flex items-center gap-x-1 mb-2 cursor-pointer w-fit"
            onClick={() => navigate(-1)}
          >
            <div className="">
              <img src={arrowL} alt=""></img>
            </div>
            <p className="text-sm grey-text">Bookings</p>
          </div>
          <p className="text-2xl mb-6">Booking</p>
          {/* line */}
          <div
            className={`w-full h-[1px] bg-[#F3F4F6] ${
              bookCategory === "exportocean_freight" ? "mb-6" : "mb-4"
            }`}
          ></div>
          {/* {bookCategory !== "exportocean_freight" && <div className="mb-4"><CBTNotification width='70%' haulage={false} text="Please note the full details of this booking will be updated soon" /></div>} */}

          {/* details and charges */}
          <div className="flex flex-col gap-y-8 xl:gap-y-0 xl:flex-row gap-x-8 justify-between ">
            {/* details */}
            <div className="border border-[#F3F4F6] rounded p-6 w-full xl:w-[70%]">
              {/* header */}
              <div className="flex items-center gap-x-2 mb-4">
                {shipment_data?.shipment_type === "export" && (
                  <p className="text-base md:text-lg black-text-3">Export</p>
                )}
                {shipment_data?.shipment_type === "import" && (
                  <p className="text-base md:text-lg black-text-3">Import</p>
                )}

                <img src={divider} alt="divider" />

                {shipment_data?.shipment_transport_type === "ocean_freight" && (
                  <p className="text-base md:text-lg black-text-3">
                    Ocean Freight Details
                  </p>
                )}
                {/* {shipment_data?.shipment_transport_type === "air_freight" && (
                  <p className="text-base md:text-lg black-text-3">
                    Air Freight Details
                  </p>
                )}
                {shipment_data?.shipment_transport_type === "haulage" && (
                  <p className="text-base md:text-lg black-text-3">
                    Haulage Details
                  </p>
                )} */}

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
              <div className="flex flex-col md:flex-row  h-fit">
                {/* left */}
                <div className=" w-full md:w-[50%]">
                  {/* up */}
                  {/* <div className="background-green p-4 border border-[#F3F4F6] rounded">
                          <div className="flex items-center gap-x-[12px] mb-6">
                            <div><img src={origin} alt="" /></div>
                            <div>
                              <p className="text-sm font-light grey-text mb-2">Origin Port</p>
                              <p className="text-sm font-medium black-text-3">{shipment_data?.origin_port_code ? shipment_data?.origin_port_code : "N/A"}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-x-[12px]">
                            <div><img src={dest} alt="" /></div>
                            <div className="">
                              <p className="text-sm font-light grey-text mb-2">Destination Port</p>
                              <p className="text-sm font-medium black-text-3">{shipment_data?.destination_port_code ? shipment_data?.destination_port_code : "N/A"}</p>
                            </div>
                          </div>
                        </div> */}

                  <DestinationBox
                    originText={"Port of Loading"}
                    destText={"Port of Destination"}
                    originData={
                      shipment_data?.origin_port
                        ? shipment_data?.origin_port
                        : "N/A"
                    }
                    destData={
                      shipment_data?.destination_port
                        ? shipment_data?.destination_port
                        : "N/A"
                    }
                  />

                  {/* h-line */}
                  <div className="w-full h-[1px] bg-[#F3F4F6] my-4"></div>

                  {/* down */}
                  <div className="">
                    {/* <div className=" mb-6">
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
                    </div> */}
                    <div className="grid grid-cols-2 gap-x-5 text-sm gap-y-6">
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Container Count
                        </p>
                        <p className="text-sm black-text-3">
                          { shipment_data?.container_details
                            ? shipment_data?.container_details[0]
                                ?.container_count
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Container Size
                        </p>
                        <p className="text-sm black-text-3">
                          { shipment_data?.container_details
                            ? shipment_data?.container_details[0]
                                ?.container_size
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Container Type
                        </p>
                        <p className="text-sm black-text-3 capitalize">
                          {shipment_data?.container_details
                            ? shipment_data?.container_details[0]
                                ?.container_type
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Carrier
                        </p>
                        <p className="text-sm black-text-3">
                          {booking_summary?.ocean_freight?.rates_data
                            ?.carrier_name
                            ? booking_summary?.ocean_freight?.rates_data
                                ?.carrier_name
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Departure Date
                        </p>
                        <p className="text-sm black-text-3">
                          {shipment_data?.cargo_ready_date
                            ? moment(shipment_data?.cargo_ready_date).format(
                                "DD-MM-YYYY"
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Transit time
                        </p>
                        <p className="text-sm black-text-3">
                          {/* {shipment_data?.ocean_freight_data?.rates_data
                            ?.transit_time
                            ? shipment_data?.ocean_freight_data?.rates_data
                                ?.transit_time
                            : shipment_data?.ocean_freight_data?.rates_data?.route_schedule.length > 0 ?
                            shipment_data?.ocean_freight_data?.rates_data?.route_schedule[0]?.transitTime : "N/A" } */}
                          {
                            shipment_data?.ocean_freight?.rates_data?.route_schedule.length > 0
                              ? shipment_data?.ocean_freight?.rates_data?.route_schedule[0]?.transitTime :
                              shipment_data?.ocean_freight_data?.rates_data?.transit_time
                                ? shipment_data?.ocean_freight_data?.rates_data?.transit_time.includes("Days") ? shipment_data?.ocean_freight_data?.rates_data?.transit_time : shipment_data?.ocean_freight_data?.rates_data?.transit_time + " days"
                                : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Valid Until
                        </p>
                        <p className="text-sm black-text-3">
                          {booking_summary?.ocean_freight?.rates_validity
                            ? moment(
                                booking_summary?.ocean_freight?.rates_validity
                              ).format("DD-MM-YYYY")
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Free Days
                        </p>
                        <p className="text-sm black-text-3">
                          {/* {shipment_data?.ocean_freight_data?.rates_data
                            ?.demurrage_days
                            ? shipment_data?.ocean_freight_data?.rates_data
                                ?.demurrage_days === 0
                              ? "N/A"
                              : shipment_data?.ocean_freight_data?.rates_data
                                  ?.demurrage_days + " days"
                            : "N/A"} */}
                          {(shipment_data?.ocean_freight_data?.rates_data?.detention_days || shipment_data?.ocean_freight_data?.rates_data?.demurrage_days) ? shipment_data?.ocean_freight_data?.rates_data?.detention_days + shipment_data?.ocean_freight_data?.rates_data?.demurrage_days : "N/A"} {" "}days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* vertical line */}
                <div className="hidden md:block h-[full] w-[1px] bg-[#F3F4F6] mx-4"></div>

                {/* right */}
                <div className="ml-auto md:ml-4 mt-4 w-full md:w-[50%] ">
                  {/* up */}
                  <div className="">
                    <p className="text-base mb-6 black-text-3 border-solid border-t-[1px] pt-4 md:pt-0 md:border-none border-[#F3F4F6]">
                      Additional Services Information
                    </p>

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

                    {/* main */}
                    <div className="grid grid-cols-2 gap-x-5 text-sm gap-y-6">
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Commodity Type
                        </p>
                        <p className="text-sm black-text-3 capitalize">
                          {shipment_data?.goods_type
                            ? shipment_data?.goods_type
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Commodity Description
                        </p>
                        <p className="text-sm black-text-3 capitalize">
                          {shipment_data?.commodity_description
                            ? shipment_data?.commodity_description
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-light grey-text mb-2">
                          Incoterms
                        </p>
                        <p className="text-sm black-text-3 capitalize">
                          {shipment_data?.incoterms
                            ? shipment_data?.incoterms
                            : "N/A"}
                        </p>
                      </div>
                      {country !== "KE" && <>
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Haulage
                          </p>
                          <p className="text-sm black-text-3 capitalize">
                            {shipment_data?.with_haulage === undefined
                              ? "N/A"
                              : shipment_data?.with_haulage === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-light grey-text mb-2">
                            Customs Brokerage
                          </p>
                          <p className="text-sm black-text-3 capitalize">
                            {shipment_data?.customs_brokerage === undefined
                              ? "N/A"
                              : shipment_data?.customs_brokerage === true
                              ? "Yes"
                              : "No"}
                          </p>
                        </div>
                      </>}
                    </div>
                  </div>

                  {/* h-line */}
                  <div className="w-full h-[1px] bg-[#F3F4F6] my-4"></div>
                </div>
              </div>
            </div>

            {/* charges/disclaimer */}
            <div className="w-full xl:w-[30%]">
              {/* charges */}

              <div className="border-grey p-6 mb-6 rounded">
                {/* header */}
                <p className="text-lg">Charges</p>

                {/* line */}
                <div className="w-full h-[1px] bg-[#F3F4F6] my-4"></div>

                {/* body */}
                <div className="flex flex-col gap-y-6">
                  {/* part 1 */}
                  <>
                    {booking_summary?.ocean_freight?.charges[0] ? (
                      <>
                        {booking_summary?.ocean_freight?.charges[0]?.map(
                          (data, index) => (
                            <div
                              className="flex items-center justify-between "
                              key={index}
                            >
                              <p className="text-sm grey-text font-light w-[50%]">
                                {data.description}
                              </p>
                              <p className="text-sm font-medium w-[50%] text-right">
                                {shipment_data?.container_details ? 
                                data.rateBasis === 'PER_JOB' 
                                ? formatCurrency(data.amountUsd, "USD") 
                                : formatCurrency(data.amountUsd, "USD")  
                                : "N/A"}
                              </p>
                            </div>
                          )
                        )}
                        {(!shipment_data?.with_haulage && !shipment_data?.customs_brokerage) && 
                          <div className="flex justify-between items-center top-divider-2 pt-2 black-text-3 font-medium">
                            <p>Total</p>
                            <p>{formatCurrency(shipment_data?.ocean_freight_data?.rates_data?.total_amount_usd, 'USD')}</p>
                          </div>
                        }
                      </>
                    ) : (
                      <p className="grey-text font-light text-center">
                        Your charge breakdown will be displayed here.
                      </p>
                    )}
                  </>
                  {booking_summary?.marine_insurance?.charges?.amount && (
                    <div className="flex justify-between items-center">
                      <p className="text-sm grey-text font-light">Insurance</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(
                          booking_summary?.marine_insurance?.charges?.amount,
                          "NGN"
                        )}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* disclaimer */}
              {shipment_data?.shipment_status !== "cancelled" &&
                (bookCategory === "exportocean_freight" || bookCategory === "importocean_freight") 
                && (shipment_data?.with_haulage || shipment_data?.customs_brokerage) 
                && (
                  <ShipmentNotfication
                    subtext={"Please Note"}
                    text={"This is not the Total Amount for your shipment. A more comprehensive quote will be sent that includes the rates for the additional services selected."}
                    style={{}}
                  />
                )}

              {/* {shipment_data?.shipment_status !== "cancelled" &&
                bookCategory === "importocean_freight" &&
                shipment_data?.shipment_status === "new booking" && (
                  <ShipmentNotfication
                    subtext={"Please Note"}
                    text={"Your booking will be confirmed shortly."}
                    style={{}}
                  />
                )} */}

              {/* {shipment_data?.shipment_status !== "cancelled" &&
                bookCategory === "importocean_freight" &&
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
            {shipment_data?.container_details?.length > 0 ? (
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
                  ))}
                </tbody>
              </table>
            ) : (
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
                  <p className="text-sm font-light grey-text-1 max-w-[296px] text-center">
                    Kindly be patient as our sales representative uploads your
                    container details
                  </p>
                </div>
              </>
            )}
          </div> */}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
