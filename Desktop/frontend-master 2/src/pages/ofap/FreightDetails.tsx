import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

//redux
import { connect } from "react-redux";

//libraries
import { set, useForm } from "react-hook-form";

//helpers
import { parseAllPorts, getAllPorts, parseAllPortsNew, getAllowedPorts, getCountryNameByCode } from "helpers";


//actions
import { createBooking, getBookingDetailsById, clearBooking } from 'store/actions';

//components
import Layout from 'components/layout/Layout';
import ContainerDetails from 'components/ofap/ContainerDetails';
import FreightLocations from 'components/ofap/FreightLocations';
import PageLoading from 'components/partials/pageLoading';

import PrimaryButtons from 'components/buttons/PrimaryButtons';
import OutlineButton from 'components/buttons/OutlineButton';

const _Json = require("sea-ports");

const FreightDetails = (props: any) => {
    const { loading, error, shipment_data, createBooking, getting_booking, booking_data, clearBooking, getBookingDetailsById } = props;

    const { handleSubmit, control, resetField, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    //default destination
    const [originPort, setOriginPort] = useState<string | {}>("");

    //default currency
    const [currency, setCurrency] = useState("NGN");
    const [prefix, setPrefix] = useState("₦");

    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [allPorts, setAllPorts] = useState([]);


    //fetches the ports
    useEffect(() => {
        //@ts-ignore
        const parsePorts = parseAllPortsNew(_Json.JSON, originPort?.value?.country);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
        setAllPorts(getAllPorts(_Json.JSON))
        resetField("destination_port")
        // console.log("code>>>", getAllowedPorts(_Json.JSON))

        // mixpanel.track("Start new shipment", { email: user.email });
    }, [originPort]);

    const { id } = useParams();
    useEffect(() => {
        id && getBookingDetailsById(id)
    }, [])


    // console.log("allports>>>", _Json.JSON)
    const goToFreightRates = (booking_id) => {
        clearBooking();
        navigate(`/freight-rates/${booking_id}`)
    }

    const onSubmit = (data: any) => {
        const destinationPorts = ["nigeria", "ghana", "kenya", "senegal", "cameroon", "côte d'ivoire" ]
        const _data = {
            // shipment_type: data?.origin_port?.value?.country?.toLowerCase() === "nigeria" || data.origin_port.value.country?.toLowerCase() === "ghana" || data.origin_port.value.country?.toLowerCase() === "kenya" ? "export" : "import",
            shipment_type: (
                data?.origin_port?.value?.country
                  ? (destinationPorts.includes(data?.origin_port?.value?.country?.toLowerCase()) ? "export" : "import")
                  : (destinationPorts.includes(getCountryNameByCode(_Json.JSON, data?.origin_port?.value).toLowerCase()) ? "export" : "import")
                ),  
            shipment_transport_type: "ocean_freight",
            origin_port_code:  data?.origin_port?.value?.unlocs ? data?.origin_port?.value?.unlocs[0] : booking_data.origin_port_code,
            destination_port_code: data?.destination_port?.value?.unlocs ? data?.destination_port?.value?.unlocs[0] : booking_data.destination_port_code,
            container_size: data.container_size.value,
            container_type: data.container_type.value,
            cargo_ready_date: data.cargo_ready_date
        }
        console.log('data559>>', _data)
        createBooking(_data, goToFreightRates)
    }

    return (
        <Layout>
            <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {getting_booking ? <PageLoading title="details" /> :
                    <>
                        <div className="w-full lg:w-4/5">
                            <div className="mb-9">
                                <h1 className="black-text-2 text-2xl">Ocean Freight</h1>
                                <p className="black-text-4 text-sm font-light mt-1.5">Please provide the details of the freight</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <FreightLocations
                                    defaultPortsOfOrigin={defaultPortsOfOrigin}
                                    defaultPortsOfDestination={defaultPortsOfDestination}
                                    allPorts={allPorts}
                                    control={control}
                                    errors={errors}
                                    originPort={originPort}
                                    setOriginPort={setOriginPort}
                                    resetField={resetField}
                                    extras={false}
                                    currency={currency}
                                    setCurrency={setCurrency}
                                    // shipment_data={shipment_data}
                                    // id={id}
                                    prefix={prefix}
                                    setPrefix={setPrefix}
                                    booking_data={booking_data}
                                />
                                <ContainerDetails
                                    control={control}
                                    errors={errors}
                                    booking_data={booking_data}
                                />

                                <div className="mt-8 flex justify-between">
                                    <OutlineButton
                                        title="Cancel"
                                        style={{ color: "#59725C" }}
                                        onClick={() => navigate("/dashboard", { state: { shipId: "" } })}
                                        disabled={false}
                                        loading={false}
                                        icon={""}
                                    />
                                    <PrimaryButtons
                                        title="View Rates"
                                        // onClick={() => navigate("/freight-rates")}
                                        style={{}}
                                        disabled={false}
                                        loading={loading}
                                        icon={""}
                                    />
                                </div>
                            </form>
                        </div>
                    </>
                }
            </main>
        </Layout>
    )
};

const mapStateToProps = (state: any) => {
    const { error, loading, shipment_data, getting_booking, booking_data } = state.booking;
    return {
        error,
        loading,
        shipment_data,
        getting_booking, booking_data
    };
};


export default connect(mapStateToProps, { createBooking, clearBooking, getBookingDetailsById })(FreightDetails);