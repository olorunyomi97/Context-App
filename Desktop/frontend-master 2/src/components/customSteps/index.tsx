import React, { FC } from "react";
import "./index.css";

interface Props {
  currentStep: number;
}
const CustomSteps: FC<Props> = ({ currentStep }): JSX.Element => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-center w-full">
        <i
          className={`white-text text-3xl ${
            currentStep > 1
              ? "ion-ios-checkmark-circle"
              : "ion-ios-radio-button-on"
          }`}
        ></i>
        <hr
          className={`flex-auto ${
            currentStep >= 2 ? "step-border-active" : "step-border"
          }`}
        />
        <i
          className={`white-text text-3xl ${
            currentStep > 2
              ? "ion-ios-checkmark-circle"
              : currentStep > 1
              ? "ion-ios-radio-button-on"
              : "ion-ios-radio-button-off"
          }`}
        ></i>
        <hr
          className={`flex-auto ${
            currentStep >= 3 ? "step-border-active" : "step-border"
          }`}
        />
        <i
          className={`white-text text-3xl ${
            currentStep > 3
              ? "ion-ios-checkmark-circle"
              : currentStep > 2
              ? "ion-ios-radio-button-on"
              : "ion-ios-radio-button-off"
          }`}
        ></i>
      </div>
    </div>
  );
};

export default CustomSteps;
