import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import onePortLogo from "assets/icons/oneport-logo.png";


const TopBar = (props: any): JSX.Element => {
    const { title, SetOpenAside } = props;
    // console.log(SetOpenAside);
    // console.log(props)

    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
    const location = useLocation();

    return (
        <>
            <div className="top-bar py-3 px-10 w-full desktop-only shadow-xl">
                <div className="flex items-center w-full">
                    <h3 className="text-xl text-black font-semibold ml-5">{title}</h3>
                    <Link to="/tracking" className="ml-auto mr-2">
                        <p className="bg-white black-text text-sm py-3 px-6 w-full rounded"></p>
                    </Link>
                    <div className="flex items-center">
                        {/* <img src={Avatar} alt="" height={50} width={50} className="rounded-full" /> */}
                        <img src={`https://ui-avatars.com/api/?name=${admin_data.firstname + admin_data.lastname}`} height={30} width={30} className="rounded-full" />
                        <div className="ml-2">
                            {/* <p className="text-sm black-text font-semibold">Temoc</p> */}
                            <p className="top-bar-text font-semibold">
                                {" "}
                                {admin_data.firstname}
                            </p>
                            <p className="mt-1 py-1 px-2 bg-grey top-bar-text rounded-full">
                                {
                                    admin_data.role == 'super_admin'
                                        ? 'Super Admin'
                                        : 'Admin'
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* mobile top bar */}
            <div className="py-5 px-7 mobile-only">
                <div className="flex items-center  w-full mb-5">
                    <i
                        className="ion-ios-menu text-2xl"
                        onClick={() => SetOpenAside(true)}
                    ></i>
                    <div className="ml-3">
                        <Link to="/">
                            <img
                                src={onePortLogo}
                                className=""
                                width={85}
                                alt="oneport logo"
                            />
                        </Link>
                    </div>
                    {/* <div className="ml-auto">
                        <i className="ion-ios-notifications-outline text-2xl"></i>
                    </div> */}
                </div>
                <div className="flex items-center">
                    <h3 className="md:text-xl text-lg text-black font-semibold">
                        {title}
                    </h3>




                </div>
            </div>
        </>
    );
};

export default TopBar;
