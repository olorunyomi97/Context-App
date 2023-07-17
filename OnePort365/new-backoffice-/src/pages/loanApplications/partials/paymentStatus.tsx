import { useState, useEffect } from "react";
import SlidingPane from "react-sliding-pane";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import PrimaryButton from 'components/buttons/PrimaryButton';
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import CustomTextarea from "components/textInputs/CustomTextarea";
import { getSingleShipment, editContainerStatus } from "store/actions";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import Modal from "react-modal";

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
        borderRadius: "5px",
        border: "0.01px solid #888",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
};


const onSubmit = (data: any) => {

}


const PaymentStatus = (props: any) => {
    const { loading, isOpen, setIsOpen, } = props;
    const { handleSubmit, control, reset, formState: { errors } } = useForm();


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => {
                setIsOpen(false);
            }}
            style={customStyles}
            contentLabel="Update Container Status Modal"
        >
            <div className="flex">
                <i className="ion-ios-close text-3xl ml-auto cursor-pointer" onClick={() => setIsOpen(false)}></i>
            </div>
            <div className=" flex flex-col">
                <div className="mb-10">
                    <p className="text-lg quote-text font-semibold mb-3 text-center">Update Loan Payment Status</p>
                    <div className="mt-5">
                        <div className="mb-5">
                            <form className='p-5' onSubmit={handleSubmit(onSubmit)}>
                                <div className="rounded-t-lg">
                                    <div className="mb-5">
                                        <p className="text-xs black-text font-medium" style={{ textAlign: 'left' }}>Select Container Status<span className="red-text">*</span></p>
                                        <CustomSelect
                                            control={control}
                                            name={`status`}
                                            id={`status`}
                                            label={""}
                                            placeholder={`Loan Payment Status`}
                                            isRequired={true}
                                            errors={errors}
                                            isDisabled={false}
                                            options={[
                                                { label: "Pending", value: "Pending" },
                                                { label: "Accepted", value: "Accepted" },
                                                { label: "Rejected", value: "Rejected" },
                                            ]}
                                            defaultValue={''}
                                            icon=""
                                        />
                                        <p className="text-xs black-text font-medium mt-5"></p>
                                        <CustomTextarea
                                            control={control}
                                            name={"remarks"}
                                            id={"remarks"}
                                            label={"Remarks"}
                                            placeholder={" "}
                                            isRequired={false}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={""}
                                            icon=""
                                        />
                                    </div>

                                    <div className="ml-auto">
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
            </div>
        </Modal>
    )
}

export default PaymentStatus