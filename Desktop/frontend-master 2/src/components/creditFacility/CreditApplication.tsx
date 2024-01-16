import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import PageLoading from "components/partials/pageLoading";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";

const CreditApplication = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onSubmit = (data: any) => {};

  const fetching_data = false;

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
              Credit Application
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
                name={"invoice_contact_name"}
                id={"invoice_contact_name"}
                label={"Co. Invoice Contact Name"}
                placeholder={"Enter contact name"}
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
                name={"invoice_contact_designation"}
                id={"invoice_contact_designation"}
                label={"Company Address"}
                placeholder={`Enter your company address`}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"email"}
                id={"email"}
                label={"Email Address"}
                placeholder={"Enter email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"shipping_contact_designation"}
                id={"shipping_contact_designation"}
                label={"Shipping Contact Designation"}
                placeholder={"Enter shipping contact designation"}
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
              <CustomInput
                control={control}
                name={"bank"}
                id={"bank"}
                label={"Bank"}
                placeholder={"Enter bank name"}
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

            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"branch"}
                id={"branch"}
                label={"Branch"}
                placeholder={"Enter branch name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"branch_code"}
                id={"branch_code"}
                label={"Branch Code"}
                placeholder={"Enter branch code "}
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
            <div className="lg:grid grid-cols-2 gap-4">
              <CustomInput
                control={control}
                name={"account_name"}
                id={"account_name"}
                label={"Account Name"}
                placeholder={"Enter account name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"account_type"}
                id={"account_type"}
                label={"Account Type"}
                placeholder={"Enter account type "}
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
              <CustomInput
                control={control}
                name={"trade_reference_1"}
                id={"trade_reference_1"}
                label={"Trade Reference 1"}
                placeholder={"Enter trade reference 1 "}
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
              <CustomPhoneInput
                control={control}
                name={"phone_number_1"}
                id={"phone_number_1"}
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
                name={"trade_reference_2"}
                id={"trade_reference_2"}
                label={"Trade Reference 2"}
                placeholder={"Enter Trade Reference 2 "}
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
              <CustomPhoneInput
                control={control}
                name={"phone_number_2"}
                id={"phone_number_2"}
                label={"Phone Number"}
                isRequired={true}
                defaultValue={""}
                placeholder={"Enter phone number"}
                isDisabled={false}
                errors={errors}
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

export default CreditApplication;
