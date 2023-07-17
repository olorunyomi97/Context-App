// import { useState } from "react";
import { useForm } from "react-hook-form";
// import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

//components
// import CustomDnD from "components/customDnD/CustomDnD";
import CustomSelect from "components/selectInputs/CustomSelect";

//icons
import PrimaryButton from "components/buttons/PrimaryButton";

const RequestedDocumentDrawer = (props: any) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { openRequest, setOpenRequest } = props;
    // const [paymentFile, setPaymentFile] = useState("");
    // const error = "";

    const exportSelectOptions = [
        { label: "NXP form", value: "NXP" },
        { label: "PFI form", value: "PFI" },
    ];

    const onSubmit = () => {};

    return (
        <>
            <SlidingPane
                className="some-custom-class"
                overlayClassName="some-custom-overlay-class"
                isOpen={openRequest}

                hideHeader={true}
                width="756px"
                onRequestClose={() => {
                    setOpenRequest(false);
                }}
            >
                <i className="ion-ios-arrow-round-back py-1.5 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setOpenRequest(false)}></i>

                <div className="flex items-center mt-10 mb-5">
                    <div className="">
                        <h3 className="text-xl black-text font-semibold">Request Documents</h3>
                        <p className="text-sm grey-text">Rhoncus dui convallis lorem egestas molestie vitae nibh.</p>
                    </div>
                </div>

                <div className="mt-5">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-5 mt-5">
                            <CustomSelect
                                control={control}
                                name={"document_type"}
                                id={"document_type"}
                                label={"Request for Document type"}
                                placeholder={"Select document type"}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={""}
                                options={exportSelectOptions}
                                icon=""
                            />
                        </div>

                        {/* <CustomDnD handleChange={setPaymentFile} file={paymentFile} error={error} name={"Proof of Payment"} pdfOnly={false} /> */}

                        <div className="flex">
                            <div className="mt-5 ml-auto">
                                {/* @ts-ignore  */}
                                <PrimaryButton title="Request Document" style={{ paddingRight: 25, paddingLeft: 25 }} />
                            </div>
                        </div>
                    </form>
                </div>
            </SlidingPane>
        </>
    );
};

export default RequestedDocumentDrawer;
