import React from 'react';
import { useForm } from "react-hook-form";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";

const OnneTab = (props:any) => {
    const {loading} = props;
    const { handleSubmit, control, formState: { errors }} = useForm();
    const onSubmit = () => {
        console.log('Onne Export')
    };

     return (
        <div className="mt-5 pb-10 container w-full mobile-dashboard">
            <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                <form onSubmit={handleSubmit(onSubmit)}>    
                        <div>
                            <div className="mr-1">
                                <CustomInput
                                    control={control}
                                    name={"firstname"}
                                    id={"firstname"}
                                    label={"Number of Days for Truck Positioning"}
                                    placeholder={"Enter Number of Days for Truck Positioning Date"}
                                    isRequired={true}
                                    type={"numeric"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={'2'}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                            </div>

                            <div className="ml-1">
                                <CustomInput
                                    control={control}
                                    name={"lastname"}
                                    id={"lastname"}
                                    label={"Number of Days for Stuffing Completion"}
                                    placeholder={"Enter Number of Days for Stuffing Completion"}
                                    isRequired={true}
                                    type={"numeric"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={'2'}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                            </div>
                        </div>

                        <div className="">
                            <CustomInput
                                control={control}
                                name={"email"}
                                id={"email"}
                                label={"Number of Days for Trucking Gate In"}
                                placeholder={"Enter Number of Days for Trucking Gate In Date"}
                                isRequired={true}
                                type={"email"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={'2'}
                                min={""}
                                max={""}
                                icon=""
                            />
                        </div>

                        <div className="">
                            <CustomInput
                                control={control}
                                name={"role"}
                                id={"role"}
                                label={"Number of Days for Sailing Date"}
                                placeholder={"Enter Number of Days for Sailing Date"}
                                isRequired={true}
                                type={"numeric"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={'2'}
                                min={""}
                                max={""}
                                icon=""
                            />
                        </div>
                        <div className="">
                            <CustomInput
                                control={control}
                                name={"role"}
                                id={"role"}
                                label={"Number of Days for Post Shipment Documents"}
                                placeholder={"Enter Number of Days Post Shipment Documents"}
                                isRequired={true}
                                type={"numeric"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={'2'}
                                min={""}
                                max={""}
                                icon=""
                            />
                        </div>
                        <div className="">
                            <CustomInput
                                control={control}
                                name={"role"}
                                id={"role"}
                                label={"Number of Days for Docs to Finance"}
                                placeholder={"Enter Docs to Finance"}
                                isRequired={true}
                                type={"numeric"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={'2'}
                                min={""}
                                max={""}
                                icon=""
                            />
                        </div>
                        <div className="mt-5 w-20">
                            {" "}
                            {/* @ts-ignore */}
                            <PrimaryButton
                                title="Save"
                                loading={loading}
                            />
                        </div>


                    </form> 
                </div>
            <div></div>
        </div>
    </div>
    )
}

export default OnneTab