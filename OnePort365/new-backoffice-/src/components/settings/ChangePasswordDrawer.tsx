import { useState } from "react";
import SlidingPane from "react-sliding-pane";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import { changePassword } from "store/actions";
import { checkPassword } from "components/passwordStrengthMeter";

const ChangePasswordDrawer = (props: any) => {
    const { handleSubmit, control, formState: { errors }, reset} = useForm();

    const { isOpen, setIsOpen, changePassword, loading } = props;

	const [passwordError, setPasswordError] = useState(false);

	// const closeModal = () => {
	// setIsOpen(false);
	// };

	// const onSubmit = (data) => {
	// 	//   @ts-ignore
	// 	const test = checkPassword(data.new_password, null, 8);
	// 	if (test < 4) {
	// 	  setPasswordError(true);
	// 	} else {
	// 	  changePassword(data, closeModal);
	// 	}
	// };
	const onSubmit = (data: any) => {
        console.log(data);
        changePassword(data)
    }

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
                <i className="ion-ios-close px-3 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsOpen(false)}></i>

                <div className="mt-10 px-2">
                    <h3 className="text-xl black-text font-bold">Change Password</h3>

                    <div className="mt-12">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="">
                                <CustomInput
                                    control={control}
                                    name={"password"}
                                    id={"password"}
                                    label={"Old Password"}
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
                                    name={"confirm_password"}
                                    id={"confirm_password"}
                                    label={"Confirm Old Password"}
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
                                    isRequired={true}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                    placeholder={"********"}
                                    type={"password"}
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
                                />
								<div className="mt-5  w-20">
									{/* @ts-ignore */}
									<PrimaryButton
										title="Save"
										loading={loading}
									/>
								</div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </SlidingPane>
    );
};

// export default ChangePasswordDrawer;


const mapStateToProps = (state: any) => {
	const { error, loading } = state.settings;
	return { error, loading };
};
  
export default connect(mapStateToProps, { changePassword })(ChangePasswordDrawer);