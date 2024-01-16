import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";

//components
import CustomInput from 'components/textInputs/CustomInput';
import PrimaryButtons from 'components/buttons/PrimaryButtons';

//library
import Modal from "react-modal";

//icons
import mail from "assets/dock/mail.svg";

import { recordSharedRate } from 'store/actions';

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "calc(100vw - 10%)",
        borderRadius: "10px",
        border: "0.01px solid #888",
    },
    overlay: {
        zIndex: "90",
        backgroundColor: "rgba(6, 24, 2, 0.55)",
    },
};

const OfapRateEmailModal = (props: any) => {
    const { isOpen, error, recording_shared_rate, recorded_shared_rate_data, recordSharedRate, id, setShowRateEmail } = props;
    const { control, formState: { errors }, handleSubmit } = useForm();

    const closeRateEmail = () => setShowRateEmail(false);

    const onSubmit = (data: any) => {
        const _data = {
            email: data.email,
            shipment_id: id
        }
        recordSharedRate(_data, closeRateEmail)
    }

    console.log("recorded?>>>", recorded_shared_rate_data)

    return (
        <Modal
            isOpen={isOpen}
            style={customStyles}
            className={"uploadmodal"}
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex justify-between items-center pt-6 px-6 pb-4 border-solid border-b-[1px] border-[#e6e7ec80]">
                    <div>
                        <p className="text-xl black-text-3 font-semibold">Enter your email</p>
                        <p className="text-sm grey-text font-light">Kindly input your email to view the rates</p>
                    </div>
                </div>
                <div className="py-4 md:py-8 px-6 flex flex-col gap-y-4 max-h-[calc(100vh_-_300px)] overflow-auto">
                    <CustomInput
                        control={control}
                        name={"email"}
                        id={"email"}
                        label={"Email Address"}
                        placeholder={"@mail.com"}
                        isRequired={true}
                        type={"email"}
                        errors={errors}
                        isDisabled={false}
                        defaultValue={""}
                        min={""}
                        max={""}
                        icon={mail}
                    />
                </div>
                <div className="p-4 border-solid border-t-[1px] border-[#e6e7ec80] shadow-[0_-3px_32px_-12px_rgba(0,0,0,0.18)]">
                    <PrimaryButtons
                        title={"View Rates"}
                        // style={{ color: "#59725C" }}
                        // onClick={closeModal}
                        disabled={false}
                        loading={recording_shared_rate}
                        icon={""}
                    />
                    {<div className="text-sm mt-6 text-center font-light">
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
    );
};

const mapStateToProps = (state: any) => {
    const { error, recording_shared_rate, recorded_shared_rate_data } = state.booking;

    return { error, recording_shared_rate, recorded_shared_rate_data }
}

export default connect(mapStateToProps, {recordSharedRate})(OfapRateEmailModal);