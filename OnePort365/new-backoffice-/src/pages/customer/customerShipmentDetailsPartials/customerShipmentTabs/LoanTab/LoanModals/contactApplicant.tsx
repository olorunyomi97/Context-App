import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import contact from "assets/icons/contact.svg";
import CustomTextarea from "components/textInputs/CustomTextarea";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        padding: " 1.5rem",
        transform: "translate(-50%, -50%)",
        width: "410px",
        borderRadius: "10px",
        border: "0.01px solid #888",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
};

const ContactApplicant = (props: any) => {
    const { handleSubmit, control, formState: { errors }} = useForm();
    const { isLoanOpen, setIsLoanOpen } = props;
    return (
        <>
            <Modal
                isOpen={isLoanOpen}
                onRequestClose={() => {
                    setIsLoanOpen(false);
                }}
                style={customStyles}
                contentLabel="Rate successful modal"
            >
                <div className="flex">
                    <i className="ion-ios-close text-3xl ml-auto cursor-pointer" onClick={() => setIsLoanOpen(false)}></i>
                </div>
                <div className=" flex flex-col">
                    <img src={contact} alt="" width={100} className="mx-auto" />

                    <div className="text-center mb-5">
                        <p className="text-xl black-text font-semibold">Contact Application</p>
                        <p className="quote-text mb-3">Reason for Application Denial</p>
                        
                        <div className="pl-10 pr-10">
                            <CustomTextarea
                                control={control}
                                name={""}
                                id={""}
                                label={""}
                                placeholder={"Enter Reason"}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={""}
                                icon=""
                            />
                        </div>
                    </div>
                    <div className="flex items-center" style={{justifyContent:'center'}}>
                        <div className="mb-1">
                        <>
                            <div className="ml-auto">
                                <Link 
                                    to=""
                                    className="bg-green white-text-2 text-sm py-3 px-14 w-full rounded flex" 
                                    // onClick={() => setIsLoanOpen(false)}
                                >
                                    Submit
                                </Link>
                            </div>
                        </>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ContactApplicant