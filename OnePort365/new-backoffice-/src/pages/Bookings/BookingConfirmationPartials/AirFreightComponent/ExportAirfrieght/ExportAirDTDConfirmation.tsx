import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import NewCustomGoogleInput from "components/textInputs/NewCustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { getSingleBooking, editBookingDetails } from "store/actions";
import { useSelector } from "react-redux";
import NewCustomSelect from "components/selectInputs/NewCustomSelect";
const _Json = require("sea-ports");


function ExportAirDTDConfirmation(props: any) {
    const params = useParams();
    const { loading, shipmentType, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log('Container Count Bug', single_booking_details?.air_cargo_details[0]?.container_count?.toString())
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [insurance, setInsurance] = useState(false);
    const [warehousing, setWarehousing] = useState(false);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([])
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [haulage, setHaulage] = useState('')
    const [showImportHaulage, setShowImportHaulage] = useState(false);
    const [tracker, setTracker] = useState(false);
    const [escort, setEscort] = useState(false);
    const [hazardous, setHazardous] = useState(false);


    const onSubmit = (data: any) => {
        console.log(data.customer_id)
        const newData = {
            id: params.id,
            customer_id: single_booking_details?.user_id,
            shipment_type: 'export',
            shipment_transport_type: 'air_freight',
            air_freight_type: 'door to door',
            origin_port_code: data?.origin_port_code,
            destination_port_code: data?.destination_port_code,
            airline: data?.airline,
            pickup_location: data?.pickup_location?.label,
            delivery_location: data?.delivery_location?.label,
            cargo_pickup_date: data?.cargo_pickup_date,
            container_count: data?.container_count,
            container_height: data?.container_height,
            container_width: data?.container_width,
            container_weight: data?.container_weight,
            goods_value: data?.goods_value,
            goods_type: data?.goods_type,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            warehousing,
            marine_insurance: insurance,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments,
            consignee_name: data?.consignee_name,
            consignee_phone: data?.consignee_phone?.phone ? data?.consignee_phone?.phone : data?.consignee_phone,
            shipment_status: data?.shipment_status.value,
        };
        props.editBookingDetails(newData);
        console.log(newData);
    }

    useEffect(() => {
        props.getSingleBooking(params.id, `format_containers=${true}`);
        // props.getSingleBooking(params.id);
    }, []);

    useEffect(() => {
        if (single_booking_details) {
            setHazardous(single_booking_details?.is_product_hazardous);
        }
    }, [single_booking_details]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="my-5">
            <div className="lg:px-8 px-5">
                <p className='add-shipment-text mb-5'>Export Shipment & Air Freight(Door To Door)</p>
                <div className="grid grid-cols-1">
                    <div className="mr-1">
                        <CustomInput
                            control={control}
                            name={"customer_id"}
                            id={"customer_id"}
                            label={""}
                            placeholder={""}
                            isRequired={false}
                            type={"text"}
                            errors={errors}
                            isDisabled={true}
                            defaultValue={`${single_booking_details?.customer_details[0]?.firstname} ${single_booking_details?.customer_details[0]?.lastname}`}
                            // defaultValue={`${single_booking_details?.customer_details[0]?.firstname} ${single_booking_details?.customer_details[0]?.lastname}`}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                    <div className="mt-3 grid grid-cols-3 mb-2">
                        <div className="mr-1">
                            <p className="text-xs black-text font-medium">Pick Up Location(Door 1)<span className="red-text">*</span></p>
                            <CustomGoogleInput
                                control={control}
                                name={"pickup_location"}
                                id={"pickup_location"}
                                label={""}
                                placeholder={""}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={single_booking_details?.pickup_location}
                                icon=""
                            />
                        </div>


                        <div className="mr-1">
                            <p className="text-xs black-text font-medium">Origin Airport<span className="red-text">*</span></p>
                            <CustomInput
                                control={control}
                                name={"origin_port_code"}
                                id={"origin_port_code"}
                                label={""}
                                placeholder={"Origin Airport"}
                                isRequired={true}
                                type={"text"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={single_booking_details?.origin_port_code}
                                min={""}
                                max={""}
                                icon={""}
                            />
                        </div>



                        <div className="mr-1">
                            <p className="text-xs black-text font-medium">Preferred Airline<span className="red-text">*</span></p>
                            <CustomInput
                                control={control}
                                name={"airline"}
                                id={"airline"}
                                label={""}
                                placeholder={"Airline"}
                                isRequired={true}
                                type={"text"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={single_booking?.air_freight?.airline}
                                min={""}
                                max={""}
                                icon={""}
                            />
                        </div>

                    </div>

                </div>

                <div className="grid grid-cols-3">
                    <div className="mr-1">
                        <p className="text-xs black-text font-medium"> Destination Airport<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"destination_port_code"}
                            id={"destination_port_code"}
                            label={""}
                            placeholder={"Final Destination"}
                            isRequired={true}
                            type={"text"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.destination_port_code}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>
                    <div className="mr-1">
                        <p className="text-xs black-text font-medium">Delivery Location(Door 2)<span className="red-text">*</span></p>
                        <NewCustomGoogleInput
                            control={control}
                            name={"delivery_location"}
                            id={"delivery_location"}
                            label={""}
                            placeholder={""}
                            isRequired={true}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.delivery_location}
                            icon=""
                        />
                    </div>

                    <div className="m-1">
                        <p className="text-xs black-text font-medium">Pick up Date</p>
                        <CustomInput
                            control={control}
                            name={"cargo_pickup_date"}
                            id={"cargo_pickup_date"}
                            label={""}
                            placeholder={"Pick Up Date"}
                            isRequired={false}
                            type={"date"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={
                                single_booking_details?.cargo_pickup_date
                                    ? single_booking_details?.cargo_pickup_date.slice(0, 10)
                                    : ''
                            }
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                </div>

                <div className="grid grid-cols-2">
                    <div className="mr-1">
                        <p className="text-xs black-text font-medium">Consignee Name<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"consignee_name"}
                            id={"consignee_name"}
                            label={""}
                            placeholder={"Consignee Name"}
                            isRequired={true}
                            type={"text"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking?.air_freight?.consignee_name}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                    <div className="mr-1">
                        <p className="text-xs black-text font-medium">Consignee Phone<span className="red-text">*</span></p>
                        {
                            single_booking?.air_freight?.consignee_phone === undefined ? (
                                <>
                                    <CustomPhoneInput
                                        control={control}
                                        name={"consignee_phone"}
                                        id={"consignee_phone"}
                                        label={""}
                                        isRequired={true}
                                        defaultValue={""}
                                        placeholder={"Enter your phone number"}
                                        isDisabled={false}
                                        errors={errors}
                                    />
                                </>
                            ) : (
                                <>
                                    <CustomInput
                                        control={control}
                                        name={"consignee_phone"}
                                        id={"consignee_phone"}
                                        label={""}
                                        placeholder={"Consignee Number"}
                                        isRequired={true}
                                        type={"text"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.air_freight?.consignee_phone}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </>
                            )
                        }


                    </div>

                </div>

                <div className="grid grid-cols-4">
                    <div className="ml-1">
                        <p className="text-xs black-text font-medium">Height of Cargo(inches)<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"container_height"}
                            id={"container_height"}
                            label={""}
                            placeholder={"Height of Cargo"}
                            isRequired={true}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.air_cargo_details[0]?.container_height}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                    <div className="ml-1">
                        <p className="text-xs black-text font-medium">Width of Cargo(inches)<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"container_width"}
                            id={"container_width"}
                            label={""}
                            placeholder={"Width of Cargo"}
                            isRequired={true}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.air_cargo_details[0]?.container_width}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                    <div className="ml-1">
                        <p className="text-xs black-text font-medium">Weight of Cargo(KG)<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"container_weight"}
                            id={"container_weight"}
                            label={""}
                            placeholder={"Weight of Cargo"}
                            isRequired={true}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.air_cargo_details[0]?.container_weight}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                    <div className="ml-1">
                        <p className="text-xs black-text font-medium">Number Of Cargoes<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"container_count"}
                            id={"container_count"}
                            label={""}
                            placeholder={"Number Of Containers"}
                            isRequired={true}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.air_cargo_details[0]?.container_count}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>

                </div>

                <div className="mt-3 grid grid-cols-3">




                    <div className="ml-1 mt-1">
                        <p className="text-xs black-text font-medium">Total value of Goods (₦)<span className="red-text">*</span></p>
                        <CustomCurrencyInput
                            control={control}
                            name={"goods_value"}
                            id={"goods_value"}
                            label={""}
                            placeholder={"value(₦)"}
                            isRequired={true}
                            type={"number"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.goods_value}
                            min={1}
                            max={""}
                            icon=""
                        />
                    </div>

                    <div className="ml-1 ">
                        <p className="text-xs black-text font-medium">
                            Office / Branch<span className="red-text">*</span>
                        </p>
                        {
                            single_booking_details?.branch === undefined ? (
                                <>
                                    <CustomSelect
                                        control={control}
                                        name={'branch'}
                                        id={'branch'}
                                        label={""}
                                        placeholder={'Branch'}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "Lagos", value: "LOS" },
                                            { label: "Kano", value: "KAN" },
                                            { label: "Port Harcourt", value: "PHC" },
                                        ]}
                                        // defaultValue={[{ label: single_booking_details?.branch, value: single_booking_details?.branch }]}
                                        defaultValue={''}
                                        icon=""
                                    />
                                </>
                            ) : (
                                <>
                                    <CustomInput
                                        control={control}
                                        name={"branch"}
                                        id={"branch"}
                                        label={""}
                                        placeholder={"Branch"}
                                        isRequired={true}
                                        type={"text"}
                                        errors={errors}
                                        isDisabled={true}
                                        defaultValue={single_booking_details?.branch}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </>
                            )
                        }
                    </div>

                    <div className="ml-1 mt-1">
                        <p className="text-xs black-text font-medium">Commodity Description<span className="red-text">*</span></p>
                        <CustomInput
                            control={control}
                            name={"goods_type"}
                            id={"goods_type"}
                            label={""}
                            placeholder={"Commodity Description"}
                            isRequired={true}
                            type={"text"}
                            errors={errors}
                            isDisabled={false}
                            defaultValue={single_booking_details?.goods_type}
                            min={""}
                            max={""}
                            icon={""}
                        />
                    </div>


                </div>

                <div className="lg:grid grid-cols-3">
                    <div className="mt-3">
                        <p className="text-xs black-text font-medium mb-2">Is this a Hazardous Product?<span className="red-text">*</span></p>
                        <div className="grid grid-cols-3">
                            <div className="">
                                <CustomRadio
                                    // @ts-ignore
                                    // selected={hazardous}
                                    selected={hazardous === true ? true : false}
                                    label={"Yes"}
                                    onClick={() => setHazardous(true)}
                                />
                            </div>

                            <div className="ml-2">
                                <CustomRadio
                                    // selected={!hazardous}
                                    selected={hazardous === false ? true : false}
                                    label={"No"}
                                    onClick={() => setHazardous(false)}
                                />
                            </div>


                        </div>
                    </div>

                </div>

                <div className="mb-5">
                    <div className="grid grid-cols-1">
                        <div className="mt-5">
                            <p className="text-xs black-text mb-2 font-medium">Additional Comments <small>(Optional)</small></p>
                            <CustomTextarea
                                control={control}
                                name={"additional_comments"}
                                id={"additional_comments"}
                                label={""}
                                placeholder={"Enter Comments here if necessary"}
                                isRequired={false}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={single_booking_details?.additional_comments}
                                icon=""
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-5">
                    <div className="lg:grid lg:grid-cols-3">
                        <div className="mb-5">
                            <p className="text-xs black-text font-medium" style={{ textAlign: 'left' }}>Update Booking Status</p>
                            <NewCustomSelect
                                control={control}
                                name={`shipment_status`}
                                id={`shipment_status`}
                                label={""}
                                placeholder={``}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                options={[
                                    { label: "New Booking", value: "new booking" },
                                    { label: "Awaiting Quote", value: "awaiting quotes" },
                                    { label: "Invoice Accepted", value: "invoice accepted" },
                                    { label: "Cancelled", value: "cancelled" },
                                ]}
                                defaultValue={{ label: single_booking_details?.shipment_status, value: single_booking_details?.shipment_status }}
                                icon=""
                            />

                        </div>
                    </div>
                </div>

            </div>


            {/* <hr className={`solid-br`} /> */}
            <div className="grid grid-cols-3 mt-10 items-center">
                <div className="w-22">
                </div>
                <div></div>
                <div className="w-22" style={{ justifyContent: 'left' }}>
                    {" "}
                    {/* @ts-ignore */}
                    <PrimaryButton
                        title="Submit"
                        loading={loading}
                    />
                </div>
            </div>
        </form>
    )
}

// export default ExportAirDTDConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ExportAirDTDConfirmation);



