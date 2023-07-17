import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getNewQuotes } from "store/actions";
import { CSVLink, CSVDownload } from "react-csv";
import PrimaryButton from "components/buttons/PrimaryButton";

const QuoteCsvData = (props: any) => {
    const { new_quotes, getNewQuotes, loading } = props;
    const csv_quote_data = new_quotes
    console.log(csv_quote_data);

    const csvData = csv_quote_data;
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
        props.getNewQuotes();
    }, [getNewQuotes]);


    return (
        <div className="mr-1">
            {loading ? (
                <div className="text-center my-3">
                    <Link to="#" className="text-success">
                        {/* @ts-ignore */}
                        <PrimaryButton
                            title="Loading Quotes"
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
                        filename={"quote.csv"}
                    >
                        Export as CSV
                    </CSVLink>
                </>
            )}

        </div>
    )
}

// export default QuoteCsvData;

const mapStateToProps = (state: any) => {
    const { new_quotes, error, loading } = state.newQuotes;
    return { new_quotes, error, loading };
};
export default connect(mapStateToProps, { getNewQuotes })(QuoteCsvData);
