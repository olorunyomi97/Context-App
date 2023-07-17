import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";

//components
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";

const ChangePasswordDrawer = (props: any) => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { loading } = props

    const { isOpen, setIsOpen } = props;

    const onSubmit = () => {};

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
                                    name={"current_password"}
                                    id={"current_password"}
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
                                    name={"password"}
                                    id={"password"}
                                    label={"New Password"}
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
                                />
                            </div>

                            <div className="mt-5  w-20">
                                {/* @ts-ignore */}
                                <PrimaryButton title="Save"  loading={loading}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </SlidingPane>
    );
};

export default ChangePasswordDrawer;
