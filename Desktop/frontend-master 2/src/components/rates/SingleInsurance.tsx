import { useState } from "react";

//components
import AdditionalCharges from "./AdditionalCharges";

//icons
import clock from "assets/icons/clock.svg";
import chevronDown from "assets/icons/chevron-down.svg";
import chevronUp from "assets/icons/chevron-up.svg";

//logos
import Kobo360 from "assets/logos/kobo.png";
import Maersk from "assets/logos/maersk.png";

const SingleInsurance = (props: any) => {
  const { selectedInsurance, onSelectInsurance, id, insurance } = props;
  const [showAdditionalCharges, setShowAdditionalCharges] = useState(false);

  return (
    <>
      {/* //single insurance */}
      <div
        className={`${
          selectedInsurance.id === id ? "active-br" : "solid-br"
        } rounded cursor-pointer mb-5 p-5`}
        onClick={() => onSelectInsurance(insurance)}
        key={id}
      >
        <div className="flex w-100">
          <div className=" right-divider w-3/4">
            <div className=" p-4 bottom-divider flex items-center">
              {selectedInsurance.id === id ? (
                <i className="ion-ios-checkmark-circle green-text text-4xl mr-2"></i>
              ) : (
                <i
                  className="ion-ios-radio-button-off text-4xl mr-2"
                  style={{ color: "#989898" }}
                ></i>
              )}

              {/* <img src={Maersk} alt="" width={150} /> */}
              <p className="text-lg black-text font-semibold">
                {insurance?.insurer?.name}
              </p>
            </div>
            <div className="p-5 ">
              {/* <div className="lg:grid grid-cols-2"> */}
              <div className="items-center">
                <div className="flex w-2/4">
                  <p className="text-sm black-text">Start Date</p>

                  <p className="text-sm font-semibold black-text ml-auto">
                    2nd April 2022
                  </p>
                </div>

                <div className="flex w-2/4 my-3">
                  <p className="text-sm black-text">Policy type</p>

                  <p className="text-sm font-semibold black-text ml-auto">
                    3 - 7 days
                  </p>
                </div>

                <div className="flex w-2/4">
                  <p className="text-sm black-text">Value asset</p>

                  <p className="text-sm font-semibold black-text ml-auto">
                    Sundays
                  </p>
                </div>
              </div>
              <div className=""></div>
              {/* </div> */}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-1/4">
            <div className="flex mb-3">
              <p className="black-text font-semibold text-2xl">
                {insurance.price}
              </p>
              <p className="grey-text ml-1 font-semibold text-2xl">
                {" "}
                {insurance?.insurer?.currency}
              </p>
            </div>
            <div
              className={`${
                selectedInsurance.id === id ? "bg-dark-grey" : "bg-green"
              } flex justify-center items-center rounded w-36 py-3`}
            >
              <p className="white-text font-semibold text-sm">
                {selectedInsurance.id === id ? "Selected" : "Select"}
              </p>
            </div>
            <div
              className="flex items-center mt-2"
              onClick={() => {
                setShowAdditionalCharges(!showAdditionalCharges);
              }}
            >
              <p className="black-text text-sm mr-2">Cost breakdown</p>
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
              charges={insurance?.productPrice?.charges}
              totalCharge={insurance?.productPrice?.totalUSDAmount}
            />
          </>
        ) : (
          <></>
        )}
      </div>
      {/* end single insurance */}
    </>
  );
};

export default SingleInsurance;
