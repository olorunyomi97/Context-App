import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";

import Modal from "react-modal";
import moment from "moment";

//helper
import { formatCurrency } from "helpers";
import { calculateTotalOceanFreight } from "helpers/oceanFreight";

//styles
import "./index.css";

//redux
import { selectLiveOceanRate } from "store/actions";

//components
import SingleRate from "components/shippingLiner/SingleRate";
import OutlineButton from "components/buttons/OutlineButton";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import CurrencyDropdown from "components/shippingLiner/CurrencyDropdown";
import SuccessModal from "components/partials/SuccessModal";
import LoadingSpinner from "components/partials/LoadingSpinner";
import OceanRateFurtherInformation from "components/shippingLiner/OceanRateFurtherInformation";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: " 1.5rem",
    maxHeight: "calc(100vh - 100px)",
    overflow: "scroll",
    // WebkitOverflowScrolling: "touch",
    transform: "translate(-50%, -50%)",
    width: "calc(100vw - 10%)",
    borderRadius: "10px",
    border: "0.01px solid #888",
  },
  overlay: {
    zIndex: "99999999999",
    backgroundColor: "rgba(6, 24, 2, 0.55)",
  },
};

const OceanFreightRates = (props: any) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loadingText, setLoadingText] = useState("");
  const [selectedRate, setSelectedRate] = useState("");
  const [selectedRateInfo, setSelectedRateInfo] = useState({});
  const [g_currency, setGlobalCurrency] = useState<string>("USD");

  const {
    id,
    live_rates,
    setCurrency,
    selectLiveOceanRate,
    error,
    getting_rates,
    rate_data,
    currency,
    rateType,
    setRateType,
    rateLoading,
  } = props;

  // console.log("getting_rates>>>", getting_rates)
  // console.log("live rateds")

  const closeModal = () => {
    setShowModal(false);
  };
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  //handles to show the modal or not on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1279) {
        setShowModal(false);
      }
      if (window.innerWidth < 1280 && selectedRate !== "") {
        setShowModal(true);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [selectedRate]);

  // useEffect(() => {
  //   if(rate_data?.["_id"] !== undefined){
  //     navigate("/booking/additional-services", { state: { id: id } })
  //   }
  // },  [rate_data])
  console.log("ratess_data>>>", rate_data);

  const toAdditionalDetails = () => {
    if (selectedRate) {
      selectLiveOceanRate(
        {
          shipment_id: id,
          rate_result_id: selectedRate,
          currency: currency,
        },
        navigate("/booking/additional-services", { state: { id: id } })
        // console.log("Ifee>>")
      );
    } else {
      navigate("/booking/additional-services", { state: { id: id } });
    }
  };

  return (
    <>
      {/** text-white bg-[#1F2937] */}
      <div>
        <div className="grid grid-cols-1 xl:grid-cols-2 mt-10 gap-x-6">
          <div className="hey">
            <div className="md:py-8 md:pl-6 md:pr-8 md:border-solid md:border-[1px] md:border-[#F3F4F6] rounded">
              <p className="text-2xl black-text-2">
                Select an Ocean Freight Rates
              </p>
              <p className="text-sm black-text-4">View all avaliable rates</p>
              {/* <p className="text-xs" onClick={() => setShowModal(true)}>modal open</p> */}
              <div className="mt-7 flex justify-between">
                <div className="flex gap-x-3">
                  <button
                    className={`text-sm text-[#1F2937] border-grey-2 py-2 px-4 rounded-lg ${
                      rateType === "quickest_delivery"
                        ? "bg-[#1F2937] text-[#FFF]"
                        : ""
                    }`}
                    onClick={() => {
                      setRateType("quickest_delivery");
                      setLoadingText("with quickest delivery");
                      setSelectedRateInfo({});
                    }}
                    disabled={rateLoading || rateType === "quickest_delivery"}
                  >
                    Quickest Delivery
                  </button>
                  <button
                    className={`text-sm text-[#1F2937] border-grey-2 py-2 px-4 rounded-lg ${
                      rateType === "lowest_prices"
                        ? "bg-[#1F2937] text-[#FFF]"
                        : ""
                    }`}
                    onClick={() => {
                      setRateType("lowest_prices");
                      setLoadingText("with lowest prices");
                      setSelectedRateInfo({});
                    }}
                    disabled={rateLoading || rateType === "lowest_prices"}
                  >
                    Lowest Prices
                  </button>
                </div>
                {/* <div className="hidden md:flex">
                      <CurrencyDropdown
                        setGlobalCurrency={setGlobalCurrency}
                      />
                    </div> */}
              </div>
            </div>
            {/* Single Rate or No Rate Display */}
            <>
              {rateLoading ? (
                <LoadingSpinner
                  loadingText={"Loading shipping liners " + loadingText}
                />
              ) : (
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {live_rates?.ocean_freight?.length > 0 ? (
                    live_rates?.ocean_freight?.map((item, index) => (
                      <div
                        key={item._id}
                        className={`p-6 rounded-[10px] cursor-pointer ${
                          selectedRate === item._id
                            ? "rate-item"
                            : "border-grey-1"
                        } `}
                        onClick={(e) => {
                          setSelectedRate(item._id); //sets the style for the selected rate
                          setSelectedRateInfo(item); //sets the object for the further info section
                          if (window.innerWidth < 1280) {
                            //opens the modal if screen size is less than 1280px
                            setShowModal(true);
                          }
                        }}
                      >
                        <div className="pb-6 bottom-divider-2">
                          <p className="text-xs font-medium mb-1">
                            {item?.rates_data?.carrier_name}
                          </p>
                          <p className="text-xl text-[#004800] mb-1 font-normal">
                            {formatCurrency(
                              item?.rates_data?.total_amount_usd,
                              "USD"
                            )}
                          </p>
                          <p className="text-xs grey-text-1 font-normal">
                            Valid until{" "}
                            {item.rates_validity
                              ? moment(item.rates_validity).format(
                                  "Do, MMM YYYY"
                                )
                              : "N/A"}
                          </p>
                        </div>
                        <div className="flex justify-between mt-6">
                          <div>
                            <p className="text-xs grey-text font-light mb-1">
                              Sailing Date
                            </p>
                            <p className="text-xs black-text-3 font-medium">
                              {item?.rates_data?.sailing_date
                                ? moment(item?.rates_data?.sailing_date).format(
                                    "YYYY-MM-DD"
                                  )
                                : "N/A"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs grey-text font-light mb-1">
                              Transit Time
                            </p>
                            <p className="text-xs black-text-3 font-medium">
                              {item.rates_data.transit_time
                                ? item.rates_data.transit_time
                                : "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex justify-center col-span-2 py-20">
                      <div className="text-center">
                        <h2 className="text-xl font-medium grey-text mb-1">
                          No Available Rates
                        </h2>
                        <p className="grey-text-1 text-sm font-light mx-auto">
                          Sorry there are no available rates for this port pair.
                        </p>
                        <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 gap-x-3 justify-center mt-5">
                          <OutlineButton
                            title="Edit Port Pairs"
                            style={{ color: "#59725C" }}
                            onClick={() =>
                              navigate("/booking/details", {
                                state: {
                                  shipId: id,
                                  shipmentCategory: "ExportOcean Freight",
                                },
                              })
                            }
                            disabled={false}
                            loading={false}
                            icon={""}
                          />
                          <PrimaryButtons
                            title="Proceed to Additional Services"
                            style={{ padding: "12px 14px" }}
                            onClick={() => toAdditionalDetails()}
                            disabled={false}
                            loading={false}
                            icon={""}
                          />
                        </div>
                        <div className="flex mt-3 gap-x-1 max-w-[450px] font-medium">
                          <span className="text-red-400">*</span>
                          <p className="text-xs grey-text">
                            You can proceed to additional services and complete
                            your booking a sales personnel will reach out to you
                            within 24 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          </div>
          <div className="hidden xl:block border-grey rounded-[10px]">
            <OceanRateFurtherInformation
              selectedRateInfo={selectedRateInfo}
              getting_rates={getting_rates}
              toAdditionalDetails={toAdditionalDetails}
            />
          </div>
          <Modal
            isOpen={showModal}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            shouldCloseOnEsc={true}
            contentLabel="Select rate modal"
            className={"ratemodal"}
            ariaHideApp={false}
          >
            <OceanRateFurtherInformation
              closeModal={closeModal}
              selectedRateInfo={selectedRateInfo}
              getting_rates={getting_rates}
              toAdditionalDetails={toAdditionalDetails}
            />
          </Modal>
        </div>
        {showSuccessModal && (
          <SuccessModal
            modalIsOpen={showSuccessModal}
            closeModal={closeSuccessModal}
            heading={"Booking Completed!!!"}
            text={
              "You have successfully completed your booking process. You will receive a quote shortly."
            }
          />
        )}
      </div>
      <div className="mt-8 flex justify-between">
        <OutlineButton
          title="Cancel"
          style={{ color: "#59725C" }}
          onClick={() => navigate("/dashboard")}
          disabled={false}
          loading={false}
          icon={""}
        />
        <div className="flex gap-x-6">
          <div className="hidden xl:block">
            <SecondaryButtons
              title="Previous Page"
              style={{ padding: "12px 14px" }}
              onClick={() =>
                navigate("/booking/details", {
                  state: {
                    shipId: id,
                    shipmentCategory: "ExportOcean Freight",
                  },
                })
              }
              disabled={rateLoading}
              loading={false}
              icon={""}
            />
          </div>
          <div className="hidden xl:block">
            <PrimaryButtons
              title="Include Additional Services"
              style={{}}
              onClick={() => toAdditionalDetails()}
              disabled={!selectedRate}
              loading={getting_rates}
              icon={""}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  const { error, getting_rates, rate_data } = state.booking;
  return { error, getting_rates, rate_data };
};
export default connect(mapStateToProps, { selectLiveOceanRate })(
  OceanFreightRates
);
