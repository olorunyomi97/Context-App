import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

//icons
import mail from "assets/dock/mail.svg";
import arrowL from "assets/dock/arrow-left.svg";

//libraries
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//helpers
import { checkPassword } from "components/passwordStrengthMeter";

//redux
import {
  clearErrors,
  forgotPasswordUser,
  VerifyOtpPasswordReset,
  resetPassword,
} from "store/actions";

//components
import Button from "components/dock/Button";
import OutlineButton from "components/buttons/OutlineButton";
import CustomInput from "components/textInputs/CustomInput";
import CustomOtpInput from "components/textInputs/CustomOtpInput";

const ForgotPasswords = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const {
    forgotPasswordUser,
    VerifyOtpPasswordReset,
    resetPassword,
    error,
    loading,
  } = props;

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [passwordError, setPasswordError] = useState(false);
  const [userEmail, setUserEmail] = useState(false);
  const [verifyToken, setVerifyToken] = useState("");
  const [resetToken, setResetToken] = useState("");
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

  const toConfirmation = () => {
    navigate("/password-confirmation");
  };

  const onSubmitNewPassword = (data: any) => {
    //   @ts-ignore
    const test = checkPassword(data.password, null, 8);
    if (test < 4) {
      setPasswordError(true);
    } else {
      const { password, confirm_password } = data;
      data = {
        email: userEmail,
        reset_token: resetToken,
        verify_token: verifyToken,
        otp_code: otpCode,
        password,
        confirm_password,
      };

      resetPassword(data, toConfirmation);
    }
  };

  return (
    <div className="bg-[#F5F5F5] h-screen flex items-center justify-center">
      <div className="sm:w-[450px] w-full p-6 sm:p-0 max-w-[450px] h-fit">
        {step === 1 && (
          <>
            <h2 className="text-2xl black-text-3 text-center">
              Forgot password?
            </h2>
            <p className="text-sm grey-text font-light max-w-[296px] text-center mx-auto mt-1">
              Kindly provide your accounts email address
            </p>
            <div className="mt-20">
              <div className="mt-10">
                {error ? (
                  <p className="bg-error p-3 text-center text-red-600 font-500 text-sm my-4 font-light rounded">
                    {error}
                  </p>
                ) : (
                  <></>
                )}
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
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
                  icon={mail}
                  style={{ backgroundColor: "transparent" }}
                />
                <div className="mt-[36px]">
                  <Button
                    title="Reset Password"
                    isColored={true}
                    style={{ width: "100%", fontWeight: "400" }}
                    loading={loading}
                  />
                  <OutlineButton
                    title="Back to Log in"
                    disabled={false}
                    onClick={() => navigate("/signin")}
                    icon={arrowL}
                    loading={false}
                    style={{
                      color: "#6b7280",
                      width: "100%",
                      border: "none",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </form>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl black-text-3 text-center">
              Verify Your Account
            </h2>
            <p className="text-sm grey-text font-light text-center mt-1">
              Kindly input the OTP sent to your mail
            </p>
            <form onSubmit={handleSubmit(onSubmitOtp)}>
              <div className="mt-20 flex flex-col items-center justify-center">
                <div className="mt-10">
                  {error ? (
                    <p className="bg-error p-3 text-center text-red-600 font-500 text-sm my-4 font-light rounded">
                      {error}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
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
                  <span className="text-[#81899E]">
                    Didn’t receive the email?
                  </span>
                  <span className="green-text-3 font-normal cursor-pointer">
                    {" "}
                    Click to resend
                  </span>
                </div>
              </div>
            </form>
          </>
        )}
        {step === 3 && (
          <>
            <h2 className="text-2xl black-text-3 text-center">
              Set new password
            </h2>
            <p className="text-sm grey-text font-light max-w-[296px] text-center mx-auto mt-1">
              Your new password must be different from your previous passwords
            </p>
            <div className="mt-20">
              <form onSubmit={handleSubmit(onSubmitNewPassword)}>
                <div className="mt-10">
                  {error ? (
                    <p className="bg-error p-3 text-center text-red-600 font-500 text-sm my-4 font-light rounded">
                      {error}
                    </p>
                  ) : (
                    <></>
                  )}
                </div>
                <CustomInput
                  control={control}
                  name={"password"}
                  id={"password"}
                  label={"New Password"}
                  placeholder={"Enter your password"}
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
                  style={{ backgroundColor: "transparent" }}
                />
                <div className="mt-[36px]">
                  <Button
                    title="Reset Password"
                    isColored={true}
                    style={{ width: "100%", fontWeight: "400" }}
                    loading={loading}
                  />
                  <OutlineButton
                    title="Back to Log in"
                    disabled={false}
                    onClick={() => navigate("/signin")}
                    icon={arrowL}
                    loading={false}
                    style={{
                      color: "#6b7280",
                      width: "100%",
                      border: "none",
                      marginTop: "10px",
                    }}
                  />
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading } = state.auth;
  return { error, loading };
};

export default connect(mapStateToProps, {
  forgotPasswordUser,
  VerifyOtpPasswordReset,
  resetPassword,
  clearErrors,
})(ForgotPasswords);
