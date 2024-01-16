import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

//libraries
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//icons
import mail from "assets/dock/mail.svg";
import arrowL from "assets/dock/arrow-left.svg";
import onePortLogo from "assets/logos/oneport-logo.svg";

//components
import CustomInput from "components/textInputs/CustomInput";
import Button from "components/dock/Button";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import OutlineButton from "components/buttons/OutlineButton";

//redux
import {
  validatePhoneAndEmail,
  clearErrors,
  registerUser,
} from "store/actions";

//helpers
import { getRedirect } from "helpers";
import { checkPassword } from "components/passwordStrengthMeter";

const SignsUp = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { validatePhoneAndEmail, clearErrors, registerUser, error, loading } =
    props;

  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError] = useState(false);

  const location = useLocation();
  const redirect = getRedirect(location, "signup-success");

  const onSubmitStepOne = (data: any) => {
    console.log("dataHere>>>", data);
    const { email, phone_number } = data;
    data = {
      email,
      phone: phone_number.phone,
    };
    validatePhoneAndEmail(data, setStep);
  };

  const onSubmitSignUp = (data: any) => {
    setPasswordError(false);
    const test = checkPassword(data.password, null, 8);
    if (test < 4) {
      setPasswordError(true);
      return;
    } else {
      let phone_details = data.phone_number;
      data.phone = phone_details.phone;
      data.phone_code = phone_details.country_code;

      data.company_address = data.company_address.label;

      registerUser(data, `/verify-email?redirect=${redirect}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    clearErrors();
  }, []);

  return (
    <div className="max-h-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="pt-7 min-h-screen overflow-y-auto login-screen">
        <div className="ml-6 sm:ml-20 sm:mr-[100px] mr-6 flex justify-between items-center">
          <Link to="/">
            <img src={onePortLogo} alt="" />
          </Link>
          <Link to="/signin" className="green-text-3 underline cursor-pointer">
            I have an account
          </Link>
        </div>
        <div className="sm:max-w-[450px] w-full p-6 pt-0 sm:p-0 sm:w-[450px] mt-20 mx-auto">
          <p className="text-xl black-text-3 mb-1">Create an account</p>
          <p className="text-sm grey-text font-light">
            {step === 1
              ? "Enter your credentials below"
              : "Add your account’s password"}
          </p>
          <div className="flex mt-6">
            <div
              className={`w-[100px] transition-all ease-out h-[2px] ${
                step === 1 ? "bg-[#3AB44A]" : "bg-[#F3F4F6]"
              } `}
            />
            <div
              className={`w-[100px] transition-all ease-out h-[2px] ${
                step === 1 ? "bg-[#F3F4F6]" : "bg-[#3AB44A]"
              } `}
            />
          </div>
          <div className="my-2">
            {error ? (
              <p className="bg-error p-3 text-center capitalize text-red-600 font-500 text-sm my-4 font-light rounded">
                {error}
              </p>
            ) : (
              <></>
            )}
          </div>
          {step === 1 ? (
            <form className="mt-10" onSubmit={handleSubmit(onSubmitStepOne)}>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-6">
                <CustomInput
                  control={control}
                  name={"firstname"}
                  id={"firstname"}
                  label={"First Name"}
                  placeholder={"Input your first name"}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                />
                <CustomInput
                  control={control}
                  name={"lastname"}
                  id={"lastname"}
                  label={"Last Name"}
                  placeholder={"Input your last name"}
                  isRequired={true}
                  type="text"
                  errors={errors}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                />
              </div>
              <CustomInput
                control={control}
                name={"email"}
                id={"email"}
                label={"Email"}
                placeholder={"@mail.com"}
                isRequired={true}
                type="text"
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={mail}
              />
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
              <CustomInput
                control={control}
                name={"company_name"}
                id={"company_name"}
                label={"Company name"}
                placeholder={"Enter your company name"}
                isRequired={true}
                type={"text"}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={""}
              />
              <CustomGoogleInput
                icon=""
                control={control}
                name={"company_address"}
                id={"company_address"}
                label={"Company address"}
                placeholder={"Enter your registered company address"}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                defaultValue={""}
                allowWorldWide={true}
              />
              <div className="mt-12">
                <Button
                  title="Continue"
                  isColored={true}
                  style={{ width: "100%", fontWeight: "500" }}
                  loading={loading}
                />
                <div className="mt-6 mb-16">
                  <p className="max-w-[274px] mx-auto text-xs text-center font-light">
                    By creating an account you accept, Oneport365{" "}
                    <span className="green-text-3 font-normal">
                      Terms of Use and Privacy Policy
                    </span>
                  </p>
                </div>
              </div>
            </form>
          ) : step === 2 ? (
            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmitSignUp)}>
                <CustomInput
                  control={control}
                  name={"password"}
                  id={"password"}
                  label={"New Password"}
                  placeholder={"*********"}
                  isRequired={true}
                  type="password-with-strength-meter"
                  errors={
                    passwordError
                      ? {
                          password: {
                            message:
                              "Please fullfil the password conditions below.",
                          },
                        }
                      : errors
                  }
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                  extra={false}
                />
                {/* <CustomInput
                                        control={control}
                                        name={"new_password"}
                                        id={"new_password"}
                                        label={"Confirm Password"}
                                        placeholder={"*********"}
                                        isRequired={true}
                                        type="password-with-strength-meter"
                                        errors={
                                            passwordError ? {
                                                new_password: {
                                                    message:
                                                        "The passwords do not match",
                                                },
                                            }
                                                : errors
                                        }
                                        isDisabled={false}
                                        defaultValue={""}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    /> */}

                <div className="mt-20 md:mt-[100px] flex flex-col md:flex-row items-center md:gap-x-6 gap-y-6 md:gap-y-0">
                  <div className="w-full md:w-[30%] order-1">
                    <OutlineButton
                      title="Go Back"
                      disabled={false}
                      onClick={() => setStep(1)}
                      icon={arrowL}
                      loading={false}
                      style={{ width: "100%", color: "#6b7280" }}
                    />
                  </div>
                  <div className="w-full md:w-[70%] md:order-2">
                    <Button
                      title="Create Account"
                      isColored={true}
                      style={{ width: "100%", fontWeight: "500" }}
                      loading={loading}
                    />
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="hidden my-5 mx-5 rounded-[10px] signup-bg lg:flex flex-col justify-end">
        <div className="px-16 mb-[123px]">
          <p className="text-[#F9FAFB] max-w-[582px] text-2xl leading-[39px] xl:leading-[48px] lg:text-[25px] xl:text-[30px] pb-6 border-b-solid border-b-[#6b7280] border-b-[1px] sato">
            “Oneport365 made my shipment process effortless and stress-free.
            Their team was professional, reliable and always kept me informed
            throughout the entire process.”
          </p>
          <div className="mt-6">
            <p className="text-[#F9FAFB] font-medium sato">Amaeze Ifechukwu</p>
            <p className="text-[#D1D5DB] font-normal sato">Experienced Agro Exporter</p></div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading } = state.auth;
  return { error, loading };
};

export default connect(mapStateToProps, {
  validatePhoneAndEmail,
  clearErrors,
  registerUser,
})(SignsUp);
