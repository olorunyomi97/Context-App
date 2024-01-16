import React, { useState } from "react";

//styles
import CustomRadio from "components/selectInputs/CustomRadio";

const TrackingWarehouse = (props) => {
  const {
    includeTracking,
    setIncludeTracking,
    includeWarehouse,
    setIncludeWarehouse,
  } = props;
  return (
    <div>
      <div className="mt-4 md:mt-10 pb-12 md:pb-16 pt-10 top-divider bottom-divider">
        <>
          <p className="black-text-3 text-lg font-medium mb-1">
            Shipment Tracking
          </p>
          <div className="flex flex-col gap-x-4 md:flex-row md:justify-between">
            <div className="flex-1">
              <p className="grey-text-4 font-light text-sm max-w-[315px]">
                Track your package with your tracking number using our parcel
                tracking tool.
              </p>
            </div>
            <div className="flex flex-1 mt-6 md:mt-0">
              <CustomRadio
                selected={includeTracking ? true : false}
                label={"Include Tracking"}
                onClick={() => setIncludeTracking(true)}
                style={{ flex: "1" }}
              />
              <CustomRadio
                selected={includeTracking === false ? true : false}
                label={"No Tracking"}
                onClick={() => setIncludeTracking(false)}
                style={{ flex: "1" }}
              />
            </div>
          </div>
        </>
        <div className="mt-10">
          <p className="black-text-3 text-lg font-medium mb-1">Warehouse</p>
          <div className="flex flex-col gap-x-4 md:flex-row md:justify-between">
            <div className="flex-1">
              <p className="grey-text-4 font-light text-sm max-w-[315px]">
                We will provide warehousing for the easy and secure storage of
                your goods.
              </p>
            </div>
            <div className="flex flex-1 mt-6 md:mt-0">
              <CustomRadio
                selected={includeWarehouse ? true : false}
                label={"Include Warehousing"}
                onClick={() => setIncludeWarehouse(true)}
                style={{ flex: "1" }}
              />
              <CustomRadio
                selected={includeWarehouse === false ? true : false}
                label={"No Warehousing"}
                onClick={() => setIncludeWarehouse(false)}
                style={{ flex: "1" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingWarehouse;
