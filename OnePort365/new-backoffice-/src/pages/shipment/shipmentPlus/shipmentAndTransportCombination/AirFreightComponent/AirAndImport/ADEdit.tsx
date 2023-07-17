import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import { getSingleShipment, editAirShipmentDetails } from "store/actions";
import CustomTextarea from "components/textInputs/CustomTextarea";
const _Json = require("sea-ports");


function ADImportEdit(props: any) {
    const params = useParams();
    const { loading, shipmentType, single_shipment } = props;
    console.log(single_shipment);
    const { handleSubmit, control, formState: { errors }, } = useForm();
    const [openAside, SetOpenAside] = useState(false);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [hazardous, setHazardous] = useState(false);
    const [insurance, setInsurance] = useState(false);
    const [warehousing, setWarehousing] = useState(false);

    const single_shipment_data = single_shipment?.data?.data?.shipment_data;
    console.log(single_shipment_data);

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
        // props.getSingleShipment(params.id);
        props.getSingleShipment(params.id, `format_containers=${true}`);
    }, []);

    useEffect(() => {
        if (single_shipment_data) {
            setHazardous(single_shipment_data?.is_product_hazardous);
        }
    }, [single_shipment_data]);

    const onSubmit = (data: any) => {
        console.log(data.customer_id);
        const newData = {
            id: params.id,
            shipment_type: "import",
            shipment_transport_type: "air_freight",
            air_freight_type: "airport_delivery",
            customer_id: data.customer_id.value,
            origin_port_code: data?.origin_port_code,
            destination_port_code: data?.destination_port_code,
            airline: data?.airline,
            container_height: data?.container_height,
            container_width: data?.container_width,
            container_weight: data?.container_weight,
            container_count: data?.container_count,
            cargo_pickup_date: data?.cargo_pickup_date,
            goods_value: data?.goods_value,
            branch: data?.branch.value,
            goods_type: data?.goods_type,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments,
            warehousing,
            marine_insurance: insurance,
        };
        props.editAirShipmentDetails(newData);
        console.log(newData);
    };

    return (
        <div className="flex">
            <Aside
                activeTab="Shipment"
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
            <div className="dashboard-content">
                <TopBar title={"Shipment"} SetOpenAside={SetOpenAside} />
                {loading ? (
                    <div className="text-center my-3 ml-5">
                        <Link to="#" className="text-success">
                            {/* @ts-ignore */}
                            <PrimaryButton
                                title="Loading Shipment Details"
                                loading={loading}
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        <div className="">
                            <div>
                                <div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
                                    <div className="mt-2">
                                        <p className="font-semibold text-lg">
                                            Job Number :{single_shipment_data?.job_number}
                                        </p>
                                    </div>
                                    <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                                        <small>Shipments </small>
                                        <small style={{ color: "grey" }}>
                                            {" "}
                                            / Edit Import Shipment & Air Freight
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:px-10 py-10 mb-3">
                            <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
                                <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                                    <div className="lg:px-8 px-5">
                                        <p className="add-shipment-text mb-5">
                                            Import Shipment & Air Freight (Airport Delivery)
                                        </p>
                                        <div className="grid grid-cols-1">
                                            <div className="mr-1">
                                                <p className="text-xs black-text mb-2 font-medium">
                                                    Customer Name<span className="red-text">*</span>
                                                </p>
                                                <CustomInput
                                                    control={control}
                                                    name={"customer_id"}
                                                    id={"customer_id"}
                                                    label={""}
                                                    placeholder={"Select Company & Customer Name"}
                                                    isRequired={false}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    // defaultValue={single_shipment_data.client_name}
                                                    defaultValue={`${single_shipment_data?.customer_details[0]?.firstname} ${single_shipment_data?.customer_details[0]?.lastname}`}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="mt-3 grid grid-cols-3 mb-2">
                                                <div className="mr-1">
                                                    <p className="text-xs black-text font-medium">
                                                        Origin Airport<span className="red-text">*</span>
                                                    </p>
                                                    <CustomInput
                                                        control={control}
                                                        name={"origin_port_code"}
                                                        id={"origin_port_code"}
                                                        label={""}
                                                        placeholder={"Delivery Location"}
                                                        isRequired={true}
                                                        type={"text"}
                                                        errors={errors}
                                                        isDisabled={true}
                                                        defaultValue={single_shipment_data?.origin_port_code}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />
                                                </div>

                                                <div className="mr-1">
                                                    <p className="text-xs black-text font-medium">
                                                        {" "}
                                                        Destination Airport
                                                        <span className="red-text">*</span>
                                                    </p>
                                                    <CustomInput
                                                        control={control}
                                                        name={"destination_port_code"}
                                                        id={"destination_port_code"}
                                                        label={""}
                                                        placeholder={"Final Destination"}
                                                        isRequired={true}
                                                        type={"text"}
                                                        errors={errors}
                                                        isDisabled={true}
                                                        defaultValue={single_shipment_data?.destination_port_code}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />
                                                </div>



                                                <div className="mr-1">
                                                    <p className="text-xs black-text font-medium">
                                                        {" "}
                                                        Airline<span className="red-text">*</span>
                                                    </p>
                                                    <CustomInput
                                                        control={control}
                                                        name={"airline"}
                                                        id={"airline"}
                                                        label={""}
                                                        placeholder={"Airline"}
                                                        isRequired={true}
                                                        type={"text"}
                                                        errors={errors}
                                                        isDisabled={true}
                                                        defaultValue={single_shipment_data?.airline}
                                                        min={""}
                                                        max={""}
                                                        icon={""}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* <p className="text-xs black-text font-medium">Number of Cargoes</p>
                                        <div className="solid-br p-3 mb-3">
                                            {
                                                single_shipment_data?.container_details?.map((data: any) => {
                                                    return (
                                                        <>
                                                            <div className="grid grid-cols-3">
                                                                <div className="ml-1">
                                                                    <p className="text-xs black-text font-medium">
                                                                        Height of Cargo(inches)
                                                                        <span className="red-text">*</span>
                                                                    </p>
                                                                    <CustomInput
                                                                        control={control}
                                                                        name={"container_height"}
                                                                        id={"container_height"}
                                                                        label={""}
                                                                        placeholder={"Height of Cargo"}
                                                                        isRequired={true}
                                                                        type={"number"}
                                                                        errors={errors}
                                                                        isDisabled={true}
                                                                        defaultValue={data?.container_height}
                                                                        min={""}
                                                                        max={""}
                                                                        icon={""}
                                                                    />
                                                                </div>

                                                                <div className="ml-1">
                                                                    <p className="text-xs black-text font-medium">
                                                                        Width of Cargo(inches)
                                                                        <span className="red-text">*</span>
                                                                    </p>
                                                                    <CustomInput
                                                                        control={control}
                                                                        name={"container_width"}
                                                                        id={"container_width"}
                                                                        label={""}
                                                                        placeholder={"Width of Cargo"}
                                                                        isRequired={true}
                                                                        type={"number"}
                                                                        errors={errors}
                                                                        isDisabled={true}
                                                                        defaultValue={data?.container_width}
                                                                        min={""}
                                                                        max={""}
                                                                        icon={""}
                                                                    />
                                                                </div>

                                                                <div className="ml-1">
                                                                    <p className="text-xs black-text font-medium">
                                                                        Weight of Cargo(KG)<span className="red-text">*</span>
                                                                    </p>
                                                                    <CustomInput
                                                                        control={control}
                                                                        name={"container_weight"}
                                                                        id={"container_weight"}
                                                                        label={""}
                                                                        placeholder={"Weight of Cargo"}
                                                                        isRequired={true}
                                                                        type={"number"}
                                                                        errors={errors}
                                                                        isDisabled={true}
                                                                        defaultValue={data?.container_weight}
                                                                        min={""}
                                                                        max={""}
                                                                        icon={""}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            }
                                        </div> */}
                                        <div className="mt-3 grid grid-cols-4">
                                            <div className="">
                                                <p className="text-xs black-text font-medium">
                                                    Height of Cargo(inches)<span className="red-text">*</span>
                                                </p>
                                                <CustomInput
                                                    control={control}
                                                    name={"container_height"}
                                                    id={"container_height"}
                                                    label={""}
                                                    placeholder={""}
                                                    isRequired={true}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    defaultValue={single_shipment_data?.container_details[0]?.container_height}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="ml-1">
                                                <p className="text-xs black-text font-medium">
                                                    Width of Cargo(inches)
                                                    <span className="red-text">*</span>
                                                </p>
                                                <CustomInput
                                                    control={control}
                                                    name={"container_width"}
                                                    id={"container_width"}
                                                    label={""}
                                                    placeholder={"Width of Cargo"}
                                                    isRequired={true}
                                                    type={"number"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    defaultValue={single_shipment_data?.container_details[0]?.container_width}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="ml-1">
                                                <p className="text-xs black-text font-medium">
                                                    Weight of Cargo(KG)<span className="red-text">*</span>
                                                </p>
                                                <CustomInput
                                                    control={control}
                                                    name={"container_weight"}
                                                    id={"container_weight"}
                                                    label={""}
                                                    placeholder={"Weight of Cargo"}
                                                    isRequired={true}
                                                    type={"number"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    defaultValue={single_shipment_data?.container_details[0]?.container_weight}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                            <div className="ml-1">
                                                <p className="text-xs black-text font-medium">
                                                    Number of Containers (Metric Ton)
                                                    <span className="red-text">*</span>
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
                                                    defaultValue={single_shipment_data?.container_details[0]?.container_count?.toString()}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-3 grid grid-cols-4">

                                            <div className="m-1 mt-1">
                                                <p className="text-xs black-text font-medium">Pick up Date</p>
                                                <CustomInput
                                                    control={control}
                                                    name={"cargo_pickup_date"}
                                                    id={"cargo_pickup_date"}
                                                    label={""}
                                                    placeholder={"Cargo Pickup Date"}
                                                    isRequired={false}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    defaultValue={single_shipment_data?.cargo_pickup_date ? single_shipment_data?.cargo_pickup_date.slice(0, 10) : new Date().toISOString().slice(0, 10)}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="ml-1 mt-1">
                                                <p className="text-xs black-text font-medium">
                                                    Total value of Goods (₦)
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
                                                    defaultValue={single_shipment_data?.goods_value}
                                                    min={1}
                                                    max={""}
                                                    icon=""
                                                />
                                            </div>

                                            <div className="ml-1 mt-1">
                                                <p className="text-xs black-text font-medium">
                                                    Office / Branch<span className="red-text">*</span>
                                                </p>
                                                <CustomInput
                                                    control={control}
                                                    name={"branch"}
                                                    id={"branch"}
                                                    label={""}
                                                    placeholder={""}
                                                    isRequired={false}
                                                    type={"text"}
                                                    errors={errors}
                                                    isDisabled={true}
                                                    defaultValue={single_shipment_data?.branch}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>

                                            <div className="ml-1 mt-1">
                                                <p className="text-xs black-text font-medium">
                                                    Commodity Description
                                                    <span className="red-text">*</span>
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
                                                    defaultValue={single_shipment_data?.goods_type}
                                                    min={""}
                                                    max={""}
                                                    icon={""}
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="mt-5">
                                                <div className="grid grid-cols-3">
                                                    <div className="mt-3">
                                                        <p className="text-xs black-text font-medium mb-2">
                                                            Is this Product Hazardous ?
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

                                        </div>
                                    </div>

                                    <div className="lg:px-8 px-5 mb-5">
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
                                                    defaultValue={single_shipment_data?.additional_comments}
                                                    icon=""
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 mt-10 items-center">
                                        <div className="w-22">
                                        </div>
                                        <div></div>
                                        <div
                                            className="w-22 mr-10"
                                            style={{ justifyContent: "center" }}
                                        >
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
                )}
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => {
    const { single_shipment, error, loading } = state.shipments;
    return { single_shipment, error, loading };
};
export default connect(mapStateToProps, { getSingleShipment, editAirShipmentDetails })(ADImportEdit);