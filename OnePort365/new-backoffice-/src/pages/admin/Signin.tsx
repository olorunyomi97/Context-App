import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import NavBar from "components/navBar";
import { getRedirect } from "helpers";
//image
import ship from "assets/images/ship.png";
//components
import CustomInput from "components/textInputs/CustomInput";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import PrimaryButton from "components/buttons/PrimaryButton";
import GoogleButton from "components/buttons/GoogleButton";
import LinkedInButton from "components/buttons/LinkedInButton";

const SignInAdmin = (props: any): JSX.Element => {
    const {
      handleSubmit,
      control,
      formState: { errors },
    } = useForm();
    const { loginUser, error, loading } = props;
    const location = useLocation();
    const redirect = getRedirect(location, "dashboard");
  
    const onSubmit = (data: object) => {
        loginUser(data, redirect);
      };
  return (
    <>
       <NavBar />
    
       <div className="lg:px-2 grid place-items-center  image-bg-net">
      
          <div className="w-5/12 px-10">
            <div className="signin-card  px-10 mx-5 p-12">
              <div className="flex">
                <h3 className="text-lg black-text-2 font-bold">Admin Sign in</h3>
               </div>

              {error ? (
                <p className="bg-error p-3 text-center black-text text-sm my-4 lowercase rounded">
                  {error}
                </p>
              ) : (
                <></>
              )}
                
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
                  </div>

                  <div className="flex mt-3 mb-5">
                    {/* @ts-ignore */}
                    <CustomCheckBox
                      name="remember_me"
                      id="remember_me"
                      label="Remember Me"
                      isRequired={false}
                      defaultChecked={false}
                      isDisabled={false}
                    />

                    <Link
                      to="/forgot-password"
                      className="ml-auto text-right text-sm black-text"
                    >
                      Forgot password?
                    </Link>
                  </div> 
                  <div className="mt-5">
                    {/* @ts-ignore */}
                    <PrimaryButton title="Sign In" loading={loading} />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
    
    </>
  );
};
export default SignInAdmin;
