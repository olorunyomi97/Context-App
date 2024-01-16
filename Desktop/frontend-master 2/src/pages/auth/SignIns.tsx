import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

//libraries
import { connect } from "react-redux";
import { useForm } from "react-hook-form";

//icons
import mail from "assets/dock/mail.svg";
import onePortLogo from "assets/logos/oneport-logo.svg";

//components
import CustomInput from "components/textInputs/CustomInput";
import Button from "components/dock/Button";

//redux actions
import { loginUser, clearErrors } from "store/actions";

//helpers
import { getRedirect } from "helpers";

const SignIns = (props: any) => {
  const { loginUser, clearErrors, error, loading } = props;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();


  const toSpecial = JSON.parse(sessionStorage.getItem('toSpecial') ?? 'null') as boolean;
  const shipmentId = sessionStorage.getItem("shipmentId");
  const jobNumber = sessionStorage.getItem("jobNumber");
  const openShipmentId = sessionStorage.getItem("openShipmentId");
  const haulageId = sessionStorage.getItem("haulageId");
  const customId = sessionStorage.getItem("customId");

  const location = useLocation();
  const redirect = getRedirect(location, openShipmentId ? `freight-rates/${openShipmentId}` : toSpecial ? '' : shipmentId ? `shipment-information/${shipmentId}` : jobNumber ? `shipments/${jobNumber}` : haulageId ? `haulages-details/${haulageId}` : customId ? `customs-brokerage/${customId}` : "dashboard");

  const onSubmit = (data: object) => {
    loginUser(data, redirect);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    clearErrors();
  }, []);

  return (
    <div className="max-h-screen h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="pt-7 min-h-screen overflow-auto login-screen">
        <div className="ml-6 sm:ml-20 sm:mr-[100px]">
          <Link to="/">
            <img src={onePortLogo} alt="" />
          </Link>
        </div>
        <div className="flex flex-col justify-center h-[calc(100vh_-_62px)] items-center">
          <div className="sm:max-w-[450px] w-full p-6 sm:p-0 sm:w-[450px] mt-[56px] mx-auto">
            <p className="text-xl black-text-3 mb-1">Hi, Welcome Back</p>
            <p className="text-sm grey-text font-light">
              Kindly enter your details
            </p>
            <div className="mt-10">
              {error ? (
                <p className="bg-error p-3 text-center text-red-600 font-500 text-sm my-4 font-light rounded">
                  {error}
                </p>
              ) : (
                <></>
              )}
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
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
              />
              <CustomInput
                control={control}
                name={"password"}
                id={"password"}
                label={"Password"}
                isRequired={true}
                isDisabled={false}
                defaultValue={""}
                min={""}
                max={""}
                icon={""}
                placeholder={"Enter your password"}
                type={"password"}
                errors={errors}
              />
              <div className="text-right">
                <Link
                  className="green-text-3 cursor-pointer font-light text-sm"
                  to="/forgot-password"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="mt-12">
                <Button
                  title="Log in"
                  isColored={true}
                  style={{ width: "100%", fontWeight: "400" }}
                  loading={loading}
                />
                <div className="mt-6 mb-16">
                  <div className="text-sm text-center font-light">
                    <span className="text-[#81899E]">
                      Don’t have an account?
                    </span>
                    <Link
                      to="/signup"
                      className="green-text-3 font-normal cursor-pointer"
                    >
                      {" "}
                      Sign up for free
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden my-5 mx-5 rounded-[10px] signin-bg lg:flex flex-col justify-end">
        <div className="px-12 xl:px-16 mb-[123px]">
          <p className="text-[#F9FAFB] font-normal max-w-[582px] text-2xl leading-[39px] xl:leading-[48px] lg:text-[25px] xl:text-[30px] pb-6 border-b-solid border-b-[#6b7280] border-b-[1px] sato">
            “Oneport365 made my shipment process effortless and stress-free.
            Their team was professional, reliable and always kept me informed
            throughout the entire process.”
          </p>
          <div className="mt-6">
            <p className="text-[#F9FAFB] font-medium sato">Amaeze Ifechukwu</p>
            <p className="text-[#D1D5DB] font-normal sato">
              Experienced Agro Exporter
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { error, loading } = state.auth;
  return { error, loading };
};

export default connect(mapStateToProps, { loginUser, clearErrors })(SignIns);
