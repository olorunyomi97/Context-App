import React, { FC, useState, useEffect } from "react";
import "./index.css";
import { Controller } from "react-hook-form";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

//helper
import { parseGeoCoding } from "helpers";

interface Props {
  control: object;
  name: string;
  id: string;
  label: string;
  isRequired: boolean;
  isDisabled: boolean;
  placeholder: string;
  errors: object;
  defaultValue: any;
  icon: string;
  allowWorldWide?: boolean;
  isBorderTransparent?: boolean;
}

const CustomGoogleInput: FC<Props> = ({
  control,
  name,
  id,
  label,
  isRequired,
  isDisabled = false,
  placeholder,
  errors = {},
  defaultValue = "",
  icon,
  isBorderTransparent = false,
  allowWorldWide = false,
}): JSX.Element => {
  return (
    <>
      <div className="mb-3">
        <label className="text-sm font-light grey-text" htmlFor={id}>
          {label}
        </label>
        <div className={`mt-1 ${isBorderTransparent ? 'border-solid border-[1px] borer-[#E5E7EB] rounded h-[50px]' : ''}`}>
          <Controller
            //  @ts-ignore
            control={control}
            defaultValue={{ label: defaultValue, value: defaultValue }}
            name={name}
            rules={{
              required: isRequired ? true : false,
            }}
            render={({ field: { onChange, value } }) => (
              <>
                {icon ? <i className={`${icon} left-icon grey-text`} /> : <></>}

                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE_PLACES}
                  apiOptions={{ language: "en" }}
                  autocompletionRequest={
                    allowWorldWide
                      ? {}
                      : {
                          componentRestrictions: {
                            country: ["ng", "gh"],
                          },
                        }
                  }
                  className="form-input px-4 py-3 custom-input icon w-full black-text overflow-x"
                  name={name}
                  styles={{
                    outlineColor: "none",
                    whiteSpace: "pre-wrap",
                  }}
                  placeholder={placeholder}
                  selectProps={{
                    // @ts-ignore
                    "aria-placeholder": placeholder,
                    // defaultInputValue: defaultValue,
                    defaultValue: { label: defaultValue, value: defaultValue },
                    isDisabled: isDisabled,
                    value: value,
                    onChange: (values: any) => {
                      onChange(values);
                      parseGeoCoding(values);
                    },
                    noOptionsMessage: () => placeholder,
                    placeholder,
                  }}
                />
              </>
            )}
          />

          {/* @ts-ignore */}
          {errors[name] && (
            <p className="mt-2 error-text">{label} is required</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CustomGoogleInput;
