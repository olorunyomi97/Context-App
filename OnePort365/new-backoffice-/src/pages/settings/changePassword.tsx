import { useState } from "react";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ProfileDrawer from "components/settings/ProfileDrawer";

//icons
// import userIcon from "assets/icons/user.svg";
import lockIcon from "assets/icons/lock.svg";
import ChangePasswordDrawer from "components/settings/ChangePasswordDrawer";

const Settings = (props: any) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

    return (
        <>
            <div className="flex">
                <Aside activeTab="setting" />

                <div className="">
                    <TopBar title={"Settings"} />

                    <div className="lg:px-14 lg:pt-10 container  w-full">
                        <div className="grid lg:grid-cols-2">
                            <div className="">
                                {/* <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer" onClick={() => setIsProfileOpen(true)}>
                                    <img src={userIcon} alt="" width={20} />
                                    <p className="black-text ml-3 font-semibold text-sm">Profile Settings</p>
                                </div> */}

                                <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsChangePasswordOpen(true)}>
                                    <img src={lockIcon} alt="" width={20} />
                                    <p className="black-text ml-3 font-semibold text-sm">Change Password</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
                <ChangePasswordDrawer isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
            </div>
        </>
    );
};

export default Settings;

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import { useForm } from "react-hook-form";
// //components
// import Aside from "components/partials/aside";
// import TopBar from "components/partials/topBar";
// import PrimaryButton from "components/buttons/PrimaryButton";
// import CustomInput from "components/textInputs/CustomInput";

// const Settings = (props: any) => {
//     const { handleSubmit, control, formState: { errors }} = useForm();
//     const { loading } = props;
//   return (
//     <div className="flex">
// 		<Aside activeTab="setting" />
// 		<div className="">
// 			<TopBar title={"Change Password"} />
// 			<div className="px-14 pt-10 container mx-auto w-full">
//                 <form className="px-8 py-8 right-divider top-divider bottom-divider left-divider rounded w-full">
//                     <div className="mb-5">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Old Password</label>
//                         <CustomInput
//                             control={control}
//                             name={"oldpassword"}
//                             id={"oldpassword"}
//                             label={""}
//                             isRequired={true}
//                             isDisabled={false}
//                             defaultValue={""}
//                             min={""}
//                             max={""}
//                             icon={""}
//                             placeholder={"Enter your Old Password"}
//                             type={"password"}
//                             errors={errors}
//                         />
//                     </div>
//                     <div className="mb-5">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">New Password</label>
//                         <CustomInput
//                             control={control}
//                             name={"newpassword"}
//                             id={"newpassword"}
//                             label={""}
//                             isRequired={true}
//                             isDisabled={false}
//                             defaultValue={""}
//                             min={""}
//                             max={""}
//                             icon={""}
//                             placeholder={"Enter your New Password"}
//                             type={"password"}
//                             errors={errors}
//                         />
//                     </div>
//                     <div className="mb-5">
//                         <label className="block text-gray-700 text-sm font-bold mb-2">Confirm New Password</label>
//                         <CustomInput
//                             control={control}
//                             name={"confirmpassword"}
//                             id={"confirmpassword"}
//                             label={""}
//                             isRequired={true}
//                             isDisabled={false}
//                             defaultValue={""}
//                             min={""}
//                             max={""}
//                             icon={""}
//                             placeholder={"Confirm your New Password"}
//                             type={"password"}
//                             errors={errors}
//                         />
//                     </div>
//                     <div className="mt-5">
//                         {/* @ts-ignore */}
//                         <PrimaryButton title="Submit" loading={loading} />
//                     </div>
//                 </form>
// 			</div>
// 		</div>
//     </div>
//   );
// };

// export default Settings;

// // const mapStateToProps = (state: any) => {
// //     const { admins, error, loading } = state.admins;
// //     return { admins, error, loading };
// // };

// // export default connect(mapStateToProps, {getAdmins,})(Admin);

