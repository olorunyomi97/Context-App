import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

//libraries
import { connect } from "react-redux";

// redux actions
import {
  getShipmentById,
  getBookingSummary,
  clearBookingErrors,
} from "store/actions";

//components
import Layout from "components/layout/Layout";
import PageLoading from "components/partials/pageLoading";
import ShipmentDetails from "pages/shipment/ShipmentsDetails";
import ShipmentDetailAir from "components/shipment/ShipmentDetailAir";
import ShipmentDetailCBT from "components/shipment/ShipmentDetailCBT";
import ShipmentDetailHaulage from "components/shipment/ShipmentDetailHaulage";
import ShipmentDetailWarehousing from "components/shipment/ShipmentDetailWarehousing";

const ShipmentDetailsRoot = (props: any) => {
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
    error,
  } = props;

  // console.log("ksk>>>", shipment_data);

  useEffect(() => {
    // clearBookingErrors()
    id && getShipmentById(id, false);
    id && getBookingSummary(id);
  }, []);

  console.log("error>>>", error);

  if (error) {
    navigate("/invalidshipment");
  }

  const [components] = useState([
    {
      id: 1,
      component: <ShipmentDetailCBT shipCategory={state?.ship_category} />,
      service: "customs_brokerage",
    },
    {
      id: 2,
      component: <ShipmentDetailHaulage shipCategory={state?.ship_category} />,
      service: "haulage",
    },
    {
      id: 3,
      component: <ShipmentDetailAir shipCategory={state?.ship_category} />,
      service: "air_freight",
    },
    {
      id: 4,
      component: <ShipmentDetails shipCategory={state?.ship_category} />,
      service: "ocean_freight",
    },
    {
      id: 5,
      component: (
        <ShipmentDetailWarehousing shipCategory={state?.ship_category} />
      ),
      service: "warehousing",
    },
  ]);

  const [activeComponent, setActiveComponent] = useState<any>({
    id: 1,
    component: <ShipmentDetails />,
    service: "ocean_freight",
  });

  useEffect(() => {
    // if (!state?.ship_category) {
    //     navigate('/dashboard')
    //     return;
    // }
    if (shipment_data?.shipment_transport_type && !loading) {
      setActiveComponent((getPrev: any) =>
        components.find(
          (item: any) => item.service === shipment_data?.shipment_transport_type
        )
      );
    }
    // if (!components.find((item: any) => item.shipmentCategory === state?.shipmentCategory)) {
    //#ZILOS23050032
    // }
  }, []);

  return (
    <Layout>
      {loading || getting_shipments ? (
        <PageLoading title="shipment details" />
      ) : shipment_data.shipment_transport_type === "ocean_freight" ? (
        <ShipmentDetails
          shipCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "air_freight" ? (
        <ShipmentDetailAir
          shipCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "haulage" ? (
        <ShipmentDetailHaulage
          shipCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "warehousing" ? (
        <ShipmentDetailWarehousing
          shipCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : shipment_data.shipment_transport_type === "customs_brokerage" ? (
        <ShipmentDetailCBT
          shipCategory={
            shipment_data.shipment_type + shipment_data.shipment_transport_type
          }
          {...props}
        />
      ) : null}
    </Layout>
  );
};

//ZILOS23050032

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
  ShipmentDetailsRoot
);
