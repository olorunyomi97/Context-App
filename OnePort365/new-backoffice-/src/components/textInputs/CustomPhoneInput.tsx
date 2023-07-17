import React, { useState, FC } from "react";
import { Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode } from "react-phone-number-input";
interface Props {
  control: object;
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  placeholder: string;
  errors: object;
  defaultValue: string | number | null;
}
const CustomPhoneInput: FC<Props> = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled,
  placeholder,
  errors,
  defaultValue,
}): JSX.Element => {
  const [countryCode, setCountryCode] = useState("234");
  return (
    <div className="mb-3">
      <label className="text-xs font-medium black-text" htmlFor={id}>
        {label}
        {/* {isRequired && <span className="co-lightred"> * </span>} */}
      </label>
      <div className="mt-1">
        <Controller
          //  @ts-ignore
          control={control}
          defaultValue={{ phone: defaultValue }}
          name={name}
          rules={{
            required: isRequired ? true : false,
          }}
          render={({
            field: {
              onChange,
              value = { country_code: countryCode, phone: "" },
            },
          }) => {
            // console.log(defaultValue && defaultValue[0] === "+");
            return (
              <PhoneInput
                placeholder={placeholder}
                className={`form-input px-4 py-1.5 custom-input w-full black-text  ${
                  isDisabled ? "input-disabled" : ""
                }`}
                international={true}
                defaultCountry={"NG"}
                value={
                  defaultValue &&
                  (value.phone === "" ||
                    !value.phone ||
                    value.phone === undefined)
                    ? defaultValue[0] === "+"
                      ? `${defaultValue}`
                      : `+${defaultValue}`
                    : value.phone
                }
                disabled={isDisabled}
                countryCodeEditable={false}
                onCountryChange={(val) => {
                  if (val) {
                    let code = getCountryCallingCode(val);
                    setCountryCode(code);
                  }
                }}
                onChange={(val) => {
                  onChange({ country_code: countryCode, phone: val });
                }}
              />
            );
          }}
        />
      </div>
      {/* @ts-ignore */}
      {errors[name] && (
        <div className="mt-2 error-text">
          <p>{label ? label : name} is required.</p>
        </div>
      )}
    </div>
  );
};
export default CustomPhoneInput;