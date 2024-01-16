import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//components
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";
import CustomSelect from "components/selectInputs/CustomSelect";

const CreditFacilityRequested = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

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
              Credit Facility Requested
            </h3>
            <p className="grey-text text-xs mt-1">
              Amet morbi risus dui lectus id ultrices justo vel. Ut morbi donec
              est orci facilisi velit cursus quisque amet.
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mb-24 lg:w-7/12">
            <div>
              <CustomSelect
                control={control}
                name={"value"}
                id={"value"}
                label={"Value (In Naira)"}
                placeholder={"select value"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={[
                  { label: "10M to 30M", value: "B2B" },
                  { label: "40M to 70M", value: "B2C" },
                ]}
                defaultValue={""}
                icon=""
              />
            </div>
            <div>
              <CustomSelect
                control={control}
                name={"loan_tenure"}
                id={"loan_tenure"}
                label={"Loan Tenure"}
                placeholder={"select loan tenure"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={[
                  { label: "1 month", value: "B2B" },
                  { label: "2 months", value: "B2C" },
                ]}
                defaultValue={""}
                icon=""
              />
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

export default CreditFacilityRequested;
