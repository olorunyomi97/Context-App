import React, { FC, useEffect, useState } from "react";
import { string, bool, func } from "prop-types";
import "./index.css";
import { Controller } from "react-hook-form";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  onChange: any;
  defaultChecked: boolean;
  onClick: any;
  checked: boolean;
}

const CustomCheckBox: FC<Props> = ({
  name,
  id,
  label,
  isRequired,
  isDisabled,
  onChange,
  defaultChecked,
  onClick,
  checked,
}): JSX.Element => {
  const [isDisabledTwo, setIsDisabledTwo] = useState<boolean>();
  const [defaultCheckedTwo, setDefaultCheckedTwo] = useState<boolean>();

  useEffect(() => {
    setIsDisabledTwo(isDisabled);
    setDefaultCheckedTwo(defaultChecked);
  }, [isDisabled, defaultChecked]);

  return (
    <div>
      <div className="flex">
        <div className="checkbox">
          <input
            type="checkbox"
            name={name}
            id={id}
            className="mr-2"
            disabled={isDisabledTwo}
            required={isRequired}
            onChange={onChange}
            defaultChecked={defaultCheckedTwo}
            onClick={onClick}
            checked={checked}
          />
          <label className="text-sm black-text" htmlFor={id}>
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
            ) : (
              label
            )}
          </label>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default CustomCheckBox;
