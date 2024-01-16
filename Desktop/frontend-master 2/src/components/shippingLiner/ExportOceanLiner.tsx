import React, { useEffect, useState, useCallback } from "react";
// import { useLocation } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { getShipmentById, getLiveRate } from "store/actions";

//components
import ShipmentStepper from "components/rate/ShipmentStepper";
import OceanFreightSummary from "components/shippingLiner/OceanFreightSummary";
import OceanFreightRates from "components/shippingLiner/OceanFreightRates";
import PageLoading from "components/partials/pageLoading";

const ExportOceanLiner = (props: any) => {
  // const location = useLocation();
  // const id = location.state.id;

  const {
    id,
    error,
    getting_shipments,
    shipment_data,
    loading,
    live_rates,
    container_details,
    live_rate_loading,
    getShipmentById,
    getLiveRate,
  } = props;

  const [rateType, setRateType] = useState("");
  // console.log("rateType>>>", rateType)

  console.log("shipmentData>>>", shipment_data);

  // fetches live rates based on type; type = quickest delivery or lowest prices
  const getLiveRateType = useCallback(() => {
    getLiveRate({
      id: id,
      query: `type=${rateType}`,
    });
  }, [id, rateType]);

  useEffect(() => {
    id && getShipmentById(id);
  }, [id]);

  useEffect(() => {
    id && getLiveRateType();
  }, [getLiveRateType]);

  return (
    <>
      {" "}
      {getting_shipments ? (
        <PageLoading title="shipping liner details." />
      ) : (
        <div>
          {" "}
          <ShipmentStepper />{" "}
          <OceanFreightSummary id={id} shipment_data={shipment_data} />{" "}
          <OceanFreightRates
            id={id}
            live_rates={live_rates}
            currency={shipment_data?.goods_value_currency}
            rateType={rateType}
            setRateType={setRateType}
            rateLoading={live_rate_loading}
          />{" "}
        </div>
      )}
    </>
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
    live_rate_loading,
    live_rates,
  } = state.booking;
  return {
    error,
    getting_shipments,
    live_rate_loading,
    shipment_data,
    container_details,
    shipment_id_data,
    live_rates,
    loading,
  };
};
export default connect(mapStateToProps, { getShipmentById, getLiveRate })(
  ExportOceanLiner
);
