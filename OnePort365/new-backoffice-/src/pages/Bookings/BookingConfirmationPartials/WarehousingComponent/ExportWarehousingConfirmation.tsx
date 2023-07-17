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
import CustomRadio from "components/selectInputs/CustomRadio";
import { useParams } from "react-router-dom";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { getSingleBooking, editBookingDetails } from "store/actions";

const _Json = require("sea-ports");

function ExportWarehousingConfirmation(props: any) {
    const params = useParams();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log('container count', single_booking?.booking_details?.container_details[0]?.container_count?.toString())
    console.log('container weight', single_booking?.booking_details?.container_details[0]?.container_weight)
    const single_booking_container_count = single_booking?.booking_details?.container_details[0]?.container_count
    console.log(single_booking_container_count)
    console.log(single_booking_details)
    const [bagged, setBagged] = useState(false);
    const [hazardous, setHazardous] = useState(false);
    const [pickup, setPickup] = useState(false);
    const [haulage, setHaulage] = useState(false)
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const [warehousing, setWarehousing] = useState(false);

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
        console.log(data.customer_id)
        const newData = {
            id: params.id,
            shipment_type: 'export',
            shipment_transport_type: 'warehousing',
            warehousing: true,
            with_haulage: haulage,
            customer_id: single_booking_details?.user_id,
            port_of_loading: data?.port_of_loading?.value?.unlocs ? data?.port_of_loading?.value?.unlocs[0] : data.port_of_loading.value,
            container_count: data?.container_count,
            container_weight: data?.container_weight,
            // container_size: data?.container_size.value,
            // container_type: data?.container_type.value,
            container_size: data?.container_size?.value ? data?.container_size?.value : data.container_size.value,
            container_type: data?.container_type?.value ? data?.container_type?.value : data.container_type.value,
            warehousing_duration: data?.warehousing_duration,
            goods_type: data?.goods_type,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            total_cargo_bags: data?.total_cargo_bags,
            pickup_location: data?.pickup_location?.label,
            // pickup_location: data?.pickup_location?.label ? data?.pickup_location?.label : data.pickup_location.label,
            cargo_bagged: bagged,
            require_pickup: pickup,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments,
            shipment_status: data?.shipment_status.value,
        };
        props.editBookingDetails(newData);
        console.log(newData);
    }



    useEffect(() => {
        if (single_booking_details) {
            setBagged(single_booking?.warehousing?.cargo_bagged);
            setHaulage(single_booking_details?.with_haulage);
            setHazardous(single_booking_details?.is_product_hazardous);
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
                                / Confirm Export Booking & Warehousing
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:px-10 mb-3">
                <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">

                    <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                        <div className="lg:px-8 px-5">
                            <p className="add-shipment-text mb-5">
                                Export Shipment & Warehousing
                            </p>
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
                                        // defaultValue={`${single_booking_details?.customer_details[0]?.firstname} ${single_booking_details?.customer_details[0]?.lastname}`}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>
                            </div>

                            {/* *****  grid column of 2 ******* */}
                            <div className="mt-3 grid grid-cols-1 items-center ">
                                {/* port of loading */}

                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        Loading port<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={"port_of_loading"}
                                        id={"port_of_loading"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={defaultPortsOfOrigin}
                                        // defaultValue={single_booking_details?.port_of_loading}
                                        defaultValue={{ label: single_booking_details?.port_of_loading, value: single_booking_details?.port_of_loading }}
                                        // options={[
                                        //     { label: "Apapa (NGAPP) Nigeria", value: "NGAPP" },
                                        //     { label: "Onne (NGONN) Nigeria", value: "NGONN" },
                                        //     { label: "Port Harcout (NGPHC) Nigeria", value: "NGPHC" },
                                        //     { label: "Tincan/Lagos (NGTIN) Nigeria", value: "NGTIN" },
                                        // ]}
                                        icon=""
                                    />
                                </div>

                            </div>


                            {/* *****  grid column of 3 desktop ******* */}
                            <div className="mt-3 lg:grid lg:grid-cols-4 grid grid-cols-2 items-center">
                                <div>
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
                                        // defaultValue={""}
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
                                        placeholder={"Type"}
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

                                <div className="ml-1">
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

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Number of Containers<span className="red-text">*</span>
                                    </p>
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
                                        defaultValue={single_booking_details?.container_details[0]?.container_count}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                            </div>


                            {/* *****  grid column of 2 ******* */}
                            <div className="mt-3 grid grid-cols-3 items-center">
                                {/* warehousing duration */}
                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">
                                        Duration (weeks)<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"warehousing_duration"}
                                        id={"warehousing_duration"}
                                        label={""}
                                        placeholder={"Enter duration"}
                                        isRequired={true}
                                        type={"number"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.warehousing?.warehousing_duration}
                                        min={"1"}
                                        max={""}
                                        icon=""
                                    />
                                    {/* <NewCustomDateFilter placeholder="mm/dd/yyyy - mm/dd/yyyy" /> */}
                                </div>

                                <div className="ml-1 mt-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        Commodity Type<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"goods_type"}
                                        id={"goods_type"}
                                        label={""}
                                        placeholder={"Commodity Type"}
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

                                {/* office branch */}
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

                            {/* bagged cargo ? desktop*/}
                            <div className="mt-3 lg:grid lg:grid-cols-3 items-center ">
                                <div className="mt-3">
                                    <p className="text-xs black-text font-medium mb-2">
                                        Is the Cargo Bagged ?<span className="red-text">*</span>
                                    </p>
                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            <CustomRadio
                                                // @ts-ignore
                                                selected={bagged === true ? true : false}
                                                // selected={bagged}
                                                label={"Yes"}
                                                onClick={() => setBagged(true)}
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <CustomRadio
                                                // selected={!bagged}
                                                selected={bagged === false ? true : false}
                                                label={"No"}
                                                onClick={() => setBagged(false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* bagged cargo ?mobile*/}

                            {/* if yes number of bags */}
                            {bagged && (
                                <>
                                    <div className="mt-3 lg:grid lg:grid-cols-4 items-center">
                                        <div className="ml-1">
                                            <p className="text-xs black-text font-medium">
                                                Number of bags<span className="red-text">*</span>
                                            </p>
                                            <CustomInput
                                                control={control}
                                                name={"total_cargo_bags"}
                                                id={"total_cargo_bags"}
                                                label={""}
                                                placeholder={"Bags"}
                                                isRequired={true}
                                                type={"number"}
                                                errors={errors}
                                                isDisabled={false}
                                                defaultValue={single_booking?.warehousing?.total_cargo_bags}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        </div>
                                    </div>


                                </>
                            )}

                            {/* pickup desktop*/}
                            <div className="mt-3 lg:grid lg:grid-cols-3 items-center">
                                <div className="mt-3">
                                    <p className="text-xs black-text font-medium mb-2">
                                        Do you require Pickup ?<span className="red-text">*</span>
                                    </p>
                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            {/*  @ts-ignore */}
                                            <CustomRadio
                                                // selected={haulage}
                                                selected={haulage === true ? true : false}
                                                label={"Yes"}
                                                onClick={() => setHaulage(true)}
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <CustomRadio
                                                // selected={!haulage}
                                                selected={haulage === false ? true : false}
                                                label={"No"}
                                                onClick={() => setHaulage(false)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* pickup mobile*/}

                            {/* if yes pickup location */}
                            {haulage && (
                                <>
                                    <div className="mt-3 lg:grid lg:grid-cols-4 items-center">
                                        <div className="mr-1">
                                            <p className="text-xs black-text font-medium">
                                                {" "}
                                                Pickup location <span className="red-text">*</span>
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
                                                defaultValue={single_booking_details?.pickup_location}
                                                icon=""
                                            />
                                            {/* {
                                                single_booking_details?.pickup_location === undefined ? (
                                                    <>
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
                                                            icon=""
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        <CustomInput
                                                            control={control}
                                                            name={"pickup_location"}
                                                            id={"pickup_location"}
                                                            label={""}
                                                            placeholder={"Pick Up Location"}
                                                            isRequired={true}
                                                            type={"text"}
                                                            errors={errors}
                                                            isDisabled={true}
                                                            defaultValue={single_booking_details?.pickup_location}
                                                            min={""}
                                                            max={""}
                                                            icon={""}
                                                        />
                                                    </>
                                                )
                                            } */}

                                        </div>
                                    </div>


                                </>
                            )}
                            {/* harzardous  desktop*/}
                            <div className="mt-3 lg:grid lg:grid-cols-3 items-center">
                                <div className="mt-3">
                                    <p className="text-xs black-text font-medium mb-2">
                                        Is the Shipped Product Hazardous ?
                                        <span className="red-text">*</span>
                                    </p>
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

                            {/* harzardous  mobile*/}

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


                            {/* submit button */}
                            <div className="grid grid-cols-3 mt-10 items-center">
                                <div className="w-22"></div>
                                <div></div>
                                <div className="w-22" style={{ justifyContent: "left" }}>
                                    {" "}
                                    {/* @ts-ignore */}
                                    <PrimaryButton title="Submit" loading={loading} />
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>



        </>
    )
}

// export default ExportWarehousingConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ExportWarehousingConfirmation);


