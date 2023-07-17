import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SlidingPane from "react-sliding-pane";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import CustomInput from "components/textInputs/CustomInput";
import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";

const UpdateContainerDrawer = (props: any) => {
    const { loading, isUpdateOpen, setIsUpdateOpen } = props;
    const { handleSubmit, control, reset, formState: { errors } } = useForm();
    const onSubmit = () => {
        console.log('Edit Drawer')
    }
    return (
        <>
            <SlidingPane
                className="custom-slider"
                overlayClassName="some-custom-overlay-class"
                isOpen={isUpdateOpen}
                hideHeader={true}
                width="756px"
                onRequestClose={() => {
                    // triggered on "<" on left top click or on outside click
                    setIsUpdateOpen(false);
                }}
            >
                <div className="">
                    <i className="ion-ios-arrow-round-back py-1 px-3 bg-grey text-3xl rounded-full black-text cursor-pointer" onClick={() => setIsUpdateOpen(false)}></i>
                    {/* HT67484J */}
                    <div className="mt-10 px-2">
                        <h3 className="text-2xl black-text font-bold">Container Number Here (Import Component)</h3>
                        <p className="text-sm grey-text mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, veritatis?</p>
                    </div>
                    {/* <div className="ml-2 grid grid-cols-4 gap-4">
                        <div className="col-span-2">
                            <p className="text-sm grey-text mt-5">Status : 
                                <Link to="#" className="bg-light-purple black-text-2 text-sm py-2 px-3 purple-text mx-3 text-center rounded-full">
                                    Truck Positioning
                                </Link>
                            </p>
                        </div>
                    </div> */}
                </div>
                <div className="mt-7">
                    <div className="ml-2 grid grid-cols-4 gap-4">
                        <div className="col-span-3">
                            <form className="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-5 p-5 solid-br rounded-t-lg">
                                    <div className="mb-5">
                                        <p className="black-text text-lg font-medium">Update this Container</p>
                                        <div>
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Container Number"}
                                                placeholder={"Enter Container Number"}
                                                isRequired={true}
                                                type={"number"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />

                                            {/* <CustomInput
                                                control={control}
                                                name={"seal_number"}
                                                id={"seal_number"}
                                                label={"Seal Number"}
                                                placeholder={"Enter Seal Number"}
                                                isRequired={true}
                                                type={"number"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            /> */}

                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"ETA / ETA"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Duty Paid Date"}
                                                placeholder={"Enter Stuffing Completion Date"}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"customs Release"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"TDO"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Offloading Date"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />

                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Empty Return Date"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />

                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Docs To Finance"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />

                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Days at Port"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />

                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"Clearing Days"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                            <CustomInput
                                                control={control}
                                                name={"container_number"}
                                                id={"container_number"}
                                                label={"TDO to Delivery"}
                                                placeholder={""}
                                                isRequired={true}
                                                type={"date"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={''}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>
                                        <div className="w-20 ml-auto">
                                            {" "}
                                            {/* @ts-ignore */}
                                            <PrimaryButton 
                                                title="Save" 
                                                loading={loading} 
                                                onClick={onSubmit}
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                                                
                            </form>
                        </div>
                    </div>
                   

                    
                </div>
            </SlidingPane>
        </>
    )
}

export default UpdateContainerDrawer