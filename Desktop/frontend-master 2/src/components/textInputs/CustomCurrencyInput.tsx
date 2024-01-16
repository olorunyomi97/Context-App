import React, { useState, useEffect, useRef } from "react";
import { Controller } from "react-hook-form";
import CurrencyInput from "react-currency-input-field";
import "./index.css";

//icons
import usaflag from "assets/icons/usaflag.svg";
import ngaflag from "assets/icons/ngaflag.svg";
import kenyaflag from "assets/icons/kenyaflag.svg";
import ghanaflag from "assets/icons/ghanaflag.svg";
import caret from "assets/icons/caret-down.svg";
import greenCheck from "assets/icons/green-check.svg";

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
  min: string | number; //for date type
  max: string;
  place?: string;
  resetField?: any;
  currency?: any;
  setCurrency?: any;
  prefix?: any;
  setPrefix?: any;
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
  place,
  resetField,
  currency,
  setCurrency,
  prefix,
  setPrefix,
}: Props) => {
  const curRef = useRef<HTMLDivElement>(null);
  // const [currencyValue, setCurrencyValue] = useState<any>("")
  // const [prefix, setPrefix] = useState("₦");
  // const [currency, setCurrency] = useState("NGN");
  const [showCurrency, setShowCurrency] = useState(false);

  //creating the click outside to close drop down effect
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        showCurrency &&
        curRef.current &&
        !curRef.current.contains(e.target)
      ) {
        setShowCurrency(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showCurrency]);
  console.log("defaultVal>>>", defaultValue);
  // console.log("vall", currency)
  // console.log("prefix", prefix)
  // console.log("valurr", currencyValue)
  return (
    <>
      <div className="mb-3">
        <label className="text-sm font-light grey-text" htmlFor={id}>
          {label}({prefix})
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
              validate: {
                greaterThanAmount: (amount) => {
                  if (place === "loan") {
                    return (
                      amount < defaultValue + 1 ||
                      "Loan can not exceed invoice amount"
                    );
                  }
                },
              },
            }}
            render={({ field: { onChange, value } }) => (
              <div className="flex items-center relative" ref={curRef}>
                <div
                  className="bg-[#109d340d] w-[20%] px-1 xl:px-0 border-solid border-[1px] border-r-0 border-[#E5E7EB] h-[50px] py-3 rounded-l cursor-pointer"
                  onClick={() =>
                    !showCurrency
                      ? setShowCurrency(true)
                      : setShowCurrency(false)
                  }
                >
                  <div className="flex gap-x-1 items-center justify-center pt-1">
                    <span>
                      <img
                        src={
                          currency === "NGN"
                            ? ngaflag
                            : currency === "USA"
                            ? usaflag
                            : currency === "KES"
                            ? kenyaflag
                            : currency === "GHS"
                            ? ghanaflag
                            : usaflag
                        }
                        alt=""
                      />
                    </span>
                    <p className="text-xs grey-text">{currency}</p>
                    <span>
                      <img src={caret} alt="" />
                    </span>
                  </div>
                </div>
                <div className="w-[80%] h-[50px] text-sm">
                  <CurrencyInput
                    className={`form-input px-4 py-3 custom-input currency-input rounded-r bg-white w-full black-text border-[1px] border-l-0 border-[#E5E7EB] font-light ${
                      isDisabled ? "input-disabled" : ""
                    }`}
                    id={id}
                    prefix={prefix}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    decimalsLimit={2}
                    disabled={isDisabled}
                    onValueChange={(value, name) => {
                      onChange(value);
                    }}
                    disableAbbreviations={true}
                    allowNegativeValue={false}
                  />
                </div>
                {showCurrency && (
                  <div className="absolute z-10 shadow-md top-14 py-3.5 px-3 bg-white rounded">
                    <div
                      className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 cursor-pointer"
                      onClick={() => {
                        setShowCurrency(false);
                        setCurrency("USD");
                        setPrefix("$");
                        resetField(name);
                        onChange("");
                      }}
                    >
                      <span>
                        <img src={usaflag} alt="" />
                      </span>
                      <p className="text-xs text-[#34373F] font-light">USD</p>
                      {currency === "USD" && (
                        <span>
                          <img src={greenCheck} alt="" />
                        </span>
                      )}
                    </div>
                    <div
                      className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 pt-[6.5px] cursor-pointer"
                      onClick={() => {
                        setShowCurrency(false);
                        setCurrency("NGN");
                        setPrefix("₦");
                        resetField(name);
                        onChange("");
                      }}
                    >
                      <span>
                        <img src={ngaflag} alt="" />
                      </span>
                      <p className="text-xs text-[#34373F] font-light">NGN</p>
                      {currency === "NGN" && (
                        <span>
                          <img src={greenCheck} alt="" />
                        </span>
                      )}
                    </div>

                    <div
                      className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 pt-[6.5px] cursor-pointer"
                      onClick={() => {
                        setShowCurrency(false);
                        setCurrency("KES");
                        setPrefix("KSh");
                        resetField(name);
                        onChange("");
                      }}
                    >
                      <span>
                        <img src={kenyaflag} alt="" />
                      </span>
                      <p className="text-xs text-[#34373F] font-light">KES</p>
                      {currency === "KES" && (
                        <span>
                          <img src={greenCheck} alt="" />
                        </span>
                      )}
                    </div>
                    <div
                      className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 pt-[6.5px] cursor-pointer"
                      onClick={() => {
                        setShowCurrency(false);
                        setCurrency("GHS");
                        setPrefix("GH₵");
                        resetField(name);
                        onChange("");
                      }}
                    >
                      <span>
                        <img src={ghanaflag} alt="" />
                      </span>
                      <p className="text-xs text-[#34373F] font-light">GHC</p>
                      {currency === "GHS" && (
                        <span>
                          <img src={greenCheck} alt="" />
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
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

/* <select
  name=""
  id="flag"
  value={currency}
  onChange={(e) => {
    setCurrency(e.target.value)
    prefix === "$" ? setPrefix("₦") : setPrefix("$")
    setCurrencyValue("")
  }}
  className="pl-1 lg:pl-3 text-[13px] grey-text bg-transparent"
>
  <option value="NGN">🇳🇬  NGN</option>
  <option value="USA">🇺🇸  USA</option>
</select> */
