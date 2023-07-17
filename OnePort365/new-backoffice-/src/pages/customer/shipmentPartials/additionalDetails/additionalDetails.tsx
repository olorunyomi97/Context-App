import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

//components
import CustomInput from "components/textInputs/CustomInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import PrimaryButton from "components/buttons/PrimaryButton";
import SecondaryButton from "components/buttons/SecondaryButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";

//helper
import { getCurrentTimestamp } from "helpers";

//redux
import { updateAdditionalServices } from "store/actions";
import { updateAdminAdditionalServices } from "store/actions";

const AdditionalServices = (props: any): JSX.Element => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const { loading, previousStep, admin_rate_data, gen_admin_rate_data, shipmentType, updateAdminAdditionalServices, showStep } = props;

    const [warehousing, setWarehousing] = useState(true);
    const [insurance, setInsurance] = useState(true);

    const location = useLocation();
    // const urlParams = useParams();
    // console.log(urlParams.id)
    const urlParams = new URLSearchParams(location.search);

    const onSubmit = (data: any) => {
        data.warehousing = warehousing ? warehousing : false;
        data.insurance = insurance ? insurance : false;

        const newData = {
            id: urlParams.get("id") || admin_rate_data._id,
            // id: urlParams.id || admin_rate_data._id,
            data,
        };

        updateAdminAdditionalServices(newData, shipmentType);
    };

    useEffect(() => {
        if (gen_admin_rate_data) {
          setWarehousing(gen_admin_rate_data.warehousing);
          setInsurance(gen_admin_rate_data.insurance);
        }
      }, [gen_admin_rate_data]);

    return (
        <div className="dashboard-content">
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
                            // //   @ts-ignore
                            // min={getCurrentTimestamp(3)}
                            // //   @ts-ignore
                            // max={getCurrentTimestamp(10)}
                            icon=""
                            min={""}
                            max={""}
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

                    <div className="mt-2">
                        <CustomCurrencyInput
                            control={control}
                            name={"goods_value"}
                            id={"goods_value"}
                            label={"Total value of Goods in ₦ (optional)"}
                            placeholder={"Enter value of goods"}
                            isRequired={false}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={admin_rate_data?.goods_value}
                            min={"1"}
                            max={""}
                            icon=""
                        />
                    </div>

                    <div className="mt-5">
                        <CustomTextarea
                            control={control}
                            name={"remarks"}
                            id={"remarks"}
                            label={"Remarks"}
                            placeholder={"Remarks"}
                            isRequired={true}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={""}
                            icon=""
                        />
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
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const { error, loading, admin_rate_data } = state.adminrate;
    return { error, loading, admin_rate_data };
};
export default connect(mapStateToProps, { updateAdminAdditionalServices })(AdditionalServices);
