import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//libraries
import { connect } from "react-redux";

// redux actions
import { getShipmentById, getBookingSummary } from "store/actions";

//components
import Layout from "components/layout/Layout";
import BookingDetails from "pages/booking/BookingDetails";
import BookingExportAir from "components/booking/BookingExportAir";
import BookingExportAirDoor from "components/booking/BookingExportAirDoor";
import BookingHaulage from "components/booking/BookingHaulage";
import BookingWarehousing from "components/booking/BookingWarehousing";
import BookingCBT from "components/booking/BookingCBT";
import PageLoading from "components/partials/pageLoading";

const BookingDetailsRoot = (props: any) => {
  const location = useLocation();
  const state = location.state;

  const params = useParams();
  const { id } = params;

  const navigate = useNavigate();

  const {
    getShipmentById,
    getting_shipments,
    loading,
    shipment_data,
    getBookingSummary,
    booking_summary,
    bookCategory,
  } = props;

  useEffect(() => {
    id && getShipmentById(id);
    id && getBookingSummary(id);
  }, []);

  const [components] = useState([
    {
      id: 1,
      component: (
        <BookingDetails bookCategory={state?.book_category} {...props} />
      ),
      service: "ocean_freight",
    },
    {
      id: 2,
      component: (
        <BookingExportAir bookCategory={state?.book_category} {...props} />
      ),
      service: "air_freight",
    },
    {
      id: 3,
      component: (
        <BookingHaulage bookCategory={state?.book_category} {...props} />
      ),
      service: "haulage",
    },
    {
      id: 4,
      component: (
        <BookingWarehousing bookCategory={state?.book_category} {...props} />
      ),
      service: "warehousing",
    },
    {
      id: 5,
      component: <BookingCBT bookCategory={state?.book_category} {...props} />,
      service: "customs_brokerage",
    },
  ]);

  const [activeComponent, setActiveComponent] = useState<any>({
    id: 1,
    component: <BookingDetails />,
    service: "ocean_freight",
  });

  useEffect(() => {
    if (shipment_data.shipment_transport_type && !loading) {
      setActiveComponent((getPrev: any) =>
        components.find(
          (item: any) => item.service === shipment_data.shipment_transport_type
        )
      );
    }
  }, [loading]);

  console.log("datehere>>>", shipment_data);

  return (
    <Layout>
      {loading || getting_shipments ? (
        <PageLoading title="booking details" />
      ) : shipment_data.shipment_transport_type === "ocean_freight" ? (
        <BookingDetails
          bookCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "air_freight" ? (
        <BookingExportAir
          bookCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "haulage" ? (
        <BookingHaulage
          bookCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "warehousing" ? (
        <BookingWarehousing
          bookCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "customs_brokerage" ? (
        <BookingCBT
          bookCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : null}
    </Layout>
  );
};

const mapStateToProps = (state) => {
  const {
    error,
    getting_shipments,
    shipment_data,
    shipment_id_data,
    container_details,
    loading,
    live_rates,
  } = state.booking;
  const { booking_summary } = state.additionalDetails;
  return {
    error,
    getting_shipments,
    shipment_data,
    container_details,
    shipment_id_data,
    live_rates,
    loading,
    booking_summary,
  };
};

export default connect(mapStateToProps, { getShipmentById, getBookingSummary })(
  BookingDetailsRoot
);
