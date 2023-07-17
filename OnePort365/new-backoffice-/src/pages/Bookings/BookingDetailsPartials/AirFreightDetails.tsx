import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleBooking } from "store/actions";
import movement from "assets/icons/movement.svg";


function AirFreightDetails(props: any) {
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
                Air Freight Details
            </p>
            {
                single_booking?.booking_details?.shipment_type === 'export' ? (
                    <>
                        <div className="top-divider left-divider right-divider">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Air Freight Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.air_freight?.air_freight_type}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Airline</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.air_freight?.airline}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Count</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_count === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_count}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Width</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_width === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_width}(Inches)</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Height</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_height === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_height}(Inches)</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Weight</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_weight === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_weight}(KG)</p>
                            </div>
                        </div>


                        {
                            single_booking?.air_freight?.air_freight_type === 'airport delivery' ? (
                                <>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Origin Airport</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.origin_port_code === undefined ? "N/A" : single_booking?.booking_details?.origin_port_code}</p>
                                        </div>
                                    </div>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Destination Airport</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.destination_port_code === undefined ? "N/A" : single_booking?.booking_details?.destination_port_code}</p>
                                        </div>
                                    </div>
                                </>
                            ) : single_booking?.air_freight?.air_freight_type === 'door to door' ? (
                                <>
                                    {/* <p className="black-text text-base mt-10 mb-3 font-semibold">
                                        Air Freight Locations
                                    </p> */}
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Door 1 to Airport 1
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.pickup_location}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.origin_port_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Airport 1 to Airport 2
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.origin_port_code}{" "}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {" "}
                                                    {single_booking?.booking_details?.destination_port_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Airport 2 to Door 2
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.destination_port_code}{" "}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {" "}
                                                    {single_booking?.booking_details?.delivery_location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="black-text text-base mt-10 mb-3 font-semibold">
                                        Consignee Details
                                    </p>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 capitalize">
                                                Consignee Name
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                {single_booking?.air_freight?.consignee_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 capitalize">
                                                Consignee Number
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.air_freight?.consignee_phone}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }



                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Additional Comments
                        </p>

                        <div className="top-divider left-divider right-divider bottom-divider">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Additional Comment</p>
                                <p className="black-text text-sm left-divider py-3 px-5 ">
                                    {single_booking?.booking_details?.additional_comments}
                                </p>
                            </div>
                        </div>
                    </>
                ) : single_booking?.booking_details?.shipment_type === 'import' ? (
                    <>
                        <div className="top-divider left-divider right-divider">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Air Freight Type</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.air_freight?.air_freight_type}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Airline</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.air_freight?.airline}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Count</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_count === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_count}</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Width</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_width === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_width}(Inches)</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Height</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_height === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_height}(Inches)</p>
                            </div>
                        </div>
                        <div className="solid-br">
                            <div className="grid grid-cols-2">
                                <p className="black-text text-sm py-3 px-5 ">Cargo Weight</p>
                                <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.air_cargo_details[0]?.container_weight === undefined ? "N/A" : single_booking?.booking_details?.air_cargo_details[0]?.container_weight}(KG)</p>
                            </div>
                        </div>

                        <p className="black-text text-base mt-10 mb-3 font-semibold">
                            Locations
                        </p>
                        {
                            single_booking?.air_freight?.air_freight_type === 'airport delivery' ? (
                                <>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Origin Airport</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.origin_port_code === undefined ? "N/A" : single_booking?.booking_details?.origin_port_code}</p>
                                        </div>
                                    </div>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">Destination Airport</p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.destination_port_code === undefined ? "N/A" : single_booking?.booking_details?.destination_port_code}</p>
                                        </div>
                                    </div>
                                </>
                            ) : single_booking?.air_freight?.air_freight_type === 'door to door' ? (
                                <>
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Door 1 to Airport 1
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.pickup_location}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.origin_port_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Airport 1 to Airport 2
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.origin_port_code}{" "}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {" "}
                                                    {single_booking?.booking_details?.destination_port_code}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="top-divider left-divider right-divider bottom-divider">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 ">
                                                Airport 2 to Door 2
                                            </p>
                                            <div className="grid grid-cols-3">
                                                <p className="left-divider black-text text-sm py-3 px-5 ">
                                                    {single_booking?.booking_details?.destination_port_code}{" "}
                                                </p>
                                                <p className="pt-5">
                                                    <img src={movement} width="10%" height="10%" />
                                                </p>
                                                <p className="black-text text-sm py-3 px-5 ">
                                                    {" "}
                                                    {single_booking?.booking_details?.delivery_location}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="black-text text-base mt-10 mb-3 font-semibold">
                                        Sender Details
                                    </p>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 capitalize">
                                                Sender Name
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 capitalize">
                                                {single_booking?.air_freight?.sender_name}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="solid-br">
                                        <div className="grid grid-cols-2">
                                            <p className="black-text text-sm py-3 px-5 capitalize">
                                                Sender Number
                                            </p>
                                            <p className="black-text text-sm left-divider py-3 px-5 ">
                                                {single_booking?.air_freight?.sender_phone}
                                            </p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <></>
                            )
                        }

                    </>
                ) : (
                    <></>
                )
            }
        </div>
    )
}


const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(AirFreightDetails);


