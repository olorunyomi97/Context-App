import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBooking } from "store/actions";


function CBTDetails(props: any) {
    const params = useParams();
    const { single_booking, loading } = props;
    console.log(single_booking)
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const single_booking_details_customs = single_booking?.customs
    console.log(single_booking_details_customs)


    useEffect(() => {
        // props.getSingleBooking(params.id, "")
        props.getSingleBooking(params.id, `format_containers=${true}`)
    }, []);

    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Custom Brokerage
            </p>
            {
                single_booking?.booking_details?.shipment_type === 'export' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Origin Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.origin_port_code === "" ? 'N/A' : single_booking?.booking_details?.origin_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Delivery Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.delivery_location === "" ? 'N/A' : single_booking?.booking_details?.delivery_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Consignee Name</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.consignee_name === "" ? 'N/A' : single_booking_details_customs?.consignee_name}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Consignee Address</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.consignee_address === "" ? 'N/A' : single_booking_details_customs?.consignee_address}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Mode Of Transportaion</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_booking_details_customs?.mode_of_transport === "" ? 'N/A' : single_booking_details_customs?.mode_of_transport}
                                </p>
                            </div>
                        </div>
                        {/* <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Brokerage Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_booking_details_customs?.brokerage_type === "" ? 'N/A' : single_booking_details_customs?.brokerage_type}
                                </p>
                            </div>
                        </div> */}
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Nepc Number</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.nepc_number === "" ? 'N/A' : single_booking_details_customs?.nepc_number}
                                </p>
                            </div>
                        </div>
                    </>
                ) : single_booking?.booking_details?.shipment_type === 'import' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Pick Up Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.pickup_location === "" ? 'N/A' : single_booking?.booking_details?.pickup_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Destination Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.destination_port_code === "" ? 'N/A' : single_booking?.booking_details?.destination_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Sender Name</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.sender_name === "" ? 'N/A' : single_booking_details_customs?.sender_name}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Sender Address</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.sender_address === "" ? 'N/A' : single_booking_details_customs?.sender_address}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Mode Of Transportaion</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_booking_details_customs?.mode_of_transport === "" ? 'N/A' : single_booking_details_customs?.mode_of_transport}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Brokerage Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                    {single_booking_details_customs?.brokerage_type === "" ? 'N/A' : single_booking_details_customs?.brokerage_type}
                                </p>
                            </div>
                        </div>
                        {/* <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Nepc Number</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_customs?.nepc_number === "" ? 'N/A' : single_booking_details_customs?.nepc_number}
                                </p>
                            </div>
                        </div> */}
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

// export default CBTDetails
const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(CBTDetails);


