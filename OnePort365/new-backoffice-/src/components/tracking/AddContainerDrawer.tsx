import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import { Link } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
//icons
import PrimaryButton from "components/buttons/PrimaryButton";

const AddContainerDrawer = (props: any) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { openAddition, setOpenAddition } = props;
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
                isOpen={openAddition}

                hideHeader={true}
                width="756px"
                onRequestClose={() => {
                    setOpenAddition(false);
                }}
            >
                <i className="ion-ios-arrow-round-back py-1.5 px-4 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setOpenAddition(false)}></i>

                <div className="px-7 lg:px-0 mt-10">
                    <h3 className="text-2xl black-text font-bold">Add A Container</h3>
                </div>

                <div className="mt-7">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex items-center">
                            <div className=" flex-auto w-64 mt-2">
                                <CustomInput
                                    control={control}
                                    name={"shipment_id"}
                                    id={"shipment_id"}
                                    label={"Enter Container Number"}
                                    placeholder={"Enter Container Number"}
                                    isRequired={true}
                                    type={"text"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                                <CustomInput
                                    control={control}
                                    name={"shipment_id"}
                                    id={"shipment_id"}
                                    label={"Tracking Link (Optional)"}
                                    placeholder={"Enter Tracking Link"}
                                    isRequired={true}
                                    type={"text"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                                
                                <div className="flex">
                                    <div className="mt-5 ">
                                        {/* @ts-ignore  */}
                                        <PrimaryButton title="Add" style={{ paddingRight: 25, paddingLeft: 25 }} />
                                    </div>
                                </div>
                            </div>

                            
                        </div>
                    </form>
                </div>
            </SlidingPane>
        </>
    );
};

export default AddContainerDrawer;
