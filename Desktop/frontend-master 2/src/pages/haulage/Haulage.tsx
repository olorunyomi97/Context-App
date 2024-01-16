//components
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//redux
import { connect } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//helpers
import { parseAllPorts, getAllPorts, parseAllPortsNew, getCurrentTimestamp, getAllowedPorts } from "helpers";

//actions
import { createBooking, confirmBooking, getBookingDetailsById, clearBooking } from 'store/actions';

//components
import Layout from 'components/layout/Layout';
import PageLoading from 'components/partials/pageLoading';
import PrimaryButtons from 'components/buttons/PrimaryButtons';
import SecondaryButtons from 'components/buttons/SecondaryButtons';
import HaulageLocations from 'components/haulage/HaulageLocations';
import HaulageContainer from 'components/haulage/HaulageContainer';
import SuccessModal from 'components/partials/SuccessModal';
import CustomDefaultSelect from 'components/selectInputs/CustomDefaultSelect';


const _Json = require("sea-ports");

const Haulage = (props: any) => {
    const { loading, error, shipment_data, createBooking, clearBooking, confirmBooking, booking_confirmed, confirming_booking, booking_data, getting_booking, getBookingDetailsById } = props;

    const { handleSubmit, control, resetField, formState: { errors }, reset } = useForm();
    const [haulageCategory, setHaulageCategory] = useState("porttodoor");

    const navigate = useNavigate();

    //default destination
    const [originPort, setOriginPort] = useState<string | {}>("");

    const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
    const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
    const [allPorts, setAllPorts] = useState([]);
    const [allowedPorts, setAllowedPorts] = useState([]);

    const [includeCBT, setIncludeCBT] = useState(false);
    const [includeTracker, setIncludeTracker] = useState(false);

    const [showSucess, setShowSuccess] = useState(false);


    const showSuccessModal = () => {
        setShowSuccess(true)
    }

    //fetches the ports
    useEffect(() => {
        //@ts-ignore
        const parsePorts = parseAllPortsNew(_Json.JSON, originPort?.value?.country);
        setDefaultPortsOfOrigin(parsePorts.origin);
        setDefaultPortsOfDestination(parsePorts.destination);
        setAllPorts(getAllPorts(_Json.JSON))
        setAllowedPorts(getAllowedPorts(_Json.JSON))
        resetField("destination_port")
    }, [originPort]);

    const params = useParams();
    const { id } = params;
    useEffect(() => {
        id && getBookingDetailsById(id)
    }, [])

    useEffect(() => {
        if(booking_data?.shipment_type){
            booking_data?.shipment_type === "import" ? setHaulageCategory("porttodoor") : setHaulageCategory("doortoport")
        }
    }, [booking_data])


    //call confirm booking endpoint as callback
    const bookingConfirmation = (booking_id, call_data) => {
        console.log('jod>>', )
        confirmBooking({
            ...call_data, 
            shipment_id: booking_id
        }, showSuccessModal)
    }

    const onSubmit = (data: any) => {
        const _importData = {
            shipment_type: "import",
            shipment_transport_type:"haulage",
            port_of_discharge: data?.origin?.value?.unlocs?.[0] ? data?.origin?.value?.unlocs[0] : data?.origin?.value,
            delivery_location: data?.destination?.label,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
            container_weight: data?.container_weight
        }

        const _exportData = {
            shipment_type: "export",
            shipment_transport_type:"haulage",
            port_of_loading: data?.origin?.value?.unlocs?.[0] ? data?.origin?.value?.unlocs[0] : data?.origin?.value,
            stuffing_location: data?.destination?.label,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
            container_weight: data?.container_weight
        }

        const _importConfirm = {
            container_count: data.container_count,
            customs_brokerage: includeCBT,
            with_tracker: includeTracker,
            cargo_ready_date: null,
            port_eta: data.cargo_date,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
            container_weight: data?.container_weight
        }

        const _exportConfirm = {
            container_count: data.container_count,
            customs_brokerage: includeCBT,
            with_tracker: includeTracker,
            cargo_ready_date: data.cargo_date,
            port_eta: null,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
            container_weight: data?.container_weight
        }
        // console.log('importData', _importData)
        // console.log('exportData', _exportData)
        haulageCategory === "porttodoor" 
        ? createBooking(_importData, (id) => bookingConfirmation(id, _importConfirm)) 
        : createBooking(_exportData, (id) => bookingConfirmation(id, _exportConfirm))
    }

    console.log('lok data>>>', booking_data)
    // console.log('confirmed>>>', booking_confirmed)

    // console.log('loading>>>', loading);
    // console.log('confirming_loading', confirming_booking)

    return (
        <Layout>
            <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {getting_booking ? <PageLoading title="details" /> :
                <div className="w-full lg:w-4/5">
                    <div className="pb-8 bottom-divider">
                        <h1 className="black-text-2 text-2xl">Haulage</h1>
                        <p className="black-text-4 text-sm font-light mt-1.5">Please provide the details of the freight</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='bg-[#109b320d] rounded-lg mt-6'>
                            <div className='bottom-divider-2 px-8 py-6'>
                                <h3 className='text-base black-text-3'>Haulage details</h3>
                                <p className='black-text-4 text-sm font-light'>Please provide the required information</p>
                            </div>
                            <div className='px-8 pt-3 pb-6'>
                                <div className="categories">
                                    <div className="flex items-center gap-x-6 mb-6">
                                        <p 
                                            className={`text-sm cursor-pointer font-light ${haulageCategory === "porttodoor" ? "border-[#3AB44A] green-text-2" : "border-transparent grey-text-1"} border-solid border-b-[2px] pb-2.5 w-fit cursor-pointer`} 
                                            onClick={() => {
                                                setHaulageCategory("porttodoor");
                                                reset();
                                            }}
                                        >
                                            Port to Door
                                        </p>
                                        <p 
                                            className={`text-sm cursor-pointer font-light ${haulageCategory === "doortoport" ? "border-[#3AB44A] green-text-2" : "border-transparent grey-text-1"} border-solid border-b-[2px] pb-2.5 w-fit cursor-pointer`} 
                                            onClick={() => {
                                                setHaulageCategory("doortoport");
                                                reset();
                                            }}
                                        >
                                            Door to Port
                                        </p>
                                    </div>
                                    <HaulageLocations
                                        defaultPortsOfOrigin={defaultPortsOfOrigin}
                                        defaultPortsOfDestination={defaultPortsOfDestination}
                                        allPorts={allPorts}
                                        allowedPorts={allowedPorts}
                                        control={control}
                                        errors={errors}
                                        originPort={originPort}
                                        setOriginPort={setOriginPort}
                                        resetField={resetField}
                                        haulageType={haulageCategory}
                                        extras={false}
                                        booking_data={booking_data}
                                    />
                                </div>
                            </div>
                        </div>
    
                        <HaulageContainer
                            haulageCategory={haulageCategory}
                            includeCBT={includeCBT}
                            setIncludeCBT={setIncludeCBT}
                            includeTracker={includeTracker}
                            setIncludeTracker={setIncludeTracker}
                            control={control}
                            errors={errors}
                            booking_data={booking_data}
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
            </main>
            <SuccessModal
                modalIsOpen={showSucess}
                heading={"Booking Successful"}
                text={"Congrats, your booking has been placed."}
                subtext={<>A mail has been sent to you detailing the next steps and our sales agent will contact you in 1-2 business days. If you have any further questions please call Kayode on <a className='green-text' href='tel:+234906 688 5913'>+234906 688 5913</a>.</>}
                clearBooking={clearBooking}
                
            // closeModal={closeSuccessModal}
            />
        </Layout>
    )
}

const mapStateToProps = (state: any) => {
    const { error, loading, shipment_data, getting_booking, booking_data } = state.booking;
    const { booking_confirmed, confirming_booking } = state.additionalDetails;

    return {
        error,
        loading,
        shipment_data,
        getting_booking, 
        booking_data,
        booking_confirmed,
        confirming_booking
    };
};

export default connect (mapStateToProps, { createBooking, confirmBooking, getBookingDetailsById, clearBooking })(Haulage);