import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBooking } from "store/actions";


function WarehousingDetails(props: any) {
    const params = useParams();
    const { single_booking, loading } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const single_booking_details_warehousing = single_booking?.warehousing
    console.log(single_booking_details_warehousing)


    useEffect(() => {
        // props.getSingleBooking(params.id, "")
        props.getSingleBooking(params.id, `format_containers=${true}`);
    }, []);


    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Warehousing
            </p>
            {
                single_booking?.booking_details?.shipment_type === 'export' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Port of Loading</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.port_of_loading === "" ? 'N/A' : single_booking?.booking_details?.port_of_loading}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Is Cargo Bagged</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.cargo_bagged === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Total Number of Bags</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.total_cargo_bags === undefined ? 'N/A' : single_booking_details_warehousing?.total_cargo_bags}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Warehousing Duration</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.warehousing_duration === "" ? 'N/A' : single_booking_details_warehousing?.warehousing_duration} (Weeks)
                                </p>
                            </div>
                        </div>
                    </>
                ) : single_booking?.booking_details?.shipment_type === 'import' ? (
                    <>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Port of Discharge</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.port_of_discharge === "" ? 'N/A' : single_booking?.booking_details?.port_of_discharge}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Is Cargo Bagged</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.cargo_bagged === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Total Number of Bags</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.total_cargo_bags === undefined ? 'N/A' : single_booking_details_warehousing?.total_cargo_bags}
                                </p>
                            </div>
                        </div>
                        <div className="solid-br ">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Warehousing Duration</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking_details_warehousing?.warehousing_duration === "" ? 'N/A' : single_booking_details_warehousing?.warehousing_duration}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )
            }
        </div>
    )
}

// export default WarehousingDetails

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(WarehousingDetails);



