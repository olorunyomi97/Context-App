import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import NewCustomSelect from "components/selectInputs/NewCustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import { getSingleBooking, editBookingDetails } from "store/actions";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import moment from "moment";
import { parseAllPorts } from "helpers/index";
const _Json = require("sea-ports");

const ExportOceanEdit = (props: any) => {
    const params = useParams();
    const { handleSubmit, control, formState: { errors }, } = useForm();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    console.log(single_booking_details?.user_id)
    const [customs, setCustoms] = useState(true);
    const [marine_insurance, setInsurance] = useState(true);
    const [warehousing, setWarehousing] = useState(true);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [haulage, setHaulage] = useState(false);
    const [showExportHaulage, setShowExportHaulage] = useState(false);
    const [hazardous, setHazardous] = useState(false);
    const [tracker, setTracker] = useState(false);
    const [escort, setEscort] = useState(false);

    useEffect(() => {
        const parsePorts = parseAllPorts(_Json.JSON);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
    }, []);

    // useEffect to render when a shipment_data changes
    useEffect(() => {
        if (single_booking_details) {
            setCustoms(single_booking_details?.customs_brokerage);
            setInsurance(single_booking_details?.marine_insurance);
            setWarehousing(single_booking_details?.warehousing);
            setHazardous(single_booking_details?.is_product_hazardous);
            setHaulage(single_booking_details?.with_haulage);
            setEscort(single_booking_details?.with_escort);
            setTracker(single_booking_details?.with_tracker);
        }
    }, [single_booking_details]);

    useEffect(() => {
        if (!haulage) {
            setHazardous(false);
        }
    }, [haulage]);

    useEffect(() => {
        props.getSingleBooking(params.id, `format_containers=${true}`);
        // props.getSingleBooking(params.id);
    }, []);

    console.log("get>>>", single_booking_details?.container_details)

    const containers: any = [];


    const onSubmit = (data: any) => {
        const newData = {
            id: params.id,
            shipment_type: 'export',
            shipment_transport_type: 'ocean_freight',
            goods_value_currency: 'NGN' ? "NGN" : "USD",
            customer_id: single_booking_details?.user_id,
            customs,
            warehousing,
            marine_insurance,
            with_haulage: haulage,
            pickup_location: data?.pickup_location?.label,
            origin_port_code: data?.origin_port_code?.value?.unlocs ? data?.origin_port_code?.value?.unlocs[0] : data.origin_port_code.value,
            destination_port_code: data?.destination_port?.value?.unlocs ? data?.destination_port?.value?.unlocs[0] : data.destination_port.value,
            dropoff_location_port: data?.origin_port_code?.value?.unlocs ? data?.origin_port_code?.value?.unlocs[0] : data.origin_port_code.value,
            cargo_pickup_date: data?.cargo_pickup_date,
            stuffing_date: data?.stuffing_date,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            goods_value: data?.goods_value,
            goods_type: data?.goods_type,
            bl_number: data?.bl_number,
            additional_comments: data?.additional_comments,
            is_product_hazardous: hazardous,
            with_tracker: tracker,
            with_escort: escort,
            container_size: data?.container_size,
            container_type: data?.container_type,
            container_weight: data?.container_weight,
            container_count: data?.container_count,
            shipment_status: data?.shipment_status.value,
        };

        // single_booking_details?.container_details.map((data: any, index: any) => {
        //     containers.push({
        //         container_count: data[`container_count_${data[index]}`],
        //         container_size: data[`container_size_${data[index]}`]?.value,
        //         container_type: data[`container_type_${data[index]}`]?.value,
        //         container_weight: data[`weight_${data[index]}`],
        //     })
        //     return containers;
        // })
        props.editBookingDetails(newData);
        console.log(JSON.stringify(newData))
    };

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
                                / Edit Export Booking & Ocean Freight
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:px-10 lg:px-5 mb-3">
                <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="lg:py-5 lg:px-8 px-2">
                        <div className="lg:px-8">
                            <p className="add-shipment-text mb-5">
                                Confirm Booking & Ocean Freight
                            </p>
                            <div className="grid grid-cols-1 mb-3">
                                <div className="mr-1">
                                    <p className="text-xs black-text mb-2 font-medium">
                                        Customer Name<span className="red-text">*</span>
                                    </p>
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
                            <div className="mt-3 grid grid-cols-2 mb-2">
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Origin Port<span className="red-text">*</span>
                                    </p>
                                    <NewCustomSelect
                                        control={control}
                                        name={"origin_port_code"}
                                        id={"origin_port_code"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={defaultPortsOfOrigin}
                                        // options={[
                                        //     { label: "Apapa (NGAPP) Nigeria", value: "NGAPP" },
                                        //     { label: "Onne (NGONN) Nigeria", value: "NGONN" },
                                        //     { label: "Port Harcout (NGPHC) Nigeria", value: "NGPHC" },
                                        //     { label: "Tincan/Lagos (NGTIN) Nigeria", value: "NGTIN" },
                                        // ]}
                                        defaultValue={{ label: single_booking_details?.origin_port_code, value: single_booking_details?.origin_port_code }}
                                        icon=""
                                    />
                                </div>

                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Destination Port<span className="red-text">*</span>
                                    </p>
                                    <NewCustomSelect
                                        control={control}
                                        name={"destination_port"}
                                        id={"destination_port"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        // defaultValue={{ label: single_booking_details?.destination_port_code, value: single_booking_details?.destination_port_code }}
                                        defaultValue={{ label: single_booking_details?.destination_port, value: single_booking_details?.destination_port_code }}
                                        options={defaultPortsOfDestination}
                                        icon=""
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-3">
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Pickup Date<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"cargo_pickup_date"}
                                        id={"cargo_pickup_date"}
                                        label={""}
                                        placeholder={"Enter pickup date"}
                                        isRequired={true}
                                        type={"date"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={
                                            single_booking_details?.cargo_pickup_date
                                                ? single_booking_details?.cargo_pickup_date.slice(0, 10)
                                                : new Date().toISOString().slice(0, 10)
                                        }
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Total Value of Goods(₦)
                                        <span className="red-text">*</span>
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


                            <div className="mt-3 lg:grid lg:grid-cols-4 grid grid-cols-2">
                                <div className="">
                                    <p className="text-xs black-text font-medium">
                                        Size of Container<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={`container_size`}
                                        id={`container_size`}
                                        label={""}
                                        placeholder={`Size`}
                                        isRequired={true}
                                        type={"numeric"}
                                        errors={errors}
                                        isDisabled={true}
                                        defaultValue={single_booking_details?.container_details[0]?.container_size}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Type of Container<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={`container_type`}
                                        id={`container_type`}
                                        label={""}
                                        placeholder={`Type`}
                                        isRequired={true}
                                        type={"numeric"}
                                        errors={errors}
                                        isDisabled={true}
                                        defaultValue={single_booking_details?.container_details[0]?.container_type}
                                        min={""}
                                        max={""}
                                        icon={""}
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
                                        isDisabled={true}
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
                                        isDisabled={true}
                                        defaultValue={single_booking_details?.container_details[0]?.container_weight}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>
                            </div>



                            <div className="mt-4">
                                <div className="grid grid-cols-3">

                                    <div className="mr-1">
                                        <p className="text-xs black-text font-medium">
                                            Goods Type<span className="red-text">*</span>
                                        </p>
                                        <CustomInput
                                            control={control}
                                            name={"goods_type"}
                                            id={"goods_type"}
                                            label={""}
                                            placeholder={""}
                                            isRequired={true}
                                            type={"text"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={single_booking_details?.goods_type === undefined ? "" : single_booking_details.goods_type}
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                    </div>

                                    <div className="">
                                        <p className="text-xs black-text font-medium">
                                            B/L Number<small>(optional)</small>
                                        </p>
                                        <CustomInput
                                            control={control}
                                            name={"bl_number"}
                                            id={"bl_number"}
                                            label={""}
                                            placeholder={""}
                                            isRequired={false}
                                            type={"text"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={single_booking_details?.bl_number === undefined ? "" : single_booking_details.bl_number}
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
                            </div>

                            <div className="mt-5">
                                <p className="text-xs black-text mb-2 font-medium">
                                    Additional Services Provided{" "}
                                    <small>(Select all that apply)</small>
                                </p>
                                <div className="grid grid-cols-1">
                                    <div className="lg:flex items-center mb-5">
                                        <div className="mr-3">
                                            <CustomCheckBox
                                                name="customs_brokerage"
                                                id="customs_brokerage"
                                                label="Customs Brokerage & Terminal"
                                                isRequired={false}
                                                isDisabled={true}
                                                onChange={(e: any) => setCustoms(e.target.checked)}
                                                defaultChecked={single_booking_details?.customs_brokerage}
                                            />
                                        </div>

                                        <div className="mr-3">
                                            <CustomCheckBox
                                                name="marine_insurance"
                                                id="marine_insurance"
                                                label="Marine Insurance"
                                                isRequired={false}
                                                isDisabled={false}
                                                onChange={(e: any) =>
                                                    setInsurance(e.target.checked)
                                                }
                                                // defaultChecked={false}
                                                defaultChecked={
                                                    single_booking_details?.marine_insurance
                                                }
                                            />
                                        </div>

                                        <div className="mr-3">
                                            <CustomCheckBox
                                                name="warehousing"
                                                id="warehousing"
                                                label="Warehousing"
                                                isRequired={false}
                                                isDisabled={true}
                                                onChange={(e: any) =>
                                                    setWarehousing(e.target.checked)
                                                }
                                                // defaultChecked={false}
                                                defaultChecked={single_booking_details?.warehousing}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:px-8 mb-5">
                            <div>
                                <p className="add-shipment-text py-1">
                                    Add Haulage to this Shipment???
                                </p>
                                <div>
                                    <div className="grid grid-cols-3 mt-2">
                                        <div className="mr-3">
                                            <NewCustomCheckbox
                                                name="haulage"
                                                id="haulage"
                                                label="Haulage"
                                                isRequired={false}
                                                isDisabled={true}
                                                onChange={(e: any) =>
                                                    setHaulage(e.target.checked)
                                                }
                                                defaultChecked={
                                                    single_booking_details?.with_haulage
                                                }
                                                onClick={() => {
                                                    setShowExportHaulage(!showExportHaulage);
                                                    // if (haulage === false) {
                                                    // 	setTracker(false);
                                                    // 	setHazardous(false);
                                                    // 	setEscort(false);
                                                    // }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {single_booking_details?.with_haulage === true ? (
                            <>
                                {!showExportHaulage ? (
                                    <>
                                        <div className="lg:px-8">
                                            <div className="grid grid-cols-3 mb-3">
                                                <div className="mr-1 mt-1">
                                                    <p className="text-xs black-text font-medium">
                                                        {" "}
                                                        Pickup location{" "}
                                                    </p>
                                                    <CustomGoogleInput
                                                        control={control}
                                                        name={"pickup_location"}
                                                        id={"pickup_location"}
                                                        label={""}
                                                        placeholder={""}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={false}
                                                        defaultValue={single_booking_details.pickup_location}
                                                        // defaultValue={{ label: single_booking_details?.pickup_location, value: single_booking_details?.pickup_location }}
                                                        icon=""
                                                    />
                                                </div>

                                                <div className="mr-1">
                                                    <p className="text-xs black-text font-medium">
                                                        Drop Off Location
                                                    </p>
                                                    <CustomSelect
                                                        control={control}
                                                        name={"origin_port_code"}
                                                        id={"origin_port_code"}
                                                        label={""}
                                                        placeholder={""}
                                                        isRequired={true}
                                                        errors={errors}
                                                        isDisabled={true}
                                                        // options={defaultPortsOfOrigin}
                                                        // options={[
                                                        //     { label: "Apapa (NGAPP) Nigeria", value: "NGAPP" },
                                                        //     { label: "Onne (NGONN) Nigeria", value: "NGONN" },
                                                        //     { label: "Port Harcout (NGPHC) Nigeria", value: "NGPHC" },
                                                        //     { label: "Tincan/Lagos (NGTIN) Nigeria", value: "NGTIN" },
                                                        // ]}
                                                        options={defaultPortsOfOrigin}
                                                        defaultValue={{ label: single_booking_details?.origin_port_code, value: single_booking_details?.origin_port_code }}
                                                        icon=""
                                                    />
                                                </div>
                                                <div className="mr-1 mt-1">
                                                    <p className="text-xs black-text font-medium">
                                                        Stuffing Date
                                                    </p>
                                                    <CustomInput
                                                        control={control}
                                                        name={"stuffing_date"}
                                                        id={"stuffing_date"}
                                                        label={""}
                                                        placeholder={"Enter Stuffing date"}
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

                                            <div className="lg:grid grid-cols-3">
                                                <div className="mt-3">
                                                    <p className="text-xs black-text font-medium mb-2">
                                                        Do you require an Haulage Tracker ?
                                                        <span className="red-text">*</span>
                                                    </p>
                                                    <div className="grid grid-cols-3">
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
                                                    <p className="text-xs black-text font-medium mb-2">Do you require an Haulage Escort ?<span className="red-text">*</span></p>
                                                    <div className="grid grid-cols-3">
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
                                                        <div className="">
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        ) : (
                            <>
                                {showExportHaulage ? (
                                    <>
                                        <div className="lg:px-8">
                                            <div className="grid grid-cols-1 mb-3">
                                                <div className="mt-3 grid grid-cols-3 mb-2">
                                                    <div className="mr-1">
                                                        <p className="text-xs black-text font-medium">
                                                            {" "}
                                                            Pickup location{" "}
                                                        </p>
                                                        <CustomGoogleInput
                                                            control={control}
                                                            name={"pickup_location"}
                                                            id={"pickup_location"}
                                                            label={""}
                                                            placeholder={""}
                                                            isRequired={false}
                                                            errors={errors}
                                                            isDisabled={false}
                                                            defaultValue={''}
                                                            // defaultValue={{ label: single_booking_details?.pickup_location, value: single_booking_details?.pickup_location }}
                                                            icon=""
                                                        />
                                                    </div>

                                                    <div className="mr-1">
                                                        <p className="text-xs black-text font-medium">
                                                            Drop Off Location
                                                        </p>
                                                        <CustomSelect
                                                            control={control}
                                                            name={"dropoff_location_port"}
                                                            id={"dropoff_location_port"}
                                                            label={""}
                                                            placeholder={""}
                                                            isRequired={true}
                                                            errors={errors}
                                                            isDisabled={false}
                                                            // options={defaultPortsOfOrigin}
                                                            options={[
                                                                { label: "Apapa (NGAPP) Nigeria", value: "NGAPP" },
                                                                { label: "Onne (NGONN) Nigeria", value: "NGONN" },
                                                                { label: "Port Harcout (NGPHC) Nigeria", value: "NGPHC" },
                                                                { label: "Tincan/Lagos (NGTIN) Nigeria", value: "NGTIN" },
                                                            ]}
                                                            defaultValue={''}
                                                            // defaultValue={{ label: single_booking_details?.dropoff_location_port, value: single_booking_details?.dropoff_location_port }}
                                                            icon=""
                                                        />
                                                    </div>
                                                    <div className="mr-1">
                                                        <p className="text-xs black-text font-medium">
                                                            Stufing Date
                                                        </p>
                                                        <CustomInput
                                                            control={control}
                                                            name={"stuffing_date"}
                                                            id={"stuffing_date"}
                                                            label={""}
                                                            placeholder={"Enter Stuffing date"}
                                                            isRequired={true}
                                                            type={"date"}
                                                            errors={errors}
                                                            isDisabled={false}
                                                            // defaultValue={
                                                            //     single_booking_details?.stuffing_date
                                                            //         ? single_booking_details?.stuffing_date.slice(0, 10)
                                                            //         : new Date().toISOString().slice(0, 10)
                                                            // }
                                                            defaultValue={''}
                                                            min={""}
                                                            max={""}
                                                            icon={""}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="lg:grid grid-cols-3">


                                                <div className="mt-3">
                                                    <p className="text-xs black-text font-medium mb-2">
                                                        Is the Shipped Product Hazardous ?
                                                        <span className="red-text">*</span>
                                                    </p>
                                                    <div className="grid grid-cols-3">
                                                        <div className="">
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
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <></>
                                )}
                            </>
                        )}

                        <div className="lg:px-8 lg:px-5 mb-5">
                            <div className="grid grid-cols-1">
                                <div className="mt-5">
                                    <p className="text-xs black-text mb-2 font-medium">
                                        Additional Comments <small>(Optional)</small>
                                    </p>
                                    <CustomTextarea
                                        control={control}
                                        name={"additional_comments"}
                                        id={"additional_comments"}
                                        label={""}
                                        placeholder={"Enter Comments here if necessary"}
                                        isRequired={false}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={""}
                                        icon=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="lg:px-8 lg:px-5 mb-5">
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
                        <div className="grid grid-cols-3 mt-10 items-center">
                            <div className="w-22">
                            </div>
                            <div></div>
                            <div className="w-22" style={{ justifyContent: "left" }}>
                                {" "}
                                {/* @ts-ignore */}
                                <PrimaryButton title="Submit" loading={loading} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </>
    )
}

// export default ExportOceanEdit;

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ExportOceanEdit);
