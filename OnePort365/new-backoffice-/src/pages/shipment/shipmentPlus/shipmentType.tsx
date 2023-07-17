import { useState } from "react";
import { useForm } from "react-hook-form";
import NewCustomRadio from "components/selectInputs/NewCustomRadio";
import { Link } from "react-router-dom";
import PrimaryButton from "components/buttons/PrimaryButton";

const ShipmentType = (props: any) => {
    const { loading, nextStep, shipmentType, setShipmentType, transportationType, setTransportationType, airFreightType, setAirFreightType } = props;
    const [openAside, SetOpenAside] = useState(false);
    const { handleSubmit, control, formState: { errors } } = useForm();
    const [showNext, setShowNext] = useState(false);
    const [showAirfreightType, setShowAirFreightType] = useState(false)
    // const [shipmentType, setShipmentType] = useState('');
    // const [transportationType, setTransportationType] = useState('');
    // const [haulage, setHaulage] = useState('Yes')

    console.log(shipmentType)
    console.log(transportationType)
    console.log(airFreightType)

    const onSubmit = (data: any) => {
        const newData = {
            shipment_type: shipmentType,
            transportation_type: transportationType,
            air_freight_type: airFreightType,
        }
        console.log(data);
    }

    return (
        <div className='lg:px-10 px-5 py-10 mb-3'>
            <p className='upload-text'>Fill in the information and add a shipment for a customer</p>
            <p className='add-shipment-text'>What shipment type do you require?</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-3">
                    <p className="text-sm quote-text mb-2">Select Shipment Type</p>
                    <div className="lg: grid grid-cols-3">
                        <div className="">
                            <NewCustomRadio
                                selected={shipmentType === 'export' ? true : false}
                                label={"Export"}
                                onClick={() => setShipmentType('export')}
                                icon={''}
                                isDisabled={false}
                            />
                        </div>

                        <div className="ml-2">
                            <NewCustomRadio
                                selected={shipmentType === 'import' ? true : false}
                                label={"Import"}
                                onClick={() => setShipmentType('import')}
                                icon={''}
                                isDisabled={false}
                            />
                        </div>


                    </div>
                </div>
                <div className="pt-8">
                    <p className='add-shipment-text mb-3'>What Service would you be looking for?</p>
                    <div>
                        <p className="text-sm quote-text mb-2">Select your preferred Service Type</p>
                        <div className="grid grid-cols-3">
                            <div className="">
                                <NewCustomRadio
                                    selected={transportationType === 'Ocean Freight' ? true : false}
                                    label={"Ocean Freight"}
                                    icon={''}
                                    isDisabled={true}
                                    onClick={() => {
                                        setTransportationType('Ocean Freight')
                                        setShowAirFreightType(false);
                                    }}

                                />
                            </div>

                            <div className="ml-2">
                                <NewCustomRadio
                                    selected={transportationType === 'Air Freight' ? true : false}
                                    label={"Air Freight"}
                                    icon={''}
                                    isDisabled={true}
                                    onClick={() => {
                                        setTransportationType('Air Freight')
                                        setShowAirFreightType(!showAirfreightType)
                                    }}
                                />
                            </div>

                            <div className="ml-2">
                                <NewCustomRadio
                                    selected={transportationType === 'Haulage' ? true : false}
                                    label={"Haulage"}
                                    icon={''}
                                    isDisabled={true}
                                    onClick={() => {
                                        setTransportationType('Haulage')
                                        setShowAirFreightType(false);
                                    }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-3">
                    <div></div>
                    <div className="">
                        {
                            showAirfreightType ? (
                                <>

                                    <div className="bg-light-green p-3">
                                        <p className="text-sm quote-text mb-2">Select Air Freight Type</p>
                                        <div>
                                            {/* <p className="text-sm quote-text mb-2">Select Transportation Type</p> */}
                                            <div className="grid grid-cols-2">
                                                <div className=" mr-2">
                                                    <NewCustomRadio
                                                        selected={airFreightType === 'Door to Door' ? true : false}
                                                        label={"Door to Door"}
                                                        icon={''}
                                                        isDisabled={true}
                                                        onClick={() => {
                                                            setAirFreightType('Door to Door')
                                                            // setShowNext(!showNext);
                                                        }}

                                                    />
                                                </div>

                                                <div className="">
                                                    <NewCustomRadio
                                                        selected={airFreightType === 'Airport Delivery' ? true : false}
                                                        label={"Airport Delivery"}
                                                        icon={''}
                                                        isDisabled={true}
                                                        onClick={() => {
                                                            setAirFreightType('Airport Delivery')
                                                            // setShowNext(!showNext);
                                                        }}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    <div></div>
                </div>


                <div className="grid grid-cols-3 mt-3">
                    <div className="">
                        <NewCustomRadio
                            selected={transportationType === 'CBT' ? true : false}
                            label={"Customs Brokerage & Terminal"}
                            icon={''}
                            isDisabled={true}
                            onClick={() => {
                                setTransportationType('CBT')
                                setShowAirFreightType(false);
                            }}

                        />
                    </div>

                    <div className="ml-2">
                        <NewCustomRadio
                            selected={transportationType === 'Warehousing' ? true : false}
                            label={"Warehousing"}
                            icon={''}
                            isDisabled={true}
                            onClick={() => {
                                setTransportationType('Warehousing')
                                setShowAirFreightType(false);
                            }}

                        />
                    </div>
                </div>



                <div className="mb-5">
                    <hr className={`solid-br`} />
                    {
                        props.shipmentType === null && props.transportationType === null ||
                            props.shipmentType === 'export' && props.transportationType === null ||
                            props.shipmentType === 'import' && props.transportationType === null ||
                            props.shipmentType === null && props.transportationType === "Ocean Freight" ||
                            props.shipmentType === null && props.transportationType === "Air Freight" ||
                            props.shipmentType === null && props.transportationType === "Haulage" ||
                            props.shipmentType === null && props.transportationType === "Warehousing" ||
                            props.shipmentType === null && props.transportationType === "CBT" ?
                            (
                                <>
                                    <div className="grid grid-cols-3 mt-10 items-center">
                                        <div></div>
                                        <div></div>
                                        <div className="" style={{ textAlign: 'right' }}>
                                            {" "}
                                            {/* @ts-ignore */}
                                            <Link
                                                to=''
                                                className="not-allowed solid-br black-text text-sm py-3.5 px-4 w-full rounded flex"
                                                style={{ background: 'rgba(136, 136, 136, 0.15)', justifyContent: 'center' }}
                                            >
                                                Next
                                            </Link>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-3 mt-10 items-center">
                                        <div></div>
                                        <div></div>
                                        <div className="" style={{ textAlign: 'right' }}>
                                            {" "}
                                            {/* @ts-ignore */}
                                            <PrimaryButton
                                                title="Next"
                                                loading={loading}
                                                onClick={nextStep}
                                            />
                                        </div>
                                    </div>

                                </>
                            )
                    }
                </div>

            </form>
        </div>
    )
}

export default ShipmentType;