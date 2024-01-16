import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

//libraries
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//components
import Button from "components/dock/Button";
import CustomOtpInput from "components/textInputs/CustomOtpInput";

//helpers
import { getRedirect } from "helpers";

//redux
import {
  clearErrors,
  resendVerification,
  validateRegistration,
} from "store/actions";

const EmailVerifications = (props: any) => {
  const {
    clearErrors,
    error,
    loading,
    validateRegistration,
    resendVerification,
  } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [counter, setCounter] = useState(10);

  const location = useLocation();
  const redirect = getRedirect(location, "dashboard");

  const urlParams = new URLSearchParams(location.search);
  const token = urlParams.get("token") ?? " ";

  const otp_data = {
    verify_token: decodeURIComponent(token.replace(/ /g, "+")),
    email: urlParams.get("email"),
    otp_code: 0,
  };

  const onSubmit = (data: any) => {
    otp_data.otp_code = parseInt(data.otp_code);

    validateRegistration(otp_data, redirect);
  };

  const resendOtp = () => {
    setCounter(10);
    resendVerification(
      { email: otp_data.email },
      `/verify-email?redirect=${redirect}`
    );
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    //@ts-ignore
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    window.scrollTo(0, 0);
    clearErrors();
  }, []);

  return (
    <div className="bg-[#F5F5F5] h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full p-6 sm:p-0 h-fit max-w-[450px]">
        <h2 className="text-2xl black-text-3 text-center">
          Verify Your Account
        </h2>
        <p className="text-sm grey-text font-light text-center mt-1">
          Kindly input the OTP sent to your mail
        </p>
        <div className="mt-5">
          {error ? (
            <p className="bg-error p-2 text-center text-red-600 font-500 text-sm font-light rounded">
              {error}
            </p>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-20 flex justify-center">
            <CustomOtpInput
              control={control}
              // label={`Enter the 6 Digit Token sent to your mail`}
              name="otp_code"
              isRequired={true}
              errors={errors}
            />
          </div>
          <div className="mt-12">
            <Button
              title="Complete Verification"
              isColored={true}
              style={{ width: "100%", fontWeight: "500" }}
              loading={loading}
            />
            <div className="text-sm mt-6 text-center font-light">
              <span className="text-[#81899E]">Didn’t receive the email?</span>
              {counter === 0 ? (
                <span
                  className="green-text-3 font-normal cursor-pointer"
                  onClick={() => counter === 0 && resendOtp()}
                >
                  {" "}
                  Click to resend
                </span>
              ) : (
                <span className="green-text-3 font-normal">
                  {" "}
                  Resend otp {`in ${counter} second(s).`}
                </span>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading, otp_data } = state.auth;
  return { error, loading, otp_data };
};

export default connect(mapStateToProps, {
  clearErrors,
  validateRegistration,
  resendVerification,
})(EmailVerifications);
