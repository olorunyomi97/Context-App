import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//icons
import transit from "assets/icons/transit.svg";
import calendar from "assets/icons/calendar.svg";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomInput from "components/textInputs/CustomInput";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";

//helpers
import { findDefaultPort, getCurrentTimestamp, parseAllPortsNew, getPortNameByCode } from "helpers";

const _Json = require("sea-ports");

interface FreightProps {
  defaultPortsOfOrigin: any;
  defaultPortsOfDestination: any;
  rate_data: any;
  control: any;
  errors: any;
  resetField: any;
  originPort?: any;
  allPorts?: any;
  allowedPorts?: any;
  setOriginPort?: any;
  extras: boolean;
  currency?: any;
  setCurrency?: any;
  shipment_data?: any;
  prefix?: any;
  setPrefix?: any;
  booking_data?: any;
  id?: string;
  haulageType?: string;
}

const HulageDetails = ({
  defaultPortsOfOrigin,
  defaultPortsOfDestination,
  rate_data,
  control,
  errors,
  resetField,
  allPorts,
  allowedPorts,
  originPort,
  setOriginPort,
  extras,
  currency,
  setCurrency,
  haulageType,
  shipment_data,
  prefix,
  setPrefix,
  booking_data,
  id
}: FreightProps) => {
  // const defaultOrigin = findDefaultPort(
  //     defaultPortsOfOrigin,
  //     shipment_data.origin_port_code
  // );

  // const defaultDestination = findDefaultPort(
  //     defaultPortsOfDestination,
  //     shipment_data.destination_port_code
  // );

  // console.log("shipment_data_here>>>", shipment_data)
  // console.log("defaultValue1>>>", defaultOrigin)
  // console.log("defaultValue2>>>", defaultDestination)
  console.log("portdeorigin>>>", originPort)
  console.log("booking_rata>>>", booking_data)

  return (
    <>
      <div className="">
        <>
          {/* <p className="black-text-3">Freight details</p> */}
          {/* <p className="text-sm black-text-4 font-light">
            Please provide the required information
          </p> */}
        </>
        <div className={`flex ${haulageType === 'porttodoor' ? 'flex-col' : 'flex-col-reverse'} gap-y-4 md:space-gap-0 ${haulageType === 'porttodoor' ? 'md:flex-row' : 'md:flex-row-reverse'} md:items-center md:gap-x-6`}>
          <div className="flex-1">
            <CustomSelect
              control={control}
              name={"origin"}
              id={"origin"}
              label={haulageType === 'porttodoor' ? 'Origin Port' : "Destination Port"}
              placeholder={"hello"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={allowedPorts}
              // defaultValue={defaultOrigin}
              defaultValue={{
                label: booking_data?.shipment_type === "import" ? getPortNameByCode(_Json.JSON, booking_data?.port_of_discharge) : getPortNameByCode(_Json.JSON,booking_data?.port_of_loading),
                value: booking_data?.shipment_type === "import" ? booking_data?.port_of_discharge : booking_data?.port_of_loading,
              }}
              icon=""
              customOnChange={setOriginPort}
            />
          </div>
          <div className="md:mt-3.5 flex items-center justify-center md:flex-none">
            <img
              src={transit}
              alt="transit"
              className="rotate-90 md:rotate-0"
            />
          </div>
          <div className="flex-1">
            <CustomGoogleInput
                icon=""
                control={control}
                name={"destination"}
                id={"destination"}
                label={haulageType === 'porttodoor' ? 'Drop off Location' : "Stuffing Location"}
                placeholder={"Input Pick up Location"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={booking_data?.delivery_location ? booking_data?.delivery_location : booking_data?.stuffing_location ? booking_data?.stuffing_location : ""}
                allowWorldWide={false}
            />
          </div>
        </div>
      </div>
      {extras && (
        <div className="mt-6 md:mt-8 flex flex-col space-y-6 bottom-divider md:space-y-0 md:flex-row md:space-x-6">
          <div className="flex-1 md:pb-10">
            <CustomInput
              control={control}
              name={"cargo_pickup_date"}
              id={"cargo_pickup_date"}
              label={"Cargo Pickup Date"}
              placeholder={"Enter pickup date"}
              isRequired={true}
              type={"date"}
              errors={errors}
              isDisabled={false}
              defaultValue={
                booking_data?.cargo_pickup_date
                  ? booking_data?.cargo_pickup_date.slice(0, 10)
                  : new Date().toISOString().slice(0, 10)
              }
              // @ts-ignore
              min={getCurrentTimestamp(4)}
              //   @ts-ignore
              max={getCurrentTimestamp(10)}
              icon={""}
            />
          </div>
          <div className="flex-1 pb-6 md:pb-0">
            <CustomCurrencyInput
              control={control}
              name={"goods_value"}
              id={"goods_value"}
              label={"Total value of Goods"}
              placeholder={""}
              isRequired={true}
              type={"number"}
              errors={errors}
              isDisabled={false}
              defaultValue={shipment_data?.goods_value}
              min={1}
              max={""}
              icon=""
              resetField={resetField}
              currency={currency}
              setCurrency={setCurrency}
              prefix={prefix}
              setPrefix={setPrefix}
            />
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, rate_data, getting_rates } = state.rate;
  return { error, loading, rate_data, getting_rates };
};

export default connect(mapStateToProps, null)(HulageDetails);
