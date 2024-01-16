import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//components
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomInput from "components/textInputs/CustomInput";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomDnD from "components/customDnD/CustomDnD";
import PrimaryButton from "components/buttons/PrimaryButton";
import OutlineButton from "components/buttons/OutlineButton";

const CustomerDetails = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { nextStep } = props;

  const [cacCertificate, setCacCertificate] = useState("");
  const [cacError, setCacError] = useState(false);
  const [cacMemart, setCacMemart] = useState("");
  const [cacMemartError, setCacMemartError] = useState(false);

  const onSubmit = (data: any) => {
    nextStep();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="">
        <div className="solid-br p-7 pb-10 mb-10 rounded">
          <div className="">
            <CustomInput
              control={control}
              name={"email"}
              id={"email"}
              label={"Email Address"}
              placeholder={"Enter your email"}
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
            <CustomSelect
              control={control}
              name={"company_structure"}
              id={"company_structure"}
              label={"Company Structure"}
              placeholder={"select company structure"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              options={[
                { label: "PLC", value: "PLC" },
                { label: "LLC", value: "LLC" },
              ]}
              defaultValue={""}
              icon=""
            />
          </div>

          <div className="">
            <CustomInput
              control={control}
              name={"business_name"}
              id={"business_name"}
              label={"Business name"}
              placeholder={"Enter your business name"}
              isRequired={true}
              type={"text"}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon={""}
            />
          </div>

          <div className="">
            <CustomGoogleInput
              icon=""
              control={control}
              name={"business_address"}
              id={"business_address"}
              label={"Business address"}
              placeholder={"Enter your business address"}
              isRequired={true}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
            />
          </div>

          <div className="">
            <CustomInput
              control={control}
              name={"rc_number"}
              id={"rc_number"}
              label={"RC Number"}
              placeholder={"Enter your RC number"}
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
              name={"tin_number"}
              id={"tin_number"}
              label={"TIN Number"}
              placeholder={"Enter your TIN number"}
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

          <p className="text-sm black-text font-semibold mt-10 mb-3">
            Director 1
          </p>

          <div className="grid grid-cols-2">
            <div className="mr-1">
              <CustomInput
                control={control}
                name={"full_name"}
                id={"full_name"}
                label={"Full Name"}
                placeholder={"Enter your full name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={""}
              />
            </div>

            <div className="ml-1">
              <CustomInput
                control={control}
                name={"email"}
                id={"email"}
                label={"Email Address"}
                placeholder={"Enter your email"}
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
          </div>

          <div className="">
            <CustomInput
              control={control}
              name={"dob"}
              id={"dob"}
              label={"Date of Birth"}
              placeholder={"Enter date of birth"}
              isRequired={true}
              type={"date"}
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon=""
            />
          </div>

          <div className="grid grid-cols-2">
            <div className="mr-1">
              <CustomSelect
                control={control}
                name={"company_structure"}
                id={"company_structure"}
                label={"Company Structure"}
                placeholder={"Select means of ID"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={[
                  {
                    label: "International passport",
                    value: "International passport",
                  },
                  { label: "NIN", value: "NIN" },
                  { label: "Driver's License", value: "Driver's License" },
                ]}
                defaultValue={""}
                icon=""
              />
            </div>

            <div className="ml-1">
              <CustomInput
                control={control}
                name={"id_number"}
                id={"id_number"}
                label={"Means of ID number"}
                placeholder={"Enter your Means of ID number"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={""}
              />
            </div>
          </div>

          <div className=" mb-3">
            <p className="text-xs black-text font-medium mb-1">
              CAC Certificate
            </p>
            <CustomDnD
              handleChange={setCacCertificate}
              file={cacCertificate}
              error={cacError}
              name={"CAC Certificate"}
              pdfOnly={false}
            />
          </div>
          <div className="">
            <p className="text-xs black-text font-medium mb-1">CAC Memart</p>
            <CustomDnD
              handleChange={setCacMemart}
              file={cacMemart}
              error={cacMemartError}
              name={"CAC Memart"}
              pdfOnly={false}
            />
          </div>
        </div>

        <div className="flex my-10">
          <div className="lg:ml-auto mr-3">
            {/* @ts-ignore  */}
            <OutlineButton
              // loading={loading.requesting_follow_up}
              // disabled={loading.requesting_follow_up || loading.accepting_quote}
              title={"Previous"}
              // onClick={() => onContact()}
              style={{ width: "10rem" }}
            />
          </div>

          {/* @ts-ignore  */}
          <PrimaryButton
            // loading={loading.accepting_quote}
            // disabled={loading.accepting_quote || loading.requesting_follow_up}
            // onClick={() => onAccept()}
            title="Save & Continue"
            style={{ width: "10rem" }}
          />
        </div>
      </form>
    </>
  );
};

export default CustomerDetails;
