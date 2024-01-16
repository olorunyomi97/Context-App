import { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";

//components
import Location from "components/rates/Location";
import NavBar from "components/navBar";
import Document from "components/rates/Document";
import CargoDetails from "components/rates/CargoDetails";
import AdditionalDetails from "components/rates/AdditionalDetails";

//helpers
import { parseAllPorts } from "helpers/index";

//redux
import { getRateById } from "store/actions";

const _Json = require("sea-ports");

const RateRequest = (props: any): JSX.Element => {
  const { rate_data, loading, getRateById } = props;

  const [step, setStep] = useState(1);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const [shipmentType, setShipmentType] = useState("import");

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);

  useEffect(() => {
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);

    const id = urlParams.get("id");

    // if (id || rate_data?._id) {
    //   getRateById(id || rate_data._id);
    // }

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
      <NavBar />
      <div className="booking">
        <div className=" lg:flex justify-center mx-5 mt-10">
          <div className=" md:mt-24">
            <div className="mb-10">
              <div className="flex items-center">
                <h3 className="text-2xl font-semibold black-text">
                  {step === 1
                    ? "Location"
                    : // : step === 2
                    // ? "Documents"
                    step === 2
                    ? "Cargo Details"
                    : "Additional Services"}{" "}
                </h3>

                <p className="black-text font-medium text-base ml-auto">
                  Step {step} of 3
                </p>
              </div>
              <p className="grey-text text-sm mt-1">
                {step === 1
                  ? "Select the location of your shipment"
                  : // : step === 2
                  // ? "Please upload the necessary document for your shipment"
                  step === 2
                  ? "Enter the cargo details"
                  : "Enter the additional services"}
              </p>
            </div>

            <div className="">
              {step === 1 ? (
                <Location
                  shipmentType={shipmentType}
                  setShipmentType={setShipmentType}
                  defaultPortsOfOrigin={defaultPortsOfOrigin}
                  defaultPortsOfDestination={defaultPortsOfDestination}
                  nextStep={nextStep}
                />
              ) : // step === 2 ? (
              //   <Document
              //     previousStep={previousStep}
              //     nextStep={nextStep}
              //     shipmentType={shipmentType}
              //   />
              // ) :
              step === 2 ? (
                <>
                  <CargoDetails
                    previousStep={previousStep}
                    nextStep={nextStep}
                    shipmentType={shipmentType}
                  />
                </>
              ) : (
                <>
                  <AdditionalDetails
                    previousStep={previousStep}
                    shipmentType={shipmentType}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  const { loading, rate_data, complete_rate_data } = state.rate;
  return { loading, rate_data, complete_rate_data };
};

export default connect(mapStateToProps, { getRateById })(RateRequest);
