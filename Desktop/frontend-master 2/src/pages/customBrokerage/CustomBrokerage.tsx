import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//redux
import { connect } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//helpers
import { parseAllPorts, getAllPorts, parseAllPortsNew, getAllowedPorts, getCountryNameByCode } from "helpers";

//components
import Layout from 'components/layout/Layout';
import PrimaryButtons from 'components/buttons/PrimaryButtons';
import SecondaryButtons from 'components/buttons/SecondaryButtons';
import CustomBrokerageTitle from 'components/customBrokerage/CustomBrokerageTitle';
import CustomBrokerageLocations from 'components/customBrokerage/CustomBrokerageLocations';
import CustomBrokerageContainer from 'components/customBrokerage/CustomBrokerageContainer';
import SuccessModal from 'components/partials/SuccessModal';
import PageLoading from 'components/partials/pageLoading';

//actions
import { createBooking, confirmBooking, getBookingDetailsById, clearBooking } from 'store/actions';

const _Json = require("sea-ports");

const CustomBrokerage = (props: any) => {
    const { loading, error, shipment_data, createBooking, clearBooking, confirmBooking, booking_confirmed, confirming_booking, booking_data, getting_booking, getBookingDetailsById } = props;

    const { handleSubmit, control, resetField, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();

    //default destination
    const [originPort, setOriginPort] = useState<string | {}>("");

    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [allPorts, setAllPorts] = useState([]);
    const [allowedPorts, setAllowedPorts] = useState([]);

    const [showSucess, setShowSuccess] = useState(false);

    const showSuccessModal = () => {
        setShowSuccess(true)
    }

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        id && getBookingDetailsById(id)
    }, [])

    //fetches the ports
    useEffect(() => {
        //@ts-ignore
        const parsePorts = parseAllPortsNew(_Json.JSON, originPort?.value?.country);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
        setAllPorts(getAllPorts(_Json.JSON))
        setAllowedPorts(getAllowedPorts(_Json.JSON))
        resetField("destination_port")
        // console.log("code>>>", getCountryNameByCode(_Json.JSON, 'NGAPP'))

        // mixpanel.track("Start new shipment", { email: user.email });
    }, [originPort]);

    // const booking_data: any = {}
    //call confirm booking endpoint as callback
    const bookingConfirmation = (booking_id, call_data) => {
        confirmBooking({
            ...call_data, 
            shipment_id: booking_id
        }, showSuccessModal)
    }

    const onSubmit = (data: any) => {

        let _data: any = {        
            shipment_type: data?.shipment_type?.value,    
            shipment_transport_type: "customs_brokerage",
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
            goods_type: data.commodity_type
        }

        _data = data?.shipment_type?.value === 'import' 
                ? { ..._data, port_of_discharge : data?.origin_port?.value?.unlocs ? data?.origin_port?.value?.unlocs[0] : data?.origin_port.value } 
                : { ..._data, port_of_loading: data?.origin_port?.value?.unlocs ? data?.origin_port?.value?.unlocs[0] : data?.origin_port.value }


        const _confirmData = {
            container_count: data?.container_count,
            customs_brokerage: true,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
        }

        createBooking(_data, (id) => bookingConfirmation(id, _confirmData))
    }


    return (
        <Layout>
            <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {getting_booking ? <PageLoading title="details" /> : 
                <div className="w-full lg:w-4/5">
                    <CustomBrokerageTitle />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='mt-6'>
                            <CustomBrokerageLocations
                                defaultPortsOfOrigin={defaultPortsOfOrigin}
                                defaultPortsOfDestination={defaultPortsOfDestination}
                                allPorts={allPorts}
                                allowedPorts={allowedPorts}
                                control={control}
                                errors={errors}
                                originPort={originPort}
                                setOriginPort={setOriginPort}
                                resetField={resetField}
                                extras={false}
                                booking_data={booking_data}
                                // shipment_data={shipment_data}
                            />
                        </div>
                        <CustomBrokerageContainer 
                            control={control}
                            errors={errors}
                            booking_data={booking_data}
                            isInCustoms={true}
                        />
                        <div className="flex justify-end gap-x-6 mt-8">
                            <SecondaryButtons
                                title="Cancel"
                                style={{ padding: "12px 14px" }}
                                onClick={() => {
                                    navigate('/dashboard')
                                    clearBooking()
                                }}
                                disabled={false}
                                loading={false}
                                type={"button"}
                                icon={""}
                            />
                            <PrimaryButtons
                                title="Confirm"
                                style={{}}
                                // onClick={() => setIsMessageSent(true)}
                                disabled={false}
                                loading={loading || confirming_booking}
                                icon={""}
                            />
                        </div>
                    </form>
                </div>}
                <SuccessModal
                    modalIsOpen={showSucess}
                    heading={"Booking Successful"}
                    text={"Congrats, your booking has been placed."}
                    subtext={<>A mail has been sent to you detailing the next steps and our sales agent will contact you in 1-2 business days. If you have any further questions please call Kayode on <a className='green-text' href='tel:+234906 688 5913'>+234906 688 5913</a>.</>}
                    clearBooking={clearBooking}
                />
            </main>
        </Layout>
    )
}

const mapStateToProps = (state: any) => {
    const { error, loading, shipment_data, getting_booking, booking_data } = state.booking;
    const { booking_confirmed, confirming_booking } = state.additionalDetails;

    return { error, loading, shipment_data, getting_booking, booking_data, booking_confirmed, confirming_booking }
}

export default connect(mapStateToProps, { createBooking, confirmBooking, getBookingDetailsById, clearBooking })(CustomBrokerage);