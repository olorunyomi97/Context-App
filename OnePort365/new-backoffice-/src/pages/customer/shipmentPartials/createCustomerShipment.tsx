import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import Location from "./location/location";
import Document from "./documents/document";
import CargoDetails from "./cargoDetails/cargo";
import AdditionalDetails from "./additionalDetails/additionalDetails";

// import "../../index.css"

//helpers
import { parseAllPorts } from "helpers/index";

const _Json = require("sea-ports");

const CreateCustomerShipment = (props: any): JSX.Element => {
    const [openAside, SetOpenAside] = useState(false);
    const [step, setStep] = useState(1);
    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [shipmentType, setShipmentType] = useState("import");

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

    const previousStep = () => {
        setStep(step - 1);
    };
    const nextStep = () => {
        setStep(step + 1);
    };

    return (
        <>
           <div className="flex">
			<Aside 
                activeTab="customer"
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
			<div className="dashboard-content-scroll">
			<TopBar title={"Customer Shipment Creation"} SetOpenAside={SetOpenAside}/>
            <div className="">
            <div className="booking mobile-shipment">
				<div className="grid grid-cols-3 gap-4 pr-5 large-shipment">
                    <div className="col-span-3 md:mt-12">
                        <div className="mb-10">
                            <div className="flex items-center">
                                {/* <h3 className="text-2xl font-semibold black-text">{step === 1 ? "Location" : step === 2 ? "Documents" : step === 3 ? "Cargo Details" : "Additional Services"} </h3> */}
                                <h3 className="text-2xl font-semibold black-text">{step === 1 ? "Location" : step === 2 ? "Cargo Details" : "Additional Services"} </h3>

                                <p className="black-text font-medium text-base ml-auto">Step {step} of 3</p>
                            </div>
                            <p className="grey-text text-sm mt-1">
							{/* {	
								step === 1
								? "Select the location of your shipment"
								: step === 2
								? "Please upload the necessary document for your shipment"
								: step === 3
								? "Enter the cargo details"
								: "Enter the additional services"
							} */}
                            {	
								step === 1
								? "Select the location of your shipment"
								: step === 2
								? "Enter the cargo details"
								: "Enter the additional services"
							}
								{/* Rhoncus dui convallis lorem egestas molestie vitae nibh. */}
							</p>
                        </div>

                        <div className="">
                            {step === 1 ? (
                                <Location shipmentType={shipmentType} setShipmentType={setShipmentType} defaultPortsOfOrigin={defaultPortsOfOrigin} defaultPortsOfDestination={defaultPortsOfDestination} nextStep={nextStep} />
                            // ) : step === 2 ? (
                            //     <Document previousStep={previousStep} nextStep={nextStep} shipmentType={shipmentType} />
                            ) : step === 2 ? (
                                <>
                                    <CargoDetails previousStep={previousStep} nextStep={nextStep} shipmentType={shipmentType} />
                                </>
                            ) : (
                                <>
                                    <AdditionalDetails previousStep={previousStep} shipmentType={shipmentType} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                </div>
            </div>
			</div>
			</div>
        </>
    );
};

export default CreateCustomerShipment;

