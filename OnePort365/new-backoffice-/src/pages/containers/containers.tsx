import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import PrimaryButton from "components/buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import { getContainers } from "store/actions";
import { downloadCSV } from "helpers/jsonToCsv";
import moment from "moment";
import CustomDateFilter from "components/customDateFilter/customDateFilter";
import Moment from "react-moment";

const Containers = (props: any) => {
	const { containers, getContainers, total_containers, loading } = props;
	console.log("the check of the containers", containers);
	const [openAside, SetOpenAside] = useState(false);
	const [filteredContainers, setFilteredContainers] = useState([]);
	const [pending, setPending] = useState(true);
	const [pageLoading, setPageLoading] = useState(false);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(0);
	const [startNum, setStartNum] = useState(1);
	const [endNum, setEndNum] = useState(10);
	const [filterObject, setFilterObject] = useState({ page: "0", count: "10" });
	console.log(filteredContainers);

	const fetchContainers = () => {
		const filter_string = new URLSearchParams(filterObject).toString();
		setPageLoading(true);
		getContainers(filter_string);
	}

	const handlePageChange = (page) => {
		setFilterObject({ ...filterObject, ...{ page: String(page - 1) } });
		fetchContainers();
	};

	// handle per rows change
	const handlePerRowsChange = async (newPerPage, page) => {
		setFilterObject({
			...filterObject,
			...{ page: String(page), count: String(newPerPage) },
		});
		fetchContainers();
	};

	useEffect(() => {
		// setFilterObject(filterObject);
		fetchContainers();
	}, [filterObject]);

	useEffect(() => {
		if (containers.length != 0) {
			//   fetchContainers();
			setFilteredContainers(containers);
		} else {
			//   fetchContainers();
			setFilteredContainers(containers);
		}
	}, [containers]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const handleSearch = (value: string, type: string) => {
		if (value) {
			setFilterObject({ ...filterObject, ...{ page: "0", search: value } });
			fetchContainers();
		} else {
			// fetchContainers();
			setFilterObject({ ...filterObject, ...{ page: "0", search: "" } });
		}
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
				paddingBottom: "10px"
			},
		},
	};

	const columns = [
		{
			name: "Job Number",
			selector: (row) => {
				return (
					<div
						className="green-text cursor-pointer">
						<small>
							{row?.shipment_details[0]?.job_number}
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
					<div className='capitalize'>
						<small>{row?.shipment_details[0]?.shipment_type}</small>
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Container No",
			selector: (row) => {
				return (
					<div className="green-text cursor-pointer">
						<small>
							{row.container_number === null ? "N/A" : row.container_number}
						</small>
					</div>
				);
			},
			sortable: true,
		},
		// {
		// 	name: "Client Details",
		// 	selector: (row) => {
		// 		return (
		// 			<div>
		// 				<div className="mb-1">
		// 					<p className="font-semibold capitalize">
		// 						{row.shipment_details[0] === undefined
		// 							? "No Shipment Details"
		// 							: row.shipment_details[0].client_name}
		// 					</p>
		// 				</div>
		// 				<div className="mb-1">
		// 					<small>
		// 						{row.shipment_details[0] === undefined
		// 							? "No Shipment Details"
		// 							: row.shipment_details[0].client_email}
		// 					</small>
		// 				</div>
		// 			</div>
		// 		);
		// 	},
		// 	sortable: true,
		// },

		{
			name: "Container Details",
			selector: (row) => {
				return (
					<div>
						<small>{row?.container_size === undefined ? "No Container Size" : row?.container_size}</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Container Type",
			selector: (row) => {
				return (
					<div className="capitalize">
						<small>	{row?.container_type === undefined ? "No Container Size" : row?.container_type}</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Container Status",
			selector: (row) => {
				return (
					<div className="bg-light-green green-text py-1 px-2 rounded-full mt-3 mb-3"	>
						<small>
							{row.container_status === "NEW"
								? "New Container"
								: row.container_status}
						</small>
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Date Created",
			selector: (row) => {
				return (
					<div>
						<small><Moment format="DD-MM-YYYY  hh:mmA">{row.createdAt}</Moment></small>
					</div>
				);
			},
			sortable: true,
		},
	];


	return (
		<>
			<div className="lg:flex">
				<Aside
					activeTab="Containers"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
				<div className="dashboard-content">
					<TopBar title={"Containers"} SetOpenAside={SetOpenAside} />
					<div className="lg:px-10 lg:pt-5 container lg:mx-auto lg:w-full">
						{/* <CustomDateFilter handleFilter={handleFilter} /> */}
						<div>
							<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
								<div className="mt-2">
									<p className="font-semibold text-lg pl-3 ">All Containers</p>
								</div>
								<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
									<small>Containers</small>
									<small style={{ color: "grey" }}> / All Containers</small>
								</div>
							</div>
						</div>

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
								<div className="container mx-auto w-full mb-5">
									<>
										<div className="mt-2 w-full">
											{/* Desktop view */}
											<div className="desktop-only pt-3 solid-br">
												<DataTable
													// @ts-ignore
													columns={columns}
													loading={loading}
													data={filteredContainers}
													pagination
													persistTableHead
													responsive
													paginationPerPage={10}
													actions={
														<ActionsMemo
															// handleFilter={handleFilter}
															handleSearch={handleSearch}
															filteredContainers={filteredContainers}
														/>
													}
													customStyles={customStyles}
													paginationServer
													paginationTotalRows={total_containers}
													onChangeRowsPerPage={handlePerRowsChange}
													onChangePage={handlePageChange}
													dense
												/>
											</div>
										</div>
									</>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

// export default Containers

const mapStateToProps = (state: any) => {
	const { containers, total_containers, error, loading } = state.containers;
	return { containers, total_containers, error, loading };
};

// Table actions
const ActionsMemo = (props: any): JSX.Element => {
	const { filteredContainers, handleFilter, handleSearch } = props;
	return (
		<>
			{/* <div className="mb-5 mr-3">
				<div className="">
					<select
						name=""
						id="container_status"
						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
						onChange={(e) => handleFilter(e.target.value, "container_status")}
					>
						<option value="">Container Status</option>
						<option value="NEW">New Containers</option>
						<option value="File Opening">File Opening</option>
						<option value="In Transit">In Transit</option>
						<option value="File Closed">File Closed</option>
						<option value="sealing">Sealing</option>
						<option value="truck_positioning">Truck Positioning</option>
						<option value="gate_in">Gate In</option>
                        <option value="stuffing">Stuffing</option>
                        <option value="sailing">Sailing</option>
                        <option value="post_shipment_to_docs">Post Shipment To Docs</option>
					</select>
				</div>
			</div> */}

			{/* <div className="mb-5 mr-3">
				<ExportCSV
					onExport={() => downloadCSV(filteredContainers, "containers.csv")}
				/>
			</div> */}
			{/* <ContainerCsvData /> */}
			<input
				placeholder="Search by Container Number"
				className="form-input px-3 py-1 custom-input w-full black-text w-52 mb-5"
				onChange={(e) => handleSearch(e.target.value)}
			/>
		</>
	);
};

// const ExportCSV = ({ onExport }) => (
// 	<button
// 		className="bg-grey black-text text-xs w-32 py-2.5 text-center rounded solid-br"
// 		onClick={(e) => onExport(e["target"]["value"])}
// 	>
// 		Export CSV
// 	</button>
// );

export default connect(mapStateToProps, { getContainers })(Containers);
