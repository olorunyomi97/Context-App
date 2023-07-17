import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import SlidingPane from "react-sliding-pane";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import { editProfile } from "store/actions";

const EditProfileDrawer = (props: any) => {
	let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
    // console.log(admin_data);

    const { handleSubmit, control, formState: { errors }, reset } = useForm();

    const { isOpen, setIsOpen, editProfile, loading  } = props;

    const onSubmit = (data:any) => {
		console.log(data);
		editProfile(data);
	};

    return (
        <>
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
                    <i className="ion-ios-arrow-round-back py-1 px-3 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsOpen(false)}></i>

                    <div className="mt-10 px-2">
                        <h3 className="text-xl black-text font-bold">Edit Profile</h3>

                        <div className="mt-7">
                            {/* <p className="text-sm text-sm mb-5 ">Profile/Company Image</p>

                            <div className="flex items-center">
                                <div className="bg-light-green p-5 rounded-full  flex justify-center">
                                    <img src={userIcon} alt="" width={20} />
                                </div>

                                <div className="ml-4">
                                    <label htmlFor="upload-image" className="green-text text-sm cursor-pointer">
                                        Click to upload
                                    </label>

                                    <input type="file" className="hidden" name="upload-image" id="upload-image" accept="image/png, image/jpeg" />
                                </div>
                            </div> */}

                            <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
                                <div className="">
                                    {/* <div className="grid grid-cols-2"> */}
									<div>
                                        <div className="mr-1">
                                            <CustomInput
                                                control={control}
                                                name={"firstname"}
                                                id={"firstname"}
                                                label={"First name"}
                                                placeholder={"Enter your first name"}
                                                isRequired={true}
                                                type={"text"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={admin_data?.firstname}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>

                                        <div className="ml-1">
                                            <CustomInput
                                                control={control}
                                                name={"lastname"}
                                                id={"lastname"}
                                                label={"Last name"}
                                                placeholder={"Enter your last name"}
                                                isRequired={true}
                                                type={"text"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={admin_data?.lastname}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>
                                    </div>

                                    {/* <div className="">
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
                                            defaultValue={"Grey Import Export Limited"}
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                    </div> */}

                                    {/* <div className="">
                                        <CustomGoogleInput
                                            icon=""
                                            control={control}
                                            name={"company_address"}
                                            id={"company_address"}
                                            label={"Company address"}
                                            placeholder={"Enter your company address"}
                                            isRequired={true}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={"4517 Washington Ave. Manchester, Kentucky 39495"}
                                        />
                                    </div> */}

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
                                            isDisabled={true}
                                            defaultValue={admin_data?.email}
                                            min={""}
                                            max={""}
                                            icon=""
                                        />
                                    </div>

									<div className="">
                                        <CustomInput
                                            control={control}
                                            name={"role"}
                                            id={"role"}
                                            label={"Company Role"}
                                            placeholder={"Enter your email"}
                                            isRequired={true}
                                            type={"text"}
                                            errors={errors}
                                            isDisabled={true}
                                            defaultValue={admin_data?.role === "super_admin" ? "Super Admin" : "Admin"}
                                            min={""}
                                            max={""}
                                            icon=""
                                        />
                                    </div>

                                    {/* <div className="">
                                        <CustomPhoneInput
                                            control={control}
                                            name={"phone"}
                                            id={"phone"}
                                            label={"Phone number"}
                                            isRequired={true}
                                            defaultValue={"8184433609"}
                                            placeholder={"Enter your phone number"}
                                            isDisabled={false}
                                            errors={errors}
                                        />
                                    </div> */}

                                    <div className="w-20">
                                        {" "}
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
        </>
    );
};

// export default EditProfileDrawer;

const mapStateToProps = (state: any) => {
    const {  error, loading } = state.settings;
    return {  error, loading };
};

export default connect(mapStateToProps, {editProfile})(EditProfileDrawer);

