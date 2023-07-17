import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

//helpers
import { getRedirect } from "helpers";

//components
import NavBar from "components/navBar";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomOtpInput from "components/textInputs/CustomOtpInput";

//redux
import {
  clearErrors,
  forgotPasswordUser,
  VerifyOtpPasswordReset,
  postNewPassword,
} from "store/actions";

const ForgotPassword = (props: any): JSX.Element => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    clearErrors,
    forgotPasswordUser,
    VerifyOtpPasswordReset,
    postNewPassword,
    error,
    loading,
    otp_data,
  } = props;

  const location = useLocation();
  const redirect = getRedirect(location, "dashboard");
  const [step, setStep] = useState(1);
  const [verifyToken, setVerifyToken] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [otpCode, setOtpCode] = useState(false);

  const onSubmit = (data: object) => {
    forgotPasswordUser(data, setStep, setVerifyToken);
  };

  const onSubmitOtp = (data: any) => {
    const { email, otp_code } = data;
    data = {
      verify_token: verifyToken,
      email,
      otp_code,
    };
    setUserEmail(email);
    setOtpCode(otp_code);
    VerifyOtpPasswordReset(data, setStep, setResetToken);
  };

  const onSubmitNewPassword = (data: any) => {
    const { password, confirm_password } = data;
    data = {
      email: userEmail,
      reset_token: resetToken,
      verify_token: verifyToken,
      otp_code: otpCode,
      password,
      confirm_password,
    };

    postNewPassword(data, setStep);
  };

  return (
    <>
      <NavBar />
      <div className="lg:px-2 grid md:place-items-center globe-bg">
        <div className="lg:w-5/12 sm:w-full lg:px-10">
          <div className="auth-card  md:px-10 mx-5 md:p-12 md:pt-0 pt-14">
            <div className="flex">
              {step == 1 && (
                <h3 className="text-lg black-text-2 font-bold">
                  Forgot Password
                </h3>
              )}
              {step == 2 && (
                <h3 className="text-lg black-text-2 font-bold">Token</h3>
              )}
              {step == 3 && (
                <h3 className="text-lg black-text-2 font-bold">
                  Create New Password
                </h3>
              )}
            </div>

            {error ? (
              <p className="bg-error p-3 text-center black-text text-sm my-4 lowercase rounded">
                {error}
              </p>
            ) : (
              <></>
            )}

            {step == 1 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5">
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
                  <div className="mt-5">
                    {/* @ts-ignore */}
                    <PrimaryButton title="Retrive Password" loading={loading} />
                  </div>
                </div>
              </form>
            )}

            {step == 2 && (
              <form onSubmit={handleSubmit(onSubmitOtp)}>
                <div className="mt-5">
                  <div className="">
                    {/* @ts-ignore */}
                    <CustomOtpInput
                      control={control}
                      label={`Enter the 6 Digit Token sent to your mail`}
                      name="otp_code"
                      isRequired={true}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-5">
                    {/* @ts-ignore */}
                    <PrimaryButton title="Continue" loading={loading} />
                  </div>
                </div>
              </form>
            )}

            {step == 3 && (
              <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                <div className="mt-5">
                  <div className="">
                    <CustomInput
                      control={control}
                      name={"password"}
                      id={"password"}
                      label={"New Password"}
                      isRequired={true}
                      isDisabled={false}
                      defaultValue={""}
                      min={""}
                      max={""}
                      icon={""}
                      placeholder={"Enter new password"}
                      type={"password"}
                      errors={errors}
                    />

                    <CustomInput
                      control={control}
                      name={"confirm_password"}
                      id={"confirm_password"}
                      label={"Confirm Password"}
                      isRequired={true}
                      isDisabled={false}
                      defaultValue={""}
                      min={""}
                      max={""}
                      icon={""}
                      placeholder={"Enter confirm password"}
                      type={"password"}
                      errors={errors}
                    />
                  </div>
                  <div className="mt-5">
                    {/* @ts-ignore */}
                    <PrimaryButton title="Continue" loading={loading} />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => {
  const { error, loading } = state.auth;
  return { error, loading };
};

export default connect(mapStateToProps, {
  forgotPasswordUser,
  VerifyOtpPasswordReset,
  postNewPassword,
  clearErrors,
})(ForgotPassword);
