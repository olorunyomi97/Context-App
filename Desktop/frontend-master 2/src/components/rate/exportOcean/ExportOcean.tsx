import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

//libraries
import { useForm } from "react-hook-form";
import uniqid from "uniqid";

//helpers
import { parseAllPorts, getFullPort } from "helpers";
import mixpanel from "helpers/mixpanel";

//icons
import add from "assets/icons/add.svg";

//redux
import { connect } from "react-redux";
// import { initiateRateRequest } from "store/actions";
import {
  createNewShipment,
  clearBookingErrors,
  getShipmentById,
} from "store/booking/actions";

//components
import ShipmentStepper from "components/rate/ShipmentStepper";
import FreightDetails from "components/rate/FreightDetails";
import CBTNotification from "components/rate/exportOcean/CBTNotification";
import Haulage from "components/rate/exportOcean/Haulage";
import ContainerDetails from "components/rate/exportOcean/ContainerDetails";
import OutlineButton from "components/buttons/OutlineButton";
import PrimaryButtons from "components/buttons/PrimaryButtons";
import SecondaryButtons from "components/buttons/SecondaryButtons";
import PageLoading from "components/partials/pageLoading";

//helpers
import { findDefaultPort, getCurrentTimestamp } from "helpers";

const _Json = require("sea-ports");

const ExportOcean = (props: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prefix, setPrefix] = useState("₦");
  const [containerDetails, setContainerDetails] = useState([{}]);
  const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
  const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState(
    []
  );
  const {
    handleSubmit,
    control,
    resetField,
    formState: { errors },
    reset,
  } = useForm();

  //props
  const {
    createNewShipment,
    getShipmentById,
    rate_data,
    shipment_data,
    loading,
    getting_shipments,
    shipId,
    shipment_data_edit,
  } = props;

  //haulage radio buttons
  const [isShipmentHarzadous, setIsShipmentHazardous] = useState("no");

  //default currency
  const [currency, setCurrency] = useState("NGN");

  //default destination
  const [originPort, setOriginPort] = useState<string | {}>("");
  //@ts-ignore
  console.log("originPort>>>", originPort);

  let user = useSelector((state: any) => state.auth.user_data);
  // @ts-ignore
  user = user ? user : JSON.parse(localStorage.getItem("user_data"));

  //set default value for certain parameters
  useEffect(() => {
    if (shipId) {
      setCurrency(
        shipment_data?.goods_value_currency
          ? shipment_data?.goods_value_currency
          : "NGN"
      );
      setOriginPort({ label: shipment_data?.origin_port });
      setIsShipmentHazardous(
        shipment_data?.is_product_hazardous ? "yes" : "no"
      );
      setPrefix(shipment_data?.goods_value_currency === "NGN" ? "₦" : "$");
    }
  }, [shipId]);

  //getting the shipment id to call and get shipment details
  useEffect(() => {
    if (shipId !== undefined) {
      getShipmentById(shipId);
    }
  }, [shipId]);

  useEffect(() => {
    let newContainerDetails: object[] = [];
    if (shipment_data?.container_details?.length > 0) {
      shipment_data?.container_details?.map((item: any, index: number) => {
        newContainerDetails.push({ ...item, uid: uniqid() });
      });
    }

    if (newContainerDetails.length > 0) {
      setContainerDetails(newContainerDetails);
    }
  }, []);

  //fetches the ports
  useEffect(() => {
    //@ts-ignore
    const parsePorts = parseAllPorts(_Json.JSON, originPort?.value?.country);
    setDefaultPortsOfOrigin(parsePorts.origin);
    setDefaultPortsOfDestination(parsePorts.destination);
    // console.log("code>>>", getFullPort(_Json.JSON, "NGAPP"))

    mixpanel.track("Start new shipment", { email: user.email });
  }, [originPort]);

  // console.log("shipIdguy>>>", shipId)
  // console.log("shipdatas>>>", shipment_data)

  //adds a new container
  const addNewContainer = () => {
    const newC = {
      uid: uniqid(),
    };
    setContainerDetails([...containerDetails, newC]);
  };

  //stores container details on submit
  const containers: any = [];

  //deletes a container
  const removeContainer = (index: string) => {
    setContainerDetails((prevDetails) => {
      return prevDetails.filter((data, i) => index !== data["uid"]);
    });
  };

  //navigates to the next page after success
  const goToShippingLinersPage = (shipment_id) => {
    clearBookingErrors();
    // console.log("hereshipdata>>>", shipment_data)
    navigate(`/booking/shipping-liners`, {
      state: {
        id: shipment_id,
        nextCategory: "export_oceanliner",
      },
    });
  };

  const onSubmit = (data: any, e) => {
    containerDetails.map((item) => {
      containers.push({
        container_count: data[`container_count_${item["uid"]}`],
        container_size: data[`container_size_${item["uid"]}`].value,
        container_type: data[`container_type_${item["uid"]}`].value,
        container_weight: data[`weight_${item["uid"]}`],
      });
      return containers;
    });
    console.log("data>>>", data);

    const finalData = {
      shipment_type: "export",
      shipment_transport_type: "ocean_freight",
      origin_port_code: data?.origin_port?.value?.unlocs
        ? data?.origin_port?.value?.unlocs[0]
        : data.origin_port.value,
      destination_port_code: data?.destination_port?.value?.unlocs
        ? data?.destination_port?.value?.unlocs[0]
        : data.destination_port.value,
      cargo_pickup_date: data?.cargo_pickup_date,
      containers,
      stuffing_date: data?.stuff_date,
      goods_value: data?.goods_value,
      goods_value_currency: currency,
      is_product_hazardous: isShipmentHarzadous === "yes" ? true : false,
      with_haulage: true,
      pickup_location: data?.pickup_loc?.label,
    };

    // reset({
    //     cargo_pickup_date: new Date().toISOString().slice(0, 10),
    //     goods_value: "",
    //     origin_port: { label: " ", value: " " },
    //     destination_port: { label: " ", value: " " },
    //     pickup_loc: { label: " ", value: " " },
    //     stuff_date: new Date().toISOString().slice(0, 10),

    // })
    // setContainerDetails([])
    // setContainerDetails([{}])
    // console.log("container>>>", containerDetails)
    // setContainerDetails([{}])
    // console.log("container1>>>", containerDetails)
    // e.target["cargo_pickup_date"].value = ''
    createNewShipment(finalData, goToShippingLinersPage, false);
    //@ts-ignore
    // reset()
  };

  console.log("container>>>", containerDetails);
  // const parsePorts = parseAllPorts(_Json.JSON);
  // console.log("code>>>", getFullPort(parsePorts, "NGAPP"))

  return (
    <>
      {getting_shipments ? (
        <PageLoading title="form details." />
      ) : (
        <div className="w-full md:w-[85%]">
          <ShipmentStepper />
          <CBTNotification text="Please note this bundle includes CBT and Haulage" />
          <form id="exportOcean" onSubmit={handleSubmit(onSubmit)}>
            <FreightDetails
              defaultPortsOfOrigin={defaultPortsOfOrigin}
              defaultPortsOfDestination={defaultPortsOfDestination}
              control={control}
              errors={errors}
              setOriginPort={setOriginPort}
              resetField={resetField}
              extras={true}
              currency={currency}
              setCurrency={setCurrency}
              shipment_data={shipment_data}
              prefix={prefix}
              setPrefix={setPrefix}
            />
            <Haulage
              control={control}
              errors={errors}
              originPort={originPort}
              isShipmentHarzadous={isShipmentHarzadous}
              setIsShipmentHazardous={setIsShipmentHazardous}
              shipment_data={shipment_data}
            />
            <div className="mt-8 md:mt-16">
              <p className="text-xl black-text-2 font-medium">
                Container Details
              </p>
              {containerDetails.map((item: any, index: number) => {
                let defaultValue = shipment_data?.container_details?.length
                  ? shipment_data?.container_details[index]
                  : {};
                // console.log("defv>>>", defaultValue)
                return (
                  <div key={item.uid}>
                    <ContainerDetails
                      uid={item.uid}
                      index={index}
                      control={control}
                      errors={errors}
                      defaultValue={defaultValue}
                      removeContainer={removeContainer}
                    />
                  </div>
                );
              })}
              <>
                <div className="mt-9 pb-16 bottom-divider">
                  <SecondaryButtons
                    type="button"
                    title="Add Container"
                    icon={add}
                    onClick={addNewContainer}
                  />
                </div>
              </>
            </div>
            <div className="mt-8 flex justify-between">
              <OutlineButton
                title="Cancel"
                style={{ color: "#59725C" }}
                onClick={() =>
                  navigate("/dashboard", { state: { shipId: "" } })
                }
                disabled={false}
                loading={false}
                icon={""}
              />
              <PrimaryButtons
                title="View Rates"
                style={{}}
                disabled={false}
                loading={loading}
                icon={""}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  const {
    error,
    loading,
    rate_data,
    getting_rates,
    getting_shipments,
    shipment_data,
    shipment_data_edit,
  } = state.booking;
  return {
    error,
    loading,
    rate_data,
    getting_rates,
    getting_shipments,
    shipment_data,
    shipment_data_edit,
  };
};

export default connect(mapStateToProps, { createNewShipment, getShipmentById })(
  ExportOcean
);

//<PrimaryButtons title="View Rates" style={{}} onClick={() => navigate("/shipments/shipping-liners")} disabled={false} loading={false} icon={''} />
