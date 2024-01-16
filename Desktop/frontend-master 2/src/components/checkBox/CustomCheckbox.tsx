import React, { FC, useState } from "react";
import { string, bool, func } from "prop-types";
// import "./index.css";
import { Link } from "react-router-dom";
import Checkbox from "react-custom-checkbox";

//icons
import check from "assets/icons/check.svg";

interface Props {
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  onChange: any;
  defaultChecked: boolean;
}

const CustomCheckBox: FC<Props> = ({
  name,
  id,
  label,
  isRequired,
  isDisabled,
  onChange,
  defaultChecked,
}): JSX.Element => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div>
      <div className="flex items-center">
        <div className="">
          <Checkbox
            name={name}
            icon={<img src={check} alt="" />}
            checked={defaultChecked}
            onChange={() => {
              onChange();
              setChecked(!checked);
            }}
            disabled={isDisabled}
            borderColor="#E5E7EB"
            style={
              label === "footer-terms"
                ? { background: "#2C3333", border: "1px solid #6B7280" }
                : { backgroundColor: `${checked ? "#139C33" : ""}` }
            }
            labelStyle={{ marginLeft: 5, userSelect: "none" }}
            borderRadius={5}
            borderWidth={checked ? 0 : 1}
          />
          <span></span>
        </div>
        <label className="text-sm black-text-3 font-medium ml-1" htmlFor={id}>
          {label === "terms" ? (
            <>
              <label htmlFor={id}>
                I agree to OnePort365{" "}
                <Link
                  to="/terms-of-service"
                  target="_blank"
                  className="green-text"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="green-text"
                >
                  Privacy Policy
                </Link>
              </label>
            </>
          ) : label === "footer-terms" ? (
            <>
              <label htmlFor={id} className="grey-text">
                I agree to the storing and processing of my personal data by
                OnePort 365 as described in the{" "}
                <Link
                  to="/terms-of-service"
                  target="_blank"
                  className="white-text"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  className="white-text"
                >
                  Privacy Policy
                </Link>
              </label>
            </>
          ) : label === "Attestation" ? (
            <>
              <p className="text-sm black-text font-semibold ml-1">
                ATTESTATION
              </p>
              <p className="text-xs grey-text ml-1">
                I, agree that I am a bonafide authority on this shipment, and
                that I am authorized to represent my company on this shipment. I
                have read and understood the details of this shipment order and
                I certify that all information herein are true. I / My Company,
                agree to bare all consequences arising from any false
                declaration.
              </p>
            </>
          ) : label === "Service Acceptance" ? (
            <>
              <p className="text-xs grey-text ml-1">
                I, Khylyan Brooks, on behalf of XYZ hereby accept an account
                with One Port 365 Limited, Credit Facilities granted to us and
                prices agreed with OnePort 365 subject to the terms and
                conditions below, the nature of which we are fully aware and to
                which we agreed to be bound.
              </p>

              <p className="text-xs black-text font-semibold ml-1 mt-3 mb-2">
                Terms & Condition
              </p>
              <p className="text-xs grey-text ml-1">
                The Oneport 365 Terms and Conditions of Carriage shall apply to
                all consignments that we export or import using Oneport 365
                services without exception. The agreed prices are net excluding
                government taxes and other surcharges. The agreed prices are net
                excluding government taxes and other surcharges.
              </p>
            </>
          ) : label === "Remember Me" ? (
            <p className="text-grey text-sm font-normal">Remember Me</p>
          ) : (
            label
          )}
        </label>
      </div>
    </div>
  );
};

export default CustomCheckBox;
