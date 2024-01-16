import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useParams, useNavigate, useSearchParams } from "react-router-dom";

//icons
import norate from "assets/icons/norate.svg";
import divider from "assets/icons/divider.svg";
import port from "assets/icons/home-port.svg";
import calendar from "assets/icons/calendar.svg";
import caret from "assets/icons/caret-down.svg";
import destination from "assets/icons/location-pin.svg";

import maersk from "assets/icons/maersk.svg";

//library
import moment from "moment";

//helpers
import { formatCurrency } from "helpers";

//components
// import Layout from "components/layout/Layout";
import Navbar from "components/dock/Navbar";
import Layout from "components/dock/Layout";
import PageLoading from "components/partials/pageLoading";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import ContactUsModal from "components/ofap/ContactUsModal";
import OpenRatesContact from "./OpenRatesContact";
import CurrencyDropdown from "components/shippingLiner/CurrencyDropdown";
import OceanRateFurtherInformation from "components/shippingLiner/OceanRateFurtherInformation";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import LoadingSpinner from "components/partials/LoadingSpinner";
import SuccessModal from "components/partials/SuccessModal";
import OfapLogin from "components/ofap/OfapLogin";
import OfapRateEmailModal from "components/ofap/OfapRateEmailModal";
import OfapInvalidEmail from "components/ofap/OfapInvalidEmail";
import Button from "components/dock/Button";

//libraries
import Modal from "react-modal";
import { connect } from "react-redux";

//actions
import {
  getBookingDetailsById,
  getLiveRate,
  selectLiveOceanRate,
  clearBooking,
  clearBookingErrors
} from "store/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // padding: " 1.5rem",
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

const NoRateSelected = ({ setShowContactModal }) => (
  <div className="text-center flex flex-col justify-center">
    <div className="mt-9 mx-auto"><img src={norate} alt="" /></div>
    <div className="my-10">
      <p className="text-xl grey-text">No Rates to Display</p>
      <p className="text-sm grey-text-1 max-w-[340px]">Sorry there are no available rates for this port pair.</p>
      <p
        className="text-sm text-[#296FD8] font-light cursor-pointer underline"
        onClick={() => setShowContactModal(true)}
      >
        Please contact Support
      </p>
    </div>
  </div>
);

const SingleRate = ({
  idx,
  id,
  rate,
  setShowModal,
  setSelectedRateInfo,
  toAdditionalDetails,
  setSelectedRate,
  selectedRate,
  setShowLogin,
  selecting_live_ocean_rate,
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 py-5 breakdown-border rounded-[10px]`}>
      <div className="col-span-2 bg-redd-100 pl-6 pb-6 md:right-divider">
        <div className="flex gap-x-6 mr-6 pb-6 md:pb-0 md:mr-0 border-solid border-[#F3F4F6] border-b-[1px] md:border-b-[0px]">
          <div className="flex items-center"><img src={rate?.rates_data?.carrier_image} alt="" className="w-[60px]" /></div>
          <div className="flex-1">
            <div className="flex items-center gap-x-2">
              <p className="text-sm font-medium">{rate?.rates_data?.carrier_name}</p>
              {rate?.rates_data?.offer_type === "CONTRACT" && <p className="text-xs font-normal rounded-full text-[#059C01] bg-[#99ff7d1a] py-1 px-2">Special Rate</p>}
              {rate?.rates_data?.offer_type === "SPOT" && <p className="text-xs font-normal rounded-full text-blue-600 bg-blue-100 py-1 px-2">Spot Rate</p>}
            </div>
            <div className="flex items-center gap-x-1 grey-text-1 text-sm mt-2.5 font-light">
              <p>Valid until</p>
              <p><img src={divider} alt="" /></p>
              <p>{rate.rates_validity ? moment(rate.rates_validity).format("ddd, Do MMM") : "N/A"}</p>
            </div>
            <div className="h-[1px] bg-[#F3F4F6] w-[90%] mt-6 hidden md:block" />
          </div>
        </div>
        <div className="flex gap-x-6 mt-4">
          <div className="hidden md:block md:invisible"><img src={maersk} alt="" /></div>
          <div className="flex-1 grid grid-cols-3">
            <div>
              <p className="text-sm grey-text font-light">Departure Date</p>
              <p className="black-text-3 text-sm mt-2 font-normal">{rate?.rates_data?.sailing_date ? moment(rate?.rates_data?.sailing_date).format("DD-MM-YYYY") : "N/A"}</p>
            </div>
            <div>
              <p className="text-sm grey-text font-light">Free Days</p>
              <p className="black-text-3 text-sm mt-2 font-normal">
                {(rate?.rates_data?.detention_days || rate?.rates_data?.demurrage_days ) ? 
                typeof rate?.rates_data?.detention_days === 'number' && typeof rate?.rates_data?.demurrage_days === 'number' ?
                rate?.rates_data?.detention_days  + rate?.rates_data?.demurrage_days + " days" :
                typeof rate?.rates_data?.detention_days !== 'number' && typeof rate?.rates_data?.demurrage_days === 'number' ?
                0 + rate?.rates_data?.demurrage_days + " days" : 
                typeof rate?.rates_data?.detention_days === 'number' && typeof rate?.rates_data?.demurrage_days !== 'number' ?
                rate?.rates_data?.detention_days + 0 + " days" :
                "N/A days" : 'N/A days' }
              </p>
            </div>
            <div>
              <p className="text-sm grey-text font-light capitalize">Transit time</p>
              <p className="black-text-3 text-sm mt-2 font-normal">
                {/* {rate?.rates_data?.transit_time
                  ? rate?.rates_data?.transit_time?.includes("Days") ? rate?.rates_data?.transit_time : rate?.rates_data?.transit_time + " days"
                  : "N/A"} */}
                {
                  rate?.rates_data?.route_schedule.length > 0 ? rate?.rates_data?.route_schedule[0]?.transitTime :
                  rate?.rates_data?.transit_time ? rate?.rates_data?.transit_time.includes("Days") ? 
                  rate?.rates_data?.transit_time : rate?.rates_data?.transit_time + " days"
                  : "N/A"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 md:p-0 gap-y-3.5 justify-center md:items-center">
        <p className="text-xl text-[#004800] mb-7 md:mb-0">{rate?.rates_data?.total_amount_usd ? formatCurrency(rate?.rates_data?.total_amount_usd, "USD") : "N/A"}</p>
        <PrimaryButtons
          title="Select"
          onClick={() => {
            // clearBooking();
            toAdditionalDetails(rate._id);
            sessionStorage.setItem("shipmentId", id)
            // setShowLogin(true);
          }}
          style={{}}
          disabled={false}
          loading={selecting_live_ocean_rate[rate._id]}
          icon={""}
        />
        <p
          className="font-light text-xs cursor-pointer text-center underline"
          onClick={() => {
            setShowModal(true);
            setSelectedRateInfo(rate);
            // sessionStorage.setItem("shipmentId", id)
          }}
        >
          View Details
        </p>
      </div>
    </div>
  );
};

const NewSingleRate = ({
  idx,
  id,
  rate,
  setShowModal,
  setSelectedRateInfo,
  toAdditionalDetails,
  setSelectedRate,
  selectedRate,
  setShowLogin,
  selecting_live_ocean_rate,
}: any) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 py-5 breakdown-border rounded-[10px] mt-4`}>
      <div className="col-span-2 bg-redd-100 pl-6 pb-6 md:right-divider">
        <div className="flex gap-x-6 mr-6 pb-6 md:pb-0 md:mr-0 border-solid border-[#F3F4F6] border-b-[1px] md:border-b-[0px]">
          <div className="flex items-center"><img src={maersk} alt="" className="w-[60px]" /></div>
          <div className="flex-1">
            <div className="flex items-center gap-x-">
              <p className="text-sm font-medium">Maersk</p>
              <p className="text-xs font-normal rounded-full text-[#059C01] bg-[#99ff7d1a] py-1 px-2">Special Rate</p>
            </div>
            <div className="flex items-center gap-x-1 grey-text-1 text-sm mt-2.5 font-light">
              <p>Valid until</p>
              <p><img src={divider} alt="" /></p>
              <p className="blur-sm">N/A</p>
            </div>
            <div className="h-[1px] bg-[#F3F4F6] w-[90%] mt-6 hidden md:block" />
          </div>
        </div>
        <div className="flex gap-x-6 mt-4">
          <div className="hidden md:block md:invisible"><img src={maersk} alt="" /></div>
          <div className="flex-1 grid grid-cols-3">
            <div>
              <p className="text-sm grey-text font-light">Departure Date</p>
              <p className="black-text-3 text-sm mt-2 font-normal blur-[4px]">N/A days</p>
            </div>
            <div>
              <p className="text-sm grey-text font-light">Free Days</p>
              <p className="black-text-3 text-sm mt-2 font-normal blur-[4px]">N/A days</p>
            </div>
            <div>
              <p className="text-sm grey-text font-light capitalize">Transit time</p>
              <p className="black-text-3 text-sm mt-2 font-normal blur-[4px]">N/A days</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col p-6 md:p-0 gap-y-3.5 justify-center md:items-center">
        <p className="text-xl text-[#004800] mb-7 md:mb-0 blur">{rate?.rates_data?.total_amount_usd ? formatCurrency(rate?.rates_data?.total_amount_usd, "USD") : "N/A000"}</p>
        <PrimaryButtons
          title="Select"
          style={{ width: "150px" }}
          disabled={true}
          // loading={selecting_live_ocean_rate[rate?._id]}
          icon={""}
        /> 
        <p className="font-light text-xs cursor-pointer text-center underline">View Details</p>
      </div>
    </div>
  );
};

const OpenFreightRates = (props: any) => {
  const {
    rateLoading,
    error,
    getting_booking,
    booking_data,
    getBookingDetailsById,
    live_rates,
    live_rate_loading,
    getLiveRate,
    selectLiveOceanRate,
    selecting_live_ocean_rate,
    clearBooking,
    clearBookingErrors
  } = props;

  const [loadingText, setLoadingText] = useState("");

  const [selectedRate, setSelectedRate] = useState("");
  const [selectedRateInfo, setSelectedRateInfo] = useState({});

  const [g_currency, setGlobalCurrency] = useState<string>("USD");

  const [showModal, setShowModal] = useState(false);

  const [rateType, setRateType] = useState("");

  const [showLogin, setShowLogin] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const [showRateType, setShowRateType] = useState(false);

  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const [liveRates, setLiverates] = useState<any[]>([]);

  const [spotRate, setSpotRate] = useState(false);
  const [specialRate, setSpecialRate] = useState(false);

  const [searchParams] = useSearchParams();
  const sharing = searchParams.get("sharing");
  const emailfromAdmin = searchParams.get("email");

  const [showRateEmail, setShowRateEmail] = useState<any>(null);

  useEffect(()  => {
      //@ts-ignore
      if((emailfromAdmin) || (!sharing)){
        setShowRateEmail(false)
      }else{
        setShowRateEmail(true)
      }
   
    
  }, [emailfromAdmin, sharing])

  const navigate = useNavigate();

  const params = useParams();
  const { id } : { id?: string | undefined } = params;

  const closeModal = () => {
    setShowModal(false);
  };

  const closeContactModal = () => {
    setShowContactModal(false);
  };

  const closeLoginModal = () => {
    setShowLogin(false);
  }

  const toAdditionalDetails = (rateId) => {
    selectLiveOceanRate(
      {
        shipment_id: id,
        rate_result_id: rateId,
        currency: "USD",
      },
      () => {
        setShowLogin(true);
        setShowModal(false);
      }
    ); 
  };

  // console.log("dre>>>", sharing);
  // console.log("id >>+", id)
  // console.log("emailAdmin>>>", emailfromAdmin, typeof emailfromAdmin);
  // console.log('livee_rates>>>', live_rates);
  // console.log('showRateEmail>>', showRateEmail)

  //() => navigate(`/shipment-information/${id}`, { state: { id: id } })

  //fetching booking details
  useEffect(() => {
    id && getBookingDetailsById(id);
  }, []);

  // function fetches live rates based on type; type = quickest delivery or lowest prices
  const getLiveRateType = useCallback(() => {
    getLiveRate({
      id: id,
      query: `type=${rateType}`,
    });
  }, [id, rateType]);

  useEffect(() => {
    clearBookingErrors();
    if(showLogin === false){
      id && getLiveRateType();
    }
  }, [showLogin])

  //does the actual live rate fetching
  useEffect(() => {
    id && getLiveRateType();
  }, [getLiveRateType]);

  useEffect(() => {
    setLiverates(live_rates?.ocean_freight);
  }, [live_rates?.ocean_freight]);

  useEffect(() => {
    const original = [live_rates?.ocean_freight];
    if (spotRate && specialRate) {
      setLiverates(original[0]);
    } else if (!spotRate && !specialRate) {
      setLiverates(original[0]);
    } else if (spotRate) {
      setLiverates((prev) =>
        prev.filter((item) => item.rates_data.offer_type === "SPOT")
      );
    } else if (specialRate) {
      setLiverates((prev) =>
        prev.filter((item) => item.rates_data.offer_type === "CONTRACT")
      );
    }
  }, [spotRate, specialRate]);

  console.log("details>>>", booking_data);
  console.log("ratesHH>>>", live_rates);
  // console.log("selectedRateInfo>>>", selectedRateInfo)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showRateType && ref.current && !ref.current.contains(e.target)) {
        setShowRateType(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showRateType]);

  // console.log("spot>>>", spotRate);

  return (
    <>
      <Navbar isNav={false} />
      <main className="px-4 pt-8 pb-8 lg:pt-10 lg:px-10 max-w-[914px] mx-auto">
        {getting_booking ? (
          <PageLoading title="freight details." />
        ) : (
          <>
              <div style={{filter: `${showRateEmail ? 'blur(6px)' : ''}`}}>
                {/* <div className="mb-9">
                  <h1 className="black-text-2 text-2xl">Ocean Freight</h1>
                  <p className="black-text-4 text-sm font-light mt-1.5">Please provide the details of the freight</p>
                </div> */}
                <div className="pb-8 border-b-[0px] border-solid border-[#EAEFEB]">
                  <div className="rounded solid-br bg-[#109b320d]">
                    <div className="pl-8 py-5 pr-6 flex items-center border-b-[1px] border-solid border-[#e5e7eb]">
                      <p className="black-text-3 text-lg font-normal">
                        Ocean Freight Summary
                      </p>
                      {/* <Link
                        to={`/freight-details/${id}`}
                        state={{
                          shipId: id,
                          shipmentCategory: "ExportOcean Freight",
                        }}
                        className="flex items-center gap-1 ml-auto text-base"
                      >
                        <img src={pencil} alt="" />
                        <span className="green-text hidden lg:block">
                          Edit details
                        </span>
                      </Link> */}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 px-8 py-6">
                      <div className="lg:border-r-[1px] border-solid border-[#e5e7eb]">
                        {/* <p className="black-text-4 text-base font-normal">Freight Details</p> */}
                        <div className="flex items-center gap-2">
                          <span><img className="min-w-[32px]" src={port} alt="" /></span>
                          <div className="">
                            <p className="grey-text font-light text-sm mb-1">Port of Loading</p>
                            <p className="black-text-4 text-sm font-medium">{booking_data?.origin_port}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:border-r-[1px] border-solid border-[#e5e7eb] lg:pl-4 lg:pr-2">
                        <div className="flex items-center gap-2">
                          <span><img className="min-w-[32px]" src={destination} alt="" /></span>
                          <div className="">
                            <p className="grey-text font-light text-sm mb-1">Port of Destination</p>
                            <p className="black-text-4 text-sm font-medium">{booking_data?.destination_port}</p>
                          </div>
                        </div>
                      </div>
                      <div className="lg:pl-4 flex flex-col">
                        <div className="flex items-center gap-2">
                          <span><img className="min-w-[32px]" src={calendar} alt="" /></span>
                          <div className="">
                            <p className="grey-text font-light text-sm mb-1">Cargo Ready Date</p>
                            <p className="black-text-4 text-sm font-medium">{moment(booking_data?.cargo_ready_date).format("DD-MM-YYYY")}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              <div className="relative">
                <div className="relative z-[200]">
                  <div className="md:py-8 md:pl-6 md:pr-8 md:border-solid md:border-[1px] md:border-[#F3F4F6] rounded">
                    <p className="text-lg black-text-2">Select an Ocean Freight Rate</p>
                    {/* <p className="text-sm black-text-4">View all avaliable rates</p> */}
                    {/* <p className="text-xs" onClick={() => setShowModal(true)}>modal open</p> */}
                    <div className="mt-4 flex justify-between">
                      <div className="flex gap-x-3">
                        <div className="relative" ref={ref}>
                          <div
                            className={`flex items-center gap-x-2 text-sm text-[#1F2937] border-grey-2 py-2 px-4 rounded-lg cursor-pointer`}
                            onClick={() => {
                              !live_rate_loading
                                ? setShowRateType(!showRateType)
                                : setShowRateType(false);
                            }}
                          >
                            <p>All rates</p>
                            <img src={caret} alt="" />
                          </div>
                          {showRateType && (
                            <div className="absolute top-12 left-0 py-3.5 px-3 bg-white rounded shadow-[1px_12px_60px_rgba(0,0,0,0.19)] w-[147px]">
                              <div className="flex gap-x-1.5">
                                <CustomCheckBox
                                  name=""
                                  id=""
                                  label=""
                                  isRequired={true}
                                  defaultChecked={spotRate}
                                  isDisabled={false}
                                  onChange={(e: boolean) =>
                                    setSpotRate(!spotRate)
                                  }
                                />
                                <p className="font-light text-sm text-[#34373F] pb-1 bottom-divider-2 mb-2.5 cursor-pointer">
                                  Spot Rates{" "}
                                </p>
                              </div>
                              <div className="flex gap-x-1.5">
                                <CustomCheckBox
                                  name=""
                                  id=""
                                  label=""
                                  isRequired={true}
                                  defaultChecked={specialRate}
                                  isDisabled={false}
                                  onChange={(e: boolean) =>
                                    setSpecialRate(!specialRate)
                                  }
                                />
                                <p className="font-light text-sm text-[#34373F] pb-1 bottom-divider-2 cursor-pointer">
                                  Special Rates{" "}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                        <button
                          className={`text-sm text-[#1F2937] border-grey-2 py-2 px-4 rounded-lg ${rateType === "quickest"
                            ? "bg-[#1F2937] text-[#FFF]"
                            : ""
                            }`}
                          onClick={() => {
                            setRateType("quickest");
                            setLoadingText("with quickest delivery");
                            // setSelectedRateInfo({});
                          }}
                          disabled={live_rate_loading || rateType === "quickest"}
                        >
                          Quickest
                        </button>
                        <button
                          className={`text-sm text-[#1F2937] border-grey-2 py-2 px-4 rounded-lg ${rateType === "cheapest"
                            ? "bg-[#1F2937] text-[#FFF]"
                            : ""
                            }`}
                          onClick={() => {
                            setRateType("cheapest");
                            setLoadingText("with cheapest prices");
                            // setSelectedRateInfo({});
                          }}
                          disabled={live_rate_loading || rateType === "cheapest"}
                        >
                          Cheapest
                        </button>
                      </div>
                      {/* <div className="hidden md:flex">
                                              <CurrencyDropdown
                                                  setGlobalCurrency={setGlobalCurrency}
                                                  rateLoading={false}
                                                  currencyIn={'NGN'}
                                              />
                                          </div> */}
                    </div>
                  </div>
                  {live_rate_loading ? (
                    <div className="pt-5 pb-3">
                      <LoadingSpinner
                        loadingText={"Loading shipping liners " + loadingText}
                      />
                    </div>
                  ) : (
                    <div className={`flex flex-col gap-y-6 ${liveRates?.length > 0 ? "mt-8" : ""}`}>
                      {!sharing ? <NewSingleRate /> : liveRates?.length > 0 ? (
                        <>
                          {liveRates.map((rate, idx) => (
                            <SingleRate
                              //@ts-ignore
                              idx={idx}
                              id={id}
                              key={rate._id}
                              rate={rate}
                              selectedRate={selectedRate}
                              setShowModal={setShowModal}
                              setSelectedRateInfo={setSelectedRateInfo}
                              toAdditionalDetails={toAdditionalDetails}
                              setSelectedRate={setSelectedRate}
                              setShowLogin={setShowLogin}
                              selecting_live_ocean_rate={selecting_live_ocean_rate}
                            />
                          ))}
                        </>
                      ) : (
                        <div className="flex justify-center items-center border-solid border-[#F3F4F6] border-r-[1px] border-b-[1px] border-l-[1px]  rounded">
                          <NoRateSelected
                            setShowContactModal={setShowContactModal}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {!live_rate_loading && !sharing && <div className="h-[700px] lg:h-[820px] w-full absolute open-rates top-0 left-0 z-[50] flex flex-col items-center justify-end pb-[120px]">
                  <h2 className="sato mb-3 text-lg text-center lg:text-2xl black-text-2">Want to view our exclusive special rates?</h2>
                  <p className="black-text-4 mb-14 max-w-[300px] text-center font-light sato">Sign in or create an account to view all <span className="green-text-2 font-medium">{live_rates?.total_rates > 0 ? live_rates?.total_rates : ''}</span> rates for this port pair.</p>
                  <Button
                    title="Create an Account"
                    style={{ width: "270px" }}
                    onClick={() => {
                      navigate("/signup");
                      id !== undefined && sessionStorage.setItem("openShipmentId", id)
                    }}
                  />
                  <p className="black-text text-sm mt-7 sato">Already have an account? <Link to='/signin' onClick={() => id !== undefined && sessionStorage.setItem("openShipmentId", id)} className="green-text-2 text-sm sato">Sign in</Link></p>
               </div>}
              </div>

              </div>
            

            <Modal
              isOpen={showModal}
              style={customStyles}
              shouldCloseOnOverlayClick={true}
              shouldCloseOnEsc={true}
              contentLabel="Select rate modal"
              className={"newratemodal"}
              ariaHideApp={false}
            >
            <OceanRateFurtherInformation
              id={id}
              closeModal={closeModal}
              selectedRateInfo={selectedRateInfo}
              getting_rates={false}
              toAdditionalDetails={toAdditionalDetails}
              selecting_live_ocean_rate={selecting_live_ocean_rate}
              clearBooking={clearBooking}
            />
            </Modal>
            <OfapLogin
              id={id}
              isOpen={showLogin}
              closeModal={closeLoginModal}
            />
            <OfapRateEmailModal
              id={id}
              isOpen={showRateEmail}
              setShowRateEmail={setShowRateEmail}
            />
            {(!booking_data?.admin_id && sharing) && <OfapInvalidEmail />}
            <OpenRatesContact
              id={id}
              isOpen={showContactModal}
              closeModal={closeContactModal}
              booking_data={booking_data}
              setShowSuccessModal={setShowSuccessModal}
            />
            <SuccessModal
              toDashboard={false}
              modalIsOpen={showSuccessModal}
              setShowSuccessModal={setShowSuccessModal}
              heading={"Message Sent"}
              text={"Thank you for contacting support, our team will reach out to you soon."}
            />
          </>
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  const {
    error,
    getting_booking,
    booking_data,
    live_rates,
    live_rate_loading,
    selecting_live_ocean_rate,
  } = state.booking;

  return {
    error,
    getting_booking,
    booking_data,
    live_rates,
    live_rate_loading,
    selecting_live_ocean_rate,
  };
};

export default connect(mapStateToProps, {
  getBookingDetailsById,
  getLiveRate,
  selectLiveOceanRate,
  clearBooking,
  clearBookingErrors
})(OpenFreightRates);
