import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//icons
import transit from "assets/icons/transit.svg";
import calendar from "assets/icons/calendar.svg";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomInput from "components/textInputs/CustomInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";

//helpers
import { findDefaultPort, getCurrentTimestamp } from "helpers";

interface FreightProps {
  defaultPortsOfOrigin: any;
  defaultPortsOfDestination: any;
  rate_data: any;
  control: any;
  errors: any;
  resetField: any;
  setOriginPort?: any;
  extras: boolean;
  currency?: any;
  setCurrency?: any;
  shipment_data?: any;
  prefix?: any;
  setPrefix?: any;
}

const FreightDetails = ({
  defaultPortsOfOrigin,
  defaultPortsOfDestination,
  rate_data,
  control,
  errors,
  resetField,
  setOriginPort,
  extras,
  currency,
  setCurrency,
  shipment_data,
  prefix,
  setPrefix,
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

  return (
    <>
      <div className="mt-5 mb-8 py-6 px-4 rounded-lg bg-[#109d340d]">
        <>
          <p className="black-text-3">Freight details</p>
          <p className="text-sm black-text-4 font-light">
            Please provide the required information
          </p>
        </>
        <div className="mt-6 flex flex-col gap-y-4 md:space-gap-0 md:flex-row md:items-center md:gap-x-6">
          <div className="flex-1">
            <CustomSelect
              control={control}
              name={"origin_port"}
              id={"origin_port"}
              label={"Origin Port"}
              placeholder={""}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={defaultPortsOfOrigin}
              // defaultValue={defaultOrigin}
              defaultValue={{
                label: shipment_data?.origin_port,
                value: shipment_data?.origin_port_code,
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
            <CustomSelect
              control={control}
              name={"destination_port"}
              id={"destination_port"}
              label={"Destination Port"}
              placeholder={""}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              // defaultValue={defaultDestination}
              defaultValue={{
                label: shipment_data?.destination_port,
                value: shipment_data?.destination_port_code,
              }}
              options={defaultPortsOfDestination}
              icon=""
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
                shipment_data?.cargo_pickup_date
                  ? shipment_data?.cargo_pickup_date.slice(0, 10)
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

export default connect(mapStateToProps, null)(FreightDetails);
