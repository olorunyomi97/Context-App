import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { getCustomers } from "store/actions";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ShipmentDropdown = (props: any) => {
  const { handleFilter } = props;
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  useEffect(() => {
    props.getCustomers();
  }, [getCustomers]);
  return (
    <>
      <div className="flex items-center mt-5 mb-2 mobile-padding">
        <h3 className="text-xl white-text font-semibold"></h3>
        <>
          <div className="">
            <DatePicker
              className="form-input lg:px-10 py-3 text-xs custom-input rounded  w-full black-text bg-grey z-50"
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
                console.log("testing the code");
                console.log("date-update", update.length);
                handleFilter(update, "shipment_date");
              }}
              isClearable={true}
              placeholderText={"Filter Shipment by Date"}
            />
          </div>
          <div className="pl-5 ml-auto">
            <Link
              style={{ textDecoration: "none", marginBottom: "20px" }}
              to="/add-shipment"
              // to="/add-oceanfreight-shipment"
              className="bg-green white-text text-xs py-3 px-4 w-full rounded mb-3"
            >
              Add New Shipment +
            </Link>
          </div>
        </>
      </div>
    </>
  );
};

// export default ShipmentDropdown
const mapStateToProps = (state: any) => {
  const { customers, error, loading } = state.customers;
  return { customers, error, loading };
};

export default connect(mapStateToProps, { getCustomers })(ShipmentDropdown);
