import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { getBookings } from "store/actions";
// import { CSVLink, CSVDownload } from "react-csv";
import PrimaryButton from "components/buttons/PrimaryButton";
const BookingCsvData = (props) => {
  const { bookings, loading } = props;
  console.log("csv booking", bookings);
  const csvData = bookings;
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
  ];
  useEffect(() => {
    props.getBookings();
  }, [getBookings]);
  return (
    <div></div>
    // <div className="mr-1">
    //   {" "}
    //   {loading ? (
    //     <div className="text-center my-3">
    //       {" "}
    //       <Link to="#" className="text-success">
    //         {" "}
    //         {/* @ts-ignore */}
    //         <PrimaryButton title="Loading Bookings" loading={loading} />{" "}
    //       </Link>{" "}
    //     </div>
    //   ) : (
    //     <>
    //       {" "}
    //       <CSVLink
    //         className="p-4 bg-grey black-text text-xs w-32 py-2.5 text-center rounded solid-br"
    //         data={csvData}
    //         headers={headers}
    //         filename={"bookings.csv"}
    //       >
    //         {" "}
    //         Export as CSV
    //       </CSVLink>{" "}
    //     </>
    //   )}
    // </div>
  );
};
// export default BookingCsvData
const mapStateToProps = (state: any) => {
  const { bookings, error, loading } = state.bookings;
  return { bookings, error, loading };
};
export default connect(mapStateToProps, { getBookings })(BookingCsvData);