import React from 'react';
import { useForm } from "react-hook-form";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomInput from "components/textInputs/CustomInput";

const LagosTab = (props:any) => {
    const {loading} = props;
    const { handleSubmit, control, formState: { errors }} = useForm();
    const onSubmit = () => {
    console.log('Lagos Import')};

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
                                    label={"Number of Days for Duty"}
                                    placeholder={"Enter Duty Paid Date"}
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
                                    label={"Number of Days for TDO"}
                                    placeholder={"Enter TDO Date"}
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
                                label={"Number of Days for Loading"}
                                placeholder={"Enter Loading Date"}
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
                                label={"Number of Days for Offloading"}
                                placeholder={"Enter Offloading Date"}
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
                                label={"Number of Days for Empty Return"}
                                placeholder={"Enter Empty Return Date"}
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

export default LagosTab