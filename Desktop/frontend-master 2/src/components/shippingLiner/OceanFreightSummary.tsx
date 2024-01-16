import React, { useState } from "react";
import { Link } from "react-router-dom";

//components
import CustomTabs from "components/customTabs/CustomTabs";

//icons
import port from "assets/icons/home-port.svg";
import destination from "assets/icons/location-pin.svg";
import caretDown from "assets/icons/green-caretdown.svg";
import caretUp from "assets/icons/green-caretup.svg";
import pencil from "assets/icons/pencil.svg";
import trail from "assets/icons/trail.svg";

const OceanFreightSummary = (props: any) => {
  const { shipment_data, id } = props;
  const [tab, setTab] = useState("Load 1");
  const [collapseSumary, setCollapseSummary] = useState(false);

  console.log("shipp2>>>", shipment_data);

  const getActiveTab = (tab) => {
    return shipment_data?.container_details
      ? shipment_data?.container_details[parseInt(tab?.split(" ")[1]) - 1]
      : {};
  };

  return (
    <>
      {/* // Desktop View // */}
      <div className="grid grid-cols-2 gap-4 pt-5 desktop-only bottom-divider pb-10 xl:w-4/5">
        <div className="col-span-2">
          <div className="left-divider rounded-t right-divider bottom-divider top-divider">
            <div
              className="pl-8 py-5 pr-6 flex items-center"
              style={{ backgroundColor: "#F7FCF999" }}
            >
              <p className="black-text-3 text-lg font-medium">
                Ocean Freight Summary
              </p>
              <Link
                to="/booking/details"
                state={{ shipId: id, shipmentCategory: "ExportOcean Freight" }}
                className="flex items-center gap-1 ml-auto text-base"
              >
                <img src={pencil} alt="" />
                <span className="green-text">Edit details</span>
              </Link>
            </div>
          </div>
          <div
            className="left-divider right-divider rounded-b bottom-divider"
            style={{ backgroundColor: "#F7FCF999" }}
          >
            <div className="grid grid-cols-3 gap-4 pt-3 pb-3">
              <div>
                <p className="p-5 pl-8 black-text-4 font-normal">
                  Freight Details
                </p>
                <div className="pl-8">
                  <div className="relative flex items-center gap-2 mb-5">
                    <span>
                      <img src={port} alt="" />
                    </span>
                    <div>
                      <p className="grey-text font-light text-sm mb-1">
                        Origin Port
                      </p>
                      <p className="black-text-4 text-sm font-medium">
                        {shipment_data?.origin_port_code}
                      </p>
                    </div>
                    <div>
                      <img
                        className="absolute top-11 left-4"
                        src={trail}
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-5">
                    <span>
                      <img src={destination} alt="" />
                    </span>
                    <div>
                      <p className="grey-text font-light text-sm mb-1">
                        Destination Port
                      </p>
                      <p className="dblack-text-4 text-sm font-medium">
                        {shipment_data?.destination_port_code}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 left-divider">
                <div>
                  <p className="p-4 pt-5 black-text-4 font-normal">
                    Container Details
                  </p>
                  <div className="pl-2">
                    <CustomTabs
                      tabs={shipment_data?.container_details?.map(
                        (item, index) => {
                          return `Load ${index + 1}`;
                        }
                      )}
                      activeTab={tab}
                      setActiveTab={setTab}
                    />
                    <hr style={{ width: "95%" }} />
                  </div>
                  <div className="p-4">
                    {getActiveTab(tab) && (
                      <div className="flex justify-between">
                        <div className="flex items-center flex-1">
                          <div>
                            <p className="grey-text text-sm  pb-1.5 font-light">
                              Container Count
                            </p>
                            <p className="black-text text-sm">
                              {getActiveTab(tab)?.container_count}x
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center flex-1">
                          <div>
                            <p className="grey-text text-sm  pb-1.5 font-light">
                              Weight
                            </p>
                            <p className="black-text text-sm">
                              {getActiveTab(tab)?.container_weight} tonnes
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center flex-1">
                          <div>
                            <p className="grey-text text-sm  pb-1.5 font-light">
                              Size
                            </p>
                            <p className="black-text text-sm">
                              {getActiveTab(tab)?.container_size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center flex-1">
                          <div>
                            <p className="grey-text text-sm  pb-1.5 font-light">
                              Type
                            </p>
                            <p className="black-text text-sm">
                              {getActiveTab(tab)
                                ?.container_type?.charAt(0)
                                .toUpperCase() +
                                getActiveTab(tab)?.container_type?.slice(1)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* // Mobile View */}
      <div className="mobile-only bg-[#FAFDFB]">
        <div className="left-divider rounded-t right-divider bottom-divider top-divider p-5">
          <div className="flex items-center">
            <p className="black-text-3 font-normal text-lg">
              Ocean Freight Summary
            </p>
            <Link
              to="/booking/details"
              state={{ shipId: id, shipmentCategory: "ExportOcean Freight" }}
              className="rounded ml-auto freight-summary-edit"
            >
              <img src={pencil} alt="" />
            </Link>
          </div>
        </div>
        <div className="bottom-divider left-divider right-divider p-5">
          {/* Ocean Freight Details */}
          <p className="black-text-4 font-normal mb-6">Ocean Freight Details</p>
          <div className="flex justify-between mb-10">
            <div className="flex items-center gap-2">
              <span>
                <img src={port} alt="" />
              </span>
              <div>
                <p className="grey-text font-light">Origin Port</p>
                <p className="black-text-3">
                  {shipment_data?.origin_port_code}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>
                <img src={destination} alt="" />
              </span>
              <div>
                <p className="grey-text font-light">Destination Port</p>
                <p className="black-text-3">
                  {shipment_data?.destination_port_code}
                </p>
              </div>
            </div>
          </div>
          {collapseSumary ? (
            <>
              <div className="mb-8">
                <hr />
              </div>
              {/* Container Details */}
              <p className="black-text-4 mb-6">Container Details</p>
              <div>
                <CustomTabs
                  tabs={shipment_data?.container_details?.map((item, index) => {
                    return `Load ${index + 1}`;
                  })}
                  activeTab={tab}
                  setActiveTab={setTab}
                />
                <hr style={{ width: "95%" }} />
              </div>
              <div className="mb-14">
                {getActiveTab(tab) && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center">
                      <div>
                        <p className="grey-text font-light">Container Count</p>
                        <p className="black-text mb-2">
                          {getActiveTab(tab)?.container_count}x
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="grey-text font-light">Weight</p>
                        <p className="black-text mb-2">
                          {getActiveTab(tab)?.container_weight} tonnes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="grey-text font-light">Size</p>
                        <p className="black-text mb-2">
                          {getActiveTab(tab)?.container_size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div>
                        <p className="grey-text font-light">Type</p>
                        <p className="black-text mb-2">
                          {getActiveTab(tab)
                            ?.container_type?.charAt(0)
                            .toUpperCase() +
                            getActiveTab(tab)?.container_type?.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
          <div onClick={() => setCollapseSummary(!collapseSumary)}>
            <p className="green-text text-center text-base mb-3">
              {collapseSumary ? "Collapse Summary" : "View Complete Summary"}
            </p>
            <span className="flex justify-center">
              <img
                src={collapseSumary ? caretUp : caretDown}
                alt=""
                onClick={() => setCollapseSummary(!collapseSumary)}
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OceanFreightSummary;
