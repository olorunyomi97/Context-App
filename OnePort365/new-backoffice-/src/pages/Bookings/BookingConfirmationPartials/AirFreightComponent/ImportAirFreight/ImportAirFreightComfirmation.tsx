import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import CustomRadio from "components/selectInputs/CustomRadio";
import { useParams } from "react-router-dom";
import { getSingleBooking, editBookingDetails } from "store/actions";
import ImportAirADConfirmation from "./ImportAirADConfirmation";
import ImportAirDTDConfirmation from "./ImportAirDTDConfirmation";


function ImportAirConfirmation(props: any) {
    const params = useParams();
    const { loading, single_booking } = props;
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    const [airfreightType, setAirfreightType] = useState('');
    const [showADAirfreightType, setShowADAirfreightType] = useState(false);
    const [showDTDAirfreightType, setShowDTDAirfreightType] = useState(false);


    // useEffect(() => {
    //     if (single_booking_details) {
    //         setAirfreightType(single_booking?.airfreight_type);
    //     }
    // }, [single_booking_details]);


    return (
        <>
            <div className="">
                <div>
                    <div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
                        <div className="mt-2">
                            <p className="font-semibold text-lg">
                                Job Number : {single_booking_details?.job_number === undefined ? 'N/A' : single_booking_details?.job_number}
                            </p>
                        </div>
                        <div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
                            <small>Bookings </small>
                            <small style={{ color: "grey" }}>
                                {" "}
                                / Confirm Import Booking & AirFreight
                            </small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="lg:px-10 mb-3">
                <div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
                    {/* <form onSubmit={handleSubmit(onSubmit)} className="my-5"> */}
                    <div className="lg:px-8 px-5">

                        <div className="mt-3 items-center ">
                            <div className="mt-3">

                                {
                                    single_booking?.air_freight?.air_freight_type === "airport delivery" ? (
                                        <>
                                            <ImportAirADConfirmation single_booking={single_booking} />
                                        </>
                                    ) : single_booking?.air_freight?.air_freight_type === "door to door" ? (
                                        <>
                                            <ImportAirDTDConfirmation single_booking={single_booking} />
                                        </>
                                    ) : (
                                        <>
                                            <p className="add-shipment-text mb-5">
                                                Import Shipment & AirFreight
                                            </p>
                                            <p className="text-xs black-text font-medium mb-2">
                                                Select Air Freight Type ?<span className="red-text">*</span>
                                            </p>
                                            <div className="grid grid-cols-2">
                                                <div className="">
                                                    <CustomRadio
                                                        // @ts-ignore
                                                        selected={airfreightType === 'true' ? true : false}
                                                        // selected={bagged}
                                                        label={"Airport Delivery"}
                                                        onClick={() => {
                                                            setAirfreightType('true')
                                                            setShowADAirfreightType(!showADAirfreightType);
                                                            setShowDTDAirfreightType(false)

                                                        }}

                                                    />
                                                </div>

                                                <div className="ml-2">
                                                    <CustomRadio
                                                        // selected={!bagged}
                                                        selected={airfreightType === 'false' ? true : false}
                                                        label={"Door To Door Delivery"}
                                                        onClick={() => {
                                                            setAirfreightType('false')
                                                            setShowDTDAirfreightType(!showDTDAirfreightType)
                                                            setShowADAirfreightType(false)
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            {
                                                showADAirfreightType ? (
                                                    <>
                                                        <ImportAirADConfirmation single_booking={single_booking} />
                                                    </>
                                                ) : (
                                                    <>

                                                    </>
                                                )
                                            }

                                            {
                                                showDTDAirfreightType ? (
                                                    <>
                                                        <ImportAirDTDConfirmation single_booking={single_booking} />
                                                    </>
                                                ) : (
                                                    <>

                                                    </>
                                                )
                                            }
                                        </>
                                    )
                                }







                            </div>
                        </div>
                    </div>
                    {/* </form> */}
                </div>
            </div>
        </>
    )
}

// export default ExportAirConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};
export default connect(mapStateToProps, { getSingleBooking, editBookingDetails })(ImportAirConfirmation);


