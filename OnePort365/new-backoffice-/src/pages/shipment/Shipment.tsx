import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import moment from "moment";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDropdown from "components/shipmentDropdown/shipmentDropdown";
import PrimaryButton from "components/buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import DeleteModal from "../../components/shipmentPartials/deleteModal";
import { getShipments, deleteShipment } from "store/actions";
import { CSVLink, CSVDownload } from "react-csv";
import ReactTable from "react-table";
import ShipmentAntTable from "pages/shipment/ShipmentTable/ShipmentAntTable";

const Shipment = (props: any) => {

	// const { my_shipments, getShipments, total_shipments, loading } = props;
	// console.log(my_shipments);
	// console.log(total_shipments);
	// const [openAside, SetOpenAside] = useState(false);
	// const [filteredShipments, setFilteredShipments] = useState([]);
	// const [selectedShipment, setSelectedShipment] = useState(null);
	// const [isOpen, setIsOpen] = useState(false);
	// const [dataToDelete, setDataToDelete] = useState({});
	// const [pending, setPending] = useState(true);
	// const [pageLoading, setPageLoading] = useState(false);
	// const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
	// const [page, setPage] = useState(0);
	// const [startNum, setStartNum] = useState(1);
	// const [endNum, setEndNum] = useState(10);

	// let admin_data = useSelector((state: any) => state.auth.admin_data);
	// // @ts-ignore
	// // prettier-ignore
	// admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

	// const fetchShipments = () => {
	// 	const filter_string = new URLSearchParams(filterObject).toString();
	// 	setPageLoading(true);
	// 	getShipments(filter_string);
	// };

	// const handlePageChange = (page) => {
	// 	setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
	// 	fetchShipments();
	// };

	// const handlePerRowsChange = async (newPerPage, page) => {
	// 	setFilterObject({
	// 		...filterObject,
	// 		...{ page: String(page), count: String(newPerPage) },
	// 	});
	// 	fetchShipments();
	// };

	// useEffect(() => {
	// 	fetchShipments();
	// }, [filterObject]);

	// useEffect(() => {
	// 	if (my_shipments?.length != 0) {
	// 		setFilteredShipments(my_shipments);
	// 	} else {
	// 		//   fetchBooking();
	// 		setFilteredShipments(my_shipments);
	// 	}
	// }, [my_shipments]);

	// useEffect(() => {
	// 	const timeout = setTimeout(() => {
	// 		setPending(false);
	// 	}, 2000);
	// 	return () => clearTimeout(timeout);
	// }, []);

	// useEffect(() => {
	// 	setFilteredShipments(my_shipments);
	// }, [my_shipments]);

	// const handleFilter = (filter: any, type: string) => {
	// 	let filtered = [];
	// 	if (type === "shipment_type") {
	// 		if (filter) {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_type: filter,
	// 				},
	// 			});
	// 		} else {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_type: "",
	// 				},
	// 			});
	// 		}
	// 	} else if (type === "shipment_transport_type") {
	// 		if (filter) {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_transport_type: filter,
	// 				},
	// 			});
	// 		} else {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_transport_type: "",
	// 				},
	// 			});
	// 		}
	// 	} else if (type === "shipment_status") {
	// 		if (filter) {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_status: filter,
	// 				},
	// 			});
	// 		} else {
	// 			setFilterObject({
	// 				...filterObject,
	// 				...{
	// 					page: "0",
	// 					shipment_status: "",
	// 				},
	// 			});
	// 		}
	// 	} else if (type === "shipment_date") {
	// 		if (filter.length) {
	// 			const [startDate, endDate] = filter;

	// 			if (startDate && endDate) {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						start_date: moment(startDate).format("MM/DD/YYYY"),
	// 						end_date: moment(endDate).format("MM/DD/YYYY"),
	// 					},
	// 				});
	// 			} else {
	// 				setFilterObject({
	// 					...filterObject,
	// 					...{
	// 						page: "0",
	// 						start_date: "",
	// 						end_date: "",
	// 					},
	// 				});
	// 			}
	// 		}
	// 	}

	// 	setFilteredShipments(filtered);
	// 	console.log("filtered-shipments", filtered);
	// };

	// const handleSearch = (value: string, type: string) => {
	// 	if (value) {
	// 		setFilterObject({ ...filterObject, ...{ page: "0", search: value } });

	// 		fetchShipments();
	// 	} else {
	// 		// fetchShipments();
	// 		setFilterObject({ ...filterObject, ...{ page: "0", search: "" } });
	// 	}
	// };

	// const customStyles = {
	// 	rows: {
	// 		style: {
	// 			minHeight: "72px",
	// 			maxWidth: "100%",
	// 		},
	// 	},

	// 	headCells: {
	// 		style: {
	// 			paddingTop: "20px",
	// 			paddingBottom: "20px",
	// 			backgroundColor: "#f0fdf4",
	// 			// justifyContent: "center",

	// 		},
	// 	},

	// 	cells: {
	// 		style: {
	// 			paddingTop: "10px",
	// 			paddingBottom: "10px"
	// 		},
	// 	},
	// };
	// const columns = [
	// 	{
	// 		name: "Job Number",
	// 		selector: (row) => {
	// 			return (
	// 				<div
	// 					className="green-text cursor-pointer"
	// 					onClick={() => {
	// 						setSelectedShipment(row);
	// 						window.location.href = `/shipments/shipment-details/${row?.["_id"]}`;
	// 					}}
	// 				>
	// 					<small>
	// 						{row?.job_number}
	// 					</small>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Service Type",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					<div className="mb-1">
	// 						<small className="capitalize">
	// 							{row?.shipment_transport_type === "ocean_freight" ? (
	// 								<>Ocean Freight</>
	// 							) : row?.shipment_transport_type === "air_freight" ? (
	// 								<>Air Freight</>
	// 							) : row?.shipment_transport_type === "haulage" ? (
	// 								<>Haulage</>
	// 							) : row?.shipment_transport_type === "warehousing" ? (
	// 								<>Warehousing</>
	// 							) : row?.shipment_transport_type === "customs_brokerage" ? (
	// 								<>Customs Brokerage</>
	// 							) : (
	// 								<></>
	// 							)}
	// 						</small>
	// 					</div>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Client Details",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					<div className="mb-1">
	// 						<small className="font-semibold capitalize">
	// 							{row.customer_details.length === 0
	// 								? "N/A"
	// 								: row.customer_details[0].company_name}
	// 						</small>
	// 					</div>
	// 					<div className="mb-1">
	// 						<small className="capitalize">{row.client_email}</small>
	// 					</div>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Shipment Status",
	// 		selector: (row) => {
	// 			return (
	// 				<div className="bg-yellow yellow-text py-1 px-1 rounded-full mt-3 mb-3">
	// 					<small className="capitalize">{row.shipment_status}</small>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Activity Status",
	// 		selector: (row) => {
	// 			return (
	// 				<div className="bg-light-green green-text py-1 px-1 rounded-full mt-3 mb-3">
	// 					<small className="capitalize">{row.activity_status}</small>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Shipment Type",
	// 		allowOverflow: true,
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					{row.shipment_type === "export" && <small>Export</small>}

	// 					{row.shipment_type === "import" && <small>Import</small>}
	// 				</div>
	// 			);
	// 		},
	// 	},



	// 	// {
	// 	// 	name: "Container Details",
	// 	// 	selector: (row) => {
	// 	// 		return (
	// 	// 			<div>
	// 	// 				{row?.container_details?.length}x{row?.container_details[0]?.container_size}
	// 	// 			</div>
	// 	// 		)
	// 	// 	},
	// 	// 	sortable: true,
	// 	// },

	// 	{
	// 		name: "B/L Number",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					{row?.shipment_transport_type === "air_freight" ? (
	// 						<>
	// 							<small className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
	// 								Not Applicable
	// 							</small>
	// 						</>
	// 					) : row?.shipment_transport_type === "warehousing" ? (
	// 						<>
	// 							<small className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
	// 								Not Applicable
	// 							</small>
	// 						</>
	// 					) : (
	// 						<>
	// 							<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
	// 								<small> {row.bl_number === "" ? "N/A" : row.bl_number}</small>
	// 							</div>
	// 						</>
	// 					)}
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Date Created",
	// 		selector: (row) => {
	// 			return (
	// 				<div className="grey-text py-1 px-2 rounded-full mt-3 mb-3">
	// 					<small>
	// 						<Moment format="DD-MM-YYYY">{row.createdAt}</Moment>
	// 					</small>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},

	// 	{
	// 		name: "Origin",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					<p
	// 						className="font-semibold capitalize px-4"
	// 						style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
	// 					>
	// 						{row?.shipment_type === "export" && row?.shipment_transport_type === "ocean_freight" ? (
	// 							<small>
	// 								{row?.origin_port_code}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "ocean_freight" ? (
	// 							<small>
	// 								{row?.port_of_discharge}
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "haulage" ? (
	// 							<small>
	// 								{row?.terminal_port}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "haulage" ? (
	// 							<small>
	// 								{row?.pickup_location}
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "warehousing" ? (
	// 							<small>
	// 								{/* N/A */}
	// 								{row?.port_of_loading === undefined ? "N/A" : row?.port_of_loading}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "warehousing" ? (
	// 							<small>
	// 								{/* {row?.port_of_discharge} */}
	// 								N/A
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 							<small>
	// 								{row?.origin_port_code === undefined ? "N/A" : row?.origin_port_code}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 							<small>
	// 								{row?.pickup_location}
	// 							</small>
	// 						) : (
	// 							<small>
	// 								{row?.origin_port_code}
	// 							</small>
	// 						)}
	// 					</p>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},
	// 	{
	// 		name: "Destination",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					<p
	// 						className="font-semibold capitalize px-1"
	// 						style={{ justifyContent: "center", whiteSpace: "break-spaces" }}
	// 					>
	// 						{row?.shipment_type === "export" && row?.shipment_transport_type === "ocean_freight" ? (
	// 							<small>
	// 								{row?.destination_port_code}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "ocean_freight" ? (
	// 							<small>
	// 								{row?.delivery_location}
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "haulage" ? (
	// 							<small>
	// 								{row?.stuffing_location}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "haulage" ? (
	// 							<small>
	// 								{row?.delivery_location}
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "warehousing" ? (
	// 							<small>
	// 								{/* {row?.port_of_loading === undefined
	// 									? "N/A"
	// 									: row?.port_of_loading} */}
	// 								N/A
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "warehousing" ? (
	// 							<small>
	// 								{/* N/A */}
	// 								{row?.port_of_discharge === undefined ? "N/A" : row?.port_of_discharge}
	// 							</small>
	// 						) : row?.shipment_type === "export" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 							<small>
	// 								{row?.delivery_location === undefined ? "N/A" : row?.delivery_location}
	// 							</small>
	// 						) : row?.shipment_type === "import" && row?.shipment_transport_type === "customs_brokerage" ? (
	// 							<small>
	// 								{row?.destination_port_code}
	// 							</small>
	// 						) : (
	// 							<small>
	// 								{row?.destination_port_code}
	// 							</small>
	// 						)}
	// 					</p>
	// 				</div>
	// 			);
	// 		},
	// 		sortable: true,
	// 	},
	// 	{
	// 		name: "",
	// 		selector: (row) => {
	// 			return (
	// 				<div>
	// 					{row?.shipment_transport_type === "air_freight" ? (
	// 						<>
	// 							<div
	// 								className="bg-green rounded cursor-pointer"
	// 								style={{ justifyContent: "center" }}
	// 								onClick={() => {
	// 									setSelectedShipment(row);
	// 									window.location.href = `/shipments/shipment-air-details/${row?.["_id"]}`;
	// 								}}
	// 							>
	// 								<p className="text-xs text-center white-text font-semibold p-2">
	// 									<small>Details & Edit</small>
	// 								</p>
	// 							</div>
	// 						</>
	// 					) : row?.shipment_transport_type === "warehousing" || row?.shipment_transport_type === "customs_brokerage" ? (
	// 						<>
	// 							<div
	// 								className="bg-green rounded cursor-pointer"
	// 								style={{ justifyContent: "center" }}
	// 								onClick={() => {
	// 									setSelectedShipment(row);
	// 									window.location.href = `/shipments/shipment-standalone-details/${row?.["_id"]}`;
	// 								}}
	// 							>
	// 								<p className="text-xs text-center white-text font-semibold p-2">
	// 									<small>Details & Edit</small>
	// 								</p>
	// 							</div>
	// 						</>
	// 					) : (
	// 						<>
	// 							<div
	// 								className="bg-green rounded cursor-pointer"
	// 								style={{ justifyContent: "center" }}
	// 								onClick={() => {
	// 									setSelectedShipment(row);
	// 									window.location.href = `/shipments/shipment-details/${row?.["_id"]}`;
	// 								}}
	// 							>
	// 								<p className="text-xs text-center white-text font-semibold p-2">
	// 									<small>Details & Edit</small>
	// 								</p>
	// 							</div>
	// 						</>
	// 					)}
	// 				</div>
	// 			);
	// 		},
	// 	},

	// 	{
	// 		name: "",
	// 		selector: (row) => {
	// 			return (
	// 				<>
	// 					{admin_data.role === "super_admin" ? (
	// 						<>
	// 							<div
	// 								className="bg-red rounded cursor-pointer"
	// 								style={{ justifyContent: "center" }}
	// 								onClick={() => {
	// 									setDataToDelete(row?.["_id"]);
	// 									setSelectedShipment(row);
	// 									setIsOpen(true);
	// 								}}
	// 							>
	// 								<p className="text-xs text-center white-text font-semibold p-2">
	// 									<small>Delete</small>
	// 								</p>
	// 							</div>
	// 						</>
	// 					) : (
	// 						<></>
	// 					)}
	// 				</>
	// 			);
	// 		},
	// 	},
	// ];

	// return (
	// 	<>
	// 		<div className="lg:flex">
	// 			<Aside openAside={openAside} SetOpenAside={SetOpenAside}
	// 			/>
	// 			<div className="dashboard-content">
	// 				<TopBar title={"Shipments"} SetOpenAside={SetOpenAside} />
	// 				<div className="lg:px-10 lg:pt-5 container lg:mx-auto lg:w-full">
	// 					<ShipmentDropdown handleFilter={handleFilter} />

	// 					<div>
	// 						<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
	// 							<div className="mt-2">
	// 								<p className="font-semibold text-lg pl-3 "> All Shipments{" "} </p>
	// 							</div>
	// 							<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
	// 								<small>Shipments </small>
	// 								<small style={{ color: "grey" }}> / All Shipments</small>
	// 							</div>
	// 						</div>
	// 					</div>

	// 					{loading ? (
	// 						<div className="text-center my-3">
	// 							<Link to="#" className="text-success">
	// 								{/* @ts-ignore */}
	// 								<PrimaryButton title="Loading Shipments" loading={loading} />
	// 							</Link>
	// 						</div>
	// 					) : (
	// 						<>
	// 							<div className="mt-2 w-full">
	// 								<>
	// 									<div className="mt-2 w-full">
	// 										{/* Desktop view */}
	// 										<div className="desktop-only pt-3 solid-br">
	// 											<DataTable
	// 												// @ts-ignore
	// 												columns={columns}
	// 												data={filteredShipments}
	// 												pagination
	// 												persistTableHead
	// 												responsive
	// 												actions={
	// 													<ActionsMemo
	// 														handleFilter={handleFilter}
	// 														handleSearch={handleSearch}
	// 														filteredShipments={filteredShipments}
	// 													/>
	// 												}
	// 												paginationPerPage={10}
	// 												customStyles={customStyles}
	// 												progressPending={pending}
	// 												paginationServer
	// 												paginationTotalRows={total_shipments}
	// 												onChangeRowsPerPage={handlePerRowsChange}
	// 												onChangePage={handlePageChange}
	// 												dense
	// 											/>
	// 										</div>
	// 									</div>
	// 									{/* Mobile View */}
	// 									<div className="bg-grey py-2 mobile-only">
	// 										<ActionsMemo
	// 											handleFilter={handleFilter}
	// 											handleSearch={handleSearch}
	// 											filteredShipments={filteredShipments}
	// 										/>
	// 										{my_shipments?.map((data: any, index: any) => {
	// 											return (
	// 												<div className="bg-white mb-3" key={index}>
	// 													<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
	// 														<div className="">
	// 															<p className="grey-text text-sm">
	// 																<span className="black-text">
	// 																	Job Number:{" "}
	// 																	{data?.job_number === undefined
	// 																		? "N/A"
	// 																		: data?.job_number}{" "}
	// 																</span>
	// 															</p>
	// 															<p className="grey-text text-sm">
	// 																<span className="black-text capitalize">
	// 																	Shipment Type: {data?.["shipment_type"]}
	// 																</span>
	// 															</p>
	// 															<p className="grey-text text-sm">
	// 																<span className="black-text">
	// 																	Shipment Transport Type:
	// 																	{data.shipment_transport_type ===
	// 																		"ocean_freight"
	// 																		? "Ocean Freight"
	// 																		: "" ||
	// 																			data.shipment_transport_type ===
	// 																			"haulage"
	// 																			? "Haulage"
	// 																			: "" ||
	// 																				data.shipment_transport_type ===
	// 																				"air_freight"
	// 																				? "Air Freight"
	// 																				: "" ||
	// 																					data.shipment_transport_type ===
	// 																					"import"
	// 																					? "import"
	// 																					: "" ||
	// 																						data.shipment_transport_type ===
	// 																						"export"
	// 																						? "Export"
	// 																						: ""}
	// 																</span>
	// 															</p>
	// 															<p className="grey-text text-sm">
	// 																<span className="black-text">
	// 																	Origin:
	// 																	{data?.shipment_type === "export" &&
	// 																		data?.shipment_transport_type ===
	// 																		"ocean_freight" ? (
	// 																		<>{data?.origin_port_code}</>
	// 																	) : data?.shipment_type === "import" &&
	// 																		data?.shipment_transport_type ===
	// 																		"ocean_freight" ? (
	// 																		<>{data?.port_of_discharge}</>
	// 																	) : data?.shipment_type === "export" &&
	// 																		data?.shipment_transport_type ===
	// 																		"haulage" ? (
	// 																		<>{data?.terminal_port}</>
	// 																	) : data?.shipment_type === "import" &&
	// 																		data?.shipment_transport_type ===
	// 																		"haulage" ? (
	// 																		<>{data?.pickup_location}</>
	// 																	) : (
	// 																		<>{data?.origin_port_code}</>
	// 																	)}
	// 																</span>
	// 															</p>

	// 															<p className="grey-text text-sm">
	// 																<span className="black-text">
	// 																	Destination:
	// 																	{data?.shipment_type === "export" &&
	// 																		data?.shipment_transport_type ===
	// 																		"ocean_freight" ? (
	// 																		<>{data?.destination_port_code}</>
	// 																	) : data?.shipment_type === "import" &&
	// 																		data?.shipment_transport_type ===
	// 																		"ocean_freight" ? (
	// 																		<>{data?.delivery_location}</>
	// 																	) : data?.shipment_type === "export" &&
	// 																		data?.shipment_transport_type ===
	// 																		"haulage" ? (
	// 																		<>{data?.stuffing_location}</>
	// 																	) : data?.shipment_type === "import" &&
	// 																		data?.shipment_transport_type ===
	// 																		"haulage" ? (
	// 																		<>{data?.delivery_location}</>
	// 																	) : (
	// 																		<>{data?.destination_port_code}</>
	// 																	)}
	// 																</span>
	// 															</p>

	// 															<p className="grey-text text-sm">
	// 																<span className="black-text">
	// 																	Date Created:
	// 																	{moment(data.createdAt).format("LLLL")}
	// 																</span>
	// 															</p>
	// 															<p className="grey-text text-sm ">
	// 																<span className="black-text capitalize">
	// 																	Company Name:
	// 																	{data.customer_details.length === 0
	// 																		? "N/A"
	// 																		: data.customer_details[0].company_name}
	// 																</span>
	// 															</p>
	// 														</div>
	// 													</div>

	// 													<div className="grid grid-cols-3 py-3 px-2 bottom-divider items-center">
	// 														<div
	// 															onClick={() => {
	// 																setDataToDelete(data?.["_id"]);
	// 																setSelectedShipment(data);
	// 																setIsOpen(true);
	// 															}}
	// 															className="bg-red p-1 cursor-pointern white-text text-xs py-2 text-center w-full rounded mr-3"
	// 														>
	// 															Delete
	// 														</div>

	// 														<div></div>
	// 														<Link
	// 															to=""
	// 															onClick={() => {
	// 																window.location.href = `/shipments/shipment-details/${data?.["_id"]}`;
	// 															}}
	// 															className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
	// 														>
	// 															Details
	// 														</Link>
	// 													</div>
	// 												</div>
	// 											);
	// 										})}
	// 										<div className="mt-4 mx-7 py-6 flex justify-between">
	// 											{/* left */}
	// 											{page === 0 ? (
	// 												<div
	// 													className="w-fit rotate-180 w-[24px] h-[24px]"
	// 													onClick={() => { }}
	// 												>
	// 													<svg
	// 														className="w-[100%] h-[100%]"
	// 														width="14"
	// 														height="14"
	// 														viewBox="0 0 14 14"
	// 														fill="none"
	// 														xmlns="http://www.w3.org/2000/svg"
	// 													>
	// 														<path
	// 															d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 															stroke="#d6dfed"
	// 															stroke-width="1.5"
	// 															stroke-linecap="round"
	// 															stroke-linejoin="round"
	// 														/>
	// 													</svg>
	// 												</div>
	// 											) : (
	// 												<div
	// 													className="w-fit rotate-180 w-[24px] h-[24px]"
	// 													onClick={() => {
	// 														handlePageChange(page);
	// 														setPage(page - 1);
	// 														setStartNum(startNum - 10);
	// 														setEndNum(endNum - 10);
	// 													}}
	// 												>
	// 													<svg
	// 														className="w-[100%] h-[100%]"
	// 														width="14"
	// 														height="14"
	// 														viewBox="0 0 14 14"
	// 														fill="none"
	// 														xmlns="http://www.w3.org/2000/svg"
	// 													>
	// 														<path
	// 															d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 															stroke="#374151"
	// 															stroke-width="1.5"
	// 															stroke-linecap="round"
	// 															stroke-linejoin="round"
	// 														/>
	// 													</svg>
	// 												</div>
	// 											)}

	// 											{/* middle */}
	// 											<div>
	// 												<p>
	// 													{startNum}-{endNum} of {total_shipments}
	// 												</p>
	// 											</div>

	// 											{/* right */}
	// 											{page >= Math.ceil(total_shipments / 10 - 1) ? (
	// 												<div
	// 													className=" w-[24px] h-[24px] "
	// 													onClick={() => { }}
	// 												>
	// 													<svg
	// 														className="w-[100%] h-[100%]"
	// 														width="14"
	// 														height="14"
	// 														viewBox="0 0 14 14"
	// 														fill="none"
	// 														xmlns="http://www.w3.org/2000/svg"
	// 													>
	// 														<path
	// 															d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 															stroke="#d6dfed"
	// 															stroke-width="1.5"
	// 															stroke-linecap="round"
	// 															stroke-linejoin="round"
	// 														/>
	// 													</svg>
	// 												</div>
	// 											) : (
	// 												<div
	// 													className=" w-[24px] h-[24px]"
	// 													onClick={() => {
	// 														handlePageChange(page + 2);
	// 														setPage(page + 1);
	// 														setStartNum(startNum + 10);
	// 														setEndNum(endNum + 10);
	// 													}}
	// 												>
	// 													<svg
	// 														className="w-[100%] h-[100%]"
	// 														width="14"
	// 														height="14"
	// 														viewBox="0 0 14 14"
	// 														fill="none"
	// 														xmlns="http://www.w3.org/2000/svg"
	// 													>
	// 														<path
	// 															d="M4.95703 2.91732L9.04036 7.00065L4.95703 11.084"
	// 															stroke="#374151"
	// 															stroke-width="1.5"
	// 															stroke-linecap="round"
	// 															stroke-linejoin="round"
	// 														/>
	// 													</svg>
	// 												</div>
	// 											)}
	// 										</div>
	// 									</div>
	// 									{/* Mobile View */}
	// 								</>
	// 							</div>
	// 						</>
	// 					)}

	// 				</div>
	// 			</div>
	// 		</div>
	// 		<DeleteModal
	// 			isOpen={isOpen}
	// 			setIsOpen={setIsOpen}
	// 			id={dataToDelete}
	// 			deleteShipment={props.deleteShipment}
	// 			selectedShipment={selectedShipment}
	// 			my_shipments={my_shipments}
	// 		/>
	// 	</>
	// );

	const { my_shipments, getShipments, total_shipments, loading } = props;
	const [openAside, SetOpenAside] = useState(false);
	const [filteredShipments, setFilteredShipments] = useState([]);
	const [selectedShipment, setSelectedShipment] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [dataToDelete, setDataToDelete] = useState({});
	const [pending, setPending] = useState(true);
	const [pageLoading, setPageLoading] = useState(false);
	const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
	const [page, setPage] = useState(0);
	const [startNum, setStartNum] = useState(1);
	const [endNum, setEndNum] = useState(10);

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	// prettier-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));

	const fetchShipments = () => {
		const filter_string = new URLSearchParams(filterObject).toString();
		setPageLoading(true);
		getShipments(filter_string);
	};

	const handlePageChange = (page) => {
		setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
		// fetchShipments();
	};

	const handlePerRowsChange = async (newPerPage, page) => {
		setFilterObject({
			...filterObject,
			...{ page: String(page), count: String(newPerPage) },
		});
		// fetchShipments();
	};

	useEffect(() => {
		fetchShipments();
	}, [filterObject]);

	useEffect(() => {
		if (my_shipments?.length != 0) {
			setFilteredShipments(my_shipments);
		} else {
			//   fetchBooking();
			setFilteredShipments(my_shipments);
		}
	}, [my_shipments]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	useEffect(() => {
		setFilteredShipments(my_shipments);
		console.log("change-in-shipments");
	}, [my_shipments]);

	console.log("filter-shipments", filteredShipments);

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

		setFilteredShipments(filtered);
		console.log("filtered-shipments", filtered);
	};

	const handleSearch = (value: string, type: string) => {
		if (value) {
			setFilterObject({ ...filterObject, ...{ page: "0", search: value } });

			fetchShipments();
		} else {
			setFilterObject({ ...filterObject, ...{ page: "0", search: "" } });
		}
	};

	return (
		<>
			<div className="lg:flex">
				<Aside openAside={openAside} SetOpenAside={SetOpenAside} />
				<div className="dashboard-content">
					<TopBar title={"Shipments"} SetOpenAside={SetOpenAside} />
					<div className="lg:px-10 lg:pt-5 container lg:mx-auto lg:w-full">
						<ShipmentDropdown handleFilter={handleFilter} />

						<div>
							<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
								<div className="mt-2">
									<p className="font-semibold text-lg pl-3 "> All Shipments </p>
								</div>
								<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
									<small>Shipments </small>
									<small style={{ color: "grey" }}> / All Shipments</small>
								</div>
							</div>
						</div>

						{loading ? (
							<div className="text-center my-3">
								<Link to="#" className="text-success">
									{/* @ts-ignore */}
									<PrimaryButton title="Loading Shipments" loading={loading} />
								</Link>
							</div>
						) : (
							<>
								<div className="mt-2 w-full">
									<>
										<div className="mt-2 w-full">
											{/* Desktop view */}
											<div className="desktop-only pt-3 w-[100%]">
												<ShipmentAntTable
													filteredShipments={filteredShipments}
													total_count={total_shipments}
													handlePageChange={handlePageChange}
													handlePerRowsChange={handlePerRowsChange}
													handleFilter={handleFilter}
													handleSearch={handleSearch}
													setDataToDelete={setDataToDelete}
													setIsOpen={setIsOpen}
													setSelectedShipment={setSelectedShipment}
													filterObject={filterObject}
												/>
											</div>
										</div>
										{/* Mobile View */}
										<div className="bg-grey py-2 mobile-only">
											{/* <ActionsMemo
												handleFilter={handleFilter}
												handleSearch={handleSearch}
												filteredShipments={filteredShipments}
											/> */}
											{my_shipments?.map((data: any, index: any) => {
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
																		{data.shipment_transport_type ===
																			"ocean_freight"
																			? "Ocean Freight"
																			: "" ||
																				data.shipment_transport_type ===
																				"haulage"
																				? "Haulage"
																				: "" ||
																					data.shipment_transport_type ===
																					"air_freight"
																					? "Air Freight"
																					: "" ||
																						data.shipment_transport_type ===
																						"import"
																						? "import"
																						: "" ||
																							data.shipment_transport_type ===
																							"export"
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
																			data?.shipment_transport_type ===
																			"haulage" ? (
																			<>{data?.terminal_port}</>
																		) : data?.shipment_type === "import" &&
																			data?.shipment_transport_type ===
																			"haulage" ? (
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
																			data?.shipment_transport_type ===
																			"haulage" ? (
																			<>{data?.stuffing_location}</>
																		) : data?.shipment_type === "import" &&
																			data?.shipment_transport_type ===
																			"haulage" ? (
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
																		Company Name:
																		{data.customer_details.length === 0
																			? "N/A"
																			: data.customer_details[0].company_name}
																	</span>
																</p>
															</div>
														</div>

														<div className="grid grid-cols-3 py-3 px-2 bottom-divider items-center">
															<div
																onClick={() => {
																	setDataToDelete(data?.["_id"]);
																	setSelectedShipment(data);
																	setIsOpen(true);
																}}
																className="bg-red p-1 cursor-pointern white-text text-xs py-2 text-center w-full rounded mr-3"
															>
																Delete
															</div>

															<div></div>
															<Link
																to=""
																onClick={() => {
																	window.location.href = `/shipments/shipment-details/${data?.["_id"]}`;
																}}
																className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
															>
																Details
															</Link>
														</div>
													</div>
												);
											})}
											<div className="mt-4 mx-7 py-6 flex justify-between">
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
														{startNum}-{endNum} of {total_shipments}
													</p>
												</div>

												{/* right */}
												{page >= Math.ceil(total_shipments / 10 - 1) ? (
													<div
														className=" w-[24px] h-[24px] "
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
														className=" w-[24px] h-[24px]"
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
									</>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<DeleteModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				id={dataToDelete}
				deleteShipment={props.deleteShipment}
				selectedShipment={selectedShipment}
				my_shipments={my_shipments}
			/>
		</>
	);

};

// export default Shipment;

const mapStateToProps = (state: any) => {
	const { my_shipments, total_shipments, error, loading } = state.shipments;
	return { my_shipments, total_shipments, error, loading };
};

// Table actions
// const ActionsMemo = (props: any): JSX.Element => {

// 	const { filteredShipments, handleFilter, handleSearch } = props;

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
// 						<option value="customs_brokerage">Customs Brokerage</option>{" "}
// 					</select>
// 				</div>
// 			</div>

// 			<div className="mb-5 mr-3">
// 				<div className="">
// 					<select
// 						name=""
// 						id="status"
// 						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
// 						onChange={(e) => handleFilter(e.target.value, "shipment_status")}
// 					>
// 						<option value="">Shipment Status</option>
// 						<option value="active">Active/In Progress</option>
// 						<option value="completed">Completed</option>
// 						<option value="booking placed">Booking Placed</option>
// 						<option value="invoice accepted">Invoice Accepted</option>
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

// 			{/* <div className="mb-6 mr-1 desktop-only">
// 				<ExportCSV
// 					onExport={() => downloadCSV(filteredShipments, "shipments.csv")}
// 				/>
// 			</div> */}

// 			<input
// 				placeholder="Search Shipments"
// 				className="form-input px-3 custom-input w-full black-text w-40 mb-5"
// 				onChange={(e) => handleSearch(e.target.value)}
// 			/>
// 		</div>
// 	);

//   const { filteredShipments, handleFilter, handleSearch } = props;

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
//             <option value="customs_brokerage">Customs Brokerage</option>{" "}
//           </select>
//         </div>
//       </div>

//       <div className="mb-5 mr-3">
//         <div className="">
//           <select
//             name=""
//             id="status"
//             className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
//             onChange={(e) => handleFilter(e.target.value, "shipment_status")}
//           >
//             <option value="">Shipment Status</option>
//             <option value="active">Active/In Progress</option>
//             <option value="completed">Completed</option>
//             <option value="booking placed">Booking Placed</option>
//             <option value="invoice accepted">Invoice Accepted</option>
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

//       <div className="mb-6 mr-1 desktop-only">
//         {/* <ShipmentCsvData /> */}
//         <ExportCSV
//           onExport={() => downloadCSV(filteredShipments, "shipments.csv")}
//         />
//       </div>

//       <input
//         placeholder="Search Shipments"
//         className="form-input px-3 custom-input w-full black-text w-40 mb-5"
//         onChange={(e) => handleSearch(e.target.value)}
//       />
//     </div>
//   );

// };

// const ExportCSV = ({ onExport }) => (
//   <button
//     className="bg-grey black-text text-xs w-32 py-2 px-3 text-center rounded solid-br"
//     onClick={(e) => onExport(e["target"]["value"])}
//   >
//     Export CSV
//   </button>
// );

export default connect(mapStateToProps, { getShipments, deleteShipment })(
	Shipment
);
