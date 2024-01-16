import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//icons
import norate from "assets/icons/norate.svg";
import chevronDown from "assets/icons/chevron-down.svg";
import chevronUp from "assets/icons/chevron-up.svg";
import trailpoint from "assets/icons/trailpoint.svg";
import trailline from "assets/icons/trail-line.svg";
import divider from "assets/icons/charge-divider.svg";
import close from "assets/icons/close.svg";

//helper
import { formatCurrency } from "helpers";
import { calculateTotalOceanFreight } from "helpers/oceanFreight";

//components
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import OutlineButton from "components/buttons/OutlineButton";

//libraries
var converter = require("number-to-words");

const NoRateSelected = () => (
  <div className="text-center flex flex-col justify-center">
    <img src={norate} alt="" />
    <div className="mt-10">
      <p className="text-xl grey-text">No Rate Selected</p>
      <p className="text-sm grey-text-1 max-w-[220px]">
        Kindly select a rate to view the payment breakdown
      </p>
    </div>
  </div>
);

interface FurtherInfoProps {
  id?: any;
  closeModal?: any;
  selectedRateInfo?: any;
  getting_rates?: any;
  toAdditionalDetails?: any;
  selecting_live_ocean_rate?: any;
  clearBooking?: any;
}

const OceanRateFurtherInformation = ({
    id,
    closeModal,
    selectedRateInfo,
    getting_rates,
    toAdditionalDetails,
    selecting_live_ocean_rate,
    clearBooking }: FurtherInfoProps) => {

  const [showScheduleDetails, setShowScheduleDetails] = useState(false);
  const [oceanFreight, setOceanFreight] = useState(0);
  const [open, setOpen] = useState(true); //array that stores the true/false state of the loads based on the open state



  useEffect(() => {
    if (Object.entries(selectedRateInfo).length) {
      setOceanFreight(
        calculateTotalOceanFreight(
          selectedRateInfo?.rates_data?.charge_breakdown?.ocean_charges
        )
      );
    }
  }, [selectedRateInfo]);

  //when a load is clicked it takes the index of that load and spreads the array and sets it's open state to it's opposite, for this instance it is initially null which is equals to false in js so it makes it true
  // const toggle = (index) => {
  //   const temp = [...open];
  //   //@ts-ignore
  //   temp[index] = !temp[index];
  //   setOpen([...temp]);
  // };

  // console.log("open>>>", open);

  // console.log("singleInfo>>>", selectedRateInfo);

  return (
    <div>
      <div className="pb-6 bottom-divider-2 px-6 pt-6">
        <div className="flex justify-between items-center">
          <p className="text-base md:text-lg xl:text-xl flex flex-col xl:flex-row xl:gap-x-2">
            <span className="grey-text">
              {selectedRateInfo.rates_data.carrier_name}
            </span>
          </p>
          <span className="cursor-pointer" onClick={closeModal}>
            <img src={close} alt="" />
          </span>
        </div>
      </div>
      {selectedRateInfo._id === undefined ? (
        <div className="flex justify-center items-center py-28">
          <NoRateSelected />
        </div>
      ) : (
        <>
          <div className="pt-6 layout-5 px-6">
            <div className="flex flex-col md:flex-row justify-between gap-y-6">
              <div>
                <p className="text-base black-text-3 mb-1">Charge Details</p>
                <p className="text-sm grey-text font-light">
                  Payment breakdown
                </p>
              </div>
              <div>
                <p className="text-sm grey-text font-light mb-1 text-right">
                  Total freight charge
                </p>
                <p className="text-xl text-[#004800] font-normal text-right">
                  {formatCurrency(
                    selectedRateInfo?.rates_data?.total_amount_usd,
                    "USD"
                  )}
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-y-4">
              <div>
                <div
                  className="border-grey py-4 pl-4 pr-5 rounded flex justify-between items-center cursor-pointer"
                  onClick={() => setOpen(!open)}
                >
                  <p className="flex items-center gap-x-2">
                    <span className="text-sm grey-text font-light">
                      Freight breakdown
                    </span>
                    {/* <span>
                      <img src={divider} alt="" />
                    </span>
                    <span className="text-sm black-text-2">
                      {formatCurrency(
                        calculateTotalOceanFreight(
                          selectedRateInfo?.rates_data?.charge_breakdown
                            ?.ocean_charges[0]
                        ),
                        "USD"
                      )}
                    </span> */}
                  </p>
                  <span>
                    <img src={open ? chevronUp : chevronDown} alt="" />
                  </span>
                </div>
                {open && (
                  <div>
                    {selectedRateInfo?.rates_data?.charge_breakdown?.ocean_charges[0].map(
                      (value, idx) => (
                        <div
                          key={idx}
                          className="border-solid border-[1px] px-4 border-[#F3F4F6] border-t-0"
                        >
                          <div className="flex flex-col gap-y-6 xl:gap-y-0 xl:flex-row xl:justify-between xl:items-center py-5">
                            <div>
                              <p className="text-sm black-text-4 uppercase">
                                {value.description}
                              </p>
                              {/* <p className="text-sm font-light grey-text xl:max-w-[210px]">This charge covers your ocean freight transport</p> */}
                            </div>
                            <p className="text-lg black-text-2">
                              {formatCurrency(value.amountUsd, "USD")}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-[#FBFBFB] mx-6 mt-6 mb-6 xl:mt-0">
              <div
                className="p-6 flex justify-between items-center cursor-pointer"
                onClick={() => setShowScheduleDetails(!showScheduleDetails)}
              >
                <div>
                  <p className="text-base font-medium black-text-3 mb-1">
                    Schedule Details{" "}
                  </p>
                  <p className="grey-text text-sm">
                    View the number of trips for your shipment
                  </p>
                </div>
                <span>
                  <img
                    src={showScheduleDetails ? chevronUp : chevronDown}
                    alt=""
                  />
                </span>
              </div>
              {showScheduleDetails && (
                <>
                  {selectedRateInfo?.rates_data?.carrier_name === "CMA CGM" ? (
                    <>
                      {selectedRateInfo?.rates_data?.route_schedule.length >
                      0 ? (
                        <>
                          <div className="top-divider p-6 relative">
                            <div className="mb-8 flex items-center gap-x-8">
                              <span>
                                <img src={trailpoint} alt="" />
                              </span>
                              <div>
                                <p className="text-[13px] font-medium text-[#344336]">
                                  Origin Port
                                </p>
                                <p className="text-[15px] black-text-3">
                                  {
                                    selectedRateInfo?.rates_data
                                      ?.route_schedule[0].fromLocation.siteName
                                  }{" "}
                                  (
                                  {
                                    selectedRateInfo?.rates_data
                                      ?.route_schedule[0].fromLocation.unLocCode
                                  }
                                  )
                                </p>
                              </div>
                            </div>
                            {selectedRateInfo?.rates_data?.route_schedule[0].scheduleDetails
                              .slice(
                                selectedRateInfo?.rates_data?.route_schedule[0].scheduleDetails.indexOf(
                                  selectedRateInfo?.rates_data
                                    ?.route_schedule[0].scheduleDetails[0]
                                ),
                                selectedRateInfo?.rates_data?.route_schedule[0]
                                  .scheduleDetails.length - 1
                              )
                              .map((val, index) => (
                                <div
                                  key={index}
                                  className="mb-8 flex items-center gap-x-8"
                                >
                                  <span>
                                    <img src={trailpoint} alt="" />
                                  </span>
                                  <div>
                                    <p className="text-[13px] font-medium text-[#344336]">
                                      {converter
                                        .toWordsOrdinal(index + 1)
                                        .charAt(0)
                                        .toUpperCase() +
                                        converter
                                          .toWordsOrdinal(index + 1)
                                          .slice(1)}{" "}
                                      stop
                                    </p>
                                    <p className="text-[15px] black-text-3">
                                      {val.toLocation.portName}
                                    </p>
                                  </div>
                                </div>
                                // <p>hello</p>
                              ))}
                            {/* <div className="mb-8 flex items-center gap-x-8">
                            <span><img src={trailpoint} alt="" /></span>
                            <div><p className="text-[13px] font-medium text-[#344336]">First Stop</p>
                              <p className="text-[15px] black-text-3">Apapa Lagos (NGAPP)</p>
                            </div>
                          </div> */}
                            {/* <div className="mb-8 flex items-center gap-x-8">
                            <span>
                              <img src={trailpoint} alt="" />
                            </span>
                            <div>
                              <p className="text-[13px] font-medium text-[#344336]">
                                Second Stop
                              </p>
                              <p className="text-[15px] black-text-3">
                                Apapa Lagos (NGAPP)
                              </p>
                            </div>
                          </div> */}
                            <div className="flex items-center gap-x-8">
                              <span>
                                <img src={trailpoint} alt="" />
                              </span>
                              <div>
                                <p className="text-[13px] font-medium text-[#344336]">
                                  Final Stop
                                </p>
                                <p className="text-[15px] black-text-3">
                                  {
                                    selectedRateInfo?.rates_data
                                      ?.route_schedule[0].toLocation.siteName
                                  }{" "}
                                  (
                                  {
                                    selectedRateInfo?.rates_data
                                      ?.route_schedule[0].toLocation.unLocCode
                                  }
                                  )
                                </p>
                              </div>
                            </div>
                            <img
                              className="absolute top-14 left-[32px]"
                              style={{
                                height:
                                  selectedRateInfo?.rates_data
                                    ?.route_schedule[0].scheduleDetails.length *
                                  65,
                                width: "1px",
                              }}
                              src={trailline}
                              alt=""
                            />
                          </div>
                        </>
                      ) : (
                        <p className="p-6 bg-white bottom-divider text-red-500 font-normal">
                          Schedule details not available at the moment.
                        </p>
                      )}
                    </>
                  ) : (
                    <>
                      {selectedRateInfo?.rates_data?.route_schedule.length >
                      0 ? (
                        <>
                          {selectedRateInfo?.rates_data?.route_schedule.map(
                            (item, index) => (
                              <div className="top-divider p-6 relative">
                                <div className="mb-8 flex items-center gap-x-8">
                                  <span>
                                    <img src={trailpoint} alt="" />
                                  </span>
                                  <div>
                                    <p className="text-[13px] font-medium text-[#344336]">
                                      Origin Port
                                    </p>
                                    <p className="text-[15px] black-text-3">
                                      {item.fromLocation.siteName} (
                                      {item.fromLocation.unLocCode})
                                    </p>
                                  </div>
                                </div>
                                {item.scheduleDetails
                                  .slice(
                                    item.scheduleDetails.indexOf(
                                      item.scheduleDetails[0]
                                    ),
                                    item.scheduleDetails.length - 1
                                  )
                                  .map((val, index) => (
                                    <div className="mb-8 flex items-center gap-x-8">
                                      <span>
                                        <img src={trailpoint} alt="" />
                                      </span>
                                      <div>
                                        <p className="text-[13px] font-medium text-[#344336]">
                                          {converter
                                            .toWordsOrdinal(index + 1)
                                            .charAt(0)
                                            .toUpperCase() +
                                            converter
                                              .toWordsOrdinal(index + 1)
                                              .slice(1)}{" "}
                                          stop
                                        </p>
                                        <p className="text-[15px] black-text-3">
                                          {val.toLocation.portName}
                                        </p>
                                      </div>
                                    </div>
                                  ))}
                                <div className="flex items-center gap-x-8">
                                  <span>
                                    <img src={trailpoint} alt="" />
                                  </span>
                                  <div>
                                    <p className="text-[13px] font-medium text-[#344336]">
                                      Final Stop
                                    </p>
                                    <p className="text-[15px] black-text-3">
                                      {item.toLocation.siteName} (
                                      {item.toLocation.unLocCode})
                                    </p>
                                  </div>
                                </div>
                                <img
                                  className="absolute top-14 left-[32px]"
                                  style={{
                                    height: item.scheduleDetails.length * 65,
                                    width: "1px",
                                  }}
                                  src={trailline}
                                  alt=""
                                />
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <p className="p-6 bg-white bottom-divider text-red-500 font-normal">
                          Schedule details not available at the moment.
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="py-6 px-8 shadow-[0_-3px_32px_12px_rgba(0,0,0,0.18)]">
            <PrimaryButtons
              title="Select"
              onClick={() => {
                clearBooking();
                id && sessionStorage.setItem("shipmentId", id)
                toAdditionalDetails(selectedRateInfo._id);
              }}
              style={{}}
              disabled={false}
              loading={selecting_live_ocean_rate[selectedRateInfo._id]}
              icon={""}
              class_names={"newratebg"}
            />
            {/* <Link to="/shipment-information" className="newratebg inline-block font-light rounded text-white text-center py-2.5 w-full">Select</Link> */}
          </div>
        </>
      )}
    </div>
  );
};

export default OceanRateFurtherInformation;
