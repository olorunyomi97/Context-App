import React from "react";

//logos
import Traction from "assets/logos/traction.png";

const SingleLoanProvider = (props: any) => {
  const { selectedLoanProvider, onSelectLoanProvider, id } = props;

  return (
    <>
      <div
        className={`${
          selectedLoanProvider === id ? "active-br" : "solid-br"
        } rounded cursor-pointer mb-5 p-5`}
        onClick={() => onSelectLoanProvider(id)}
        key={id}
      >
        <div className="flex items-center ">
          <div className="w-1.5/5">
            {selectedLoanProvider === id ? (
              <i className="ion-ios-checkmark-circle green-text text-2xl mr-2"></i>
            ) : (
              <i
                className="ion-ios-radio-button-off text-2xl mr-2"
                style={{ color: "#989898" }}
              ></i>
            )}

            <img src={Traction} alt="" width={250} className="ml-5" />
          </div>

          <div className="w-2.5/5 px-10 mx-10">
            <p className="text-sm grey-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut l
            </p>
          </div>

          <div className="w-1/5 place-self-center">
            <div
              className={`${
                selectedLoanProvider === id ? "bg-dark-grey" : "bg-green"
              } flex justify-center items-center rounded w-36 py-3`}
            >
              <p className="white-text font-semibold text-sm">
                {selectedLoanProvider === id ? "Selected" : "Select"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleLoanProvider;
