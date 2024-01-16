import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";

//icons
import pencil from "assets/icons/pencil.svg";
// import port from "assets/icons/home-port.svg";
import destination from "assets/icons/location-pin.svg";
// import haulageTruck from "assets/icons/haulage-truck.svg";
import shipType from "assets/icons/ship-type.svg";
import commType from "assets/icons/comm-type.svg";

import { connect } from "react-redux";

//libraries
import { useForm } from "react-hook-form";

//helpers
import { getPortNameByCode } from 'helpers';

//redux actions
import { getBookingDetailsById, confirmBooking, clearBooking } from 'store/actions';

//components
import Layout from 'components/layout/Layout';
import CustomBrokerageTitle from 'components/customBrokerage/CustomBrokerageTitle';
import CustomBrokerageContainer from 'components/customBrokerage/CustomBrokerageContainer';
import PageLoading from 'components/partials/pageLoading';
import PrimaryButtons from 'components/buttons/PrimaryButtons';
import SecondaryButtons from 'components/buttons/SecondaryButtons';
import SuccessModal from 'components/partials/SuccessModal';



const InCustomBrokerage = (props: any) => {
    const { error, getting_booking, booking_data, getBookingDetailsById, confirming_booking, confirmBooking, clearBooking  } = props;
    const { handleSubmit, control, formState: { errors }, reset } = useForm();

    const _Json = require("sea-ports");

    const params = useParams();
    const { id } = params;

    const [showSucess, setShowSuccess] = useState(false);

    const showSuccessModal = () => {
        setShowSuccess(true)
    }

    const navigate = useNavigate();

    useEffect(() => {
        id && getBookingDetailsById(id);
      }, []);

    // const booking_data:any = {}
    const onSubmit = (data: any) => {
        const _confirmData = {
            container_count: data.container_count,
            customs_brokerage: true,
            shipment_id: id,
            container_size: data.container_size.value.split("|")[0].trim(""),
            container_type: data.container_size.value.split("|")[1].trim(""),
        }
        
        confirmBooking(_confirmData, showSuccessModal);
    }

    console.log('bookingData>>>', booking_data)

    return (
        <Layout>
            <main className="px-4 pt-8 lg:pt-10 lg:px-10 dashboard-content-scroll">
                {getting_booking ? <PageLoading title="details" /> : 
                <div className="w-full lg:w-4/5">
                    <CustomBrokerageTitle />
                    <div className="pb-8 border-b-[0px] border-solid border-[#EAEFEB] mt-6">
                        <div className="rounded solid-br bg-[#109b320d]">
                            <div className="pl-8 py-5 pr-6 flex items-start border-b-[1px] border-solid border-[#e5e7eb]">   
                                <div>
                                    <h2 className="black-text-3 text-lg font-normal">Custom Brokerage Details</h2>
                                    <p className="black-text-4 text-sm font-light">Please provide the required information</p>
                                </div>
                                <Link
                                    to={`/custom-brokerage/${id}`}
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
                                {/* <div className="flex items-center gap-2">
                                    <span><img className="min-w-[32px]" src={port} alt="" /></span>
                                    <div className="">
                                    <p className="grey-text font-light text-sm mb-1">Origin Port</p>
                                    <p className="black-text-4 text-sm font-medium">{booking_data?.origin_port_code ? getPortNameByCode(_Json.JSON, booking_data?.origin_port_code) : 'N/A'}</p>
                                    </div>
                                </div> */}
                                <div className="flex items-center gap-2">
                                    <span><img className="min-w-[32px]" src={shipType} alt="" /></span>
                                    <div className="">
                                    <p className="grey-text font-light text-sm mb-1">Shipment Type</p>
                                    <p className="black-text-4 text-sm font-medium capitalize">{booking_data?.shipment_type ? booking_data?.shipment_type : 'N/A'}</p>
                                    </div>
                                </div>
                                </div>
                                <div className="lg:border-r-[1px] border-solid border-[#e5e7eb] lg:pl-4">
                                <div className="flex items-center gap-2">
                                    <span><img className="min-w-[32px]" src={destination} alt="" /></span>
                                    <div className="">
                                    <p className="grey-text font-light text-sm mb-1">Port Name</p>
                                    <p className="black-text-4 text-sm font-medium">{booking_data?.shipment_type === "import" ? getPortNameByCode(_Json.JSON, booking_data?.port_of_discharge) : getPortNameByCode(_Json.JSON,booking_data?.port_of_loading)}</p>
                                    </div>
                                </div>
                                </div>
                                <div className="lg:pl-4 flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span><img className="min-w-[32px]" src={commType} alt="" /></span>
                                    <div className="">
                                    <p className="grey-text font-light text-sm mb-1">Commodity Type</p>
                                    <p className="black-text-4 text-sm font-medium capitalize">{booking_data?.goods_type ? booking_data?.goods_type : 'N/A'}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {Object.keys(booking_data).length > 0 && 
                        <CustomBrokerageContainer 
                            control={control}
                            errors={errors}
                            booking_data={booking_data}
                            isInCustoms={false}
                        />
                        }
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
                                loading={confirming_booking}
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
};

const mapStateToProps = (state) => {
    const { error, getting_booking, booking_data } = state.booking;
    const { booking_summary, confirming_booking } = state.additionalDetails;

    return { error, getting_booking, booking_data, booking_summary, confirming_booking }
}

export default connect(mapStateToProps, { getBookingDetailsById, confirmBooking, clearBooking })(InCustomBrokerage);