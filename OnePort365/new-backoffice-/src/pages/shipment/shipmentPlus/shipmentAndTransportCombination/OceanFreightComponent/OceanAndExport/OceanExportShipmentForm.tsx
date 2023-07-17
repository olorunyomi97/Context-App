import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import CustomInput from "components/textInputs/CustomInput";
import CustomSelect from "components/selectInputs/CustomSelect";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import NewCustomCheckbox from "components/checkBox/NewCustomCheckbox";
import CustomCurrencyInput from "components/textInputs/CustomCurrencyInput";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomerAutocomplete from "components/customerAutocomplete/customerAutocomplete";
import CustomTextarea from "components/textInputs/CustomTextarea";
import CustomGoogleInput from "components/textInputs/CustomGoogleInput";
import { createShipment } from "store/actions";
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";
import { useSelector } from "react-redux";
const _Json = require("sea-ports");

const OceanExportShipment = (props: any) => {
    const { loading, nextStep, previousStep } = props;
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [customs, setCustoms] = useState(false);
    const [marine_insurance, setInsurance] = useState(false);
    const [warehousing, setWarehousing] = useState(false);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [haulage, setHaulage] = useState('')
    const [showExportHaulage, setShowExportHaulage] = useState(false);
    const [tracker, setTracker] = useState(false);
    const [escort, setEscort] = useState(false);
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

        const newData = {
            shipment_type: 'export',
            shipment_transport_type: 'ocean_freight',
            customs,
            warehousing,
            marine_insurance,
            with_haulage: haulage,
            pickup_location: data?.pickup_location?.label,
            origin_port_code: data?.origin_port?.value?.unlocs[0],
            destination_port_code: data?.destination_port?.value?.unlocs[0],
            dropoff_location_port: data?.origin_port?.value?.unlocs[0],
            customer_id: data.customer_id.value,
            cargo_pickup_date: data?.cargo_pickup_date,
            branch: data?.branch.value,
            container_size: data?.container_size.value,
            container_type: data?.container_type.value,
            container_count: data?.container_count,
            container_weight: data?.container_weight,
            goods_value: data?.goods_value,
            goods_type: data?.goods_type,
            bl_number: data?.bl_number,
            tdo_date: data?.tdo_date,
            tdo_expiry: data?.tdo_expiry,
            with_tracker: tracker,
            with_escort: escort,
            is_product_hazardous: hazardous,
            additional_comments: data?.additional_comments
        };
        props.createShipment(newData);
        console.log(newData)
    }

    return (
        <div className='lg:px-10 py-10 mb-3'>
            <form onSubmit={handleSubmit(onSubmit)} className="my-5">
                <div className="lg:px-8 px-5">
                    <p className='add-shipment-text mb-5'>Export Shipment & Ocean Freight</p>
                    <div className="grid grid-cols-1 mb-3">
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
                                placeholder={"Customer Name"}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                icon=""
                            />
                        </div>

                    </div>
                    <div className="mt-3 grid grid-cols-2 mb-2">
                        <div className="mr-1">
                            <p className="text-xs black-text font-medium"> Origin Port<span className="red-text">*</span></p>
                            <CustomSelect
                                control={control}
                                name={"origin_port"}
                                id={"origin_port"}
                                label={""}
                                placeholder={""}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                options={defaultPortsOfOrigin}
                                defaultValue={''}
                                icon=""
                            />
                        </div>

                        <div className="mr-1">
                            <p className="text-xs black-text font-medium"> Destination Port<span className="red-text">*</span></p>
                            <CustomSelect
                                control={control}
                                name={"destination_port"}
                                id={"destination_port"}
                                label={""}
                                placeholder={""}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={''}
                                options={defaultPortsOfDestination}
                                icon=""
                            />
                        </div>
                    </div>



                    <div className="grid grid-cols-2">
                        <div className="mr-1">
                            <p className="text-xs black-text font-medium"> Pickup Date<span className="red-text">*</span></p>
                            <CustomInput
                                control={control}
                                name={"cargo_pickup_date"}
                                id={"cargo_pickup_date"}
                                label={""}
                                placeholder={"Cargo Pickup Date"}
                                isRequired={true}
                                type={"date"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={""}
                                min={""}
                                max={""}
                                icon={""}
                            />
                        </div>

                        <div className="ml-1">
                            <p className="text-xs black-text font-medium">Total Value of Goods(₦)<span className="red-text">*</span></p>
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
                    </div>

                    <div className="mt-3 grid grid-cols-4 desktop-only">
                        <div>
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
                                defaultValue={''}
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
                                placeholder={"Type"}
                                isRequired={true}
                                errors={errors}
                                isDisabled={false}
                                options={[
                                    { label: "Dry", value: "dry" },
                                    { label: "Reefer", value: "reefer" },
                                ]}
                                defaultValue={''}
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
                                placeholder={"Number"}
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
                                defaultValue={""}
                                min={""}
                                max={""}
                                icon={""}
                            />
                        </div>

                    </div>

                    {/* Mobile Form */}
                    <div className="mb-3 grid grid-cols-2 mobile-device-only">
                        <div className="mr-1">
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
                                defaultValue={''}
                                icon=""
                            />
                        </div>

                        <div className="mr-1">
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
                                defaultValue={''}
                                icon=""
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 mobile-device-only">
                        <div className="mr-1">
                            <p className="text-xs black-text font-medium">Number Of Containers<span className="red-text">*</span></p>
                            <CustomInput
                                control={control}
                                name={"container_count"}
                                id={"container_count"}
                                label={""}
                                placeholder={"Number Of Containers"}
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
                            <p className="text-xs black-text font-medium">Weight of Goods (Metric Ton)<span className="red-text">*</span></p>
                            <CustomInput
                                control={control}
                                name={"container_weight"}
                                id={"container_weight"}
                                label={""}
                                placeholder={"Weight"}
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

                    <div className="grid grid-cols-2 mobile-device-only">
                        <div className="ml-1">
                            <p className="text-xs black-text font-medium">B/L Number<small>(optional)</small></p>
                            <CustomInput
                                control={control}
                                name={"bl_number"}
                                id={"bl_number"}
                                label={""}
                                placeholder={"B/L"}
                                isRequired={false}
                                type={"text"}
                                errors={errors}
                                isDisabled={false}
                                defaultValue={""}
                                min={""}
                                max={""}
                                icon={""}
                            />
                        </div>

                        <div className="ml-1">
                            <p className="text-xs black-text font-medium">Office / Branch<span className="red-text">*</span></p>
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
                                defaultValue={''}
                                icon=""
                            />
                        </div>



                    </div>
                    {/* Mobile Form */}

                    <div className="mt-2">
                        <div className="grid lg:grid-cols-3">
                            <div className="mr-1">
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


                            <div className="desktop-only">
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
                                    defaultValue={""}
                                    min={""}
                                    max={""}
                                    icon={""}
                                />
                            </div>


                            <div className="ml-1 desktop-only">
                                <p className="text-xs black-text font-medium">Office / Branch<span className="red-text">*</span></p>
                                <CustomSelect
                                    control={control}
                                    name={`branch`}
                                    id={`branch`}
                                    label={""}
                                    placeholder={`Branch`}
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
                        </div>
                    </div>

                    <div className="mt-5">
                        <p className="text-xs black-text mb-2 font-medium">Additional Services Provided <small>(Select all that apply)</small></p>
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

                                <div className="mr-3">
                                    <CustomCheckBox
                                        name="marine_insurance"
                                        id="marine_insurance"
                                        label="Marine Insurance"
                                        isRequired={false}
                                        isDisabled={false}
                                        onChange={(e: any) => setInsurance(e.target.checked)}
                                        defaultChecked={false}
                                    />
                                </div>

                                <div className="mr-3">
                                    <CustomCheckBox
                                        name="warehousing"
                                        id="warehousing"
                                        label="Warehousing"
                                        isRequired={false}
                                        isDisabled={false}
                                        onChange={(e: any) => setWarehousing(e.target.checked)}
                                        defaultChecked={false}
                                    />
                                </div>


                            </div>


                        </div>
                    </div>

                </div>
                <div className="lg:px-8 px-5 mb-5">
                    <div>
                        <p className='add-shipment-text py-1'>Add Haulage to this Shipment?</p>
                        <div>
                            <div className="grid grid-cols-3 mt-2">
                                <div className="mr-3">
                                    <NewCustomCheckbox
                                        name="haulage"
                                        id="haulage"
                                        label="Haulage"
                                        isRequired={false}
                                        isDisabled={false}
                                        onChange={(e: any) => setHaulage(e.target.checked)}
                                        defaultChecked={false}
                                        onClick={() => {
                                            setShowExportHaulage(!showExportHaulage);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    showExportHaulage ? (
                        <>
                            <div className="lg:px-8 px-5">
                                {/* <p className='add-shipment-text mb-5'>Ocean Freight & Export Shipment with Haulage</p> */}
                                <div className="grid grid-cols-1 mb-3">
                                    <div className="mt-3 grid grid-cols-3 mb-2">
                                        <div className="mr-1">
                                            <p className="text-xs black-text font-medium"> Pickup location <span className="red-text">*</span></p>
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
                                        </div>

                                        <div className="mr-1">
                                            <p className="text-xs black-text font-medium">Drop Off Location<span className="red-text">*</span></p>
                                            <CustomSelect
                                                control={control}
                                                name={"origin_port"}
                                                id={"origin_port"}
                                                label={""}
                                                placeholder={""}
                                                isRequired={true}
                                                errors={errors}
                                                isDisabled={false}
                                                options={defaultPortsOfOrigin}
                                                defaultValue={''}
                                                icon=""
                                            />
                                        </div>

                                        <div className="mr-1">
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


                                </div>
                                <div className="lg:grid grid-cols-3">
                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">Do you require an Haulage Tracker ?<span className="red-text">*</span></p>
                                        <div className="grid grid-cols-3">
                                            <div className="">
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
                                            </div>


                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">Do you require an Haulage Escort ?<span className="red-text">*</span></p>
                                        <div className="grid grid-cols-3">
                                            <div className="">
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
                                            </div>


                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <p className="text-xs black-text font-medium mb-2">Is the Shipped Product Hazardous ?<span className="red-text">*</span></p>
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
                    )
                }
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
                                defaultValue={""}
                                icon=""
                            />
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
        </div>
    )
}

// export default TransportationType

const mapStateToProps = (state: any) => {
    const { error, loading } = state.shipmentsPlus;
    return { error, loading };
};
export default connect(mapStateToProps, { createShipment })(OceanExportShipment);
