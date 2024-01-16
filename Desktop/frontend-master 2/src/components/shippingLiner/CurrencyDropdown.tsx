import React, { useState, useEffect, useRef } from "react";

//icons
import usaflag from "assets/icons/usaflag.svg";
import ngaflag from "assets/icons/ngaflag.svg";
import cadflag from "assets/icons/cadflag.svg";
import chevronDown from "assets/icons/chevron-down.svg";
import greenCheck from "assets/icons/green-check.svg";

const CurrencyDropdownItem = ({
  setShowCurrency,
  setCurrency,
  img,
  currencyText,
  currency,
  rateLoading,
}) => (
  <div
    className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 pt-[6.5px] cursor-pointer"
    onClick={() => {
      rateLoading ? console.log("not") : setCurrency(currencyText);
      setShowCurrency(false);
    }}
  >
    <div>
      <img src={img} alt="" />
    </div>
    <p className="text-xs text-[#34373F] font-light">{currencyText}</p>
    {currencyText === currency && (
      <span>
        <img src={greenCheck} alt="" />
      </span>
    )}
    {/* <span><img src={caret} alt="" /></span> */}
  </div>
);

const CurrencyDropdown = ({ setGlobalCurrency, currencyIn, rateLoading }) => {
  const [currency, setCurrency] = useState<string>(currencyIn);
  const [showCurrency, setShowCurrency] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGlobalCurrency(currency);
  }, [currency, setGlobalCurrency]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu, then close the menu
      if (showCurrency && ref.current && !ref.current.contains(e.target)) {
        setShowCurrency(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showCurrency]);

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() =>
          !showCurrency && !rateLoading
            ? setShowCurrency(true)
            : setShowCurrency(false)
        }
        className={`flex gap-x-1 items-center bg-[#109b320d] py-3 rounded w-fit px-5 cursor-pointer ${
          rateLoading ? "opacity-50" : ""
        }`}
      >
        <span>
          <img src={currency === "NGN" ? ngaflag : usaflag} alt="" />
        </span>
        <p className="text-xs grey-text">{currency}</p>
        <span>
          <img src={chevronDown} alt="" />
        </span>
      </div>
      {!rateLoading ? (
        <>
          {showCurrency && (
            <div className="absolute top-14 py-3.5 px-3 bg-white rounded shadow-[1px_12px_60px_rgba(0,0,0,0.19)] w-[112px]">
              <CurrencyDropdownItem
                setShowCurrency={setShowCurrency}
                setCurrency={setCurrency}
                img={ngaflag}
                currencyText={"NGN"}
                currency={currency}
                rateLoading={rateLoading}
              />
              <CurrencyDropdownItem
                setShowCurrency={setShowCurrency}
                setCurrency={setCurrency}
                img={usaflag}
                currencyText={"USD"}
                currency={currency}
                rateLoading={rateLoading}
              />

              {/* <div
                        className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 pt-[6.5px] cursor-pointer"
                        onClick={() => {
                            setShowCurrency(false)
                            setCurrency("USD")
                        }}
                    >
                        <span><img src={usaflag} alt="" /></span>
                        <p className="text-xs text-[#34373F] font-light">USA</p>
                        {currency === "USD" && <span><img src={greenCheck} alt="" /></span>}
                    </div> */}

              {/* <div
                        className="flex gap-x-3 items-center justify-start border-solid border-b-[1px] border-[#F9FAFB] pb-1 px-2 pt-[6.5px] cursor-pointer"
                        onClick={() => {
                            setShowCurrency(false)
                            setCurrency("CAD")
                        }}
                    >
                        <span><img src={cadflag} alt="" /></span>
                        <p className="text-xs text-[#34373F] font-light">CAD</p>
                        {currency === "CAD" && <span><img src={greenCheck} alt="" /></span>}
                    </div> */}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CurrencyDropdown;
