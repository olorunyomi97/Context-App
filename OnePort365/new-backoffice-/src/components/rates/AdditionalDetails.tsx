import { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomRadio from "components/selectInputs/CustomRadio";
// import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";

//helper
import { getCurrentTimestamp } from "helpers";

//redux
import { updateAdditionalServices } from "store/actions";

const AdditionalServices = (props: any) => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { loading, previousStep, rate_data, shipmentType, updateAdditionalServices, showStep } = props;

    const [warehousing, setWarehousing] = useState(true);
    const [insurance, setInsurance] = useState(true);

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    const onSubmit = (data: any) => {
        data.warehousing = warehousing;
        data.insurance = insurance;

        const newData = {
            id: urlParams.get("id") || rate_data._id,
            data,
        };

        updateAdditionalServices(newData, shipmentType);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="mb-24">
                <div className="booking-card md:p-10">
                    <div className="">
                        <p className="text-sm black-text mb-2">Do you need warehousing?</p>
                        <div className="grid grid-cols-2">
                            <div className="mr-1">
                                <CustomRadio selected={warehousing} label={"Yes, I do"} onClick={() => setWarehousing(true)} />
                            </div>

                            <div className="ml-1">
                                <CustomRadio selected={!warehousing} label={"No, I'm fine"} onClick={() => setWarehousing(false)} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-1">
                        <CustomInput
                            control={control}
                            name={"warehousing_duration"}
                            id={"warehousing_duration"}
                            label={"Duration (weeks)"}
                            placeholder={"Enter duration"}
                            isRequired={warehousing ? true : false}
                            type={"number"}
                            errors={errors}
                            isDisabled={warehousing ? false : true}
                            defaultValue={""}
                            min={"1"}
                            max={""}
                            icon=""
                        />
                    </div>

                    <div className="mt-2">
                        <CustomInput
                            control={control}
                            name={"shipment_pickup_date"}
                            id={"shipment_pickup_date"}
                            label={"Pick up date"}
                            placeholder={"Enter pickup date"}
                            isRequired={true}
                            type={"date"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={""}
                            //   @ts-ignore
                            min={getCurrentTimestamp(3)}
                            //   @ts-ignore
                            max={getCurrentTimestamp(10)}
                            icon=""
                        />
                    </div>

                    <div className="mt-4">
                        <p className="text-sm black-text mb-2">Do you need insurance?</p>
                        <div className="grid grid-cols-2">
                            <div className="mr-1">
                                <CustomRadio selected={insurance} label={"Yes, I do"} onClick={() => setInsurance(true)} />
                            </div>

                            <div className="ml-1">
                                <CustomRadio selected={!insurance} label={"No, I'm fine"} onClick={() => setInsurance(false)} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3 mt-10 items-center">
                    <div className="">
                        {/* @ts-ignore */}
                        <SecondaryButton title="Previous Step" icon="ion-ios-arrow-round-back" onClick={previousStep} />
                    </div>
                    <div className="mx-auto">{showStep ? <p className="black-text font-medium text-base">Step 4 of 4</p> : <></>}</div>
                    <div className="">
                        {/* @ts-ignore */}
                        <PrimaryButton title="Continue" loading={loading} />
                    </div>
                </div>
            </form>
        </>
    );
};

const mapStateToProps = (state: any) => {
    const { error, loading, rate_data } = state.rate;
    return { error, loading, rate_data };
};
export default connect(mapStateToProps, { updateAdditionalServices })(AdditionalServices);
