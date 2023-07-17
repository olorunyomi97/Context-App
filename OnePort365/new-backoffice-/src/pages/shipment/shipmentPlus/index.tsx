import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentType from "./shipmentType";
import ShipmentAndTransportCombo from "./shipmentAndTransportCombination/shipmentAndTransportCombo";
import { parseAllPorts } from "helpers/index";
const _Json = require("sea-ports");

const Index = (props: any) => {
    const [openAside, SetOpenAside] = useState(false);
    const [step, setStep] = useState(1);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [shipmentType, setShipmentType] = useState("export");
    const [transportationType, setTransportationType] = useState("Ocean Freight");
    const [airFreightType, setAirFreightType] = useState("Door to Door");

    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);

    useEffect(() => {
        const parsePorts = parseAllPorts(_Json.JSON);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
        //@ts-ignore
        setShipmentType(urlParams.get("shipment-type"));
        if (urlParams.get("shipment-type")) {
            setStep(2);
        }
    }, []);

    useEffect(() => {
        //@ts-ignore
        setTransportationType(urlParams.get("transportation-type"));
        if (urlParams.get("transportation-type")) {
            setStep(2);
        }
    }, []);

    // useEffect(() => {
    //     //@ts-ignore
    //     setAirFreightType(urlParams.get("airfreight-type"));
    //     if (urlParams.get("airfreight-type")) {
    //         setStep(2);
    //     }
    // }, []);

    const previousStep = () => {
        setStep(step - 1);
    };
    const nextStep = () => {
        setStep(step + 1);
    };


    return (
        <div className="flex">
            <Aside activeTab="Shipment"
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
            <div className="dashboard-content">
                <TopBar title={"Shipment"} SetOpenAside={SetOpenAside} />
                <div className="">
                    <div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
                        <div className="mt-2">
                            <p className='font-semibold text-lg'>Add A Shipment </p>
                        </div>
                        <div className="mt-2 ml-auto" style={{ textAlign: 'right' }}>
                            <small>Shipments </small><small style={{ color: 'grey' }}> / Add A Shipment</small>
                        </div>
                    </div>
                    <div className="lg:px-14 lg:pb-5 px-5">
                        <div className="flex items-center">
                            {/* <h3 className="text-2xl font-semibold black-text">{step === 1 ? "Location"  : step === 2 ? "Cargo Details" : "Additional Services"} </h3> */}

                            <p className="black-text font-medium text-base ml-auto">Step {step} of 2</p>
                        </div>
                        <div className='my-5 right-divider left-divider top-divider bottom-divider shadow-2xl'>
                            {/* <ShipmentType /> */}

                            <div className="">
                                {step === 1 ? (
                                    <ShipmentType
                                        shipmentType={shipmentType}
                                        setShipmentType={setShipmentType}
                                        transportationType={transportationType}
                                        setTransportationType={setTransportationType}
                                        airFreightType={airFreightType}
                                        setAirFreightType={setAirFreightType}
                                        nextStep={nextStep}
                                        previousStep={previousStep}
                                    />
                                ) : (
                                    <>
                                        <ShipmentAndTransportCombo
                                            shipmentType={shipmentType}
                                            setShipmentType={setShipmentType}
                                            transportationType={transportationType}
                                            setTransportationType={setTransportationType}
                                            airFreightType={airFreightType}
                                            setAirFreightType={setAirFreightType}
                                            previousStep={previousStep}
                                            nextStep={nextStep}
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Index