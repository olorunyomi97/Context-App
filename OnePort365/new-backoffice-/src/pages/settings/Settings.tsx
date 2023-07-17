import { useState } from "react";
import { Link } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import userIcon from "assets/icons/user.svg";
import lockIcon from "assets/icons/lock.svg";
import OperationsIcon from "assets/icons/New-Document.svg";
import ChangePasswordDrawer from "components/settings/ChangePasswordDrawer";
import EditProfileDrawer from "components/settings/EditProfileDrawer";
import ImportKpiEntry from "components/settings/KpiEntry/ImportKpi/ImportKpiEntry";
import ExportKpiEntry from "components/settings/KpiEntry/ExportKpi/ExportKpiEntry";
import ExchangeRateDrawer from "components/settings/ExchangeRate/ExchangeRateDrawer";

const Settings = (props: any) => {
    const {loading} = props
    const [openAside, SetOpenAside] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
    const [isKpiImportOpen, setIsKpiImportOpen] = useState(false);
    const [isKpiExportOpen, setIsKpiExportOpen] = useState(false);
    const [isExchangeRate, setIsExchangeRate] = useState(false);
    

    return (
        <>
            <div className="flex">
                <Aside 
                    activeTab="setting" 
                    openAside={openAside}
					SetOpenAside={SetOpenAside}
                />

                <div className="">
                    <TopBar title={"Settings"} SetOpenAside={SetOpenAside}/>

                    {
                        loading ? 
                        (
                            <div className="text-center my-3">
                                <Link to="#" className="text-success">
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Loading Admin Settings" loading={loading} />
                                </Link>
                            </div>
                        ) : <>
                                <div className="lg:px-14 lg:pt-10 container w-full mobile-dashboard">
                                    <div className="grid lg:grid-cols-2">
                                        <div className="">
                                            <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer" onClick={() => setIsProfileOpen(true)}>
                                                <img src={userIcon} alt="" width={20} />
                                                <p className="black-text ml-3 font-semibold text-sm">Profile Settings</p>
                                            </div>

                                            <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsChangePasswordOpen(true)}>
                                                <img src={lockIcon} alt="" width={20} />
                                                <p className="black-text ml-3 font-semibold text-sm">Change Password</p>
                                            </div>

                                            <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsKpiImportOpen(true)}>
                                                <img src={OperationsIcon} alt="" width={20} />
                                                <p className="black-text ml-3 font-semibold text-sm">Operations KPI Entry (Import)</p>
                                            </div>

                                            <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsKpiExportOpen(true)}>
                                                <img src={OperationsIcon} alt="" width={20} />
                                                <p className="black-text ml-3 font-semibold text-sm">Operations KPI Entry (Export)</p>
                                            </div>
                                            <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsExchangeRate(true)}>
                                                <img src={OperationsIcon} alt="" width={20} />
                                                <p className="black-text ml-3 font-semibold text-sm">Exchange Rate</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                </div>

                {/* <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} /> */}
                <EditProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
                <ChangePasswordDrawer isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
                <ImportKpiEntry isOpen={isKpiImportOpen} setIsOpen={setIsKpiImportOpen} />
                <ExportKpiEntry isOpen={isKpiExportOpen} setIsOpen={setIsKpiExportOpen} />
                <ExchangeRateDrawer isOpen={isExchangeRate} setIsOpen={setIsExchangeRate} />
            </div>
        </>
    );
};

export default Settings;

// import { useState, useEffect } from "react";

// //components
// import Aside from "components/partials/aside";
// import TopBar from "components/partials/topBar";
// import ProfileDrawer from "components/settings/ProfileDrawer";

// //icons
// import userIcon from "assets/icons/user.svg";
// import lockIcon from "assets/icons/lock.svg";
// import ChangePasswordDrawer from "components/settings/ChangePasswordDrawer";

// const Settings = (props: any) => {
//     const [isProfileOpen, setIsProfileOpen] = useState(false);
//     const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

//     return (
//         <>
//             <div className="flex">
//                 <Aside activeTab="setting" />

//                 <div className="">
//                     <TopBar title={"Settings"} />

//                     <div className="px-14 pt-20 container  w-full">
//                         <div className="grid lg:grid-cols-2">
//                             <div className="">
//                                 <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer" onClick={() => setIsProfileOpen(true)}>
//                                     <img src={userIcon} alt="" width={20} />
//                                     <p className="black-text ml-3 font-semibold text-sm">Profile Settings</p>
//                                 </div>

//                                 <div className="solid-br p-4 flex items-center rounded-lg green-border-hover cursor-pointer mt-5" onClick={() => setIsChangePasswordOpen(true)}>
//                                     <img src={lockIcon} alt="" width={20} />
//                                     <p className="black-text ml-3 font-semibold text-sm">Change Password</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <ProfileDrawer isOpen={isProfileOpen} setIsOpen={setIsProfileOpen} />
//                 <ChangePasswordDrawer isOpen={isChangePasswordOpen} setIsOpen={setIsChangePasswordOpen} />
//             </div>
//         </>
//     );
// };

// export default Settings;
