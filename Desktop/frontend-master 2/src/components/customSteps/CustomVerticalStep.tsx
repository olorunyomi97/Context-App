import React, { FC } from "react";
import "./index.css";

const CustomVerticalSteps = (props: any): JSX.Element => {
  const { steps, currentStep } = props;

  const totalStep = steps ? steps.length : 0;

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {steps &&
          steps.map((step, id) => {
            return (
              <>
                <div className="flex items-center">
                  <i
                    className={` text-3xl ion-ios-checkmark-circle ${
                      currentStep > id ? "green-text" : "semi-grey-text"
                    }`}
                  ></i>

                  <div className=" ml-3 ">
                    {" "}
                    <p className="text-sm black-text font-bold">{step.title}</p>
                    <p className="text-xs black-text font-semibold">
                      {step.location}
                    </p>
                    <p className="text-xs grey-text font-medium">{step.date}</p>
                  </div>
                </div>

                {totalStep - 1 === id ? (
                  <></>
                ) : (
                  <div
                    className={`${
                      currentStep >= id + 1
                        ? "step-border-v-active"
                        : "step-border-v"
                    } p-3 ml-3`}
                  >
                    {" "}
                  </div>
                )}
              </>
            );
          })}

        {/* <div
          className={`  ${
            currentStep >= 0 ? "step-border-v-active" : "step-border-v"
          }`}
        ></div> */}

        {/* <i
          className={` text-3xl ion-ios-checkmark-circle ${
            currentStep > 2 ? "green-text" : "grey-text"
          }`}
        ></i> */}
      </div>
    </div>
  );
};

export default CustomVerticalSteps;
