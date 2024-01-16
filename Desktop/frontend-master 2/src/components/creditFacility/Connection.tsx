import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import CustomRadio from "components/selectInputs/CustomRadio";

const Connection = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [workOnSaturday, setWorkOnSaturday] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fetching_data = false;

  const onSubmit = (data: any) => {};

  return (
    <>
      {fetching_data ? (
        <>
          {" "}
          <PageLoading />{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="mb-10">
            <h3 className="text-xl font-semibold black-text">
              Collection/Pick Up
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div className="">
              <CustomInput
                control={control}
                name={"registered_company_name"}
                id={"registered_company_name"}
                label={"Registered Company Name"}
                placeholder={"Enter company name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomGoogleInput
                // icon={"ion-ios-pin"}
                icon=""
                control={control}
                name={"physical_address"}
                id={"postal_address"}
                label={"Postal Address"}
                placeholder={`Enter postal address`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
              />
            </div>

            <div className="">
              <CustomPhoneInput
                control={control}
                name={"phone_number"}
                id={"phone_number"}
                label={"Phone Number"}
                isRequired={true}
                defaultValue={""}
                placeholder={"Enter phone number"}
                isDisabled={false}
                errors={errors}
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"timing"}
                id={"timing"}
                label={"Timings for Pickup and Delivery"}
                placeholder={"Enter timing"}
                isRequired={true}
                type={"datetime-local"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="mt-4 mb-3">
              <p className="text-xs black-text font-medium mb-2">
                Please confirm if you work on Saturday
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={workOnSaturday}
                    label={"Yes"}
                    onClick={() => setWorkOnSaturday(!workOnSaturday)}
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!workOnSaturday}
                    label={"No"}
                    onClick={() => setWorkOnSaturday(!workOnSaturday)}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className="">
                {/* @ts-ignore */}
                <SecondaryButton
                  title="Back"
                  icon="ion-ios-arrow-round-back"
                  //   onClick={previousStep}
                />
              </div>
              <div className="mx-auto"></div>
              <div className="">
                {/* @ts-ignore */}
                <PrimaryButton
                  title="Save & Continue"
                  //   loading={completing_datasheet}
                />
              </div>
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default Connection;
