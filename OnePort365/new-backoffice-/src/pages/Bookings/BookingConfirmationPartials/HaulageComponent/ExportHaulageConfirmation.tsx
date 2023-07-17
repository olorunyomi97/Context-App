import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import NewCustomSelect from "components/selectInputs/NewCustomSelect";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import CustomRadio from "components/selectInputs/CustomRadio";
import { useParams } from "react-router-dom";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { getSingleBooking, editBookingDetails } from "store/actions";

const _Json = require("sea-ports");

function ExportHaulageConfirmation(props: any) {
    const params = useParams();
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const [bagged, setBagged] = useState(false);
    const [pickup, setPickup] = useState(false);
    const [haulage, setHaulage] = useState(false)
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [tracker, setTracker] = useState(false);
    const [escort, setEscort] = useState(false);
    const [hazardous, setHazardous] = useState(false);
    const [customs, setCustoms] = useState(false);

    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    //prettier-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


    useEffect(() => {
        const parsePorts = parseAllPorts(_Json.JSON);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);

        mixpanel.track("Admin Started New Shipment", {
            email: admin_data.email,
        });
    }, []);

    useEffect(() => {
        props.getSingleBooking(params.id, `format_containers=${true}`);
        // props.getSingleBooking(params.id);
    }, []);

    const onSubmit = (data: any) => {
        const newData = {
            id: params.id,
            shipment_type: "export",
            shipment_transport_type: "haulage",
            customs,
            customer_id: single_booking_details?.user_id,
            stuffing_location: data?.stuffing_location?.label,
            terminal_port: data?.terminal_port?.value?.unlocs ? data?.terminal_port?.value?.unlocs[0] : data.terminal_port.value,
            origin_port_code: data?.origin_port_code?.value?.unlocs ? data?.origin_port_code?.value?.unlocs[0] : data.origin_port_code.value,
            goods_value: data?.goods_value,
            goods_type: data?.goods_type,
            container_size: data?.container_size?.value ? data?.container_size?.value : data.container_size.value,
            container_type: data?.container_type?.value ? data?.container_type?.value : data.container_type.value,
            container_count: data?.container_count,
            container_weight: data?.container_weight,
            stuffing_date: data?.stuffing_date,
            bl_number: data?.bl_number,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            with_tracker: tracker,
            with_escort: escort,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments,
            shipment_status: data?.shipment_status.value,
        };
        props.editBookingDetails(newData);
        console.log('Data im sending', newData)
        console.log(JSON.stringify(newData))
    };

    useEffect(() => {
        if (single_booking_details) {
            setHazardous(single_booking_details?.is_product_hazardous);
            setEscort(single_booking_details?.with_escort);
            setTracker(single_booking_details?.with_tracker);
        }
    }, [single_booking_details]);



    return (
        <>

            <div className="">
                <div>
                    <div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
                        <div className="mt-2">
                            <p className="font-semibold text-lg">
                                Job Number : {single_booking_details?.job_number === undefined ? 'N/A' : single_booking_details?.job_number}
                            </p>
                        </div>
                        <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                            <small>Bookings </small>
                            <small style={{ color: "grey" }}>
                                {" "}
                                / Confirm Export Booking & Haulage
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:px-10 mb-3">
                <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                        <div className="lg:px-8 px-5">
                            <p className="add-shipment-text mb-5">Export Booking & Haulage</p>
                            <div className="grid grid-cols-1 mb-3">
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
                                        min={""}
                                        max={""}
                                        icon={""}
                                    // defaultValue={''}
                                    />
                                </div>
                            </div>

                            <div className="mt-3 grid grid-cols-3 mb-2">
                                <div className="mr-1 mt-1">
                                    <p className="text-xs black-text font-medium">
                                        Stuffing Location<span className="red-text">*</span>
                                    </p>
                                    <CustomGoogleInput
                                        control={control}
                                        name={"stuffing_location"}
                                        id={"stuffing_location"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking_details?.stuffing_location}
                                        icon=""
                                    />
                                </div>
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Port of Loading<span className="red-text">*</span>
                                    </p>

                                    <CustomSelect
                                        control={control}
                                        name={"origin_port_code"}
                                        id={"origin_port_code"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={{ label: single_booking_details?.origin_port_code, value: single_booking_details?.origin_port_code }}
                                        options={defaultPortsOfOrigin}
                                        icon=""
                                    />
                                </div>

                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Port Destination<span className="red-text">*</span>
                                    </p>
                                    {/* <CustomSelect
                                        control={control}
                                        name={"destination_port_code"}
                                        id={"destination_port_code"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        // defaultValue={{ label: single_booking_details?.destination_port, value: single_booking_details?.destination_port_code }}
                                        options={defaultPortsOfDestination}
                                        icon=""
                                    /> */}
                                    <NewCustomSelect
                                        control={control}
                                        name={"terminal_port"}
                                        id={"terminal_port"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        // defaultValue={{ label: single_booking_details?.destination_port_code, value: single_booking_details?.destination_port_code }}
                                        defaultValue={{ label: single_booking_details?.terminal_port, value: single_booking_details?.terminal_port }}
                                        options={defaultPortsOfDestination}
                                        icon=""
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Commodity Description<span className="red-text">*</span>
                                    </p>
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

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Total value of Goods (₦)<span className="red-text">*</span>
                                    </p>
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
                            </div>
                            {/* Desktop Form */}
                            <div className="mt-3 lg:grid lg:grid-cols-4 grid grid-cols-2">
                                <div className="">
                                    <p className="text-xs black-text font-medium">
                                        Size of Container<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={`container_size`}
                                        id={`container_size`}
                                        label={""}
                                        placeholder={`Size`}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "20 FT", value: "20FT" },
                                            { label: "40 FT", value: "40FT" },
                                            { label: "40 HC", value: "40HC" },
                                            { label: "45 FT", value: "45FT" },
                                        ]}
                                        defaultValue={{ label: single_booking_details?.container_details[0]?.container_size, value: single_booking_details?.container_details[0]?.container_size }}
                                        icon=""
                                    />
                                </div>

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Type of Container<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={`container_type`}
                                        id={`container_type`}
                                        label={""}
                                        placeholder={`Type`}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "Dry", value: "dry" },
                                            { label: "Reefer", value: "reefer" },
                                        ]}
                                        defaultValue={{ label: single_booking_details?.container_details[0]?.container_type, value: single_booking_details?.container_details[0]?.container_type }}
                                        icon=""
                                    />
                                </div>

                                <div className="mt-1 ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Number Of Containers<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"container_count"}
                                        id={"container_count"}
                                        label={""}
                                        placeholder={"Container Count"}
                                        isRequired={true}
                                        type={"number"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking_details?.container_details[0]?.container_count}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                                <div className="mt-1 ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Weight of Goods (Metric Ton)<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"container_weight"}
                                        id={"container_weight"}
                                        label={""}
                                        placeholder={"Weight"}
                                        isRequired={true}
                                        type={"number"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking_details?.container_details[0]?.container_weight}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>
                            </div>
                            {/* Desktop Form */}

                            <div className="mt-2">
                                <div className="grid grid-cols-2">
                                    <div className="">
                                        <p className="text-xs black-text font-medium">
                                            B/L Number<small>(optional)</small>
                                        </p>
                                        <CustomInput
                                            control={control}
                                            name={"bl_number"}
                                            id={"bl_number"}
                                            label={""}
                                            placeholder={"B/L Number"}
                                            isRequired={false}
                                            type={"text"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={single_booking_details?.bl_number}
                                            min={""}
                                            max={""}
                                            icon={""}
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
                                </div>
                                <div className="lg:grid lg:grid-cols-3 grid grid-cols-2">
                                    <div className="mr-1">
                                        <p className="text-xs black-text font-medium">
                                            Stuffing Date<span className="red-text">*</span>
                                        </p>
                                        <CustomInput
                                            control={control}
                                            name={"stuffing_date"}
                                            id={"stuffing_date"}
                                            label={""}
                                            placeholder={"Stuffing Date"}
                                            isRequired={true}
                                            type={"date"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={
                                                single_booking_details?.stuffing_date
                                                    ? single_booking_details?.stuffing_date.slice(0, 10)
                                                    : new Date().toISOString().slice(0, 10)
                                            }
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                    </div>

                                </div>

                                {/* <div className="mt-5">
                                    <p className="text-xs black-text mb-2 font-medium">Additional Services Provided</p>
                                    <div className="grid grid-cols-1">
                                        <div className="flex items-center mb-5">
                                            <div className="mr-3">
                                                <CustomCheckBox
                                                    name="customs"
                                                    id="customs"
                                                    label="Customs Brokerage & Terminal"
                                                    isRequired={false}
                                                    isDisabled={false}
                                                    onChange={(e: any) => setCustoms(e.target.checked)}
                                                    defaultChecked={false}
                                                />
                                            </div>
                                        </div>


                                    </div>
                                </div> */}

                                <div className="lg:grid grid-cols-3">
                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">
                                            Do you require an Haulage Tracker ?
                                            <span className="red-text">*</span>
                                        </p>
                                        <div className="grid grid-cols-3">
                                            {/* <div className="">
                                                <CustomRadio
                                                    selected={tracker}
                                                    label={"Yes"}
                                                    onClick={() => setTracker(true)}
                                                />
                                            </div>

                                            <div className="ml-2">
                                                <CustomRadio
                                                    selected={!tracker}
                                                    label={"No"}
                                                    onClick={() => setTracker(false)}
                                                />
                                            </div> */}
                                            <div className="">
                                                <CustomRadio
                                                    // @ts-ignore
                                                    // selected={hazardous}
                                                    selected={tracker === true ? true : false}
                                                    label={"Yes"}
                                                    onClick={() => setTracker(true)}
                                                />
                                            </div>

                                            <div className="ml-2">
                                                <CustomRadio
                                                    // selected={!hazardous}
                                                    selected={tracker === false ? true : false}
                                                    label={"No"}
                                                    onClick={() => setTracker(false)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">
                                            Do you require an Haulage Escort ?
                                            <span className="red-text">*</span>
                                        </p>
                                        <div className="grid grid-cols-3">
                                            {/* <div className="">
                                                <CustomRadio
                                                    selected={escort}
                                                    label={"Yes"}
                                                    onClick={() => setEscort(true)}
                                                />
                                            </div>

                                            <div className="ml-2">
                                                <CustomRadio
                                                    selected={!escort}
                                                    label={"No"}
                                                    onClick={() => setEscort(false)}
                                                />
                                            </div> */}
                                            <div className="">
                                                <CustomRadio
                                                    // @ts-ignore
                                                    // selected={hazardous}
                                                    selected={escort === true ? true : false}
                                                    label={"Yes"}
                                                    onClick={() => setEscort(true)}
                                                />
                                            </div>

                                            <div className="ml-2">
                                                <CustomRadio
                                                    // selected={!hazardous}
                                                    selected={escort === false ? true : false}
                                                    label={"No"}
                                                    onClick={() => setEscort(false)}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">
                                            Is the Shipped Product Hazardous ?
                                            <span className="red-text">*</span>
                                        </p>
                                        <div className="grid grid-cols-3">
                                            {/* <div className="">
                                                <CustomRadio
                                                    selected={hazardous}
                                                    label={"Yes"}
                                                    onClick={() => setHazardous(true)}
                                                />
                                            </div>

                                            <div className="ml-2">
                                                <CustomRadio
                                                    selected={!hazardous}
                                                    label={"No"}
                                                    onClick={() => setHazardous(false)}
                                                />
                                            </div> */}
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
                            </div>
                        </div>
                        <div className="lg:px-8 px-5 mb-5">
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

                            <div className=" mb-5">
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
                </div>
            </div>
        </>
    )
}

// export default ExportHaulageConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ExportHaulageConfirmation);



