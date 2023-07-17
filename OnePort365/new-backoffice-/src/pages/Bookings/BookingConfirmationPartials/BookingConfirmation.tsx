import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleBooking } from "store/actions";
// import ExportAirDTDConfirmation from './AirFreightComponent/DoorToDoorAirFreight/ExportAirDTDConfirmation';
// import ImportAirDTDConfirmation from "./AirFreightComponent/DoorToDoorAirFreight/ImportAirDTDConfirmation";
// import ExportAirADConfirmation from "./AirFreightComponent/AirportDeliveryAirFreight/ExportAirADConfirmation";
// import ImportAirADConfirmation from "./AirFreightComponent/AirportDeliveryAirFreight/ImportAirADConfirmation";
import ExportAirfreightConfirmation from "./AirFreightComponent/ExportAirfrieght/ExportAirfreightConfirmation";
import ImportAirFreightComfirmation from "./AirFreightComponent/ImportAirFreight/ImportAirFreightComfirmation";
import ExportCBTConfirmation from './CBTComponent/ExportCBTConfirmation';
import ImportCBTConfirmation from './CBTComponent/ImportCBTConfirmation';
import ExportHaulageConfirmation from './HaulageComponent/ExportHaulageConfirmation';
import ImportHaulageConfirmation from './HaulageComponent/ImportHaulageConfirmation';
import ExportOceanConfirmation from './OceanFreightComponent/ExportOceanConfirmation';
import ImportOceanConfirmation from './OceanFreightComponent/ImportOceanConfirmation';
import ExportWarehousingConfirmation from './WarehousingComponent/ExportWarehousingConfirmation';
import ImportWarehousingConfirmation from './WarehousingComponent/ImportWarehousingConfirmation';


function BookingConfirmation(props: any) {
    const [openAside, SetOpenAside] = useState(false);
    const params = useParams();
    const { single_booking, loading } = props
    const single_booking_details = single_booking?.booking_details
    console.log(single_booking_details)
    console.log(single_booking_details)

    useEffect(() => {
        props.getSingleBooking(params.id, `format_containers=${true}`);
        // props.getSingleBooking(params.id, "")
    }, []);

    return (
        <div className="flex">
            <Aside
                activeTab="Booking"
                openAside={openAside}
                SetOpenAside={SetOpenAside}
            />
            <div className="dashboard-content">
                <TopBar title={"Booking"} SetOpenAside={SetOpenAside} />
                {
                    loading ? (
                        <div className="text-center my-3 ml-5">
                            <Link to="#" className="text-success">
                                {/* @ts-ignore */}
                                <PrimaryButton
                                    title="Loading Booking Details"
                                    loading={loading}
                                />
                            </Link>
                        </div>
                    ) : (
                        <div>
                            {
                                single_booking_details?.shipment_transport_type === 'ocean_freight' && single_booking_details?.shipment_type === 'export' ? (
                                    <>
                                        <ExportOceanConfirmation />
                                    </>

                                ) : single_booking_details?.shipment_transport_type === 'ocean_freight' && single_booking_details?.shipment_type === 'import' ? (
                                    <>
                                        <ImportOceanConfirmation />
                                    </>

                                ) : single_booking_details?.shipment_transport_type === 'haulage' && single_booking_details?.shipment_type === 'export' ? (
                                    <>
                                        <ExportHaulageConfirmation />
                                    </>

                                ) : single_booking_details?.shipment_transport_type === 'haulage' && single_booking_details?.shipment_type === 'import' ? (
                                    <>
                                        <ImportHaulageConfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'air_freight' && single_booking_details?.shipment_type === 'export' ? (
                                    <>
                                        <ExportAirfreightConfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'air_freight' && single_booking_details?.shipment_type === 'import' ? (
                                    <>
                                        <ImportAirFreightComfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'warehousing' && single_booking_details?.shipment_type === 'export' ? (
                                    <>
                                        <ExportWarehousingConfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'warehousing' && single_booking_details?.shipment_type === 'import' ? (
                                    <>
                                        <ImportWarehousingConfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'customs_brokerage' && single_booking_details?.shipment_type === 'export' ? (
                                    <>
                                        <ExportCBTConfirmation />
                                    </>
                                ) : single_booking_details?.shipment_transport_type === 'customs_brokerage' && single_booking_details?.shipment_type === 'import' ? (
                                    <>
                                        <ImportCBTConfirmation />
                                    </>
                                ) : (
                                    <>
                                    </>
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

// export default BookingConfirmation

const mapStateToProps = (state: any) => {
    const { single_booking, loading } = state.bookings;
    return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(BookingConfirmation);

