import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getContainers } from "store/actions";
import { CSVLink, CSVDownload } from "react-csv";
import PrimaryButton from "components/buttons/PrimaryButton";

const ContainerCsvData = (props: any) => {
    const { containers, loading } = props;
    console.log(containers);

    const csvData = containers;
    const headers = [
        { label: "Container Number", key: "job_number" },
        { label: "Container Status", key: "container_status" },
        { label: "Container Size", key: "container_size" },
        { label: "Container Type", key: "container_type" },

    ]

    useEffect(() => {
        props.getContainers();
    }, [getContainers]);


    return (
        <div className="mb-7 mr-1">
            {loading ? (
                <div className="text-center my-3">
                    <Link to="#" className="text-success">
                        {/* @ts-ignore */}
                        <PrimaryButton
                            title="Loading Containers"
                            loading={loading}
                        />
                    </Link>
                </div>
            ) : (
                <>
                    <CSVLink
                        className="px-3 bg-grey black-text text-xs w-32 py-2 text-center rounded solid-br"
                        data={csvData}
                        headers={headers}
                        filename={"container.csv"}
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
    const { containers, error, loading } = state.containers;
    return { containers, error, loading };
};
export default connect(mapStateToProps, { getContainers })(ContainerCsvData);
