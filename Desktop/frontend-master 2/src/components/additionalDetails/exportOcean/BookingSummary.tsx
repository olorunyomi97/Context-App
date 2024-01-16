import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";

//libraries
import Modal from "react-modal";

//icons
import port from "assets/icons/home-port.svg";
import disclaimer from "assets/icons/disclaimer.svg";
import destination from "assets/icons/location-pin.svg";
import chevronUp from "assets/icons/chevron-up.svg";
import chevronDown from "assets/icons/chevron-down.svg";
import arrowright from "assets/icons/arrow-right.svg";

//components
// import PrimaryButton from "components/buttons/PrimaryButton";
// import SecondaryButton from "components/buttons/SecondaryButton";
// import OutlineButton from "components/buttons/OutlineButton";
// import SecondaryButtons from "components/buttons/SecondaryButtons";

import SuccessModal from "components/partials/SuccessModal";

//redux
import {
  getBookingSummary,
  getShipmentById,
  confirmBooking,
} from "store/actions";

//helpers
import { formatCurrency } from "helpers";
import { calculateTotalOceanFreight } from "helpers/oceanFreight";

const BookingSummary = (props: any) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      maxHeight: "calc(100vh - 100px)",
      padding: "0px",
      transform: "translate(-50%, -50%)",
      width: "600px",
      height: "auto",
      borderRadius: "10px",
      border: "0.01px solid #888",
    },
    overlay: {
      zIndex: "99999999999",
      backgroundColor: "rgba(6, 24, 2, 0.55)",
    },
  };
  const navigate = useNavigate();
  const location = useLocation();
  const shipment_id = location.state.id;

  const {
    isOpen,
    setIsOpen,
    loading,
    booking_summary,
    getBookingSummary,
    confirmBooking,
    getShipmentById,
    shipment_data,
    shipment_loading,
    setShowSuccessModal,
  } = props;
  const [showChargeDetails, setShowChargeDetails] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // console.log("bks>>", booking_summary);

  useEffect(() => {
    shipment_id && getShipmentById(shipment_id);
    shipment_id && getBookingSummary(shipment_id);
  }, [shipment_id, getBookingSummary, getShipmentById]);

  const onSubmit = () => {
    confirmBooking({ shipment_id }, goToBookings);
  };

  const goToBookings = () => {
    setIsOpen(false);
    setShowSuccessModal(true);
  };

  return (
    <div>
      <>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
          }}
          style={customStyles}
          className={"summarymodal"}
        >
          <>
            {loading || shipment_loading ? (
              <i className="grey-text">Loading</i>
            ) : (
              <>
                <div className="flex py-4 px-8 items-center bottom-divider">
                  <p className="text-lg black-text-2 font-medium">
                    Booking Summary
                  </p>
                  <i
                    className="ion-ios-close text-3xl ml-auto cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  ></i>
                </div>
                <div className="flex flex-col gap-y-5 p-4 md:p-8 bottom-divider">
                  <div className="flex gap-x-3 py-4 px-6 black-br">
                    <div>
                      <img
                        src={disclaimer}
                        alt=""
                        className="min-w-[16px] mt-1"
                      />
                    </div>
                    <p className="black-text-3 text-xs">
                      <span className="font-semibold"> Please note</span>{" "}
                      <span>
                        This is not your final payment as Haulage and Custom
                        Brokerage have not been included yet.
                      </span>
                    </p>
                  </div>

                  <div className="green-br p-6">
                    <div className="flex justify-between pb-8 bottom-divider">
                      <div className="flex gap-x-2 items-center">
                        <span>
                          <img src={port} alt="" />
                        </span>
                        <div>
                          <p className="grey-text font-light text-xs md:text-sm mb-1">
                            Origin Port
                          </p>
                          <p className="black-text-4 text-sm font-medium">
                            {shipment_data?.origin_port_code}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-2 items-center">
                        <span>
                          <img src={destination} alt="" />
                        </span>
                        <div>
                          <p className="grey-text font-light text-xs md:text-sm mb-1">
                            Destination Port
                          </p>
                          <p className="black-text-4 text-sm font-medium">
                            {shipment_data?.destination_port_code}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className="grid grid-cols-3 gap-4 py-7"
                      style={{ textAlign: "left" }}
                    >
                      <div>
                        <p className="grey-text font-light text-xs md:text-sm mb-1">
                          Carrier
                        </p>
                        <p className="black-text-4 text-xs md:text-sm font-medium">
                          {booking_summary?.ocean_freight?.rates_data
                            ?.carrier_name
                            ? booking_summary?.ocean_freight?.rates_data
                                ?.carrier_name
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light text-xs md:text-sm mb-1">
                          Sailing Date
                        </p>
                        <p className="black-text-4 text-xs md:text-sm font-medium">
                          {booking_summary?.ocean_freight?.rates_data
                            ?.sailing_date
                            ? moment(
                                booking_summary?.ocean_freight?.rates_data
                                  ?.sailing_date
                              ).format("DD MMM YYYY")
                            : "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="grey-text font-light text-xs md:text-sm mb-1">
                          Transit Time
                        </p>
                        <p className="black-text-4 text-xs md:text-sm font-medium">
                          {booking_summary?.ocean_freight?.rates_data
                            ?.transit_time
                            ? booking_summary?.ocean_freight?.rates_data
                                ?.transit_time
                            : "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 md:p-8 flex flex-col pb-6">
                  <div>
                    <div
                      className="solid-br py-2 px-8 rounded-lg flex justify-between items-center cursor-pointer"
                      onClick={() => setShowChargeDetails(!showChargeDetails)}
                    >
                      <div className="">
                        <p className="black-text-4 font-normal">
                          Charge Details
                        </p>
                        <p className="black-text font-light text-sm">
                          Payment Breakdown
                        </p>
                      </div>
                      <span>
                        <img
                          src={showChargeDetails ? chevronUp : chevronDown}
                          alt=""
                        />
                      </span>
                    </div>
                    {showChargeDetails && (
                      <div className="left-divider bottom-divider right-divider rounded-b p-4">
                        <div className="py-2 pb-6 bottom-divider">
                          <p className="grey-text-1 font-normal text-sm mb-1">
                            Total Amount
                          </p>
                          {/* <p className="black-text-4 font-normal">
                            {formatCurrency(booking_summary?.total_amount, "NGN")}
                          </p> */}
                          <p className="text-sm yellow-text">Pending</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 py-6">
                          <div>
                            {/* <p className="grey-text font-normal text-sm mb-6">
                              Ocean Charge
                            </p> */}

                            {/* {booking_summary?.ocean_freight ? ( */}
                            <p className="grey-text font-normal text-sm mb-6">
                              Freight Charge
                            </p>
                            {/* ) : null} */}

                            {booking_summary?.marine_insurance ? (
                              <p className="grey-text font-normal text-sm mb-6">
                                Insurance (
                                {
                                  booking_summary?.marine_insurance
                                    ?.insurance_details?.data?.insurer?.name
                                }
                                )
                              </p>
                            ) : null}
                            {booking_summary?.haulage ? (
                              <p className="grey-text font-normal text-sm mb-6">
                                Haulage
                              </p>
                            ) : null}

                            {booking_summary?.custom_brokerage ? (
                              <p className="grey-text font-normal text-sm mb-">
                                Custom Brokerage Charge
                              </p>
                            ) : null}

                            {booking_summary?.tracking ? (
                              <p className="grey-text font-normal text-sm mb-6">
                                Tracking
                              </p>
                            ) : null}

                            {booking_summary?.warehousing ? (
                              <p className="grey-text font-normal text-sm mb-6">
                                Warehousing
                              </p>
                            ) : null}
                          </div>

                          <div className="justify-self-end">
                            {booking_summary?.ocean_freight ? (
                              <p className="black-text font-normal text-sm mb-6">
                                {formatCurrency(
                                  booking_summary?.ocean_freight?.rates_data
                                    ?.total_amount_usd,
                                  "USD"
                                )}
                              </p>
                            ) : (
                              <>
                                <p
                                  className={`${
                                    booking_summary?.ocean_freight
                                      ? "black-text"
                                      : "yellow-text"
                                  } font-normal text-sm mb-6`}
                                >
                                  Pending
                                </p>
                              </>
                            )}

                            {booking_summary?.marine_insurance ? (
                              <p className="black-text font-normal text-sm mb-6">
                                {formatCurrency(
                                  booking_summary?.marine_insurance?.charges
                                    ?.amount,
                                  "NGN"
                                )}
                              </p>
                            ) : null}

                            {booking_summary?.haulage ? (
                              <p
                                className={`${
                                  booking_summary?.haulage?.charges?.amount
                                    ? "black-text"
                                    : "yellow-text"
                                } font-normal text-sm mb-6`}
                              >
                                {booking_summary?.haulage?.charges?.amount ||
                                  "Pending"}
                              </p>
                            ) : null}

                            {booking_summary?.custom_brokerage ? (
                              <p
                                className={`${
                                  booking_summary?.custom_brokerage?.charges
                                    ?.amount
                                    ? "black-text"
                                    : "yellow-text"
                                } font-normal text-sm mb-6`}
                              >
                                {booking_summary?.custom_brokerage?.charges
                                  ?.amount || "Pending"}
                              </p>
                            ) : null}

                            {booking_summary?.tracking ? (
                              <p
                                className={`${
                                  booking_summary?.tracking?.charges?.amount
                                    ? "black-text"
                                    : "yellow-text"
                                } font-normal text-sm mb-6`}
                              >
                                {booking_summary?.tracking?.charges?.amount ||
                                  "Pending"}
                              </p>
                            ) : null}

                            {booking_summary?.warehousing ? (
                              <p
                                className={`${
                                  booking_summary?.warehousing?.charges?.amount
                                    ? "black-text"
                                    : "yellow-text"
                                } font-normal text-sm mb-6`}
                              >
                                {booking_summary?.warehousing?.charges
                                  ?.amount || "Pending"}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-6 px-8 shadow-[0_-3px_32px_-12px_rgba(0,0,0,0.18)]">
                  <div className="flex flex-col gap-y-4">
                    <button
                      className={`flex  ${
                        loading && "opacity-50"
                      } justify-between px-3 items-center gradient w-full text-white rounded text-center py-2.5 text-sm font-light`}
                      disabled={loading}
                      onClick={() => {
                        onSubmit();
                      }}
                    >
                      <span className="text-transparent">.</span>

                      <span>
                        {" "}
                        {loading && (
                          <i className="fa fa-spinner fa-pulse mr-2"></i>
                        )}
                        Confirm Booking
                      </span>
                      <span className="">
                        <img src={arrowright} alt="" />
                      </span>
                    </button>
                    <button
                      className="grey-text py-2.5 w-full text-sm bg-[#F9FAFB] rounded"
                      disabled={loading}
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel booking
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        </Modal>
      </>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { loading, booking_summary } = state.additionalDetails;
  const {
    shipment_data,

    loading: shipment_loading,
  } = state.booking;
  return { loading, booking_summary, shipment_data, shipment_loading };
};

export default connect(mapStateToProps, {
  getBookingSummary,
  getShipmentById,
  confirmBooking,
})(BookingSummary);
