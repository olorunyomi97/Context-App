import React from "react";

//style
import "./index.css";

//icons
import bus from "assets/icons/bus.svg";
import busActive from "assets/icons/bus-green.svg";
import ocean from "assets/icons/ocean.svg";
import oceanActive from "assets/icons/ocean-green.svg";
import tick from "assets/icons/tick.svg";
import tickActive from "assets/icons/tick-green.svg";
import map from "assets/icons/map.svg";
import mapActive from "assets/icons/map-green.svg";

const CustomTabs = (props: any): JSX.Element => {
  const { tabs, activeTab, setActiveTab, icons, style } = props;

  const iconNames = {
    bus: {
      name: bus,
      width: 20,
      height: 20,
    },
    "bus-active": {
      name: busActive,
    },
    ocean: {
      name: ocean,
      width: 15,
      height: 20,
    },
    "ocean-active": {
      name: oceanActive,
    },
    tick: {
      name: tick,
      width: 20,
      height: 20,
    },
    "tick-active": {
      name: tickActive,
    },
    map: {
      name: map,
      width: 20.5,
      height: 24,
    },
    "map-active": {
      name: mapActive,
    },
  };

  return (
    <div className=" w-100">
      <div className="tabs flex" style={style}>
        {tabs &&
          tabs.map((tab: string, index: number) => {
            return (
              <>
                <div
                  className="tab cursor-pointer"
                  onClick={() => setActiveTab(tab)}
                  key={index}
                >
                  <div
                    className="flex items-center mb-1"
                    style={icons && icons.length ? { minWidth: 180 } : {}}
                  >
                    {icons && icons.length ? (
                      <>
                        <img
                          src={
                            activeTab === tab
                              ? iconNames[`${icons[index]}-active`].name
                              : iconNames[icons[index]].name
                          }
                          alt=""
                          width={iconNames[icons[index]].width}
                          height={iconNames[icons[index]].height}
                          className="ml-5 mr-1"
                        />
                      </>
                    ) : (
                      <></>
                    )}

                    <p
                      className={`${
                        activeTab === tab
                          ? "font-medium text-[#004800]"
                          : "grey-text-1"
                      } 
                        text-sm lg:text-sm mr-4 ${
                          icons && icons.length ? "mr-5" : ""
                        }`}
                    >
                      {tab}
                    </p>
                  </div>

                  <hr
                    className={`${
                      activeTab === tab ? "active-br" : "solid-br"
                    }`}
                  />
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default CustomTabs;
