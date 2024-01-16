import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import PageLoading from "components/partials/pageLoading";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomSelect from "components/selectInputs/CustomSelect";

const CompanyDetails = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState(true);

  let user = useSelector((state: any) => state.auth.user_data);
  let localStorageUser = localStorage.getItem("user_data")
    ? JSON.parse(localStorage.getItem("user_data")!)
    : null;

  user = user ? user : localStorageUser;

  const fetching_data = false;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              Company Details
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
                name={"company_name"}
                id={"company_name"}
                label={"Registered Company Name"}
                placeholder={"Enter company name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={user?.company_name}
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"vat"}
                id={"vat"}
                label={"VAT Registration Number"}
                placeholder={"Enter VAT registration number"}
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

            <div className=" mb-3">
              <p className="text-xs black-text font-medium mb-2">
                Company Registration Number
              </p>
              <div className="grid grid-cols-2">
                <div className="mr-1">
                  <CustomRadio
                    selected={companyRegistrationNumber}
                    label={"Yes"}
                    onClick={() =>
                      setCompanyRegistrationNumber(!companyRegistrationNumber)
                    }
                  />
                </div>

                <div className="ml-1">
                  <CustomRadio
                    selected={!companyRegistrationNumber}
                    label={"No"}
                    onClick={() =>
                      setCompanyRegistrationNumber(!companyRegistrationNumber)
                    }
                  />
                </div>
              </div>
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"company_address"}
                id={"company_address"}
                label={"Company Address"}
                placeholder={"Enter your company address"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  //   specific_datasheet_section?.company_address ||
                  user?.company_address
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <CustomInput
                control={control}
                name={"city"}
                id={"city"}
                label={"City"}
                placeholder={"Enter city"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />

              <CustomInput
                control={control}
                name={"state"}
                id={"state"}
                label={"State"}
                placeholder={"Enter state"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={""}
                min={""}
                max={""}
                icon=""
              />
            </div>
            <div className="">
              <CustomInput
                control={control}
                name={"telephone"}
                id={"telephone"}
                label={"Telephone Number"}
                placeholder={"Enter telephone number"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  //   specific_datasheet_section?.contact_person_phone ||
                  user?.phone
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"email"}
                id={"email"}
                label={"Email Address"}
                placeholder={"Enter  email"}
                isRequired={true}
                type={"email"}
                errors={errors}
                isDisabled={true}
                defaultValue={
                  //   specific_datasheet_section?.contact_person_email ||
                  user?.email
                }
                min={""}
                max={""}
                icon=""
              />
            </div>

            <div>
              <CustomSelect
                control={control}
                name={"nature_of_business"}
                id={"nature_of_business"}
                label={"Nature of Business"}
                placeholder={"select nature of business"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={[
                  { label: "B2B (We Sell to other businesses)", value: "B2B" },
                  { label: "B2C", value: "B2C" },
                ]}
                defaultValue={""}
                icon=""
              />
            </div>

            <div className="">
              <CustomInput
                control={control}
                name={"tax_exemption_number"}
                id={"tax_exemption_number"}
                label={"Tax Exemption Number"}
                placeholder={"Enter tax exemption number"}
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
                name={"importer_code"} //put if statement here to check if it's import or export
                id={"importer_code"}
                label={"Importer's Code"}
                placeholder={"Enter importers code"}
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

            <div className="grid grid-cols-3 mt-10 items-center">
              <div className=""></div>
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

export default CompanyDetails;
