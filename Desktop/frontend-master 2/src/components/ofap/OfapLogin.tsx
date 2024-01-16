import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Link, useLocation } from 'react-router-dom';

//icons
import right from "assets/icons/arrow-right.svg";
import close from "assets/icons/close.svg";
import closeWhite from "assets/icons/close-white.svg";
import mail from "assets/dock/mail.svg";
import disclaimer from "assets/icons/circledisclaimer-white.svg"

//components
import CustomInput from 'components/textInputs/CustomInput';
import Button from "components/dock/Button";
import PrimaryButtons from 'components/buttons/PrimaryButtons';

//helpers
import { getRedirect } from "helpers";

//redux actions
import { loginUser, clearErrors } from "store/actions";

//library
import Modal from "react-modal";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";


const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        // padding: " 1.5rem",
        // maxHeight: "calc(100vh - 100px)",
        // overflow: "auto",
        // WebkitOverflowScrolling: "touch",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 10%)",
        borderRadius: "10px",
        border: "0.01px solid #888",
    },
    overlay: {
        zIndex: "400",
        backgroundColor: "rgba(6, 24, 2, 0.55)",
    },
};

const OfapLogin = (props: any) => {
    const { 
        id, 
        isOpen, 
        closeModal, 
        loginUser, 
        clearErrors, 
        error, 
        loading, 
        showShipCondition, 
        setShowShipCondition, 
        isEmailRate = false, 
        haulage_ID, 
        setHaulageId ,
        setCustomId,
        custom_ID
    } = props;
    const { control, handleSubmit, formState: { errors } } = useForm();

    // const [showShipCondition, setShowShipCondition] = useState<boolean>(true);

    const jobNumber = sessionStorage.getItem("jobNumber");
    const haulageId = sessionStorage.getItem("haulageId");
    const customId = sessionStorage.getItem("customId");

    let user = useSelector((state: any) => state.auth.user_data);
    // @ts-ignore
    user = user ? user : localStorage.getItem("user_data");

    console.log('sessionHaulageId>>>', haulageId)
    console.log('customs>>', customId)
    console.log('customIDD>>', custom_ID)

    const location = useLocation();
    const redirect = getRedirect(location, id ? `shipment-information/${id}` : jobNumber ? `shipments/${jobNumber}` : haulage_ID ? `haulages-details/${haulage_ID}` : custom_ID ? `customs-brokerage/${custom_ID}` : 'dashboard');

    // console.log("lofID>>>", haulage_ID)

    const onSubmit = (data: object) => {
        loginUser(data, redirect);
    };

    return (
        <Modal isOpen={isOpen} style={customStyles} className={"uploadmodal"}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center pt-6 px-6 pb-4 border-solid border-b-[1px] border-[#e6e7ec80]">
                    <div>
                        <p className="text-xl black-text-3 font-semibold">Welcome Back</p>
                        <p className="text-sm grey-text font-light">Kindly login to continue.</p>
                    </div>
                    <>
                        <img className="cursor-pointer"
                            onClick={() => {
                                sessionStorage.setItem("jobNumber", "");
                                sessionStorage.setItem("shipmentId", "");
                                sessionStorage.setItem("haulageId", "");
                                setHaulageId && setHaulageId("");
                                setCustomId && setCustomId("");
                                closeModal();
                            }}
                            src={close}
                            alt="close" />
                    </>
                </div>
                <div className="py-4 md:py-8 px-6 flex flex-col gap-y-4 max-h-[calc(100vh_-_300px)] overflow-auto">
                    {(isEmailRate && showShipCondition) &&
                        <div className="bg-[#111827] breakdown-border p-3 rounded grey-text-2 flex justify-between">
                            <div className="flex gap-x-2">
                                <div><img src={disclaimer} alt="" className='min-w-[16px]' /></div>
                                <p className="text-xs font-light max-w-[292px]">You have the ability to track only those shipments that are associated with your account.</p>
                            </div>
                            <div onClick={() => setShowShipCondition(false)} className='cursor-pointer'><img src={closeWhite} alt="" /></div>
                        </div>
                    }
                    {error ? (
                        <p className="bg-error p-3 text-center text-red-600 font-500 text-sm my-4 font-light rounded">
                            {error}
                        </p>
                    ) : (
                        <></>
                    )}
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
                        icon={mail}
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
                    <div className="text-right">
                        <Link
                            className="green-text-3 cursor-pointer font-light text-sm"
                            to="/forgot-password"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                </div>
                <div className="p-4 border-solid border-t-[1px] border-[#e6e7ec80] shadow-[0_-3px_32px_-12px_rgba(0,0,0,0.18)]">
                    <PrimaryButtons
                        title={"Login"}
                        // style={{ color: "#59725C" }}
                        // onClick={closeModal}
                        disabled={false}
                        loading={loading}
                        icon={""}
                    />
                    {!user && <div className="text-sm mt-6 text-center font-light">
                        <span className="text-[#81899E]">
                            Don’t have an account?
                        </span>
                        <Link
                            to="/signup"
                            className="green-text-3 font-normal cursor-pointer"
                        >
                            {" "}
                            Sign up for free
                        </Link>
                    </div>}
                </div>
            </form>
        </Modal>
    )
};

const mapStateToProps = (state: any) => {
    const { error, loading } = state.auth;
    return { error, loading };
};


export default connect(mapStateToProps, { loginUser, clearErrors })(OfapLogin);