import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";

import Sidebar from "./Sidebar";

import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//icons
import ngaflag from "assets/icons/ngaflag.svg";
import kenyaflag from "assets/icons/kenyaflag.svg";
import ghanaflag from "assets/icons/ghanaflag.svg";

import caretDown from "assets/icons/caret-down.svg";
import mobileMenu from "assets/icons/mobile-menu.svg";

const Topnav = () => {
  let country = useSelector((state: any) => state.auth.user_country);
  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  const [toggle, setToggle] = useState(false);

  //country flags
  const countryFlags = {
    "NG": ngaflag,
    "GH": ghanaflag,
    "KE": kenyaflag,
  };

  //function to close the sidebar
  const handleToggle = () => {
    setToggle(false);
  };

  return (
    <>
      {/* desktop top bar */}
      <div className="flex items-center h-full border-[1px] bg-white border-[#eaecf080] border-l-0 max-h-[60px] desktop-only">
        <div className="flex items-center right-divider ml-auto">
          <img
            src={`https://ui-avatars.com/api/?background=3ab44a&color=ffffff&name=${user?.firstname}+${user?.lastname}`}
            alt="user initial"
            className="rounded-full w-10"
          />
          <div className="flex items-center gap-x-2">
            <p className="text-sm grey-text-3 ml-2">
              {user?.firstname?.charAt(0).toUpperCase() + user?.firstname?.slice(1)}{" "}
              {user?.lastname?.charAt(0).toUpperCase() + user?.lastname?.slice(1)}
            </p>
            <img src={caretDown} alt="caret" className="pr-5" />
          </div>
        </div>
        <div className="pl-5 pr-11">
          {/* <svg width="24" height="25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" d="M12 18.848c5.64 0 8.248-.724 8.5-3.627 0-2.902-1.819-2.716-1.819-6.276C18.681 6.165 16.045 3 12 3S5.319 6.164 5.319 8.945c0 3.56-1.819 3.374-1.819 6.275.253 2.915 2.862 3.628 8.5 3.628Z" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.389 21.855c-1.364 1.515-3.492 1.533-4.87 0" stroke="#667085" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            <circle cx="18" cy="4" r="3.5" fill="#D92D20" stroke="#fff" />
          </svg> */}
          <img src={countryFlags[country] || ngaflag} alt="flag" />
        </div>
      </div>
      {/* mobile top bar */}
      <>
        <div className="top-bar mobile-only bg-[#F9F9FA] px-5 py-6">
          <div className="flex justify-between items-center">
            <img
              src={mobileMenu}
              alt="mobile icon"
              onClick={() => setToggle(true)}
              className="cursor-pointer"
            />
            <p className="green-text-2 font-medium tracking-[0.04em]">
              Dashboard
            </p>
            <p className="invisible">nwife amaeze</p>
          </div>
        </div>
        {toggle && (
          <SlidingPane
            from="left"
            isOpen={toggle}
            width="70%"
            hideHeader={true}
            className="custom-slider"
            overlayClassName="some-custom-overlay-class"
            onRequestClose={() => setToggle(false)}
          >
            <div className="mobile">
              <Sidebar handleToggle={handleToggle} />
            </div>
          </SlidingPane>
        )}
      </>
    </>
  );
};

export default Topnav;
