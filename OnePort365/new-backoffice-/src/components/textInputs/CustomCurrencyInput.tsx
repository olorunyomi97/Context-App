import React from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import "./index.css";

interface Props {
  control: object;
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  type: string;
  placeholder: string;
  icon: string;
  errors: object;
  defaultValue: string;
  min: string; //for date type
  max: string;
}

const CustomCurrencyInput = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled = false,
  type,
  placeholder,
  icon,
  errors,
  defaultValue,
  min, //for date type
  max,
}) => {
  return (
    <>
      <div className=" mb-3">
        <label className="text-xs font-medium black-text" htmlFor={id}>
          {label}

          {/* {isRequired && <span className="co-lightred"> * </span>} */}
        </label>
        <div className="mt-1">
          <Controller
            //  @ts-ignore
            control={control}
            defaultValue={defaultValue}
            name={name}
            rules={{
              required: isRequired ? true : false,
            }}
            render={({ field: { onChange, value } }) => (
              <>
                <div className="d-flex align-items-center">
                  <CurrencyInput
                    className={`form-input px-4 py-1.5 custom-input w-full black-text ${
                      isDisabled ? "input-disabled" : ""
                    }`}
                    id={id}
                    // prefix="£"
                    name={name}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    decimalsLimit={2}
                    disabled={isDisabled}
                    onValueChange={(value, name) => {
                      onChange(value);
                    }}
                    disableAbbreviations={true}
                  />
                </div>
              </>
            )}
          />
          {/* @ts-ignore */}
          {errors[name] && (
            <div className="mt-2 error-text">
              {/* @ts-ignore */}
              {errors[name]["message"] ? (
                //  @ts-ignore
                <p>{errors[name]["message"]}</p>
              ) : (
                <p>{label ? label : name} is required.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

//
export default CustomCurrencyInput;
