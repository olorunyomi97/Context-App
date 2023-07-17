import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const NewCustomDateFilter = (props: any) => {
	const { placeholder } = props;
	const [dateRange, setDateRange] = useState([null, null]);
	const [startDate, endDate] = dateRange;

	return (
		<>
			<div className=" items-center mt-1.5 mb-2  ">
				<h3 className="text-xl white-text font-semibold"></h3>
				<>
					<div className=" w-full">
						<DatePicker
							className="form-input pl-4 pr-10 py-2.5 text-xs custom-input rounded  w-full black-text bg-white"
							selectsRange={true}
							startDate={startDate}
							endDate={endDate}
							onChange={(update) => {
								setDateRange(update);
								console.log("testing the code");
								console.log("date-update", update.length);
							}}
							isClearable={true}
							placeholderText={placeholder}
						/>
					</div>
					<div className="pl-5 ml-auto">
						{/* <Link
                        style={{textDecoration: 'none', marginBottom:"20px"}}
                        to='/add-shipment'
                        // to="/add-oceanfreight-shipment"
                        className="bg-green white-text text-xs py-3 px-4 w-full rounded mb-3"
                    >
                        Add New Shipment +
                    </Link>  */}
					</div>
				</>
			</div>
		</>
	);
};

// export default ShipmentDropdown
const mapStateToProps = (state: any) => {
	const { error, loading } = state.customers;
	return { error, loading };
};

export default connect(mapStateToProps)(NewCustomDateFilter);
