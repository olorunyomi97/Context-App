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
  const { tabs, activeTab, setActiveTab, icons } = props;

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
    <div className="tabs flex" style={{}}>
      {tabs &&
        tabs.map((tab: string, id: number) => {
          return (
            <>
              <div
                className="tab cursor-pointer"
                onClick={() => setActiveTab(tab)}
                key={id}
              >
                <div
                  className="flex items-center mb-3"
                  style={icons && icons.length ? { minWidth: 180 } : {}}
                >
                  {icons && icons.length ? (
                    <>
                      <img
                        src={
                          activeTab === tab
                            ? iconNames[`${icons[id]}-active`].name
                            : iconNames[icons[id]].name
                        }
                        alt=""
                        width={iconNames[icons[id]].width}
                        height={iconNames[icons[id]].height}
                        className="ml-5 mr-1"
                      />
                    </>
                  ) : (
                    <></>
                  )}

                  <p
                    className={`${
                      activeTab === tab ? "font-semibold" : ""
                    } text-xs lg:text-sm black-text ${
                      icons && icons.length ? "mr-5" : "mx-5"
                    } `}
                  >
                    {tab}
                  </p>
                </div>

                <hr
                  className={`${activeTab === tab ? "active-br" : "solid-br"}`}
                />
              </div>
            </>
          );
        })}
    </div>
  );
};

export default CustomTabs;
