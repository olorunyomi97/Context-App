import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//style
import "./index.css";

//components
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";

//redux
import { initiateRateRequest } from "store/actions";

const Location = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const {
    shipmentType,
    setShipmentType,
    defaultPortsOfOrigin,
    defaultPortsOfDestination,
    nextStep,
    error,
    initiateRateRequest,
    loading,
    showStep,
  } = props;

  const onSubmit = (data: any) => {
    const newData = {
      shipment_type: shipmentType,
      pickup_location: data?.pickup_location?.label,
      port_origin: shipmentType === "export" ? "NGAPP" : "",
      port_of_destination: data?.port_of_destination?.value?.unlocs[0],
      delivery_location: data?.delivery_location?.label,
      port_of_discharge: data?.port_of_discharge?.value?.unlocs[0],
    };

    initiateRateRequest(newData, nextStep);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="booking-card md:p-10">
        <p className="text-sm black-text font-medium mb-2">
          Select Shipment Type
        </p>
        <div className="grid grid-cols-2">
          <div className="mr-1">
            <CustomRadio
              selected={shipmentType === "import" ? true : false}
              label={"import"}
              onClick={() => setShipmentType("import")}
            />
          </div>

          <div className="ml-1">
            <CustomRadio
              selected={shipmentType === "export" ? true : false}
              label={"export"}
              onClick={() => setShipmentType("export")}
            />
          </div>
        </div>
        <div className="mt-10">
          <div className="">
            {shipmentType === "import" ? (
              <CustomSelect
                control={control}
                name={"port_of_discharge"}
                id={"port_of_discharge"}
                label={""}
                placeholder={"Select port of discharge"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                options={defaultPortsOfOrigin}
                icon=""
              />
            ) : (
              <CustomGoogleInput
                // icon={"ion-ios-pin"}
                icon=""
                control={control}
                name={"pickup_location"}
                id={"pickup_location"}
                label={""}
                placeholder={`${" "}Enter your pickup location`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
              />
            )}
          </div>

          <div className="flex items-center" style={{ marginTop: -10 }}>
            <hr
              className="solid-hr  md:w-full w-9/12"
              style={{ borderBlockColor: "#BBF7D0" }}
            />

            <svg
              width="40"
              height="40"
              viewBox="0 0 36 37"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect y="0.5" width="40" height="40" rx="18" fill="white" />
              <path
                d="M15.4279 10.7869C15.0869 10.7869 14.7599 10.9223 14.5189 11.1634C14.2778 11.4045 14.1423 11.7314 14.1423 12.0724L14.1423 26.9716L11.1985 24.0149C10.9564 23.7728 10.6281 23.6368 10.2858 23.6368C9.94344 23.6368 9.61512 23.7728 9.37306 24.0149C9.13099 24.2569 8.99499 24.5852 8.99499 24.9276C8.99499 25.2699 9.13099 25.5982 9.37306 25.8403L14.5151 30.9824C14.6959 31.1608 14.9255 31.2816 15.1748 31.3296C15.4242 31.3777 15.6822 31.3508 15.9164 31.2523C16.1511 31.1559 16.3521 30.9921 16.4939 30.7817C16.6357 30.5712 16.7121 30.3234 16.7134 30.0697L16.7134 12.0724C16.7134 11.7314 16.5779 11.4045 16.3369 11.1634C16.0958 10.9223 15.7688 10.7869 15.4279 10.7869ZM20.0814 5.74761C19.8467 5.84405 19.6457 6.00783 19.5039 6.21829C19.362 6.42876 19.2857 6.6765 19.2844 6.93029L19.2844 24.9276C19.2844 25.2685 19.4199 25.5955 19.6609 25.8366C19.902 26.0777 20.229 26.2131 20.5699 26.2131C20.9109 26.2131 21.2379 26.0777 21.4789 25.8366C21.72 25.5955 21.8555 25.2685 21.8555 24.9276L21.8555 10.0284L24.7993 12.9851C24.9188 13.1056 25.061 13.2012 25.2176 13.2665C25.3743 13.3317 25.5423 13.3653 25.712 13.3653C25.8817 13.3653 26.0498 13.3317 26.2064 13.2665C26.3631 13.2012 26.5052 13.1056 26.6247 12.9851C26.7452 12.8656 26.8409 12.7234 26.9061 12.5668C26.9714 12.4101 27.005 12.2421 27.005 12.0724C27.005 11.9027 26.9714 11.7346 26.9061 11.578C26.8409 11.4213 26.7452 11.2792 26.6247 11.1597L21.4827 6.01757C21.3019 5.8392 21.0723 5.71836 20.8229 5.67032C20.5736 5.62227 20.3155 5.64917 20.0814 5.74761Z"
                fill="#3AB44A"
              />
            </svg>
            <hr
              className="solid-hr md:w-full w-9/12"
              style={{ borderBlockColor: "#BBF7D0" }}
            />
          </div>

          <div className="">
            {shipmentType === "import" ? (
              <CustomGoogleInput
                // icon={"ion-ios-pin"}
                icon=""
                control={control}
                name={"delivery_location"}
                id={"delivery_location"}
                label={""}
                placeholder={`Enter your delivery location`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
              />
            ) : (
              <CustomSelect
                control={control}
                name={"port_of_destination"}
                id={"port_of_destination"}
                label={""}
                placeholder={"Select port of destination"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                options={defaultPortsOfDestination}
                icon=""
              />
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 items-center">
        <div className=""></div>
        <div className="mx-auto">
          {showStep ? (
            <p className="black-text font-medium text-base ">Step 1 of 4</p>
          ) : (
            <></>
          )}
        </div>
        <div className="mt-5">
          {/* @ts-ignore */}
          <PrimaryButton title="Continue" loading={loading} />
        </div>
      </div>
    </form>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, rate_data } = state.rate;
  return { error, loading, rate_data };
};
export default connect(mapStateToProps, { initiateRateRequest })(Location);
