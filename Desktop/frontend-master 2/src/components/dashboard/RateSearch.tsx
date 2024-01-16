import React from 'react';

//icons
import transit from "assets/dock/greenarrow-right.svg";

//components
import Button from 'components/dock/Button';
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButtons from 'components/buttons/PrimaryButtons';
import CustomGoogleInput from 'components/textInputs/CustomGoogleInput';
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';

//helpers
import { getCurrentTimestamp } from 'helpers';

interface RateSearchProps {
    control: any;
    errors: any;
    allPorts?: any;
    allowedPorts?: any;
    originPort?: any;
    setOriginPort?: any;
    defaultPortsOfOrigin: any;
    defaultPortsOfDestination: any;
    loading?: boolean;
    heroCategory?: string;
    haulageCategory?: string;
}

const RateSearch = ({ control, errors, allPorts, originPort, defaultPortsOfOrigin, defaultPortsOfDestination, setOriginPort, loading, heroCategory, haulageCategory, allowedPorts }: RateSearchProps) => {
    const options = [
        { label: "20FT Dry", value: "20FT | dry" },
        { label: "40FT Dry", value: "40FT | dry" },
        { label: "40HC FT Dry", value: "40HC FT | dry" },
        { label: "20FT Reefer", value: "20FT | reefer" },
        { label: "40FT Reefer", value: "40FT | reefer" },
        { label: "40HC FT Reefer", value: "40HC FT | reefer" },
    ]

    const confirmOptions = [
        { label: "Import", value: "import" },
        { label: "Export", value: "export" },
      ]

    return (
        <div>
            <div className="flex flex-col gap-y-4 md:space-gap-0 lg:flex-row lg:items-center md:gap-x-6">
                {heroCategory === "custom_brokerage" && <div className="flex-1">
                    <CustomDefaultSelect
                        control={control}
                        name={`shipment_type`}
                        id={`shipment_type`}
                        label={"Shipment Type"}
                        placeholder={""}
                        isRequired={true}
                        errors={errors}
                        isDisabled={false}
                        options={confirmOptions}
                        defaultValue={""}
                        icon=""
                    />
                </div>}
                <div className="flex-1">
                    <CustomDefaultSelect
                        control={control}
                        name={"origin_port"}
                        id={"origin_port"}
                        label={heroCategory === "ocean_freight" ? "Port of Loading" : heroCategory === "custom_brokerage" ? 'Port Name' : haulageCategory === "porttodoor" ? 'Origin Port' : 'Destination Port' }
                        placeholder={""}
                        isRequired={true}
                        errors={errors}
                        isDisabled={false}
                        options={heroCategory === "ocean_freight" ? allPorts : allowedPorts}
                        defaultValue={""}
                        icon=""
                        searchable={true}
                        customOnChange={setOriginPort}
                    />
                </div>
                {heroCategory !== "custom_brokerage" && <div className={`md:mt-3.5 flex items-center justify-center md:flex-none ${heroCategory === 'haulage' && haulageCategory === 'doortoport' ? 'order-[-1]' : ''}`}>
                    <img
                        src={transit}
                        alt="transit"
                        className="rotate-90 lg:rotate-0"
                    />
                </div>}
                {heroCategory === 'ocean_freight' && <div className="flex-1">
                    <CustomDefaultSelect
                        control={control}
                        name={"destination_port"}
                        id={"destination_port"}
                        label={"Port of Destination"}
                        placeholder={""}
                        isRequired={true}
                        errors={errors}
                        isDisabled={originPort.label === undefined ? true : false}
                        defaultValue={""}
                        options={defaultPortsOfDestination}
                        icon=""
                        searchable={true}
                    />
                </div>}
                {heroCategory === 'haulage' && <div className={`${heroCategory === 'haulage' && haulageCategory === 'doortoport' ? 'order-[-2]' : ''} flex-1`}>
                    <CustomGoogleInput
                        icon=""
                        control={control}
                        name={"location"}
                        id={"location"}
                        label={haulageCategory === 'porttodoor' ? 'Drop off Location' : "Stuffing Location"}
                        placeholder={haulageCategory === 'porttodoor' ? "Input Pick up Location" : "Input Stuffing Location" }
                        isRequired={true}
                        errors={errors}
                        isDisabled={false}
                        // defaultValue={shipment_data?.pickup_location}
                        defaultValue={''}
                        allowWorldWide={false}
                        isBorderTransparent={true}
                    />
                </div>}          
                {heroCategory === 'ocean_freight' &&  <div className="flex-1">
                    <CustomInput
                        control={control}
                        name={"cargo_ready_date"}
                        id={"cargo_ready_date"}
                        label={"Cargo Ready Date"}
                        placeholder={"Enter pickup date"}
                        isRequired={true}
                        type={"date"}
                        errors={errors}
                        isDisabled={false}
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        // @ts-ignore
                        min={getCurrentTimestamp(0)}
                        //   @ts-ignore
                        max={""}
                        icon={""}
                    />
                </div>}
                <div className="flex-1">
                    <CustomDefaultSelect
                        control={control}
                        name={`container_size`}
                        id={`container_size`}
                        label={"Container Size & Type"}
                        placeholder={""}
                        isRequired={true}
                        errors={errors}
                        isDisabled={false}
                        options={options}
                        defaultValue={""}
                        icon=""
                    />
                </div>
                {heroCategory === 'custom_brokerage' && <CustomInput
                    control={control}
                    name={`commodity_type`}
                    id={`commodity_type`}
                    label={"Commodity Type"}
                    placeholder={"e.g Grains"}
                    isRequired={true}
                    type={"text"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                />}
                {heroCategory === 'haulage' && <div className="flex-1">
                <CustomInput
                    control={control}
                    name={`container_weight`}
                    id={`container_weight`}
                    label={"Container Weight (Tons)"}
                    placeholder={""}
                    isRequired={true}
                    type={"number"}
                    errors={errors}
                    isDisabled={false}
                    defaultValue={""}
                    min={""}
                    max={""}
                    icon=""
                />
                </div>}
                <div className="mt-4">
                    <Button
                        title="Proceed"
                        // onClick={() => navigate("/freight-rates")}
                        disabled={false}
                        loading={loading}
                        icon={""}
                        style={{ height: "50px" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default RateSearch