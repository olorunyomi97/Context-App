import React from 'react';
import { useState } from 'react';
import { useSelector } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//helpers
import { getCurrentTimestamp } from 'helpers';

//components
import CustomInput from 'components/textInputs/CustomInput';
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';


interface CBContainerProps {
    haulageCategory?: string, 
    errors: any;
    control: any;
    booking_data?: any;
    isInCustoms?: boolean;
}

const CustomBrokerageContainer = ({ 
    // booking_data,
    errors, 
    control,
    isInCustoms = false
}: CBContainerProps) => {

let booking_data = useSelector((state: any) => state.booking.booking_data);

const options = [
    { label: "20FT Dry", value: "20FT | dry" },
    { label: "40FT Dry", value: "40FT | dry" },
    { label: "40HC FT Dry", value: "40HC FT | dry" },
    { label: "20FT Reefer", value: "20FT | reefer" },
    { label: "40FT Reefer", value: "40FT | reefer" },
    { label: "40HC FT Reefer", value: "40HC FT | reefer" },
];

    return (
        <div className='mt-10'>
            <h2 className='text-xl black-text-2 font-medium'>Container details</h2>
            <p className="black-text-4 text-sm font-light mt-1.5">Please provide your container details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">
                <CustomDefaultSelect
                    control={control}
                    name={`container_size`}
                    id={`container_size`}
                    label={"Container Size & Type"}
                    placeholder={""}
                    isRequired={true}
                    errors={errors}
                    isDisabled={false}
                    options={options}
                    defaultValue={{
                        label: booking_data?.container_details ? options.find((i) => i.value.split("|")[0].trim() === booking_data?.container_details[0]?.container_size && i.value.split("|")[1].trim() === booking_data?.container_details[0]?.container_type)?.label : "",
                        value: booking_data?.container_details ? options.find((i) => i.value.split("|")[0].trim() === booking_data?.container_details[0]?.container_size && i.value.split("|")[1].trim() === booking_data?.container_details[0]?.container_type)?.value : ""
                    }}
                    icon=""
                />
                <CustomInput
                    control={control}
                    name={`container_count`}
                    id={`container_count`}
                    label={"Container Count"}
                    placeholder={""}
                    isRequired={true}
                    type={"number"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={booking_data?.container_details ? booking_data?.container_details[0].container_count : ""}
                    min={""}
                    max={""}
                    icon=""
                />
                {isInCustoms && <CustomInput
                    control={control}
                    name={`commodity_type`}
                    id={`commodity_type`}
                    label={"Commodity Type"}
                    placeholder={"e.g Grains"}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={booking_data?.goods_type ? booking_data?.goods_type : ""}
                    min={""}
                    max={""}
                    icon=""
                />}
                {/* <CustomInput
                    control={control}
                    name={`container_weight`}
                    id={`container_weight`}
                    label={"Container Weight (Tons)"}
                    placeholder={""}
                    isRequired={true}
                    type={"number"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={booking_data?.container_details?.[0]?.container_weight}
                    min={""}
                    max={""}
                    icon=""
                /> */}
                {/* <CustomInput
                    control={control}
                    name={"cargo_date"}
                    id={"cargo_date"}
                    label={haulageCategory === "porttodoor" ? "Port ETA" : "Cargo Ready Date"}
                    placeholder={"Enter departure date"}
                    isRequired={true}
                    type={"date"}
                    errors={errors}
                    isDisabled={false}
                    //@ts-ignore
                    defaultValue={booking_data?.cargo_ready_date ? booking_data?.cargo_ready_date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                    // @ts-ignore
                    min={getCurrentTimestamp(0)}
                    //   @ts-ignore
                    max={""}
                    icon={""}
                /> */}
            </div>
        </div>
    )
}

export default CustomBrokerageContainer;