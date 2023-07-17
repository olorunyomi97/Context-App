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


function ExportCBTConfirmation(props: any) {
    const params = useParams();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const [hazardous, setHazardous] = useState(false);
    const [terminalHandling, setTerminalHandling] = useState(false);
    const [bagged, setBagged] = useState(false);
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

    const onSubmit = (data: any) => {
        const newData = {
            id: params.id,
            shipment_type: 'export',
            shipment_transport_type: 'customs_brokerage',
            customer_id: single_booking_details?.user_id,
            origin_port_code: data?.origin_port_code?.value?.unlocs ? data?.origin_port_code?.value?.unlocs[0] : data.origin_port_code.value,
            delivery_location: data?.delivery_location,
            mode_of_transport: data?.mode_of_transport?.value ? data?.mode_of_transport?.value : data.mode_of_transport?.value,
            nepc_number: data?.nepc_number,
            bl_number: data?.bl_number,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            goods_type: data?.goods_type,
            goods_value: data?.goods_value,
            consignee_name: data?.consignee_name,
            consignee_address: data?.consignee_address?.label ? data?.consignee_address?.label : data?.consignee_address,
            is_product_hazardous: hazardous,
            terminal_handling: terminalHandling,
            shipment_status: data?.shipment_status.value,
        }
        props.editBookingDetails(newData);
    };

    useEffect(() => {
        if (single_booking_details) {
            setTerminalHandling(single_booking_details?.terminal_handling);
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
                                / Confirm Export Booking & Customs Brokerage
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
                                Export Shipment & Custom Brokerage Terminal(CBT)
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
                                {/* origin port */}
                                <div className="mr-1 mt-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
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
                                        defaultValue={{ label: single_booking_details?.origin_port_code, value: single_booking_details?.origin_port_code }}
                                        icon=""
                                    />
                                </div>
                                {/* destination port */}
                                <div className="mr-1 mt-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        Destination Country<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"delivery_location"}
                                        id={"delivery_location"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={false}
                                        type={"text"}
                                        errors={errors}
                                        isDisabled={false}
                                        min={""}
                                        max={""}
                                        icon={""}
                                        defaultValue={single_booking_details?.delivery_location}
                                    />
                                </div>
                            </div>
                            {/* ********* grid column ******** */}
                            <div className="mt-3 grid grid-cols-4 mb-2 items-center">
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

                                {/* NEPC Number */}
                                <div className="mr-1">
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
                                </div>

                                {/* BL Number */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        {" "}
                                        B/L Number<span className="red-text">*</span>
                                    </p>
                                    <CustomInput
                                        control={control}
                                        name={"bl_number"}
                                        id={"bl_number"}
                                        label={""}
                                        placeholder={"B/L"}
                                        isRequired={true}
                                        type={"number"}
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

                                {/* consignee name */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Consignee Name<span className="red-text">*</span>
                                    </p>
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
                                        defaultValue={single_booking?.customs?.consignee_name}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>

                                {/* consignee address */}
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">
                                        Consignee Address<span className="red-text">*</span>
                                    </p>
                                    <NewCustomGoogleInput
                                        control={control}
                                        name={"consignee_address"}
                                        id={"consignee_address"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={single_booking?.customs?.consignee_address}
                                        icon=""
                                    />
                                    {/* {
                                        single_booking?.customs?.consignee_address === undefined ? (
                                            <>

                                                <NewCustomGoogleInput
                                                    control={control}
                                                    name={"consignee_address"}
                                                    id={"consignee_address"}
                                                    label={""}
                                                    placeholder={""}
                                                    isRequired={true}
                                                    errors={errors}
                                                    isDisabled={false}
                                                    defaultValue={""}
                                                    icon=""
                                                />
                                            </>
                                        ) : (
                                            <CustomInput
                                                control={control}
                                                name={"consignee_address"}
                                                id={"consignee_address"}
                                                label={""}
                                                placeholder={"Consignee Address"}
                                                isRequired={true}
                                                type={"text"}
                                                errors={errors}
                                                isDisabled={true}
                                                defaultValue={single_booking?.customs?.consignee_address}
                                                min={""}
                                                max={""}
                                                icon={""}
                                            />
                                        )
                                    } */}
                                </div>


                            </div>

                            {/* ********* grid column mobile ******** */}




                            {/* ********* grid column ******** */}

                            {/* ********* grid column ******** */}
                            <div className="mt-3 lg:grid lg:grid-cols-3 mb-2 items-center">
                                {" "}
                                {/* do you require terminal handling */}
                                <div className="mt-3">
                                    <p className="text-xs black-text font-medium mb-2">
                                        Is this a Hazadous Product ?
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
                                {" "}
                                {/* do you require terminal handling */}
                                <div className="mt-3">
                                    <p className="text-xs black-text font-medium mb-2">
                                        Do you require Terminal Handling ?
                                        <span className="red-text">*</span>
                                    </p>
                                    {/* <div className="grid grid-cols-3">
                                        <div className="">
                                            <CustomRadio
                                                selected={terminalHandling}
                                                label={"Yes"}
                                                onClick={() => setTerminalHandling(true)}
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <CustomRadio
                                                selected={!terminalHandling}
                                                label={"No"}
                                                onClick={() => setTerminalHandling(false)}
                                            />
                                        </div>
                                    </div> */}

                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            <CustomRadio
                                                // @ts-ignore
                                                // selected={hazardous}
                                                selected={terminalHandling === true ? true : false}
                                                label={"Yes"}
                                                onClick={() => setTerminalHandling(true)}
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <CustomRadio
                                                // selected={!hazardous}
                                                selected={terminalHandling === false ? true : false}
                                                label={"No"}
                                                onClick={() => setTerminalHandling(false)}
                                            />
                                        </div>
                                    </div>
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

// export default ExportCBTConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ExportCBTConfirmation);


