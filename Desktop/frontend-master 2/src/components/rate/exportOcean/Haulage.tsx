import React, { useState } from "react";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";

//helpers
import { getCurrentTimestamp } from "helpers";

const Haulage = (props: any) => {
  // const [isShipmentHarzadous, setIsShipmentHazardous] = useState("yes");
  const {
    control,
    errors,
    originPort,
    isShipmentHarzadous,
    setIsShipmentHazardous,
    shipment_data,
  } = props;

  return (
    <div className="mt-10">
      <div>
        <p className="text-base black-text-3">Haulage</p>
        <p className="text-sm grey-text-4 max-w-[355px] font-light">
          We will help you with transporting your goods from your warehouse to
          the pickup location.
        </p>
      </div>
      <div className="mt-6 pb-10 bottom-divider grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* <CustomInput
                    control={control}
                    name={"stuff_loc"}
                    id={"stuff_loc"}
                    label={"Stuffing Location"}
                    placeholder={"Input Stuffing Location"}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                /> */}
        <CustomGoogleInput
          icon=""
          control={control}
          name={"pickup_loc"}
          id={"pickup_loc"}
          label={"Pickup Location"}
          placeholder={"Input Pick up Location"}
          isRequired={true}
          errors={errors}
          isDisabled={false}
          defaultValue={shipment_data?.pickup_location}
          allowWorldWide={false}
        />
        <div className="">
          <p className="font-light grey-text my-1 text-sm">Destination</p>
          <p className="border-grey-2 h-[50px] px-4 py-3 rounded text-[13px] text-[#4B5563] bg-[#F7F7F7]">
            {originPort.label}
          </p>
        </div>
        {/* <CustomInput
                    control={control}
                    name={"destination_port"}
                    id={"dest_port"}
                    label={"Destination Port"}
                    placeholder={""}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={true}
                    defaultValue={destPort.label}
                    min={""}
                    max={""}
                    icon=""
                    // valo={destPort.label ? destPort.label : ""}
                /> */}
        <CustomInput
          control={control}
          name={"stuff_date"}
          id={"stuff_date"}
          label={"Stuffing Date"}
          placeholder={"Enter pickup date"}
          isRequired={true}
          type={"date"}
          errors={errors}
          isDisabled={false}
          defaultValue={
            shipment_data?.cargo_pickup_date
              ? shipment_data?.cargo_pickup_date.slice(0, 10)
              : new Date().toISOString().slice(0, 10)
          }
          // @ts-ignore
          min={""}
          //   @ts-ignore
          max={""}
          icon={""}
        />
      </div>
      <div className="mt-4 md:mt-10 pb-8 md:pb-16 bottom-divider">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex-1">
            <p className="black-text text-base">Hazardous</p>
            <p className="grey-text text-sm">Is your cargo hazardous</p>
          </div>
          <div className="flex flex-1 mt-6 md:mt-0 md:self-end ">
            <CustomRadio
              selected={isShipmentHarzadous === "yes" ? true : false}
              label={"Yes"}
              onClick={() => setIsShipmentHazardous("yes")}
              style={{
                marginRight: "150px",
              }}
            />
            <CustomRadio
              selected={isShipmentHarzadous === "no" ? true : false}
              label={"No"}
              onClick={() => setIsShipmentHazardous("no")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Haulage;
