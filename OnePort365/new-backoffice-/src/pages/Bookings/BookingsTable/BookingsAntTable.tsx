import React, { useEffect, useState } from "react";
import { Table } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import BookingCsvData from "components/csvData/bookingCsvData";

const BookingsAntTable = (props: any) => {
	const {
		filteredBookings,
		total_count,
		handlePerRowsChange,
		handlePageChange,
		handleSearch,
		setSelectedBookings,
		// setIsOpen,
		// setDataToDelete,
		handleFilter,
		filterObject,
	} = props;

	const [page, setPage] = useState(parseInt(filterObject.page));
	console.log("filteredBookings", filteredBookings);

	const [data, setData] = useState(filteredBookings);
	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	// prettier-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

	useEffect(() => {
		setData(filteredBookings);
	}, [filteredBookings]);

	useEffect(() => {
		setPage(parseInt(filterObject.page));
	}, [filterObject]);
	console.log("paggeeee", page);

	const columns = [
		{
			title: <small>Job Number</small>,
			dataIndex: "job_number",
			key: "job_number",
			fixed: "left",
			render: (_, { job_number }) => (
				<>
					<small> {job_number === undefined ? "N/A" : job_number}</small>
				</>
			),
		},
		{
			title: <small>Service Type</small>,
			dataIndex: "shipment_transport_type",
			key: "shipment_transport_type",
			render: (_, { shipment_transport_type }) => (
				<>
					<small>
						{shipment_transport_type === "air_freight" && "Air freight"}
					</small>
					<small>
						{shipment_transport_type === "ocean_freight" && "Ocean freight"}
					</small>
					<small>
						{shipment_transport_type === "warehousing" && "Warehousing"}
					</small>
					<small>
						{shipment_transport_type === "customs_brokerage" && "Customs Brokerage"}
					</small>
					<small>{shipment_transport_type === "haulage" && "Haulage"}</small>
				</>
			),
		},
		{
			title: <small>Client Details</small>,
			dataIndex: "customer_details",
			key: "customer_details",
			render: (_, { customer_details }) => (
				<>
					{customer_details.map((data) => {
						return (
							<small className="capitalize" key={data}>
								{data === undefined || null || "" ? "N/A" : data?.firstname}{" "}
								{data?.lastname}
							</small>
						);
					})}
				</>
			),
		},

		{
			title: <small>Booking Status</small>,
			dataIndex: "shipment_status",
			key: "shipment_status",
			render: (_, { shipment_status }) => (
				<>
					<small>
						{shipment_status === "new booking" ? (
							<Link
								to="#"
								className="capitalize bg-light-green green-text text-xs px-2 py-2 text-center rounded-full"
							>
								<small>{shipment_status}</small>
							</Link>
						) : shipment_status === "awaiting quotes" ? (
							<Link
								to="#"
								className="capitalize bg-light-purple purple-text text-xs px-2 py-2 red-text text-center rounded-full"
							>
								<small>{shipment_status}</small>
							</Link>
						) : shipment_status === "cancelled" ? (
							<Link
								to="#"
								className="capitalize bg-light-red red-text text-xs px-2 py-2 red-text text-center rounded-full"
							>
								<small>{shipment_status}</small>
							</Link>
						) : (
							<></>
						)}
					</small>
				</>
			),
		},
		{
			title: <small>Shipment Type</small>,
			dataIndex: "shipment_type",
			key: "shipment_type",
			render: (_, { shipment_type }) => (
				<>
					<small className="capitalize">{shipment_type}</small>
				</>
			),
		},
		{
			title: <small>Branch</small>,
			dataIndex: "branch",
			key: "name",
			render: (_, { branch }) => (
				<>
					<small className="capitalize">{branch === undefined ? "N/A" : branch}</small>
				</>
			),
		},

		{
			title: <small>B/L Number</small>,
			dataIndex: "bl_number",
			key: "name",
			render: (_, { bl_number }) => (
				<>
					<small>{bl_number ? bl_number : "N/A"}</small>
				</>
			),
		},
		{
			title: <small>Date Created</small>,
			dataIndex: "createdAt",
			key: "createdAt",
			render: (_, { createdAt }) => (
				<>
					<small>
						<Moment format="DD-MM-YYYY">{createdAt}</Moment>
					</small>
				</>
			),
		},
		{
			title: <small>Origin</small>,
			dataIndex: "origin_port_code",
			key: "origin_port_code",
			render: (
				_,
				{
					origin_port_code,
					shipment_type,
					shipment_transport_type,
					port_of_discharge,
					port_of_loading,
					terminal_port,
					pickup_location,
				}
			) => (
				<>
					{shipment_type === "export" &&
						shipment_transport_type === "ocean_freight" ? (
						<small>
							{origin_port_code === undefined ? "N/A" : origin_port_code}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "ocean_freight" ? (
						<small>
							{port_of_discharge === undefined ? "N/A" : port_of_discharge}
						</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "haulage" ? (
						<small>{terminal_port === undefined ? "N/A" : terminal_port}</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "haulage" ? (
						<small>
							{pickup_location === undefined ? "N/A" : pickup_location}
						</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "warehousing" ? (
						<small>
							{port_of_loading === undefined ? "N/A" : port_of_loading}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "warehousing" ? (
						<small>N/A</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "customs_brokerage" ? (
						<small>
							{origin_port_code === undefined ? "N/A" : origin_port_code}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "customs_brokerage" ? (
						<small>
							{pickup_location === undefined ? "N/A" : pickup_location}
						</small>
					) : (
						<small>
							{origin_port_code === undefined ? "N/A" : origin_port_code}
						</small>
					)}
				</>
			),
		},
		{
			title: <small>Destitation</small>,
			dataIndex: "destination_port_code",
			key: "destination_port_code",
			render: (
				_,
				{
					destination_port_code,
					shipment_type,
					shipment_transport_type,
					delivery_location,
					stuffing_location,
					port_of_discharge,
				}
			) => (
				<>
					{shipment_type === "export" &&
						shipment_transport_type === "ocean_freight" ? (
						<small>
							{destination_port_code === undefined
								? "N/A"
								: destination_port_code}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "ocean_freight" ? (
						<small>
							{delivery_location === undefined ? "N/A" : delivery_location}
						</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "haulage" ? (
						<small>
							{stuffing_location === undefined ? "N/A" : stuffing_location}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "haulage" ? (
						<small>
							{delivery_location === undefined ? "N/A" : delivery_location}
						</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "warehousing" ? (
						<small>
							{/* {port_of_loading === undefined ? "N/A" : port_of_loading} */}
							N/A
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "warehousing" ? (
						<small>
							{/* {port_of_discharge === undefined ? "N/A" : port_of_discharge} */}
							{port_of_discharge === undefined ? "N/A" : port_of_discharge}
						</small>
					) : shipment_type === "export" &&
						shipment_transport_type === "customs_brokerage" ? (
						<small>
							{delivery_location === undefined ? "N/A" : delivery_location}
						</small>
					) : shipment_type === "import" &&
						shipment_transport_type === "customs_brokerage" ? (
						<small>
							{destination_port_code === undefined
								? "N/A"
								: destination_port_code}
						</small>
					) : (
						<small>
							{destination_port_code === undefined
								? "N/A"
								: destination_port_code}
						</small>
					)}
				</>
			),
		},

		{
			title: "",
			key: "operation",
			fixed: "right",
			width: 120,
			render: (_, row, { }) => (
				// console.log("record", index),
				<>
					<div
						className="bg-green rounded cursor-pointer"
						style={{ justifyContent: "center" }}
						onClick={() => {
							setSelectedBookings(row);
							window.location.href = `/bookings/booking-details/${row?.["_id"]}`;
						}}
					>
						<p className="text-xs text-center white-text font-semibold p-2">
							<small>View Details</small>
						</p>
					</div>
				</>
			),
		},
	];
	return (
		<div className="w-[100%]  overflow-x-auto">
			<div className="lg:grid lg:grid-cols-6 grid grid-cols-3">
				<div className="mb-5 mr-3">
					<div className="">
						<select
							name=""
							id="shipment_transport_type"
							className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
							onChange={(e) =>
								handleFilter(e.target.value, "shipment_transport_type")
							}
						>
							<option value="">Service Type</option>
							<option value="ocean_freight">Ocean Freight</option>
							<option value="air_freight">Air Freight</option>
							<option value="haulage">Haulage</option>
							<option value="warehousing">Warehousing</option>
							<option value="customs_brokerage">Customs Brokerage</option>
						</select>
					</div>
				</div>

				<div className="mb-5 mr-3">
					<div className="">
						<select
							name=""
							id="shipment_type"
							className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
							onChange={(e) => handleFilter(e.target.value, "shipment_type")}
						>
							<option value="">Shipment Type</option>
							<option value="import">Import</option>
							<option value="export">Export</option>
						</select>
					</div>
				</div>
				<div className="mb-5 mr-3">
					<div className="">
						<select
							name=""
							id="shipment_status"
							className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
							onChange={(e) => handleFilter(e.target.value, "shipment_status")}
						>
							<option value="">Bookings Status</option>
							<option value="new booking">New Booking</option>
							<option value="awaiting quotes">Awaiting Quote</option>
						</select>
					</div>
				</div>
				{/* <div className="mb-7 mr-1 desktop-only">
          <BookingCsvData />
        </div> */}

				<input
					placeholder="Search Bookings"
					className="form-input px-3 py-1 custom-input w-full black-text w-40 mb-5"
					onChange={(e) => handleSearch(e.target.value, "")}
				/>
			</div>
			<Table
				//   @ts-ignore
				columns={columns}
				dataSource={data}
				pagination={{
					defaultPageSize: 10,
					total: total_count,
					showTotal: (total, range) =>
						`${range[0]}-${range[1]} of ${total} items`,
					current: page + 1,
					showSizeChanger: true,
					pageSizeOptions: ["10", "15", "20", "30"],
					onChange: (page, pageSize) => {
						handlePageChange(page - 1);
						handlePerRowsChange(pageSize, page - 1);
						console.log("page", page - 1);
						console.log("pageSize", pageSize);
					},
				}}
				scroll={{ x: 1500 }}
			/>
		</div>
	);
};

export default BookingsAntTable;
