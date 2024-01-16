import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

//icons
import pencil from "assets/icons/pencil.svg";
import port from "assets/icons/home-port.svg";
import destination from "assets/icons/location-pin.svg";
import haulageTruck from "assets/icons/haulage-truck.svg";

import { connect } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//components
import Layout from 'components/layout/Layout';
import HaulageTitle from 'components/haulage/HaulageTitle';
import HaulageButtons from 'components/haulage/HaulageButtons';
import HaulageContainer from 'components/haulage/HaulageContainer';
import SuccessModal from 'components/partials/SuccessModal';
import PageLoading from 'components/partials/pageLoading';

//redux actions
import { getBookingDetailsById, confirmBooking, clearBooking } from 'store/actions';

//helpers
import { getPortNameByCode } from 'helpers';

const InHaulage = (props: any) => {
  const { error, getting_booking, booking_data, getBookingDetailsById, confirming_booking, confirmBooking, clearBooking  } = props;
  const { handleSubmit, control, formState: { errors }, reset } = useForm();

  const _Json = require("sea-ports");

  const params = useParams();
  const { id } = params;

  const [includeCBT, setIncludeCBT] = useState(false);
  const [includeTracker, setIncludeTracker] = useState(false);

  const [showSucess, setShowSuccess] = useState(false);
  const showSuccessModal = () => {
    setShowSuccess(true)
  }

  useEffect(() => {
    id && getBookingDetailsById(id);
  }, []);

  const onSubmit = (data: any) => {
    const _importConfirm = {
        shipment_id: id,
        container_count: data.container_count,
        customs_brokerage: includeCBT,
        with_tracker: includeTracker,
        cargo_ready_date: null,
        port_eta: data.cargo_date
    }

    const _exportConfirm = {
        shipment_id: id,
        container_count: data.container_count,
        customs_brokerage: includeCBT,
        with_tracker: includeTracker,
        cargo_ready_date: data.cargo_date,
        port_eta: null
    }

    confirmBooking(booking_data?.shipment_type === 'import' ? _importConfirm : _exportConfirm, showSuccessModal)
  }

  console.log('bookerDetails>>>', booking_data);

  return (
    <Layout>
        <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
            {getting_booking ? <PageLoading title="haulage details" /> :
            <div className="w-full lg:w-4/5">
                <HaulageTitle />
                <div className="pb-8 border-b-[0px] border-solid border-[#EAEFEB] mt-6">
                    <div className="rounded solid-br bg-[#109b320d]">
                        <div className="pl-8 py-5 pr-6 flex items-start border-b-[1px] border-solid border-[#e5e7eb]">   
                            <div>
                                <h2 className="black-text-3 text-lg font-normal">Haulage details</h2>
                                <p className="black-text-4 text-sm font-light">Please provide the required information</p>
                            </div>
                            <Link
                                to={`/haulage-details/${id}`}
                                className="flex items-center gap-1 ml-auto text-base"
                            >
                            <img src={pencil} alt="" />
                            <span className="green-text hidden lg:block">
                                Edit details
                            </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-6 px-8 py-6">
                            <div className="lg:border-r-[1px] border-solid border-[#e5e7eb]">
                            {/* <p className="black-text-4 text-base font-normal">Freight Details</p> */}
                            <div className="flex items-center gap-2">
                                <span><img className="min-w-[32px]" src={port} alt="" /></span>
                                <div className="">
                                <p className="grey-text font-light text-sm mb-1">{booking_data?.shipment_type === 'import' ? 'Origin Port' : 'Stuffing Location'}</p>
                                <p className="black-text-4 text-sm font-medium">{booking_data?.shipment_type === 'import' ? getPortNameByCode(_Json.JSON, booking_data?.port_of_discharge) : booking_data?.stuffing_location}</p>
                                </div>
                            </div>
                            </div>
                            <div className="lg:border-r-[1px] border-solid border-[#e5e7eb] lg:pl-4">
                            <div className="flex items-center gap-2">
                                <span><img className="min-w-[32px]" src={destination} alt="" /></span>
                                <div className="">
                                <p className="grey-text font-light text-sm mb-1">{booking_data?.shipment_type === 'import' ? 'Drop off Location' : 'Destination Port'}</p>
                                <p className="black-text-4 text-sm font-medium">{booking_data?.shipment_type === 'import' ? booking_data?.delivery_location : getPortNameByCode(_Json.JSON, booking_data?.port_of_loading)}</p>
                                </div>
                            </div>
                            </div>
                            <div className="lg:pl-4 flex flex-col">
                            <div className="flex items-center gap-2">
                                <span><img className="min-w-[32px]" src={haulageTruck} alt="" /></span>
                                <div className="">
                                <p className="grey-text font-light text-sm mb-1">Haulage Type</p>
                                <p className="black-text-4 text-sm font-medium">{booking_data?.shipment_type === 'import' ? 'Port to Door' : 'Door to Port'}</p>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {Object.keys(booking_data).length > 0 && 
                    <HaulageContainer 
                        haulageCategory={booking_data?.shipment_type === 'import' ? 'porttodoor' : 'doortoport'}
                        includeCBT={includeCBT}
                        setIncludeCBT={setIncludeCBT}
                        includeTracker={includeTracker}
                        setIncludeTracker={setIncludeTracker}
                        control={control}
                        errors={errors}
                        booking_data={booking_data}
                    />}
                    <HaulageButtons
                        confirming_booking={confirming_booking}
                        clearBooking={clearBooking}
                    />  
                </form>
            </div>}
        </main>
        <SuccessModal
            modalIsOpen={showSucess}
            heading={"Booking Successful"}
            text={"Congrats, your booking has been placed."}
            subtext={<>A mail has been sent to you detailing the next steps and our sales agent will contact you in 1-2 business days. If you have any further questions please call Kayode on <a className='green-text' href='tel:+234906 688 5913'>+234906 688 5913</a>.</>}    
            clearBooking={clearBooking}
        />
    </Layout>
  )
};

const mapStateToProps = (state) => {
    const { error, getting_booking, booking_data } = state.booking;
    const { loading, booking_summary, confirming_booking } = state.additionalDetails;

    return { error, getting_booking, booking_data, booking_summary, confirming_booking }
}



export default connect(mapStateToProps, { getBookingDetailsById, confirmBooking, clearBooking })(InHaulage);