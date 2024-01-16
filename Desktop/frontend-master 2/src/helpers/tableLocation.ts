const getOrigin = (row) => {
  let origin = "F/E";

  if (
    (row?.shipment_type === "export" &&
      row?.shipment_transport_type === "ocean_freight") 
    //   ||
    // (row?.shipment_type === "export" &&
    //   row?.shipment_transport_type === "customs_brokerage")
  ) {
    origin = row.origin_port_code ? row.origin_port_code : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "warehousing"
  ) {
    origin = row.port_of_loading ? row.port_of_loading : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "air_freight"
  ) {
    origin = row.origin_port_code ? row.origin_port_code : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "haulage"
  ) {
    origin = row.stuffing_location ? row.stuffing_location : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "ocean_freight"
  ) {
    origin = row.origin_port_code ? row.origin_port_code : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "customs_brokerage"
  ) {
    origin = row.port_of_discharge ? row.port_of_discharge : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "warehousing"
  ) {
    origin = "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "air_freight"
  ) {
    origin = row.origin_port_code ? row.origin_port_code : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "haulage"
  ) {
    origin = row.port_of_discharge ? row.port_of_discharge : "N/A";
  } else {
    origin = "N/A";
  }

  return origin;
};

export { getOrigin };

const getDestination = (row) => {
  let destination = "F/E";

  if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "ocean_freight"
  ) {
    destination = row.destination_port_code ? row.destination_port_code : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "customs_brokerage"
  ) {
    destination = row.port_of_loading ? row.port_of_loading : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "warehousing"
  ) {
    destination = "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "air_freight"
  ) {
    destination = row.destination_port_code ? row.destination_port_code : "N/A";
  } else if (
    row?.shipment_type === "export" &&
    row?.shipment_transport_type === "haulage"
  ) {
    destination = row.port_of_loading ? row.port_of_loading : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "ocean_freight"
  ) {
    destination = row.destination_port_code ? row.destination_port_code : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "customs_brokerage"
  ) {
    destination = row.destination_port_code ? "N/A" : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "warehousing"
  ) {
    destination = row.port_of_discharge ? row.port_of_discharge : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "air_freight"
  ) {
    destination = row.destination_port_code ? row.destination_port_code : "N/A";
  } else if (
    row?.shipment_type === "import" &&
    row?.shipment_transport_type === "haulage"
  ) {
    destination = row.delivery_location ? row.delivery_location : "N/A";
  } else {
    destination = "N/A";
  }

  return destination;
};

export { getDestination };
