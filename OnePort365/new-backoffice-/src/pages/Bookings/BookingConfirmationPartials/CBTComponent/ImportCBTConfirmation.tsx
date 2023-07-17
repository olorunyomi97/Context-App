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
import NewCustomGoogleInput from "components/textInputs/NewCustomGoogleInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import { useParams } from "react-router-dom";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { getSingleBooking, editBookingDetails } from "store/actions";
const _Json = require("sea-ports");


function ImportCBTConfirmation(props: any) {
    const params = useParams();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const [hazardous, setHazardous] = useState(false);
    const [bagged, setBagged] = useState(false);
    const [pickup, setPickup] = useState(false);
    const [haulage, setHaulage] = useState(false)
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [dateRange, setDateRange] = useState([null, null]);
    const [warehousing, setWarehousing] = useState(false);
    const [terminalHandling, setTerminalHandling] = useState(false);


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

    const onSubmit = (data: any) => {
        const newData = {
            id: params.id,
            shipment_type: 'import',
            shipment_transport_type: 'customs_brokerage',
            customer_id: single_booking_details?.user_id,
            destination_port_code: data?.destination_port?.value?.unlocs ? data?.destination_port?.value?.unlocs[0] : data.destination_port.value,
            pickup_location: data?.pickup_location,
            goods_type: data?.goods_type,
            goods_value: data?.goods_value,
            sender_name: data?.sender_name,
            sender_address: data?.sender_address?.label ? data?.sender_address?.label : data?.sender_address,
            nepc_number: data?.nepc_number,
            mode_of_transport: data?.mode_of_transport?.value ? data?.mode_of_transport?.value : data.mode_of_transport?.value,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            brokerage_type: data?.brokerage_type?.value,
            shipment_status: data?.shipment_status.value,
        }
        props.editBookingDetails(newData);
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
                                / Confirm Import Booking & Customs Brokerage
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
                                Import Shipment & Custom Brokerage Terminal(CBT)
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
                                        min={""}
                                        max={""}
                                        icon={""}
                                    // defaultValue={''}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 mb-3">

                                {/* Country of Origin */}
                                <div className="mr-1 mt-1">
                                    <p className="text-xs black-text font-medium">
                                        Country of Origin<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"pickup_location"}
                                        id={"pickup_location"}
                                        label={""}
                                        placeholder={"Origin Country"}
                                        isRequired={true}
                                        type={"text"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking_details?.pickup_location}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>
                                {/* destination port */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        Destination Port<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={"destination_port"}
                                        id={"destination_port"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={defaultPortsOfOrigin}
                                        defaultValue={{ label: single_booking_details?.destination_port_code, value: single_booking_details?.destination_port_code }}
                                        icon=""
                                    />
                                </div>
                            </div>
                            {/* ********* grid column ******** */}
                            <div className="mt-3 grid grid-cols-3 mb-2 items-center">
                                {/* mode of transportation */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Transport Mode<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={`mode_of_transport`}
                                        id={`mode_of_transport`}
                                        label={""}
                                        placeholder={``}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "Ocean ", value: "ocean" },
                                            { label: "Air ", value: "air" },
                                        ]}
                                        defaultValue={{ label: single_booking?.customs?.mode_of_transport, value: single_booking?.customs?.mode_of_transport }}
                                        icon=""
                                    />
                                </div>

                                {/* CB Type */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        CB Type<span className="red-text">*</span>
                                    </p>
                                    <CustomSelect
                                        control={control}
                                        name={`brokerage_type`}
                                        id={`brokerage_type`}
                                        label={""}
                                        placeholder={``}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        options={[
                                            { label: "Fast Track", value: "fast_track" },
                                            { label: "Physical Examination", value: "physical_exam" },
                                            { label: "BOND/Transire", value: "transire" },
                                            { label: "SCAN", value: "bond" },
                                        ]}
                                        defaultValue={{ label: single_booking?.customs?.brokerage_type, value: single_booking?.customs?.brokerage_type }}
                                        icon=""
                                    />
                                </div>

                                {/* NEPC Number */}
                                {/* <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        NEPC Number<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"nepc_number"}
                                        id={"nepc_number"}
                                        label={""}
                                        placeholder={"NEPC Number"}
                                        isRequired={true}
                                        type={"number"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.customs?.nepc_number}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div> */}

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

                            {/* ********* grid column  mobile ******** */}


                            {/* ********* grid column ******** */}
                            <div className="mt-3 lg:grid lg:grid-cols-4 grid grid-cols-2 mb-2 items-center">
                                {/* commodity type */}
                                <div className="mr-1">
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

                                {/* total value of goods */}
                                <div className="mx-1">
                                    <p className="text-xs black-text font-medium">
                                        Total Value of Goods(₦)<span className="red-text">*</span>
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

                                {/* Manufacturer/supplier name */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Manufacturer's Name<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"sender_name"}
                                        id={"sender_name"}
                                        label={""}
                                        placeholder={"Manufacturer Name"}
                                        isRequired={true}
                                        type={"text"}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.customs?.sender_name}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                                {/* Manufacturer/Supplier address */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Manufacturer's Address<span className="red-text">*</span>
                                    </p>

                                    <NewCustomGoogleInput
                                        control={control}
                                        name={"sender_address"}
                                        id={"sender_address"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.customs?.sender_address}
                                        icon=""
                                    />

                                </div>


                            </div>

                            {/* ********* grid column mobile ******** */}




                            {/* ********* grid column ******** */}

                            {/* ********* grid column ******** */}

                            {/* ********* grid column mobile******** */}

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

// export default ImportCBTConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ImportCBTConfirmation);


