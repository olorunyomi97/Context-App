import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import NewCustomSelect from "components/selectInputs/NewCustomSelect";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import NewCustomRadio from "components/selectInputs/NewCustomRadio";
import CustomRadio from "components/selectInputs/CustomRadio";
import { useParams } from "react-router-dom";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import { getSingleBooking, editBookingDetails } from "store/actions";
const _Json = require("sea-ports");

function ImportHaulageConfirmation(props: any) {
    const params = useParams();
    const { handleSubmit, control, formState: { errors } } = useForm();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const [haulage, setHaulage] = useState(false);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [tracker, setTracker] = useState(false);
    const [escort, setEscort] = useState(false);
    const [hazardous, setHazardous] = useState(false);
    const [tbl, setTbl] = useState(false);
    const [showTbl, setShowTbl] = useState(false);
    const [tblType, setTblType] = useState('');
    const [customs, setCustoms] = useState(true);
    const [brokerageType, setBrokerageType] = useState('');

    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
    admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));


    useEffect(() => {
        const parsePorts = parseAllPorts(_Json.JSON);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
        mixpanel.track("Start new shipment", {
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
            shipment_type: "import",
            shipment_transport_type: "haulage",
            pickup_location: data?.pickup_location?.label,
            delivery_location: data?.delivery_location?.label,
            // origin_port_code: data?.origin_port?.value?.unlocs[0],
            // destination_port_code: data?.destination_port?.value?.unlocs[0],
            // port_of_discharge: data?.port_of_discharge?.label,
            // origin_port_code: data?.origin_port_code?.value?.unlocs ? data?.origin_port_code?.value?.unlocs[0] : data.origin_port_code.value,
            // delivery_location: data?.delivery_location?.value?.unlocs ? data?.delivery_location?.value?.unlocs[0] : data.delivery_location.value,
            customer_id: single_booking_details?.user_id,
            cargo_pickup_date: data?.cargo_pickup_date,
            branch: data?.branch?.value ? data?.branch?.value : data?.branch,
            container_size: data?.container_size?.value ? data?.container_size?.value : data.container_size.value,
            container_type: data?.container_type?.value ? data?.container_type?.value : data.container_type.value,
            container_count: data?.container_count,
            container_weight: data?.container_weight,
            goods_type: data?.goods_type,
            goods_value: data?.goods_value,
            bl_number: data?.bl_number,
            tdo_expiry: data?.tdo_expiry,
            tdo_written_date: data?.tdo_written_date,
            with_tracker: tracker,
            with_escort: escort,
            is_product_hazardous: hazardous,
            with_tbl: tbl,
            tbl_type: tblType,
            customs: customs,
            brokerage_type: brokerageType,
            additional_comments: data?.additional_comments,
            shipment_status: data?.shipment_status.value,
        };
        props.editBookingDetails(newData);
        console.log(JSON.stringify(newData))
    }

    useEffect(() => {
        if (single_booking_details) {
            setHazardous(single_booking_details?.is_product_hazardous);
            setEscort(single_booking_details?.with_escort);
            setTracker(single_booking_details?.with_tracker);
            setTbl(single_booking_details?.with_tbl);
            setTblType(single_booking_details?.tbl_type)
            setBrokerageType(single_booking_details?.brokerage_type)
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
                                / Confirm Import Booking & Haulage
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:px-10 mb-3">
                <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
                    <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                        <div className="lg:px-8 px-5">
                            <p className="add-shipment-text mb-5">Import Booking & Haulage</p>
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
                            <div className="mt-3 grid grid-cols-2 mb-2">
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">Port Of Discharge<span className="red-text">*</span></p>
                                    <CustomSelect
                                        control={control}
                                        name={"pickup_location"}
                                        id={"pickup_location"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={{ label: single_booking_details?.pickup_location, value: single_booking_details?.pickup_location }}
                                        options={defaultPortsOfOrigin}
                                        icon=""
                                    />
                                </div>

                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">Destination<span className="red-text">*</span></p>
                                    <CustomGoogleInput
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
                            </div>

                            <div className="grid grid-cols-2">
                                <div className="ml-1">
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

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">Total Value of Goods (₦)<span className="red-text">*</span></p>
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
                                    <p className="text-xs black-text font-medium">Size of Container<span className="red-text">*</span></p>
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
                                    <p className="text-xs black-text font-medium">Type of Container<span className="red-text">*</span></p>
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

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">Number Of Containers<span className="red-text">*</span></p>
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

                                <div className="ml-1">
                                    <p className="text-xs black-text font-medium">Weight of Goods (Metric Ton)<span className="red-text">*</span></p>
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
                                <div className="lg:grid lg:grid-cols-3 grid grid-cols-2">
                                    <div className="mt-1">
                                        <p className="text-xs black-text font-medium">B/L Number<small>(optional)</small></p>
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

                                <div className="grid grid-cols-2">
                                    <div className="mr-1">
                                        <p className="text-xs black-text font-medium">TDO Written Date<small>(Optional)</small></p>
                                        <CustomInput
                                            control={control}
                                            name={"tdo_written_date"}
                                            id={"tdo_written_date"}
                                            label={""}
                                            placeholder={"TDO Written Date"}
                                            isRequired={false}
                                            type={"date"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={
                                                single_booking_details?.tdo_written_date
                                                    ? single_booking_details?.tdo_written_date.slice(0, 10)
                                                    : ''
                                            }
                                            min={""}
                                            max={""}
                                            icon={""}
                                        />
                                    </div>

                                    <div className="mr-1">
                                        <p className="text-xs black-text font-medium">TDO Expiry Date<small>(Optional)</small></p>
                                        <CustomInput
                                            control={control}
                                            name={"tdo_expiry"}
                                            id={"tdo_expiry"}
                                            label={""}
                                            placeholder={"TDO Date"}
                                            isRequired={false}
                                            type={"date"}
                                            errors={errors}
                                            isDisabled={false}
                                            defaultValue={
                                                single_booking_details?.tdo_expiry
                                                    ? single_booking_details?.tdo_expiry.slice(0, 10)
                                                    : ''
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
                                        <p className="text-xs black-text font-medium mb-2">Is the Shipped Product Hazardous ?<span className="red-text">*</span></p>
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
                            </div>

                            <div className="lg:grid grid-cols-3">
                                <div className="mt-2">
                                    <p className="add-shipment-text py-3">Do you require TBL?</p>
                                    <div className="grid grid-cols-3">
                                        <div className="">
                                            <CustomRadio
                                                selected={tbl === true ? true : false}
                                                label={"Yes"}
                                                onClick={() => {
                                                    setTbl(true);
                                                    setShowTbl(!showTbl);
                                                    setBrokerageType('Transire');
                                                    setCustoms(true);
                                                }}
                                            />
                                        </div>

                                        <div className="ml-2">
                                            <CustomRadio
                                                selected={tbl === false ? true : false}
                                                label={"No"}
                                                onClick={() => {
                                                    setTbl(false);
                                                    setShowTbl(false);
                                                    setCustoms(false);
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {tbl && (
                                        <>
                                            <div className="grid grid-cols-1">
                                                <div>
                                                    <>
                                                        <div className="py-2">
                                                            <div className="bg-light-yellow p-4 rounded-md mb-7" style={{ background: " #fef3c7" }}>
                                                                <p className="black-text text-sm font-semibold mb-2">Disclaimer</p>
                                                                <p className="black-text text-xs">If TBL is selected, CBT/Transire is automatically Selected and disabled.</p>
                                                            </div>
                                                            {/* CBT/TRANSIRE BY DEFAULT */}
                                                            <div className="mb-3">
                                                                <div className="mr-3 mb-2">
                                                                    <NewCustomCheckbox
                                                                        name=""
                                                                        id=""
                                                                        label="Customs Brokerage & Terminal"
                                                                        isRequired={false}
                                                                        isDisabled={true}
                                                                        onChange={''}
                                                                        defaultChecked={true}
                                                                        onClick={() => {
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="grid grid-cols-2 mt-3 mb-5">
                                                                    <NewCustomRadio
                                                                        selected={brokerageType === 'Transire' ? true : false}
                                                                        label={"Transire CBT"}
                                                                        icon={''}
                                                                        isDisabled={true}
                                                                        onClick={() => {
                                                                            // setBrokerageType('Transire')
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            {/* CBT/TRANSIRE BY DEFAULT */}

                                                            {/* TBL TYPE */}
                                                            <p className="text-sm quote-text mb-2">Select TBL Type</p>
                                                            <div className="grid grid-cols-2">
                                                                <div className="">
                                                                    <CustomRadio
                                                                        selected={tblType === "Normal" ? true : false}
                                                                        label={"Normal"}
                                                                        onClick={() => setTblType("Normal")}
                                                                    />
                                                                </div>

                                                                <div className="ml-2">
                                                                    <CustomRadio
                                                                        selected={tblType === "Triangulation" ? true : false}
                                                                        label={"Triangulation"}
                                                                        onClick={() => setTblType("Triangulation")}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                </div>
                                            </div>
                                        </>
                                    )}
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
                            <div className="w-22"></div>
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

// export default ImportHaulageConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ImportHaulageConfirmation);


