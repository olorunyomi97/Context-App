import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { connect } from "react-redux";

//icons
import onePortLogo from "assets/logos/oneport-logo.svg";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButtons from "components/buttons/PrimaryButtons";

//redux
import { changePassword } from "store/actions";

const TeamVerification = (props: any) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { changePassword, loading } = props;

  const [passwordError, setPasswordError] = useState(false);

  let [searchParams, setSearchParams] = useSearchParams();
  //@ts-ignore
  const email: string = searchParams.get("email");
  console.log("email>>>", email);

  const onVerify = () => {
    navigate("/signin");
  };

  const onSubmit = (data) => {
    setPasswordError(false);
    if (data.confirm_password !== data.new_password) {
      setPasswordError(true);
      return;
    }

    let data_ = {
      old_password: data.default_password,
      new_password: data.new_password,
    };

    changePassword(data_, onVerify);
  };

  return (
    <div>
      <div className="w-full lg:w-[530px] mx-auto mt-14">
        <div className="flex justify-center mb-8">
          <img src={onePortLogo} alt="" />
        </div>
        <p className="text-[#344366] text-2xl text-center">
          Please Setup Your{" "}
          <span className="text-[#3AB44A]">OnePort365 Team </span>Password
        </p>
        <div className="solid-br rounded mt-10 px-7 md:px-16 pt-12 pb-16 mx-4 md:mx-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInput
              control={control}
              name={"email"}
              id={"email"}
              label={"Email"}
              placeholder={"user@gmail.com"}
              isRequired={true}
              type="email"
              errors={errors}
              isDisabled={true}
              defaultValue={email}
              min={""}
              max={""}
              icon={""}
            />
            <CustomInput
              control={control}
              name={"default_password"}
              id={"default_password"}
              label={"Default Password"}
              placeholder={"********"}
              isRequired={true}
              type="password"
              errors={errors}
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon={""}
            />
            <CustomInput
              control={control}
              name={"new_password"}
              id={"new_password"}
              label={"New Password"}
              placeholder={"*********"}
              isRequired={true}
              type="password"
              errors={
                passwordError
                  ? {
                      new_password: {
                        message: "The passwords do not match",
                      },
                    }
                  : errors
              }
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon={""}
            />
            <CustomInput
              control={control}
              name={"confirm_password"}
              id={"confirm_password"}
              label={"Confirm Password"}
              placeholder={"*********"}
              isRequired={true}
              type="password"
              errors={
                passwordError
                  ? {
                      confirm_password: {
                        message: "The passwords do not match",
                      },
                    }
                  : errors
              }
              isDisabled={false}
              defaultValue={""}
              min={""}
              max={""}
              icon={""}
            />
            <PrimaryButtons
              title="Invite Team Member"
              style={{ color: "#59725C", marginTop: "30px" }}
              onClick={() => console.log("first")}
              disabled={false}
              loading={loading}
              icon={""}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  const { loading } = state.settings;
  return { loading };
};

export default connect(mapStateToProps, { changePassword })(TeamVerification);
