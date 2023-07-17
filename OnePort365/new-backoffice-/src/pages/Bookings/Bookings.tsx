import { useEffect, useState } from "react";
import CustomDateFilter from "components/customDateFilter/customDateFilter";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import DataTable from "react-data-table-component";
import PrimaryButton from "components/buttons/PrimaryButton";
import Moment from "react-moment";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getBookings } from "store/actions";
import BookingCsvData from "components/csvData/bookingCsvData";
import BookingsAntTable from "pages/Bookings/BookingsTable/BookingsAntTable";

const Bookings = (props: any) => {

	// 	const { loading, bookings, getBookings, total_bookings } = props;
	// 	console.log(bookings);
	// 	console.log(total_bookings);
	// 	const [openAside, setOpenAside] = useState(false);
	// 	const [filteredBookings, setFilteredBookings] = useState([]);
	// 	const [selectedBookings, setSelectedBookings] = useState(null);
	// 	const [pending, setPending] = useState(true);
	// 	const [pageLoading, setPageLoading] = useState(false);
	// 	const [itemsPerPage, setItemsPerPage] = useState(10);
	// 	const [page, setPage] = useState(0);
	// 	const [startNum, setStartNum] = useState(1);
	// 	const [endNum, setEndNum] = useState(10);
	// 	const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
	// 	console.log(filteredBookings);

	// 	const fetchBooking = () => {
	// 		const filter_string = new URLSearchParams(filterObject).toString();
	// 		setPageLoading(true);
	// 		getBookings(filter_string);
	// 	};

	// 	const handlePageChange = (page) => {
	// 		setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
	// 		fetchBooking();
	// 	};

	// 	// handle per rows change
	// 	const handlePerRowsChange = async (newPerPage, page) => {
	// 		setFilterObject({
	// 			...filterObject,
	// 			...{ page: String(page), count: String(newPerPage) },
	// 		});
	// 		fetchBooking();
	// 	};

	// 	useEffect(() => {
	// 		// setFilterObject(filterObject);
	// 		fetchBooking();
	// 	}, [filterObject]);

	// 	useEffect(() => {
	// 		if (bookings.length != 0) {
	// 			//   fetchBooking();
	// 			setFilteredBookings(bookings);
	// 		} else {
	// 			//   fetchBooking();
	// 			setFilteredBookings(bookings);
	// 		}
	// 	}, [bookings]);


	// 	useEffect(() => {
	// 		const timeout = setTimeout(() => {
	// 			setPending(false);
	// 		}, 2000);
	// 		return () => clearTimeout(timeout);
	// 	}, []);



	// 	const handleSearch = (value: string, type: string) => {
	// 		if (value) {
	// 			setFilterObject({ ...filterObject, ...{ page: "0", search: value } });

	// 			fetchBooking();
	// 		} else {
	// 			// fetchBooking();
	// 			setFilterObject({ ...filterObject, ...{ page: "0", search: "" } });
	// 		}
	// 	};

	// 	const handleFilter = (filter: any, type: string) => {
	// 		let filtered = [];
	// 		if (type === "shipment_type") {
	// 			if (filter) {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_type: filter,
	// 					},
	// 				});
	// 			} else {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_type: "",
	// 					},
	// 				});
	// 			}
	// 		} else if (type === "shipment_transport_type") {
	// 			if (filter) {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_transport_type: filter,
	// 					},
	// 				});
	// 			} else {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_transport_type: "",
	// 					},
	// 				});
	// 			}
	// 		} else if (type === "shipment_status") {
	// 			if (filter) {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_status: filter,
	// 					},
	// 				});
	// 			} else {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						shipment_status: "",
	// 					},
	// 				});
	// 			}
	// 		} else if (type === "shipment_date") {
	// 			if (filter.length) {
	// 				const [startDate, endDate] = filter;

	// 				if (startDate && endDate) {
	// 					setFilterObject({
	// 						...filterObject,
	// 						...{
	// 							page: "0",
	// 							start_date: moment(startDate).format("MM/DD/YYYY"),
	// 							end_date: moment(endDate).format("MM/DD/YYYY"),
	// 						},
	// 					});
	// 				} else {
	// 					setFilterObject({
	// 						...filterObject,
	// 						...{
	// 							page: "0",
	// 							start_date: "",
	// 							end_date: "",
	// 						},
	// 					});
	// 				}
	// 			}
	// 		}

	// 		setFilteredBookings(filtered);
	// 		console.log("filtered-bookings", filtered);
	// 	};

	// 	const customStyles = {
	// 		rows: {
	// 			style: {
	// 				minHeight: "72px",
	// 				maxWidth: "100%",
	// 			},
	// 		},

	// 		headCells: {
	// 			style: {
	// 				paddingTop: "20px",
	// 				paddingBottom: "20px",
	// 				backgroundColor: "#f0fdf4",
	// 				// justifyContent: "center",

	// 			},
	// 		},

	// 		cells: {
	// 			style: {
	// 				paddingTop: "10px",
	// 				paddingBottom: "10px"
	// 			},
	// 		},
	// 	};

	// 	const columns = [
	// 		{
	// 			name: "Job Number",
	// 			selector: (row) => {
	// 				return (
	// 					<div
	// 						className="green-text cursor-pointer"
	// 					>
	// 						<small>
	// 							{row?.job_number === undefined ? "N/A" : row?.job_number}
	// 						</small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},
	// 		{
	// 			name: "Shipment Type",
	// 			selector: (row) => {
	// 				return (
	// 					<div className="black-text py-1 px-2 rounded-full mt-3 mb-3 capitalize">
	// 						<small>{row.shipment_type}</small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Service Type",
	// 			selector: (row) => {
	// 				return (
	// 					<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
	// 						<small>
	// 							{
	// 								row?.shipment_transport_type === 'ocean_freight' ? (
	// 									<>Ocean Freight</>
	// 								) : row?.shipment_transport_type === 'air_freight' ? (
	// 									<>Air Freight</>
	// 								) : row?.shipment_transport_type === 'haulage' ? (
	// 									<>Haulage</>
	// 								) : row?.shipment_transport_type === 'warehousing' ? (
	// 									<>Warehousing</>
	// 								) : row?.shipment_transport_type === 'customs_brokerage' ? (
	// 									<>Customs Brokerage</>
	// 								) : (
	// 									<></>
	// 								)
	// 							}
	// 						</small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Origin",
	// 			selector: (row) => {
	// 				return (
	// 					<div>
	// 						<p
	// 							className="font-semibold capitalize"
	// 							style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
	// 						>
	// 							{row?.shipment_type === "export" && row?.shipment_transport_type === "ocean_freight" ? (
	// 								<small>
	// 									{row?.origin_port_code === undefined ? "N/A" : row?.origin_port_code}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "ocean_freight" ? (
	// 								<small>
	// 									{row?.port_of_discharge === undefined ? "N/A" : row?.port_of_discharge}
	// 								</small>
	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "haulage" ? (
	// 								<small>
	// 									{row?.terminal_port === undefined ? "N/A" : row?.terminal_port}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "haulage" ? (
	// 								<small>
	// 									{row?.pickup_location === undefined ? "N/A" : row?.pickup_location}
	// 								</small>
	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "warehousing" ? (
	// 								<small>
	// 									{row?.port_of_loading === undefined ? "N/A" : row?.port_of_loading}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "warehousing" ? (
	// 								<small>
	// 									N/A
	// 								</small>
	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 								<small>
	// 									{row?.origin_port_code === undefined ? "N/A" : row?.origin_port_code}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 								<small>
	// 									{row?.pickup_location === undefined ? "N/A" : row?.pickup_location}
	// 								</small>
	// 							) : (
	// 								<small>
	// 									{row?.origin_port_code === undefined ? "N/A" : row?.origin_port_code}
	// 								</small>
	// 							)
	// 							}
	// 						</p>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},
	// 		{
	// 			name: "Destination",
	// 			selector: (row) => {
	// 				return (
	// 					<div>
	// 						<p
	// 							className="font-semibold capitalize"
	// 							style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
	// 						>
	// 							{row?.shipment_type === "export" && row?.shipment_transport_type === "ocean_freight" ? (
	// 								<small>
	// 									{row?.destination_port_code === undefined ? "N/A" : row?.destination_port_code}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "ocean_freight" ? (
	// 								<small>
	// 									{row?.delivery_location === undefined ? "N/A" : row?.delivery_location}
	// 								</small>
	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "haulage" ? (
	// 								<small>
	// 									{row?.stuffing_location === undefined ? "N/A" : row?.stuffing_location}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "haulage" ? (
	// 								<small>
	// 									{row?.delivery_location === undefined ? "N/A" : row?.delivery_location}
	// 								</small>

	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "warehousing" ? (
	// 								<small>
	// 									{/* {row?.port_of_loading === undefined ? "N/A" : row?.port_of_loading} */}
	// 									N/A
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "warehousing" ? (
	// 								<small>
	// 									{/* {row?.port_of_discharge === undefined ? "N/A" : row?.port_of_discharge} */}
	// 									{row?.port_of_discharge === undefined ? "N/A" : row?.port_of_discharge}
	// 								</small>
	// 							) : row?.shipment_type === "export" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 								<small>
	// 									{row?.delivery_location === undefined ? "N/A" : row?.delivery_location}
	// 								</small>
	// 							) : row?.shipment_type === "import" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 								<small>
	// 									{row?.destination_port_code === undefined ? "N/A" : row?.destination_port_code}
	// 								</small>
	// 							) : (
	// 								<small>
	// 									{row?.destination_port_code === undefined ? "N/A" : row?.destination_port_code}
	// 								</small>
	// 							)
	// 							}
	// 						</p>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Branch",
	// 			selector: (row) => {
	// 				return (
	// 					<div className="grey-text py-1 px-5 rounded-full mt-3 mb-3 uppercase">
	// 						<small>{row?.branch === undefined ? 'N/A' : row?.branch}</small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Date Created",
	// 			selector: (row) => {
	// 				return (
	// 					<div className="grey-text py-1 rounded-full mt-3 mb-3">
	// 						<small><Moment format="DD-MM-YYYY">{row.createdAt}</Moment></small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Customer",
	// 			selector: (row) => {
	// 				return (
	// 					<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3 capitalize">
	// 						<small>
	// 							{row?.customer_details === undefined || null || ""
	// 								? "N/A"
	// 								: row.customer_details[0]?.firstname}{" "}
	// 							{row.customer_details[0]?.lastname}
	// 						</small>
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "Booking Status",
	// 			selector: (row) => {
	// 				return (
	// 					<div>
	// 						{row?.shipment_status === "new booking" ? (
	// 							<Link
	// 								to="#"
	// 								className="capitalize bg-light-green green-text text-xs py-2 text-center rounded-full"
	// 							>
	// 								<small>{row?.shipment_status}</small>
	// 							</Link>
	// 						) : row?.shipment_status === "awaiting quotes" ? (
	// 							<Link
	// 								to="#"
	// 								className="capitalize bg-light-purple purple-text text-xs py-2 red-text text-center rounded-full"
	// 							>
	// 								<small>{row?.shipment_status}</small>
	// 							</Link>
	// 						) : row?.shipment_status === "cancelled" ? (
	// 							<Link
	// 								to="#"
	// 								className="capitalize bg-light-red red-text text-xs py-2 red-text text-center rounded-full"
	// 							>
	// 								<small>{row?.shipment_status}</small>
	// 							</Link>
	// 						) : (
	// 							<></>
	// 						)}
	// 					</div>
	// 				);
	// 			},
	// 			sortable: true,
	// 		},

	// 		{
	// 			name: "",
	// 			selector: (row) => {
	// 				return (
	// 					<div>
	// 						<div
	// 							className="bg-green rounded cursor-pointer"
	// 							style={{ justifyContent: "center" }}
	// 							onClick={() => {
	// 								setSelectedBookings(row);
	// 								window.location.href = `/bookings/booking-details/${row?.["_id"]}`;
	// 							}}
	// 						>
	// 							<p className="text-xs text-center white-text font-semibold p-2">
	// 								<small>View Details</small>
	// 							</p>
	// 						</div>

	// 					</div>
	// 				);
	// 			},
	// 		},
	// 	];

	// 	return (
	// 		<div className="lg:flex">
	// 			{/* side bar */}
	// 			<Aside openAside={openAside} SetOpenAside={setOpenAside} />
	// 			{/* dashboard content */}
	// 			<div className="dashboard-content">
	// 				<TopBar title={"Bookings"} SetOpenAside={setOpenAside} />
	// 				<div className="lg:px-10 lg:pt-5 container lg:mx-auto lg:w-full">
	// 					<CustomDateFilter handleFilter={handleFilter} />
	// 					<div>
	// 						<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
	// 							<div className="mt-2">
	// 								<p className="font-semibold text-lg pl-3 ">All Bookings </p>
	// 							</div>
	// 							<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
	// 								<small>Bookings </small>
	// 								<small style={{ color: "grey" }}> / All Bookings</small>
	// 							</div>
	// 						</div>
	// 					</div>
	// 					{loading ? (
	// 						<div className="text-center my-3">
	// 							<Link to="#" className="text-success">
	// 								{/* @ts-ignore */}
	// 								<PrimaryButton title="Loading Bookings" loading={loading} />
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<div>
	// 							<>
	// 								<div className="mt-2 w-full">
	// 									{/* Desktop view */}
	// 									<div className="desktop-only pt-3 solid-br">
	// 										<DataTable
	// 											// @ts-ignore
	// 											columns={columns}
	// 											data={filteredBookings}
	// 											pagination
	// 											persistTableHead
	// 											responsive
	// 											actions={
	// 												<ActionsMemo
	// 													handleFilter={handleFilter}
	// 													handleSearch={handleSearch}
	// 													filteredQuotes={filteredBookings}
	// 												/>
	// 											}
	// 											paginationPerPage={10}
	// 											customStyles={customStyles}
	// 											progressPending={pending}
	// 											paginationServer
	// 											paginationTotalRows={total_bookings}
	// 											onChangeRowsPerPage={handlePerRowsChange}
	// 											onChangePage={handlePageChange}
	// 											dense
	// 										/>
	// 									</div>
	// 								</div>
	// 							</>
	// 							{/* Mobile View */}
	// 							<div className="bg-grey py-2 mobile-only">
	// 								<ActionsMemo
	// 									handleFilter={handleFilter}
	// 									handleSearch={handleSearch}
	// 									filteredQuotes={filteredBookings}
	// 								/>
	// 								{bookings?.map((data: any, index: any) => {
	// 									return (
	// 										<div className="bg-white mb-3" key={index}>
	// 											<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
	// 												<div className="">
	// 													<p className="grey-text text-sm">
	// 														<span className="black-text">
	// 															Job Number:{" "}
	// 															{data?.job_number === undefined
	// 																? "N/A"
	// 																: data?.job_number}{" "}
	// 														</span>
	// 													</p>
	// 													<p className="grey-text text-sm">
	// 														<span className="black-text capitalize">
	// 															Shipment Type: {data?.["shipment_type"]}
	// 														</span>
	// 													</p>
	// 													<p className="grey-text text-sm">
	// 														<span className="black-text">
	// 															Shipment Transport Type:
	// 															{data.shipment_transport_type ===
	// 																"ocean_freight"
	// 																? "Ocean Freight"
	// 																: "" ||
	// 																	data.shipment_transport_type === "haulage"
	// 																	? "Haulage"
	// 																	: "" ||
	// 																		data.shipment_transport_type ===
	// 																		"air_freight"
	// 																		? "Air Freight"
	// 																		: "" ||
	// 																			data.shipment_transport_type === "import"
	// 																			? "import"
	// 																			: "" ||
	// 																				data.shipment_transport_type === "export"
	// 																				? "Export"
	// 																				: ""}
	// 														</span>
	// 													</p>
	// 													<p className="grey-text text-sm">
	// 														<span className="black-text">
	// 															Origin:
	// 															{data?.shipment_type === "export" &&
	// 																data?.shipment_transport_type ===
	// 																"ocean_freight" ? (
	// 																<>{data?.origin_port_code}</>
	// 															) : data?.shipment_type === "import" &&
	// 																data?.shipment_transport_type ===
	// 																"ocean_freight" ? (
	// 																<>{data?.port_of_discharge}</>
	// 															) : data?.shipment_type === "export" &&
	// 																data?.shipment_transport_type ===
	// 																"haulage" ? (
	// 																<>{data?.terminal_port}</>
	// 															) : data?.shipment_type === "import" &&
	// 																data?.shipment_transport_type ===
	// 																"haulage" ? (
	// 																<>{data?.pickup_location}</>
	// 															) : (
	// 																<>{data?.origin_port_code}</>
	// 															)}
	// 														</span>
	// 													</p>

	// 													<p className="grey-text text-sm">
	// 														<span className="black-text">
	// 															Destination:
	// 															{data?.shipment_type === "export" &&
	// 																data?.shipment_transport_type ===
	// 																"ocean_freight" ? (
	// 																<>{data?.destination_port_code}</>
	// 															) : data?.shipment_type === "import" &&
	// 																data?.shipment_transport_type ===
	// 																"ocean_freight" ? (
	// 																<>{data?.delivery_location}</>
	// 															) : data?.shipment_type === "export" &&
	// 																data?.shipment_transport_type ===
	// 																"haulage" ? (
	// 																<>{data?.stuffing_location}</>
	// 															) : data?.shipment_type === "import" &&
	// 																data?.shipment_transport_type ===
	// 																"haulage" ? (
	// 																<>{data?.delivery_location}</>
	// 															) : (
	// 																<>{data?.destination_port_code}</>
	// 															)}
	// 														</span>
	// 													</p>

	// 													<p className="grey-text text-sm">
	// 														<span className="black-text">
	// 															Date Created:
	// 															{moment(data.createdAt).format("LLLL")}
	// 														</span>
	// 													</p>
	// 													<p className="grey-text text-sm ">
	// 														<span className="black-text capitalize">
	// 															Customer:
	// 															{data?.customer_details === undefined ||
	// 																null ||
	// 																""
	// 																? "N/A"
	// 																: data.customer_details[0]?.firstname}{" "}
	// 															{data.customer_details[0]?.lastname}
	// 														</span>
	// 													</p>
	// 												</div>
	// 											</div>

	// 											<div className="grid grid-cols-3 gap-4 py-3 px-2 bottom-divider items-center">
	// 												{data?.shipment_status === "new booking" ? (
	// 													<Link
	// 														to="#"
	// 														className="capitalize bg-light-green green-text text-xs py-2 px-3 mx-5 text-center rounded-full"
	// 													>
	// 														{data?.shipment_status}
	// 													</Link>
	// 												) : data?.shipment_status === "awaiting quotes" ? (
	// 													<Link
	// 														to="#"
	// 														className="capitalize bg-light-purple purple-text text-xs py-2 px-3 red-text mx-5 text-center rounded-full"
	// 													>
	// 														{data?.shipment_status}
	// 													</Link>
	// 												) : data?.shipment_status === "cancelled" ? (
	// 													<Link
	// 														to="#"
	// 														className="capitalize bg-light-red red-text text-xs py-2 px-3 red-text mx-5 text-center rounded-full"
	// 													>
	// 														{data?.shipment_status}
	// 													</Link>
	// 												) : (
	// 													<></>
	// 												)}

	// 												<div></div>
	// 												<Link
	// 													to=""
	// 													onClick={() => {
	// 														window.location.href = `/bookings/booking-details/${data?.["_id"]}`;
	// 													}}
	// 													className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
	// 												>
	// 													Details
	// 												</Link>
	// 											</div>
	// 										</div>
	// 									);
	// 								})}

	// 								{/* phone pagination */}
	// 								<div className="mt-4 mx-7  py-6 flex justify-between">
	// 									{/* left */}
	// 									{page === 0 ? (
	// 										<div
	// 											className="w-fit rotate-180 w-[24px] h-[24px]"
	// 											onClick={() => { }}
	// 										>
	// 											<svg
	// 												className="w-[100%] h-[100%]"
	// 												width="14"
	// 												height="14"
	// 												viewBox="0 0 14 14"
	// 												fill="none"
	// 												xmlns="http://www.w3.org/2000/svg"
	// 											>
	// 												<path
	// 													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 													stroke="#d6dfed"
	// 													stroke-width="1.5"
	// 													stroke-linecap="round"
	// 													stroke-linejoin="round"
	// 												/>
	// 											</svg>
	// 										</div>
	// 									) : (
	// 										<div
	// 											className="w-fit rotate-180 w-[24px] h-[24px]"
	// 											onClick={() => {
	// 												handlePageChange(page);
	// 												setPage(page - 1);
	// 												setStartNum(startNum - 10);
	// 												setEndNum(endNum - 10);
	// 											}}
	// 										>
	// 											<svg
	// 												className="w-[100%] h-[100%]"
	// 												width="14"
	// 												height="14"
	// 												viewBox="0 0 14 14"
	// 												fill="none"
	// 												xmlns="http://www.w3.org/2000/svg"
	// 											>
	// 												<path
	// 													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 													stroke="#374151"
	// 													stroke-width="1.5"
	// 													stroke-linecap="round"
	// 													stroke-linejoin="round"
	// 												/>
	// 											</svg>
	// 										</div>
	// 									)}

	// 									{/* middle */}
	// 									<div>
	// 										<p>
	// 											{startNum}-{endNum} of {total_bookings}
	// 										</p>
	// 									</div>

	// 									{/* right */}
	// 									{page >= Math.ceil(total_bookings / 10 - 1) ? (
	// 										<div className=" w-[24px] h-[24px] " onClick={() => { }}>
	// 											<svg
	// 												className="w-[100%] h-[100%]"
	// 												width="14"
	// 												height="14"
	// 												viewBox="0 0 14 14"
	// 												fill="none"
	// 												xmlns="http://www.w3.org/2000/svg"
	// 											>
	// 												<path
	// 													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 													stroke="#d6dfed"
	// 													stroke-width="1.5"
	// 													stroke-linecap="round"
	// 													stroke-linejoin="round"
	// 												/>
	// 											</svg>
	// 										</div>
	// 									) : (
	// 										<div
	// 											className=" w-[24px] h-[24px] "
	// 											onClick={() => {
	// 												handlePageChange(page + 2);
	// 												setPage(page + 1);
	// 												setStartNum(startNum + 10);
	// 												setEndNum(endNum + 10);
	// 											}}
	// 										>
	// 											<svg
	// 												className="w-[100%] h-[100%]"
	// 												width="14"
	// 												height="14"
	// 												viewBox="0 0 14 14"
	// 												fill="none"
	// 												xmlns="http://www.w3.org/2000/svg"
	// 											>
	// 												<path
	// 													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 													stroke="#374151"
	// 													stroke-width="1.5"
	// 													stroke-linecap="round"
	// 													stroke-linejoin="round"
	// 												/>
	// 											</svg>
	// 										</div>
	// 									)}
	// 								</div>
	// 							</div>
	// 							{/* Mobile View */}
	// 						</div>
	// 					)}
	// 				</div>
	// 			</div>
	// 		</div>
	// 	);

	const { loading, bookings, getBookings, total_bookings } = props;
	console.log(bookings);
	console.log(total_bookings);
	const [openAside, setOpenAside] = useState(false);
	const [filteredBookings, setFilteredBookings] = useState([]);
	const [selectedBookings, setSelectedBookings] = useState(null);
	console.log("setSelected", selectedBookings);

	const [pending, setPending] = useState(true);
	const [pageLoading, setPageLoading] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const [startNum, setStartNum] = useState(1);
	const [endNum, setEndNum] = useState(10);
	const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
	console.log(filteredBookings);

	const fetchBooking = () => {
		const filter_string = new URLSearchParams(filterObject).toString();
		setPageLoading(true);
		getBookings(filter_string);
	};

	const handlePageChange = (page) => {
		setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
		// fetchBooking();
	};

	// handle per rows change
	const handlePerRowsChange = async (newPerPage, page) => {
		setFilterObject({
			...filterObject,
			...{ page: String(page), count: String(newPerPage) },
		});
		// fetchBooking();
	};

	useEffect(() => {
		// setFilterObject(filterObject);
		fetchBooking();
	}, [filterObject]);

	useEffect(() => {
		if (bookings.length != 0) {
			//   fetchBooking();
			setFilteredBookings(bookings);
		} else {
			//   fetchBooking();
			setFilteredBookings(bookings);
		}
	}, [bookings]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const handleSearch = (value: string, type: string) => {
		if (value) {
			setFilterObject({ ...filterObject, ...{ page: "0", search: value } });

			fetchBooking();
		} else {
			setFilterObject({ ...filterObject, ...{ page: "0", search: "" } });
			// fetchBooking();
		}
	};

	const handleFilter = (filter: any, type: string) => {
		let filtered = [];
		if (type === "shipment_type") {
			if (filter) {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_type: filter,
					},
				});
			} else {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_type: "",
					},
				});
			}
		} else if (type === "shipment_transport_type") {
			if (filter) {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_transport_type: filter,
					},
				});
			} else {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_transport_type: "",
					},
				});
			}
		} else if (type === "shipment_status") {
			if (filter) {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_status: filter,
					},
				});
			} else {
				setFilterObject({
					...filterObject,
					...{
						page: "0",
						shipment_status: "",
					},
				});
			}
		} else if (type === "shipment_date") {
			if (filter.length) {
				const [startDate, endDate] = filter;

				if (startDate && endDate) {
					setFilterObject({
						...filterObject,
						...{
							page: "0",
							start_date: moment(startDate).format("MM/DD/YYYY"),
							end_date: moment(endDate).format("MM/DD/YYYY"),
						},
					});
				} else {
					setFilterObject({
						...filterObject,
						...{
							page: "0",
							start_date: "",
							end_date: "",
						},
					});
				}
			}
		}

		setFilteredBookings(filtered);
		console.log("filtered-bookings", filtered);
	};

	const customStyles = {
		rows: {
			style: {
				minHeight: "72px",
				maxWidth: "100%",
			},
		},

		headCells: {
			style: {
				paddingTop: "20px",
				paddingBottom: "20px",
				backgroundColor: "#f0fdf4",
				// justifyContent: "center",
			},
		},

		cells: {
			style: {
				paddingTop: "10px",
				paddingBottom: "10px",
			},
		},
	};

	const columns = [
		{
			name: "Job Number",
			selector: (row) => {
				return (
					<div className="green-text cursor-pointer">
						<small>
							{row?.job_number === undefined ? "N/A" : row?.job_number}
						</small>
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Shipment Type",
			selector: (row) => {
				return (
					<div className="black-text py-1 px-2 rounded-full mt-3 mb-3 capitalize">
						<small>{row.shipment_type}</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Service Type",
			selector: (row) => {
				return (
					<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
						<small>
							{row?.shipment_transport_type === "ocean_freight" ? (
								<>Ocean Freight</>
							) : row?.shipment_transport_type === "air_freight" ? (
								<>Air Freight</>
							) : row?.shipment_transport_type === "haulage" ? (
								<>Haulage</>
							) : row?.shipment_transport_type === "warehousing" ? (
								<>Warehousing</>
							) : row?.shipment_transport_type === "customs_brokerage" ? (
								<>Customs Brokerage</>
							) : (
								<></>
							)}
						</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Origin",
			selector: (row) => {
				return (
					<div>
						<p
							className="font-semibold capitalize"
							style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
						>
							{row?.shipment_type === "export" &&
								row?.shipment_transport_type === "ocean_freight" ? (
								<small>
									{row?.origin_port_code === undefined
										? "N/A"
										: row?.origin_port_code}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "ocean_freight" ? (
								<small>
									{row?.port_of_discharge === undefined
										? "N/A"
										: row?.port_of_discharge}
								</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "haulage" ? (
								<small>
									{row?.terminal_port === undefined
										? "N/A"
										: row?.terminal_port}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "haulage" ? (
								<small>
									{row?.pickup_location === undefined
										? "N/A"
										: row?.pickup_location}
								</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "warehousing" ? (
								<small>
									{row?.port_of_loading === undefined
										? "N/A"
										: row?.port_of_loading}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "warehousing" ? (
								<small>N/A</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "customs_brokerage" ? (
								<small>
									{row?.origin_port_code === undefined
										? "N/A"
										: row?.origin_port_code}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "customs_brokerage" ? (
								<small>
									{row?.pickup_location === undefined
										? "N/A"
										: row?.pickup_location}
								</small>
							) : (
								<small>
									{row?.origin_port_code === undefined
										? "N/A"
										: row?.origin_port_code}
								</small>
							)}
						</p>
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Destination",
			selector: (row) => {
				return (
					<div>
						<p
							className="font-semibold capitalize"
							style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
						>
							{row?.shipment_type === "export" &&
								row?.shipment_transport_type === "ocean_freight" ? (
								<small>
									{row?.destination_port_code === undefined
										? "N/A"
										: row?.destination_port_code}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "ocean_freight" ? (
								<small>
									{row?.delivery_location === undefined
										? "N/A"
										: row?.delivery_location}
								</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "haulage" ? (
								<small>
									{row?.stuffing_location === undefined
										? "N/A"
										: row?.stuffing_location}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "haulage" ? (
								<small>
									{row?.delivery_location === undefined
										? "N/A"
										: row?.delivery_location}
								</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "warehousing" ? (
								<small>
									{/* {row?.port_of_loading === undefined ? "N/A" : row?.port_of_loading} */}
									N/A
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "warehousing" ? (
								<small>
									{/* {row?.port_of_discharge === undefined ? "N/A" : row?.port_of_discharge} */}
									{row?.port_of_discharge === undefined
										? "N/A"
										: row?.port_of_discharge}
								</small>
							) : row?.shipment_type === "export" &&
								row?.shipment_transport_type === "customs_brokerage" ? (
								<small>
									{row?.delivery_location === undefined
										? "N/A"
										: row?.delivery_location}
								</small>
							) : row?.shipment_type === "import" &&
								row?.shipment_transport_type === "customs_brokerage" ? (
								<small>
									{row?.destination_port_code === undefined
										? "N/A"
										: row?.destination_port_code}
								</small>
							) : (
								<small>
									{row?.destination_port_code === undefined
										? "N/A"
										: row?.destination_port_code}
								</small>
							)}
						</p>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Branch",
			selector: (row) => {
				return (
					<div className="grey-text py-1 px-5 rounded-full mt-3 mb-3 uppercase">
						<small>{row?.branch === undefined ? "N/A" : row?.branch}</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Date Created",
			selector: (row) => {
				return (
					<div className="grey-text py-1 rounded-full mt-3 mb-3">
						<small>
							<Moment format="DD-MM-YYYY">{row.createdAt}</Moment>
						</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Customer",
			selector: (row) => {
				return (
					<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3 capitalize">
						<small>
							{row?.customer_details === undefined || null || ""
								? "N/A"
								: row.customer_details[0]?.firstname}{" "}
							{row.customer_details[0]?.lastname}
						</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Booking Status",
			selector: (row) => {
				return (
					<div>
						{row?.shipment_status === "new booking" ? (
							<Link
								to="#"
								className="capitalize bg-light-green green-text text-xs py-2 text-center rounded-full"
							>
								<small>{row?.shipment_status}</small>
							</Link>
						) : row?.shipment_status === "awaiting quotes" ? (
							<Link
								to="#"
								className="capitalize bg-light-purple purple-text text-xs py-2 red-text text-center rounded-full"
							>
								<small>{row?.shipment_status}</small>
							</Link>
						) : row?.shipment_status === "cancelled" ? (
							<Link
								to="#"
								className="capitalize bg-light-red red-text text-xs py-2 red-text text-center rounded-full"
							>
								<small>{row?.shipment_status}</small>
							</Link>
						) : (
							<></>
						)}
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "",
			selector: (row) => {
				return (
					<div>
						<div
							className="bg-green rounded cursor-pointer"
							style={{ justifyContent: "center" }}
							onClick={() => {
								setSelectedBookings(row);
								// window.location.href = `/bookings/booking-details/${row?.["_id"]}`;
							}}
						>
							<p className="text-xs text-center white-text font-semibold p-2">
								<small>View Details</small>
							</p>
						</div>
					</div>
				);
			},
		},
	];

	return (
		<div className="lg:flex">
			{/* side bar */}
			<Aside openAside={openAside} SetOpenAside={setOpenAside} />
			{/* dashboard content */}
			<div className="dashboard-content">
				<TopBar title={"Bookings"} SetOpenAside={setOpenAside} />
				<div className="lg:px-10 lg:pt-5 container lg:mx-auto lg:w-full">
					<CustomDateFilter handleFilter={handleFilter} />
					<div>
						<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
							<div className="mt-2">
								<p className="font-semibold text-lg pl-3 ">All Bookings </p>
							</div>
							<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
								<small>Bookings </small>
								<small style={{ color: "grey" }}> / All Bookings</small>
							</div>
						</div>
					</div>
					{loading ? (
						<div className="text-center my-3">
							<Link to="#" className="text-success">
								{/* @ts-ignore */}
								<PrimaryButton title="Loading Bookings" loading={loading} />
							</Link>
						</div>
					) : (
						<div>
							<>
								<div className="mt-2 w-full">
									{/* Desktop view */}
									<div className="desktop-only pt-3 ">
										<BookingsAntTable
											filteredBookings={filteredBookings}
											total_count={total_bookings}
											handlePageChange={handlePageChange}
											handlePerRowsChange={handlePerRowsChange}
											handleFilter={handleFilter}
											handleSearch={handleSearch}
											//   setDataToDelete={setDataToDelete}
											//   setIsOpen={setIsOpen}
											setSelectedBookings={setSelectedBookings}
											filterObject={filterObject}
										/>
										{/* <DataTable
                      // @ts-ignore
                      columns={columns}
                      data={filteredBookings}
                      pagination
                      persistTableHead
                      responsive
                      actions={
                        <ActionsMemo
                          handleFilter={handleFilter}
                          handleSearch={handleSearch}
                          filteredQuotes={filteredBookings}
                        />
                      }
                      paginationPerPage={10}
                      customStyles={customStyles}
                      progressPending={pending}
                      paginationServer
                      paginationTotalRows={total_bookings}
                      onChangeRowsPerPage={handlePerRowsChange}
                      onChangePage={handlePageChange}
                      dense
                    /> */}
									</div>
								</div>
							</>
							{/* Mobile View */}
							<div className="bg-grey py-2 mobile-only">
								{/* <ActionsMemo
									handleFilter={handleFilter}
									handleSearch={handleSearch}
									filteredQuotes={filteredBookings}
								/> */}
								{bookings?.map((data: any, index: any) => {
									return (
										<div className="bg-white mb-3" key={index}>
											<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
												<div className="">
													<p className="grey-text text-sm">
														<span className="black-text">
															Job Number:{" "}
															{data?.job_number === undefined
																? "N/A"
																: data?.job_number}{" "}
														</span>
													</p>
													<p className="grey-text text-sm">
														<span className="black-text capitalize">
															Shipment Type: {data?.["shipment_type"]}
														</span>
													</p>
													<p className="grey-text text-sm">
														<span className="black-text">
															Shipment Transport Type:
															{data.shipment_transport_type === "ocean_freight"
																? "Ocean Freight"
																: "" ||
																	data.shipment_transport_type === "haulage"
																	? "Haulage"
																	: "" ||
																		data.shipment_transport_type === "air_freight"
																		? "Air Freight"
																		: "" ||
																			data.shipment_transport_type === "import"
																			? "import"
																			: "" ||
																				data.shipment_transport_type === "export"
																				? "Export"
																				: ""}
														</span>
													</p>
													<p className="grey-text text-sm">
														<span className="black-text">
															Origin:
															{data?.shipment_type === "export" &&
																data?.shipment_transport_type ===
																"ocean_freight" ? (
																<>{data?.origin_port_code}</>
															) : data?.shipment_type === "import" &&
																data?.shipment_transport_type ===
																"ocean_freight" ? (
																<>{data?.port_of_discharge}</>
															) : data?.shipment_type === "export" &&
																data?.shipment_transport_type === "haulage" ? (
																<>{data?.terminal_port}</>
															) : data?.shipment_type === "import" &&
																data?.shipment_transport_type === "haulage" ? (
																<>{data?.pickup_location}</>
															) : (
																<>{data?.origin_port_code}</>
															)}
														</span>
													</p>

													<p className="grey-text text-sm">
														<span className="black-text">
															Destination:
															{data?.shipment_type === "export" &&
																data?.shipment_transport_type ===
																"ocean_freight" ? (
																<>{data?.destination_port_code}</>
															) : data?.shipment_type === "import" &&
																data?.shipment_transport_type ===
																"ocean_freight" ? (
																<>{data?.delivery_location}</>
															) : data?.shipment_type === "export" &&
																data?.shipment_transport_type === "haulage" ? (
																<>{data?.stuffing_location}</>
															) : data?.shipment_type === "import" &&
																data?.shipment_transport_type === "haulage" ? (
																<>{data?.delivery_location}</>
															) : (
																<>{data?.destination_port_code}</>
															)}
														</span>
													</p>

													<p className="grey-text text-sm">
														<span className="black-text">
															Date Created:
															{moment(data.createdAt).format("LLLL")}
														</span>
													</p>
													<p className="grey-text text-sm ">
														<span className="black-text capitalize">
															Customer:
															{data?.customer_details === undefined ||
																null ||
																""
																? "N/A"
																: data.customer_details[0]?.firstname}{" "}
															{data.customer_details[0]?.lastname}
														</span>
													</p>
												</div>
											</div>

											<div className="grid grid-cols-3 gap-4 py-3 px-2 bottom-divider items-center">
												{data?.shipment_status === "new booking" ? (
													<Link
														to="#"
														className="capitalize bg-light-green green-text text-xs py-2 px-3 mx-5 text-center rounded-full"
													>
														{data?.shipment_status}
													</Link>
												) : data?.shipment_status === "awaiting quotes" ? (
													<Link
														to="#"
														className="capitalize bg-light-purple purple-text text-xs py-2 px-3 red-text mx-5 text-center rounded-full"
													>
														{data?.shipment_status}
													</Link>
												) : data?.shipment_status === "cancelled" ? (
													<Link
														to="#"
														className="capitalize bg-light-red red-text text-xs py-2 px-3 red-text mx-5 text-center rounded-full"
													>
														{data?.shipment_status}
													</Link>
												) : (
													<></>
												)}

												<div></div>
												<Link
													to=""
													onClick={() => {
														window.location.href = `/bookings/booking-details/${data?.["_id"]}`;
													}}
													className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
												>
													Details
												</Link>
											</div>
										</div>
									);
								})}

								{/* phone pagination */}
								<div className="mt-4 mx-7  py-6 flex justify-between">
									{/* left */}
									{page === 0 ? (
										<div
											className="w-fit rotate-180 w-[24px] h-[24px]"
											onClick={() => { }}
										>
											<svg
												className="w-[100%] h-[100%]"
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
													stroke="#d6dfed"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									) : (
										<div
											className="w-fit rotate-180 w-[24px] h-[24px]"
											onClick={() => {
												handlePageChange(page);
												setPage(page - 1);
												setStartNum(startNum - 10);
												setEndNum(endNum - 10);
											}}
										>
											<svg
												className="w-[100%] h-[100%]"
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
													stroke="#374151"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									)}

									{/* middle */}
									<div>
										<p>
											{startNum}-{endNum} of {total_bookings}
										</p>
									</div>

									{/* right */}
									{page >= Math.ceil(total_bookings / 10 - 1) ? (
										<div className=" w-[24px] h-[24px] " onClick={() => { }}>
											<svg
												className="w-[100%] h-[100%]"
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
													stroke="#d6dfed"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									) : (
										<div
											className=" w-[24px] h-[24px] "
											onClick={() => {
												handlePageChange(page + 2);
												setPage(page + 1);
												setStartNum(startNum + 10);
												setEndNum(endNum + 10);
											}}
										>
											<svg
												className="w-[100%] h-[100%]"
												width="14"
												height="14"
												viewBox="0 0 14 14"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
													stroke="#374151"
													stroke-width="1.5"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</div>
									)}
								</div>
							</div>
							{/* Mobile View */}
						</div>
					)}
				</div>
			</div>
		</div>
	);

};

// export default Quotes

const mapStateToProps = (state: any) => {
	const { bookings, total_bookings, error, loading } = state.bookings;
	return { bookings, total_bookings, error, loading };
};

// const ActionsMemo = (props: any): JSX.Element => {

// 	const { filteredBookings, handleFilter, handleSearch } = props;
// 	return (
// 		<div className="lg:grid lg:grid-cols-4 grid grid-cols-3">
// 			<div className="mb-5 mr-3">
// 				<div className="">
// 					<select
// 						name=""
// 						id="shipment_transport_type"
// 						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
// 						onChange={(e) =>
// 							handleFilter(e.target.value, "shipment_transport_type")
// 						}
// 					>
// 						<option value="">Service Type</option>
// 						<option value="ocean_freight">Ocean Freight</option>
// 						<option value="air_freight">Air Freight</option>
// 						<option value="haulage">Haulage</option>
// 						<option value="warehousing">Warehousing</option>
// 						<option value="customs_brokerage">Customs Brokerage</option>
// 					</select>
// 				</div>
// 			</div>

// 			<div className="mb-5 mr-3">
// 				<div className="">
// 					<select
// 						name=""
// 						id="shipment_type"
// 						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
// 						onChange={(e) => handleFilter(e.target.value, "shipment_type")}
// 					>
// 						<option value="">Shipment Type</option>
// 						<option value="import">Import</option>
// 						<option value="export">Export</option>
// 					</select>
// 				</div>
// 			</div>
// 			<div className="mb-5 mr-3">
// 				<div className="">
// 					<select
// 						name=""
// 						id="shipment_status"
// 						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
// 						onChange={(e) => handleFilter(e.target.value, "shipment_status")}
// 					>
// 						<option value="">Bookings Status</option>
// 						<option value="new booking">New Booking</option>
// 						<option value="awaiting quotes">Awaiting Quote</option>
// 					</select>
// 				</div>
// 			</div>
// 			{/* <div className="mb-7 mr-1 desktop-only">
// 				<BookingCsvData />
// 			</div> */}

// 			<input
// 				placeholder="Search Bookings"
// 				className="form-input px-3 py-1 custom-input w-full black-text w-40 mb-5"
// 				onChange={(e) => handleSearch(e.target.value)}
// 			/>
// 		</div>
// 	);

//   const { filteredBookings, handleFilter, handleSearch } = props;
//   return (
//     <div className="lg:grid lg:grid-cols-5 grid grid-cols-3">
//       <div className="mb-5 mr-3">
//         <div className="">
//           <select
//             name=""
//             id="shipment_transport_type"
//             className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
//             onChange={(e) =>
//               handleFilter(e.target.value, "shipment_transport_type")
//             }
//           >
//             <option value="">Service Type</option>
//             <option value="ocean_freight">Ocean Freight</option>
//             <option value="air_freight">Air Freight</option>
//             <option value="haulage">Haulage</option>
//             <option value="warehousing">Warehousing</option>
//             <option value="customs_brokerage">Customs Brokerage</option>
//           </select>
//         </div>
//       </div>

//       <div className="mb-5 mr-3">
//         <div className="">
//           <select
//             name=""
//             id="shipment_type"
//             className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
//             onChange={(e) => handleFilter(e.target.value, "shipment_type")}
//           >
//             <option value="">Shipment Type</option>
//             <option value="import">Import</option>
//             <option value="export">Export</option>
//           </select>
//         </div>
//       </div>
//       <div className="mb-5 mr-3">
//         <div className="">
//           <select
//             name=""
//             id="shipment_status"
//             className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
//             onChange={(e) => handleFilter(e.target.value, "shipment_status")}
//           >
//             <option value="">Bookings Status</option>
//             <option value="new booking">New Booking</option>
//             <option value="awaiting quotes">Awaiting Quote</option>
//           </select>
//         </div>
//       </div>
//       <div className="mb-7 mr-1 desktop-only">
//         <BookingCsvData />
//       </div>

//       <input
//         placeholder="Search Bookings"
//         className="form-input px-3 py-1 custom-input w-full black-text w-40 mb-5"
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//     </div>
//   );

// };

export default connect(mapStateToProps, { getBookings })(Bookings);
