import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";

//components
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import Location from "components/rates/Location";
import Document from "components/rates/Document";
import CargoDetails from "components/rates/CargoDetails";
import AdditionalDetails from "components/rates/AdditionalDetails";
import PageLoading from "components/partials/pageLoading";
import CustomRadio from "components/selectInputs/CustomRadio";
import Export from "components/rates/Export";

//helpers
import { parseAllPorts } from "helpers/index";
import mixpanel from "helpers/mixpanel";

//redux
import { getRateById } from "store/actions";
import EmptyResult from "components/partials/EmptyResult";

const _Json = require("sea-ports");

const DashboardRateRequest = (props: any) => {
  const [step, setStep] = useState(1);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );

  const [shipmentType, setShipmentType] = useState("export");
  const [openAside, SetOpenAside] = useState(false);

  const {
    rate_data,
    rate_result,
    getRateById,
    getting_rates,
    finalizing_rate_request,
  } = props;

  let user = useSelector((state: any) => state.auth.user_data);

  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    const parsePorts = parseAllPorts(_Json.JSON);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);

    mixpanel.track("Start new shipment", {
      email: user.email,
    });
  }, []);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      getRateById(params.id);

      if (Object.keys(rate_data).length > 0) {
        setShipmentType(rate_data.shipping_type);
      }
    }
  }, [params.id]);

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <>
      <div className="flex w-full">
        <Aside
          activeTab="shipment"
          openAside={openAside}
          SetOpenAside={SetOpenAside}
        />

        <div className="flex-1">
          <TopBar title={"Search Rates"} SetOpenAside={SetOpenAside} />

          {getting_rates || finalizing_rate_request ? (
            <PageLoading title="rate details" />
          ) : (
            <div className="lg:pt-14 pt-10 w-full dashboard-content-scroll no-over-flow-x">
              <div className="lg:mx-12 mx-5">
                {/* <div className="bg-light-yellow p-4 rounded-md mb-7">
                  <p className="black-text text-sm font-semibold mb-2">
                    Disclaimer
                  </p>
                  <p className="black-text text-xs">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Similique quos fugiat illum odio cumque esse nostrum quis
                    nemo itaque quidem.
                  </p>
                </div> */}

                {/* <div className="flex "> */}
                <div className="booking-card mb-10">
                  <div className="  md:py-7 md:px-10 p-5 bg-light-green rounded-t-xl">
                    <p className="text-xs black-text font-medium w-0.5/3 mb-2">
                      Shipment Type
                    </p>
                    <div className="grid lg:grid-cols-3 grid-cols-2 items-center gap-4">
                      <div className="">
                        <CustomRadio
                          selected={shipmentType === "export" ? true : false}
                          label={"Export"}
                          onClick={() => setShipmentType("export")}
                        />
                      </div>

                      <div className="">
                        <CustomRadio
                          selected={shipmentType === "import" ? true : false}
                          label={"Import"}
                          onClick={() => setShipmentType("import")}
                        />
                      </div>
                      <div className="">
                        <CustomRadio
                          selected={
                            shipmentType === "air_freight" ? true : false
                          }
                          label={"Air Freight"}
                          onClick={() => setShipmentType("air_freight")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="">
                    {shipmentType === "export" ? (
                      <Export
                        defaultPortsOfDestination={defaultPortsOfDestination}
                        defaultPortsOfOrigin={defaultPortsOfOrigin}
                      />
                    ) : shipmentType === "import" ? (
                      <EmptyResult title="Import" />
                    ) : shipmentType === "air_freight" ? (
                      <EmptyResult title="Air Freight" />
                    ) : null}
                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  const { rate_data, rate_result, getting_rates, finalizing_rate_request } =
    state.rate;
  return { rate_data, rate_result, getting_rates, finalizing_rate_request };
};

export default connect(mapStateToProps, { getRateById })(DashboardRateRequest);

// <div className="mb-10">
// <div className="flex items-center">
//   <h3 className="text-2xl font-semibold black-text">
//     {step === 1
//       ? "Location"
//       : // : step === 2
//       // ? "Documents"
//       step === 2
//       ? "Cargo Details"
//       : "Additional Services"}{" "}
//   </h3>
// </div>
// <p className="grey-text text-sm mt-1">
//   {step === 1
//     ? "Select the location of your shipment"
//     : // : step === 2
//     // ? "Please upload the necessary document for your shipment"
//     step === 2
//     ? "Enter the cargo details"
//     : "Enter the additional services"}
// </p>
// </div>

// <div className="lg:flex justify-start">
// {step === 1 ? (
//   <Location
//     shipmentType={shipmentType}
//     setShipmentType={setShipmentType}
//     defaultPortsOfOrigin={defaultPortsOfOrigin}
//     defaultPortsOfDestination={defaultPortsOfDestination}
//     nextStep={nextStep}
//     showStep
//   />
// ) : // : step === 2 ? (
// //   <Document
// //     previousStep={previousStep}
// //     nextStep={nextStep}
// //     shipmentType={shipmentType}
// //     showStep
// //   />
// // )
// step === 2 ? (
//   <>
//     <CargoDetails
//       previousStep={previousStep}
//       nextStep={nextStep}
//       shipmentType={shipmentType}
//       showStep
//     />
//   </>
// ) : (
//   <>
//     <AdditionalDetails
//       previousStep={previousStep}
//       shipmentType={shipmentType}
//       showStep
//     />
//   </>
// )}
// </div>
