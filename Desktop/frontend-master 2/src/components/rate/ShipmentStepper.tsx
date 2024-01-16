import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//icons
import divider from "assets/icons/divider.svg";

const StepperNumber = ({
  number,
  text,
  selected,
  currentPath,
}: {
  number: string;
  text: string;
  selected: string;
  currentPath: any;
}) => (
  <>
    <div className="stepper flex space-x-3 mobile-only">
      <span
        className={`${
          selected === number
            ? "solid-green-br green-text-2"
            : "solid-br grey-text-1"
        } ${
          currentPath.details && number === "1"
            ? "stepper-selected white-text"
            : ""
        } ${
          currentPath.shippingLiners && number === "2"
            ? "stepper-selected white-text"
            : ""
        } border-solid border-[1px] solid-br text-sm rounded-full flex items-center justify-center w-[26px] h-[26px]`}
      >
        {number}
      </span>
      <span
        className={`${
          currentPath.shippingLiners && number === "2"
            ? "steppertext-selected"
            : ""
        }  ${
          selected === number ? "green-text-2" : "black-text-4"
        } font-normal`}
      >
        {number === selected ? text : null}
      </span>
    </div>
    <div className="flex space-x-3 desktop-only">
      <span
        className={`${
          selected === number
            ? "solid-green-br green-text-2"
            : "solid-br grey-text-1"
        } ${
          currentPath.details && number === "1"
            ? "stepper-selected white-text"
            : ""
        } ${
          currentPath.shippingLiners && number === "2"
            ? "stepper-selected white-text"
            : ""
        } border-solid border-[1px] text-sm rounded-full flex items-center justify-center w-[26px] h-[26px]`}
      >
        {number}
      </span>
      <span
        className={`${
          currentPath.shippingLiners && number === "2"
            ? "steppertext-selected"
            : ""
        }  ${
          selected === number ? "green-text-2" : "black-text-4"
        } font-normal`}
      >
        {text}
      </span>
    </div>
  </>
);

const ShipmentStepper = () => {
  const location = useLocation();
  const [selected, setSelected] = useState("1");
  const [currentPath, setCurrentPath] = useState({
    details: false,
    shippingLiners: false,
    additional: false,
  });
  useEffect(() => {
    if (location.pathname) {
      if (location.pathname.includes("details")) {
        setCurrentPath({ ...currentPath, details: false });
        setSelected("1");
      } else if (location.pathname.includes("shipping-liners")) {
        setCurrentPath({
          ...currentPath,
          details: true,
          shippingLiners: false,
          additional: false,
        });
        setSelected("2");
      } else if (location.pathname.includes("additional")) {
        setCurrentPath({
          ...currentPath,
          details: true,
          shippingLiners: true,
          additional: true,
        });
        setSelected("3");
      }
    }
  }, []);

  return (
    <>
      <div>
        <div className="flex items-center space-x-2">
          <p className="text-2xl grey-text">Export</p>
          <img src={divider} alt="divider" />
          <span className="text-2xl">Ocean Freight</span>
        </div>
        <p className="text-sm black-text-4 mt-1">
          Please provide the details of the freight
        </p>

        <div className="mt-8 pb-6 flex space-x-5 bottom-divider">
          <StepperNumber
            number="1"
            text="Ocean Freight Details"
            selected={selected}
            currentPath={currentPath}
          />
          <StepperNumber
            number="2"
            text="Select Shipping liners"
            selected={selected}
            currentPath={currentPath}
          />
          <StepperNumber
            number="3"
            text="Additional services"
            selected={selected}
            currentPath={currentPath}
          />
        </div>
      </div>
      <div className="pb-5"></div>{" "}
      {/**to counter the effect of collapsing margin */}
    </>
  );
};

export default ShipmentStepper;
