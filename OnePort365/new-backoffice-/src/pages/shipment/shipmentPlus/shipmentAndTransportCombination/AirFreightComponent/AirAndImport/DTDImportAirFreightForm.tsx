import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import NewCustomGoogleInput from "components/textInputs/NewCustomGoogleInput";
import { createShipment } from "store/actions";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomPhoneInput from "components/textInputs/CustomPhoneInput";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
const _Json = require("sea-ports");


function DTDImportAirFreightForm(props: any) {
    const { loading, shipmentType, } = props;
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [insurance, setInsurance] = useState(false);
    const [warehousing, setWarehousing] = useState(false);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([])
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [hazardous, setHazardous] = useState(false);

    let admin_data = useSelector((state: any) => state.auth.admin_data);
    // @ts-ignore
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
        console.log(data.customer_id)
        const newData = {
            shipment_type: 'import',
            shipment_transport_type: 'air_freight',
            air_freight_type: 'door to door',
            // air_freight: true,
            // with_haulage: true,
            customer_id: data.customer_id.value,
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
            branch: data?.branch.value,
            warehousing,
            marine_insurance: insurance,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments,
            sender_name: data?.sender_name,
            sender_phone: data?.sender_phone?.phone,
        };
        props.createShipment(newData);
        console.log(newData);
    }

    return (
        <div className='lg:px-10 py-10 mb-3'>
            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                    <div className="lg:px-8 px-5">
                        <p className='add-shipment-text mb-5'>Import Shipment & Air Freight(Door To Door)</p>
                        <div className="grid grid-cols-1">
                            <div className="bg-light-yellow p-4 rounded-md mb-7" style={{ background: " #fef3c7" }}>
                                <p className="black-text text-sm font-semibold mb-2">Note</p>
                                <p className="black-text text-xs">This Service includes CB & Local Logistics.</p>
                            </div>
                            <div className="mr-1">
                                <p className="text-xs mb-2 font-medium">Customer Name<span className="red-text">*</span>
                                    <Link
                                        to="/customers/customer-creation"
                                    >
                                        <small>if customer is not registered</small><small className="green-text">(Create Customer)</small>
                                    </Link>
                                </p>
                                <CustomerAutocomplete
                                    control={control}
                                    name={"customer_id"}
                                    id={"customer_id"}
                                    label={"Customer Selection"}
                                    placeholder={"Select Company & Customer Name"}
                                    isRequired={true}
                                    errors={errors}
                                    isDisabled={false}
                                    icon=""
                                />
                            </div>

                            <div className="mt-3 grid grid-cols-3 mb-2">
                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium">Pick Up Location(Door 1)<span className="red-text">*</span></p>
                                    <NewCustomGoogleInput
                                        control={control}
                                        name={"pickup_location"}
                                        id={"pickup_location"}
                                        label={""}
                                        placeholder={""}
                                        isRequired={true}
                                        errors={errors}
                                        isDisabled={false}
                                        defaultValue={''}
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
                                        defaultValue={""}
                                        min={""}
                                        max={""}
                                        icon={""}
                                    />
                                </div>


                                <div className="mr-1">
                                    <p className="text-xs black-text font-medium"> Airline<span className="red-text">*</span></p>
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
                                        defaultValue={""}
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
                                    defaultValue={""}
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
                                    defaultValue={''}
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
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                            </div>

                        </div>

                        <div className="grid grid-cols-2">
                            <div className="mr-1">
                                <p className="text-xs black-text font-medium">Sender's Name<span className="red-text">*</span></p>
                                <CustomInput
                                    control={control}
                                    name={"sender_name"}
                                    id={"sender_name"}
                                    label={""}
                                    placeholder={"Sender's Name"}
                                    isRequired={true}
                                    type={"text"}
                                    errors={errors}
                                    isDisabled={false}
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                            </div>

                            <div className="mr-1">
                                <p className="text-xs black-text font-medium">Sender's Phone<span className="red-text">*</span></p>
                                <CustomPhoneInput
                                    control={control}
                                    name={"sender_phone"}
                                    id={"sender_phone"}
                                    label={""}
                                    isRequired={true}
                                    defaultValue={""}
                                    placeholder={"Enter your phone number"}
                                    isDisabled={false}
                                    errors={errors}
                                />
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
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                    defaultValue={""}
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
                                    defaultValue={''}
                                    min={1}
                                    max={""}
                                    icon=""
                                />
                            </div>

                            <div className="ml-1">
                                <p className="text-xs black-text font-medium">Office / Branch<span className="red-text">*</span></p>
                                <CustomSelect
                                    control={control}
                                    name={`branch`}
                                    id={`branch`}
                                    label={""}
                                    placeholder={`Office / Branch`}
                                    isRequired={true}
                                    errors={errors}
                                    isDisabled={false}
                                    options={[
                                        { label: "Lagos", value: "LOS" },
                                        { label: "Kano", value: "KAN" },
                                        { label: "Port Harcourt", value: "PHC" },
                                    ]}
                                    defaultValue={''}
                                    icon=""
                                />
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
                                    defaultValue={""}
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
                                        defaultValue={""}
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
                                // onClick={loading}
                                loading={loading}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

// export default ExportAirFreightForm

const mapStateToProps = (state: any) => {
    const { error, loading } = state.shipmentsPlus;
    return { error, loading };
};
export default connect(mapStateToProps, { createShipment })(DTDImportAirFreightForm);


