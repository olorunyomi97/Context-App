import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBooking } from "store/actions";


function OceanFreightDetails(props: any) {
    const params = useParams();
    const { single_booking, loading } = props;
    console.log(single_booking)
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)

    return (
        <div>
            <p className="black-text text-base mt-10 mb-3 font-semibold">
                Ocean Freight Fees
            </p>

            {
                single_booking?.ocean_freight === null ? (
                    <>
                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="solid-br">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Ocean Freight Was not selected</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">Charges do not apply</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>

                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="solid-br">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Shipping Liner</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.ocean_freight?.rates_data?.carrier_name === undefined ? "N/A" : single_booking?.ocean_freight?.rates_data?.carrier_name}</p>
                                </div>
                            </div>
                            {
                                single_booking?.ocean_freight?.charges[0].map((data, idx) => {
                                    return (
                                        <>
                                            <div className="solid-br">
                                                <div className="grid grid-cols-2">
                                                    <p className="black-text text-sm py-3 px-5 ">{data?.description}</p>
                                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">${data?.amountUsd?.toFixed(2) === undefined ? "N/A" : data?.amountUsd?.toFixed(2)}</p>
                                                </div>
                                            </div>

                                        </>
                                    )
                                })
                            }

                            {/* <div className="solid-br">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">{single_booking?.ocean_freight?.charges}</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">${single_booking?.ocean_freight?.charges[0][0]?.amountUsd === undefined ? "N/A" : single_booking?.ocean_freight?.charges[0][0]?.amountUsd}</p>
                                </div>
                            </div> */}

                            {/* <div className="solid-br">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Environmental Fuel Fee</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">${single_booking?.ocean_freight?.charges[0][1]?.amountUsd === undefined ? "N/A" : single_booking?.ocean_freight?.charges[0][1]?.amountUsd}</p>
                                </div>
                            </div>

                            <div className="solid-br">
                                <div className="grid grid-cols-2">
                                    <p className="black-text text-sm py-3 px-5 ">Low Sulphur Surcharge</p>
                                    <p className="black-text text-sm left-divider py-3 px-5 capitalize">${single_booking?.ocean_freight?.charges[0][2]?.amountUsd === undefined ? "N/A" : single_booking?.ocean_freight?.charges[0][2]?.amountUsd}</p>
                                </div>
                            </div> */}
                        </div>
                    </>
                )
            }

            {
                single_booking?.booking_details?.shipment_type === "export" && single_booking?.booking_details?.shipment_transport_type === 'ocean_freight' ? (
                    <>
                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Export & Ocean Freight Location Details
                        </p>

                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Origin Port
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5">
                                    {single_booking?.booking_details?.origin_port_code}
                                </p>
                            </div>
                        </div>

                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Destination Port
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.destination_port_code}
                                </p>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                    </>
                )
            }

            {
                single_booking?.booking_details?.shipment_type === "import" && single_booking?.booking_details?.shipment_transport_type === 'ocean_freight' ? (
                    <>
                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Import & Ocean Freight Location Details
                        </p>

                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Origin Port
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5">
                                    {single_booking?.booking_details?.port_of_discharge === undefined ? 'N/A' : single_booking?.booking_details?.port_of_discharge}
                                </p>
                            </div>
                        </div>

                        <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Destination Port
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.delivery_location === undefined ? 'N/A' : single_booking?.booking_details?.delivery_location}
                                </p>
                            </div>
                        </div>
                        {
                            single_booking?.booking_details?.shipment_type === "import" && single_booking?.booking_details?.shipment_transport_type === 'ocean_freight' && single_booking?.booking_details?.with_haulage == true ? (
                                <>
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Haulage Drop off Location Port
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.port_of_discharge === undefined ? 'N/A' : single_booking?.booking_details?.port_of_discharge}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider rounded-t-lg">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Haulage Delivery Location
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.booking_details?.delivery_location === undefined ? 'N/A' : single_booking?.booking_details?.delivery_location}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Additional Services
                        </p>
                        <div className="grid grid-cols-2 solid-br">
                            <p className="black-text text-sm py-3 px-5 ">
                                TBL
                            </p>
                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                {single_booking?.booking_details?.with_tbl === true ? 'Yes' : 'No'}
                            </p>
                        </div>

                        {
                            single_booking?.booking_details?.with_tbl === false ? (
                                <>
                                    <div className="grid grid-cols-2 solid-br">
                                        <p className="black-text text-sm py-3 px-5 ">
                                            TBL Type
                                        </p>
                                        <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                            TBL Was Not Selected
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="grid grid-cols-2 solid-br">
                                        <p className="black-text text-sm py-3 px-5 ">
                                            TBL Type
                                        </p>
                                        <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                            {single_booking?.booking_details?.tbl_type === "" ? 'N/A' : single_booking?.booking_details?.tbl_type}
                                        </p>
                                    </div>
                                </>
                            )
                        }
                        <div className="rounded-t-lg">
                            <div className="grid grid-cols-2 solid-br">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Customs Brokerage
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.customs_brokerage === true ? 'Yes' : 'No'}
                                </p>
                            </div>
                            {
                                single_booking?.booking_details?.customs_brokerage === false ? (
                                    <>
                                        <div className="grid grid-cols-2 solid-br">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Brokerage Type
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                Customs Brokerage Was Not Selected
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 solid-br">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Brokerage Type
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                {single_booking?.booking_details?.brokerage_type === undefined ? 'N/A' : single_booking?.booking_details?.brokerage_type}
                                            </p>
                                        </div>
                                    </>
                                )
                            }
                            {/* <div className="grid grid-cols-2 solid-br">
                                <p className="black-text text-sm py-3 px-5 ">
                                    Brokerage Type
                                </p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.brokerage_type === undefined ? 'N/A' : single_booking?.booking_details?.brokerage_type}
                                </p>
                            </div> */}


                        </div>
                    </>
                ) : (
                    <></>
                )
            }


        </div>
    )
}

// export default OceanFreightDetails

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(OceanFreightDetails);




