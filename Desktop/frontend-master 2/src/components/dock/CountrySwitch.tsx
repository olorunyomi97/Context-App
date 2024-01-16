import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";

//libraries
import useGeoLocation from "react-ipgeolocation";

//redux
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCountry } from 'store/actions';

//icons
import caret from "assets/icons/caret-down.svg";
import caretdownwhite from "assets/icons/caretdown-white.svg";
import ngaflag from "assets/icons/ngaflag.svg";
import kenyaflag from "assets/icons/kenyaflag.svg";
import ghanaflag from "assets/icons/ghanaflag.svg";
import greenCheck from "assets/icons/green-check.svg";




const CountrySwitch = () => {
  const [flag, setFlag] = useState("NGN");
  const [showFlag, setShowFlag] = useState(false);

  const location = useLocation();
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch()

  //country mapss
  const countryMap = {
    "NG": "NGN",
    "GH": "GHS",
    "KE": "KES",
  };

  const locations = useGeoLocation();
  let user = useSelector((state: any) => state.auth.user_country);
  console.log('userC>>>', user)

  useEffect(() => {
    const storedCountry = localStorage.getItem('country');
    if(storedCountry){
      setFlag(countryMap[storedCountry]);
      dispatch(setCountry(storedCountry));
      return;
    } else if(locations.country){
      const update = countryMap[locations.country] || "NGN";
      setFlag(update);
      dispatch(setCountry(locations.country))
      localStorage.setItem('country', locations.country);
    }

  }, [locations.country, dispatch])
  
  

  // const { country, error } = useGeoLocation();
  // console.log('ddee>>>', country)
  // console.log('flag>>>', flag)

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the flag menu is open and the clicked target is not within the menu, then close the menu
      if (showFlag && ref.current && !ref.current.contains(e.target)) {
        setShowFlag(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showFlag]);

  return (
    <div className="relative" ref={ref}>
      <div
        className={`py-3 rounded cursor-pointer`}
        onClick={(e) => {
          e.preventDefault();
          setShowFlag(!showFlag)
        }}
      >
        <div className="flex gap-x-1 items-center justify-center pt-1">
          <span><img src={ flag === "NGN" ? ngaflag : flag === "KES" ? kenyaflag : flag === "GHS" ? ghanaflag : ngaflag } alt="flag" /></span>
          {/* <p className="text-xs grey-text">{flag}</p> */}
          <span><img src={location.pathname === "/" ? caretdownwhite : caret} alt="" /></span>
        </div>
      </div>

      {showFlag && (
        <div className="absolute flag-shadow z-10 right-0 top-12 p-4 bg-white rounded-lg">
          <div
            className="flex gap-x-3 items-center px-4 py-2 cursor-pointer"
            onClick={() => {
              setShowFlag(false);
              setFlag("NGN");
              dispatch(setCountry("NG"));
              localStorage.setItem('country', "NG");
            }}
          >
            <div><img className="min-w-[20px]" src={ngaflag} alt="" /></div>
            <p className="text-xs text-[#34373F] font-light">Nigeria</p>
            {flag === "NGN" && (<div><img className='min-w-[12px]' src={greenCheck} alt="" /></div>)}
          </div>
          <div
            className="flex gap-x-3 items-center px-4 py-2 cursor-pointer"
            onClick={() => {
              setShowFlag(false);
              setFlag("GHS");
              dispatch(setCountry("GH"));
              localStorage.setItem('country', "GH");
            }}
          >
            <div><img className="min-w-[20px]" src={ghanaflag} alt="" /></div>
            <p className="text-xs text-[#34373F] font-light">Ghana</p>
            {flag === "GHS" && (<div><img className='min-w-[12px]' src={greenCheck} alt="" /></div>)}
          </div>
          <div
            className="flex gap-x-3 items-center px-4 py-2 cursor-pointer"
            onClick={() => {
              setShowFlag(false);
              setFlag("KES");
              dispatch(setCountry("KE"));
              localStorage.setItem('country', "KE");
            }}
          >
            <div><img className="min-w-[20px]" src={kenyaflag} alt="" /></div>
            <p className="text-xs text-[#34373F] font-light">Kenya</p>
            {flag === "KES" && (<div><img className='min-w-[12px]' src={greenCheck} alt="" /></div>)}
          </div>
        </div>
      )}
    </div>
  )
}

export default CountrySwitch