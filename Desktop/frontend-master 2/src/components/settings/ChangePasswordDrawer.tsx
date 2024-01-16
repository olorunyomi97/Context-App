import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import { checkPassword } from "components/passwordStrengthMeter";

//redux
import { changePassword } from "store/actions";

const ChangePasswordDrawer = (props: any) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { isOpen, setIsOpen, changePassword, loading } = props;

  const [passwordError, setPasswordError] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    //   @ts-ignore
    const test = checkPassword(data.new_password, null, 8);
    if (test < 4) {
      setPasswordError(true);
    } else {
      changePassword(data, closeModal);
    }
  };

  return (
    <SlidingPane
      className="custom-slider"
      overlayClassName="some-custom-overlay-class"
      isOpen={isOpen}
      hideHeader={true}
      width="756px"
      onRequestClose={() => {
        // triggered on "<" on left top click or on outside click
        setIsOpen(false);
      }}
    >
      <div className="">
        <i
          className="ion-ios-close px-3 bg-grey text-3xl rounded-full black-text cursor-pointer"
          onClick={closeModal}
        ></i>

        <div className="mt-10 px-2">
          <h3 className="text-xl black-text font-bold">Change Password</h3>

          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="">
                <CustomInput
                  control={control}
                  name={"old_password"}
                  id={"old_password"}
                  label={"Current Password"}
                  isRequired={true}
                  isDisabled={false}
                  defaultValue={""}
                  min={""}
                  max={""}
                  icon={""}
                  placeholder={"********"}
                  type={"password"}
                  errors={errors}
                />

                <CustomInput
                  control={control}
                  name={"new_password"}
                  id={"new_password"}
                  label={"New Password"}
                  placeholder={"Enter your password"}
                  isRequired={true}
                  type={"password-with-strength-meter"}
                  errors={
                    passwordError
                      ? {
                          new_password: {
                            message:
                              "please fullfil the password conditions below.",
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

                {/* <CustomInput
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
                  placeholder={"********"}
                  type={"password"}
                  errors={errors}
                /> */}
              </div>

              <div className="mt-5  w-20">
                {/* @ts-ignore */}
                <PrimaryButton title="Save" loading={loading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </SlidingPane>
  );
};

const mapStateToProps = (state: any) => {
  const { loading } = state.settings;
  return { loading };
};

export default connect(mapStateToProps, { changePassword })(
  ChangePasswordDrawer
);
