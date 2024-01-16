import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

//components
import AdditionalCharges from "./AdditionalCharges";

//icons
import clock from "assets/icons/clock.svg";
import chevronDown from "assets/icons/chevron-down.svg";
import chevronUp from "assets/icons/chevron-up.svg";

//helpers
import { formatCurrency } from "helpers";

//logos
import Kobo360 from "assets/logos/kobo.png";
import Maersk from "assets/logos/maersk.png";

const SingleRate = (props: any) => {
  const { selectedRate, onSelectRate, id, rate, loading, currency } = props;
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  return (
    <>
      {/* //single rate */}
      <div
        className={`${
          selectedRate === id ? "active-br" : "solid-br"
        } rounded mb-5 p-2`}
        key={id}
      >
        <div className="flex w-100">
          <div className="right-divider lg:w-3/4">
            <div className="p-2 bottom-divider flex items-center">
              {selectedRate === id ? (
                <i className="ion-ios-checkmark-circle green-text lg:text-2xl text-lg mr-2"></i>
              ) : (
                <i
                  className="ion-ios-radio-button-off lg:text-2xl text-lg mr-2"
                  style={{ color: "#989898" }}
                ></i>
              )}

              {/* <img
                src={images[rate?.productOffer?.carrierScac]}
                alt=""
                width={160}
              /> */}
              <p className="text-sm black-text font-semibold">
                {rate.carrier_name}
                <br className="lg:hidden" />
                <span className="text-xs grey-text font-medium lg:ml-4">
                  Valid till{" "}
                  {rate.valid_from
                    ? moment(rate.valid_from).format("Do, MMM YYYY")
                    : "N/A"}{" "}
                </span>
              </p>
            </div>
            <div className="p-5 ">
              {/* <div className="lg:grid grid-cols-2"> */}
              <div className="items-center">
                <div className="flex lg:w-1/3 ">
                  <div className="flex items-center">
                    {/* <i className="fa fa-calendar mr-2"></i> */}
                    <p className="text-xs font-semibold black-text">
                      Offer Type
                    </p>
                  </div>

                  <p className="text-xs  black-text ml-auto">
                    {rate.offer_type}
                  </p>
                </div>

                <div className="flex lg:w-1/3  my-3">
                  <p className="text-xs font-semibold black-text">
                    Transit Time
                  </p>

                  <p className="text-xs  black-text ml-auto">
                    {rate.transit_time ? rate.transit_time : "N/A"}
                  </p>
                </div>

                <div className="flex lg:w-1/3 ">
                  <p className="text-xs font-semibold black-text">
                    Sailing Date
                  </p>

                  <p className="text-xs  black-text ml-auto">
                    {moment(rate.sailing_date).format("Do, MMM YYYY")}
                  </p>
                </div>
              </div>
              <div className=""></div>
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center lg:w-1/4">
            <div className="flex mb-3">
              <p className="black-text font-semibold text-xl">
                {formatCurrency(
                  currency === "USD"
                    ? rate?.total_amount_usd
                    : rate?.total_amount_ngn,
                  currency
                )}
              </p>
              {/* <p className="grey-text ml-1 font-semibold text-xl">
                {" "}
                {currency === "USD" ? "USD" : "NGN"}
              </p> */}
            </div>
            <div
              className={`${
                selectedRate === id ? "bg-dark-grey" : "bg-green"
              } flex justify-center items-center rounded lg:w-32 w-20 py-2 cursor-pointer`}
              onClick={() => onSelectRate(id)}
            >
              <p className="white-text font-semibold lg:text-sm text-xs">
                {loading && <i className="fa fa-spinner fa-pulse mr-2"></i>}
                {selectedRate === id ? "Selected" : "Select"}
              </p>
            </div>
            <div
              className="flex items-center mt-2 cursor-pointer"
              onClick={() => {
                setShowAdditionalCharges(!showAdditionalCharges);
              }}
            >
              <p className="black-text text-xs mr-2 ml-2 lg:ml-0">
                Additional charges apply
              </p>
              <img
                src={showAdditionalCharges ? chevronUp : chevronDown}
                alt=""
                width={16}
              />
            </div>
          </div>
        </div>

        {showAdditionalCharges ? (
          <>
            <AdditionalCharges
              currency={currency}
              charges={rate?.charge_breakdown}
              totalCharge={
                currency === "USD"
                  ? rate?.total_amount_usd
                  : rate?.total_amount_ngn
              }
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {/* end single rate */}
    </>
  );
};

export default SingleRate;
