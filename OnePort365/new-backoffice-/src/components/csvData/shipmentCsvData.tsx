import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getShipments } from "store/actions";
import { CSVLink, CSVDownload } from "react-csv";
import PrimaryButton from "components/buttons/PrimaryButton";

const ShipmentCsvData = (props: any) => {
    const { my_shipments, getShipments, loading } = props;
    const csv_shipment_data = my_shipments?.data?.data
    console.log(csv_shipment_data);

    const csvData = csv_shipment_data;
    const headers = [
        { label: "Job Number", key: "job_number" },
        { label: "Client Name", key: "client_name" },
        { label: "Client Email", key: "client_email" },
        { label: "Container Count", key: "container_count" },
        { label: "Container Size", key: "ccontainer_size" },
        { label: "Container Type", key: "container_type" },
        { label: "B/L Number", key: "bl_number" },
        { label: "Branch", key: "branch_code" },
        { label: "Activity Status", key: "activity_status" },
        { label: "Export Origin", key: "origin_port_code" },
        { label: "Export Destination", key: "destination_port_code" },
        { label: "Import Origin", key: "port_of_discharge" },
        { label: "Import Destination", key: "delivery_location" },

    ]

    useEffect(() => {
        props.getShipments();
    }, [getShipments]);


    return (
        <div className="mr-1">
            {loading ? (
                <div className="text-center my-3">
                    <Link to="#" className="text-success">
                        {/* @ts-ignore */}
                        <PrimaryButton
                            title="Loading Shipments"
                            loading={loading}
                        />
                    </Link>
                </div>
            ) : (
                <>
                    <CSVLink
                        className="p-4 bg-grey black-text text-xs w-32 py-2.5 text-center rounded solid-br"
                        data={csvData}
                        headers={headers}
                        filename={"shipment.csv"}
                    >
                        Export as CSV
                    </CSVLink>
                </>
            )}

        </div>
    )
}

// export default ShipmentCsvData;

const mapStateToProps = (state: any) => {
    const { my_shipments, error, loading } = state.shipments;
    return { my_shipments, error, loading };
};
export default connect(mapStateToProps, { getShipments })(ShipmentCsvData);
