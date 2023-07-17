import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBooking } from "store/actions";
import Moment from 'react-moment';


function HaulageDetails(props: any) {
    const params = useParams();
    const { single_booking, loading } = props;
    console.log(single_booking)
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const single_booking_details_customs = single_booking?.customs
    console.log(single_booking_details_customs)

    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Haulage Details
            </p>
            {
                single_booking?.booking_details?.shipment_type === 'export' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Stuffing Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.stuffing_location === "" ? 'N/A' : single_booking?.booking_details?.stuffing_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Port of Loading</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.origin_port_code === "" ? 'N/A' : single_booking?.booking_details?.origin_port_code}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Destination Port</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.terminal_port === "" ? 'N/A' : single_booking?.booking_details?.terminal_port}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Escort</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.with_escort === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Tracker</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.with_tracker === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Stuffing Date</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize"><Moment format="DD-MM-YYYY">{single_booking?.booking_details?.stuffing_date}</Moment></p>
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
                                <p className="black-text text-sm py-3 px-5 ">Delivery Location</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.delivery_location === "" ? 'N/A' : single_booking?.booking_details?.delivery_location}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Escort</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.with_escort === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Haulage Tracker</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.with_tracker === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">TBL</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.with_tbl === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        {/* {
                            single_booking?.booking_details?.with_tbl === true ? (
                                <>
                                 <div className="solid-br ">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">TBL Type</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.tbl_type === "" ? 'TBL Type Was Not Selected' : single_booking?.booking_details?.tbl_type}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        } */}
                        {
                            single_booking?.booking_details?.with_tbl === false ? (
                                <>

                                </>
                            ) : (
                                <>

                                    <div className="solid-br ">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">TBL Type</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.tbl_type === undefined ? 'N/A' : single_booking?.booking_details?.tbl_type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="solid-br ">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Customs Brokerage</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.customs_brokerage === true ? 'Yes' : 'No'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="solid-br ">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Brokerage Type</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.brokerage_type === undefined ? 'N/A' : single_booking?.booking_details?.brokerage_type}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">TDO Written Date</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {/* {single_booking?.booking_details?.tdo_written_date === null ? 'N/A' : single_booking?.booking_details?.tdo_written_date} */}
                                    <Moment format="DD-MM-YYYY">{single_booking?.booking_details?.tdo_written_date === null ? 'N/A' : single_booking?.booking_details?.tdo_written_date}</Moment>
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">TDO Expiry Date</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    <Moment format="DD-MM-YYYY">{single_booking?.booking_details?.tdo_expiry === null ? 'N/A' : single_booking?.booking_details?.tdo_expiry}</Moment>
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

// export default HaulageDetails

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(HaulageDetails);



