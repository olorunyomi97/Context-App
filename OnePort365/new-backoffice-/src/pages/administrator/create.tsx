import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import CustomInput from "components/textInputs/CustomInput";
import userIcon from "assets/icons/user-plus.svg";
import { createAdmin, AdminApiError } from "store/actions";

const CreateAdmin = (props: any) => {
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { createAdmin, loading } = props;
    // const loading = false;
    const [error, seterror] = useState(null);

    const onSubmit = (data: any) => {
        console.log(data);
        createAdmin(data, "/admins")
    }


  return (
    <div className="flex">
		<Aside activeTab="admin"/>
		<div className="">
			<TopBar title={"Admin Creation"} />
                <div className="">
                    {/* <i className="ion-ios-arrow-round-back py-1 px-3 bg-grey text-3xl rounded-full black-text cursor-pointer"></i> */}
                    <div className="mt-10 pl-14 create-card" >
                        <div className="flex items-center">
                            <Link to="/admins">
                                <i className="ion-ios-arrow-round-back text-2xl mr-2 font-semibold black-text"></i>
                            </Link>
                            <p className="text-lg black-text font-semibold">Add Admin</p>
                        </div>
                        <div className="mt-3">
                            {/* <p className="text-sm text-sm mb-2 ">Profile Image</p>

                            <div className="flex items-center">
                                <div className="bg-light-green pl-5 pr-5 pt-3 pb-3 rounded-full  flex justify-center">
                                    <img src={userIcon} alt="" width={20} />
                                </div>

                                <div className="ml-4">
                                    <label htmlFor="upload-image" className="green-text text-sm cursor-pointer">
                                        Click to upload
                                    </label>

                                    <input type="file" className="hidden" name="upload-image" id="upload-image" accept="image/png, image/jpeg" />
                                </div>
                            </div> */}
                            {error ? (
                                <p className="bg-error p-3 text-center black-text text-sm my-4 rounded">
                                    {error}
                                </p>
                            ) : (
                                <div></div>
                            )}
                            <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
                                <div className="">
                                    <div className="grid grid-cols-2">
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
                                                defaultValue={""}
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
                                                defaultValue={""}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>
                                    </div>

                                    <div className="">
                                        <CustomInput
                                            control={control}
                                            name={"email"}
                                            id={"email"}
                                            label={"Email Address(Official Email Address)"}
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

                                    <div className="">
                                        <CustomPhoneInput
                                            control={control}
                                            name={"phone"}
                                            id={"phone"}
                                            label={"Phone number"}
                                            isRequired={true}
                                            defaultValue={""}
                                            placeholder={"Enter your phone number"}
                                            isDisabled={false}
                                            errors={errors}
                                        />
                                    </div>
                                    {/* <label className="block text-gray-700 text-sm font-bold mb-2 mt-4">Job Role</label>
                                    <div className="relative mb-6">
                                        <select className="form-input px-4 py-1.5 custom-input w-full black-text">
                                            <option>Select Role</option>
                                            <option>Sales</option>
                                            <option>Commercial</option>
                                            <option>Operations</option>
                                            <option>Finance</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                        </div>
                                    </div> */}

                                    <div className="w-20">
                                        {" "}
                                        {/* @ts-ignore */}
                                        <PrimaryButton title="Save" loading={loading} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

		</div>
    </div>
  );
};

// export default CreateAdmin
const mapStateToProps = (state: any) => {
    const { admins, error, loading } = state.admins;
    return { admins, error, loading };
};

export default connect(mapStateToProps, {createAdmin,AdminApiError})(CreateAdmin);
