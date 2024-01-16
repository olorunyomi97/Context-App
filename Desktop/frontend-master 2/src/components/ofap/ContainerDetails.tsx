import React from 'react';

//components
import CustomInput from 'components/textInputs/CustomInput';
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';

//helpers
import { getCurrentTimestamp } from "helpers";

const ContainerDetails = (props: any) => {
    const { control, errors, booking_data } = props;

    const options = [
        { label: "20 FT", value: "20FT" },
        { label: "40 FT", value: "40FT" },
        { label: "40 HC FT", value: "40HC FT" },
    ]

    const types = [
        { label: "Dry", value: "dry" },
        { label: "Reefer", value: "reefer" },
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-8 pb-16 border-b-[1px] border-[#E6E7EC] border-solid">
            <CustomDefaultSelect
                control={control}
                name={`container_size`}
                id={`container_size`}
                label={"Container Size"}
                placeholder={""}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={options}
                defaultValue={{
                    label: booking_data?.container_details ? options.find((i) => i.value === booking_data?.container_details[0]?.container_size)?.label : "",
                    value: booking_data?.container_details ? booking_data?.container_details[0]?.container_size : "" 
                }}
                icon=""
            />
            <CustomDefaultSelect
                control={control}
                name={`container_type`}
                id={`container_type}`}
                label={"Container Type"}
                placeholder={``}
                isRequired={true}
                errors={errors}
                isDisabled={false}
                options={types}
                defaultValue={{
                    label: booking_data?.container_details ? types.find((i) => i.value === booking_data?.container_details[0]?.container_type)?.label : "",
                    value: booking_data?.container_details ? booking_data?.container_details[0]?.container_type : ""
                }}
                icon=""
            />
            <CustomInput
                control={control}
                name={"cargo_ready_date"}
                id={"cargo_ready_date"}
                label={"Cargo Ready Date"}
                placeholder={"Enter departure date"}
                isRequired={true}
                type={"date"}
                errors={errors}
                isDisabled={false}
                defaultValue={booking_data?.cargo_ready_date ? booking_data?.cargo_ready_date.slice(0, 10) :  new Date().toISOString().slice(0, 10)}
                // @ts-ignore
                min={getCurrentTimestamp(0)}
                //   @ts-ignore
                max={""}
                icon={""}
            />
        </div>
    )
}

export default ContainerDetails