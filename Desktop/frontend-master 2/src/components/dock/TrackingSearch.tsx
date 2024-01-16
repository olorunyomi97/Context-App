import React from 'react';

//components
import CustomInput from 'components/textInputs/CustomInput';
import Button from './Button';

interface TrackingProps {
    control: any;
    errors: any;
    allPorts?: any;
    originPort?: any;
    setOriginPort?: any;
    defaultPortsOfOrigin?: any;
    defaultPortsOfDestination?: any;
    loading?: boolean;
}

const TrackingSearch = (props: TrackingProps) => {
    const { control, errors, loading } = props;
    console.log("errors>>>", errors)
    return (
        <div className="flex flex-col gap-y-6 md:gap-y-0 md:flex-row md:items-center md:gap-x-5">
            <div className="flex-1">
                <CustomInput
                    control={control}
                    name={"job_number"}
                    id={"job_number"}
                    isMargined={false}
                    label={"Job Number"}
                    placeholder={"Enter your job number"}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                />
            </div>
            <div
                className={`${!errors?.job_number?.type ? "md:mt-[37px]" : "md:mt-[12px]"}`}
                style={{

                }}
            >
                <Button
                    title="Search"
                // icon={star}
                style={{ height: "50px" }}
                // onClick={() => navigate("/signup")}
                />
            </div>
        </div>
    )
}

export default TrackingSearch