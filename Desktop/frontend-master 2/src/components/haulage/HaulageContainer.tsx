import React from 'react';
import { useState } from 'react';
import { useSelector } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//helpers
import { getCurrentTimestamp } from 'helpers';

//components
import CustomInput from 'components/textInputs/CustomInput';
import CustomRadio from 'components/selectInputs/CustomRadio';
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';


interface HaulageContainerProps {
    includeCBT: boolean;
    setIncludeCBT: React.Dispatch<React.SetStateAction<boolean>>;
    includeTracker: boolean,
    setIncludeTracker: React.Dispatch<React.SetStateAction<boolean>>;
    haulageCategory?: string, 
    errors: any;
    control: any;
    booking_data?: any
}

const HaulageContainer = ({ 
    includeCBT,
    setIncludeCBT,
    includeTracker,
    setIncludeTracker,
    haulageCategory, 
    // booking_data,
    errors, 
    control 
}: HaulageContainerProps) => {

    let booking_data = useSelector((state: any) => state.booking.booking_data);
    console.log('bookingDataHere>>', booking_data )

    // const booking_data = [];

const options = [
    { label: "20FT Dry", value: "20FT | dry" },
    { label: "40FT Dry", value: "40FT | dry" },
    { label: "40HC FT Dry", value: "40HC FT | dry" },
    { label: "20FT Reefer", value: "20FT | reefer" },
    { label: "40FT Reefer", value: "40FT | reefer" },
    { label: "40HC FT Reefer", value: "40HC FT | reefer" },
]

// console.log('bookingData,,,', {
//     label: booking_data?.container_details ? options.find((i) => i.value.split("|")[0].trim() === booking_data?.container_details[0]?.container_size && i.value.split("|")[1].trim() === booking_data?.container_details[0]?.container_type)?.label : "",
//     value: booking_data?.container_details ? options.find((i) => i.value.split("|")[0].trim() === booking_data?.container_details[0]?.container_size && i.value.split("|")[1].trim() === booking_data?.container_details[0]?.container_type)?.value : ""
// })



console.log('first')

    return (
        <div className='mt-10'>
            <h2 className='text-xl black-text-2 font-medium'>Container details</h2>
            <p className="black-text-4 text-sm font-light mt-1.5">Please provide your container details</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-11">
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
                <CustomInput
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
                />
                <CustomInput
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
                />
            </div>
            <div className="pt-10 pb-11 border-b-[1px] border-solid border-[#EAEFEB]">
                <h3 className='text-lg font-medium black-text-2 mb-5'>Additional Services</h3>
                <>
                    <p className="black-text-3 text-base font-normal mb-1">Tracker</p>
                    <div className="flex flex-col gap-x-4 md:flex-row md:justify-between">
                        <div className="flex-1">
                            <p className="grey-text-4 font-light text-sm max-w-[315px]">We will provide trackers for secure storage of your goods.</p>
                        </div>
                        <div className="flex flex-1 mt-6 md:mt-0">
                            <CustomRadio
                                selected={includeTracker ? true : false}
                                label={"Include Tracker"}
                                onClick={() => setIncludeTracker(true)}
                                style={{ flex: "1" }}
                            />
                            <CustomRadio
                                selected={includeTracker === false ? true : false}
                                label={"No Tracker"}
                                onClick={() => setIncludeTracker(false)}
                                style={{ flex: "1" }}
                            />
                        </div>
                    </div>
                </>
                <div className="mt-10">
                    <p className="black-text-3 text-base font-normal mb-1">CB(Customs Brokerage)</p>
                    <div className="flex flex-col gap-x-4 md:flex-row md:justify-between">
                        <div className="flex-1">
                            <p className="grey-text-4 font-light text-sm max-w-[315px]">We will help you relate directly with the customs and ensure your cargo is transported safely</p>
                        </div>
                        <div className="flex flex-1 mt-6 md:mt-0">
                            <CustomRadio
                                selected={includeCBT ? true : false}
                                label={"Include CBT"}
                                onClick={() => setIncludeCBT(true)}
                                style={{ flex: "1" }}
                            />
                            <CustomRadio
                                selected={includeCBT === false ? true : false}
                                label={"No CBT"}
                                onClick={() => setIncludeCBT(false)}
                                style={{ flex: "1" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HaulageContainer;