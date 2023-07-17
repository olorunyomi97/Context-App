import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import moment from "moment";
import DataTable from "react-data-table-component";
import CustomTabs from "components/customTabs/CustomTabs";
import PrimaryButton from "components/buttons/PrimaryButton";
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import ContainerDetailsDrawer from "./containerTabPartials/containerDetailsDrawer";
import ContainerStatusDrawer from "./containerTabPartials/containerStatusDrawer";
import SingleContainerStatus from "./containerTabPartials/singleContainerStatusUpdate";
import movement from "assets/icons/movement.svg";
import DeleteModal from "./containerTabPartials/deleteContainer";
import { deleteContainer } from "store/actions";
import "../../index.css";

const ContainerDetails = (props: any) => {
	const params = useParams();
	const { single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	// console.log(single_shipment_data.container_details)
	const [openAside, SetOpenAside] = useState(false);
	const [tab, setTab] = useState("Shipment Details");
	const [isUpdateContainer, setIsUpdateContainer] = useState(false);
	const [dataToUpdate, setDataToUpdate] = useState({});
	const [isSingleStatusUpdate, setIsSingleStatusUpdate] = useState(false);
	const [singleStatusToUpdate, setSingleStatusToUpdate] = useState({});
	const [singleStatusRow, setSingleStatusRow] = useState();
	const [isUpdateStatus, setIsUpdateStatus] = useState(false);
	const [statusToUpdate, setStatusToUpdate] = useState({});
	const [containerId, setContainerId] = useState([]);
	const [selectedContainer, setSelectedContainer] = useState({});
	//   state to store boolean value of selected row
	const [selected, setSelected] = useState<any>([]);
	// state to store the row of the clicked container
	const [isOpen, setIsOpen] = useState(false);
	const [dataToDelete, setDataToDelete] = useState({});
	const [filteredContainers, setFilteredContainers] = useState([]);

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	//prettier-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	console.log(admin_data);

	const updateContainerData = (selected_ids) => {
		let container_ids: string[] = [];
		selected_ids.forEach(({ _id }) => {
			container_ids.push(_id);
		});
		// @ts-ignore
		setContainerId(container_ids);
	};
	console.log(selectedContainer);

	useEffect(() => {
		setFilteredContainers(single_shipment_data?.container_details);
	}, [single_shipment_data?.container_details]);
	console.log(single_shipment_data)

	const customStyles = {
		rows: {
			style: {
				minHeight: "50px",
			},
		},
		headCells: {
			style: {
				paddingLeft: "8px",
				paddingRight: "8px",
				backgroundColor: "#f0fdf4",
			},
		},
		cells: {
			style: {
				paddingLeft: "8px",
				paddingRight: "8px",
			},
		},
	};

	const columns = [
		{
			name: "Job Number",
			selector: (row) => {
				return (
					<div>
						{single_shipment_data?.job_number === null ? "N/A" : single_shipment_data?.job_number}
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Container Number",
			selector: (row) => {
				return (
					<div className="uppercase">
						{row?.container_number === null ? "N/A" : row?.container_number}
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Seal Number",
			selector: (row) => {
				return (
					<div className="uppercase">
						{row?.shipping_line_seal_number === null
							? "N/A"
							: row?.shipping_line_seal_number}
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "B/L Number",
			selector: (row) => {
				return (
					<div className="uppercase">
						{/* {row?.bl_number === undefined ? 'Unavailable' : row?.bl_number} */}
						{single_shipment_data?.bl_number === ""
							? "Unavailable"
							: single_shipment_data?.bl_number}
					</div>
				);
			},
		},
		{
			name: "Size",
			selector: (row) => {
				return <div>{single_shipment_data?.container_details[0]?.container_size}</div>;
			},
		},
		{
			name: "Status",
			selector: (row) => {
				return (
					<div
						className="bg-light-green green-text py-1 px-2 rounded-full mt-3 mb-3"
						style={{ marginRight: "10px" }}
					>
						<small>{row?.container_status}</small>
					</div>
				);
			},
		},

		{
			name: "",
			selector: (row) => {
				return (
					<div
						className="bg-green p-1 rounded cursor-pointer"
						style={{ justifyContent: "center" }}
						onClick={() => {
							setDataToUpdate(row?._id);
							setSelectedContainer(row);
							setIsUpdateContainer(true);
						}}
					>
						<p className="text-xs text-center white-text font-semibold p-2">
							<small> Edit Details</small>
						</p>
					</div>
				);
			},
		},
		{
			name: "",
			selector: (row) => {
				return (
					<div
						className="solid-br p-1 rounded cursor-pointer"
						style={{ justifyContent: "center" }}
						onClick={() => {
							setSingleStatusRow(row);
							setSingleStatusToUpdate(row?._id);
							setIsSingleStatusUpdate(true);
						}}
					>
						<p className="text-xs text-center black-text font-semibold p-2">
							<small> Update Status</small>
						</p>
					</div>
				);
			},
		},

		{
			name: "",
			selector: (row) => {
				return (
					<>
						{admin_data.role === "super_admin" ? (
							<>
								<div
									className="bg-red p-1 rounded cursor-pointer"
									style={{ justifyContent: "center" }}
									onClick={() => {
										setDataToDelete(row?.["_id"]);
										setSelectedContainer(row);
										setIsOpen(true);
									}}
								>
									<p className="text-xs text-center white-text font-semibold p-2">
										<small> Delete </small>
									</p>
								</div>
							</>
						) : (
							<></>
						)}
					</>
				);
			},
		},
	];

	// const handleSearch = (event) => {
	// 	console.log("this is the string written", event);
	// 	let value = event;
	// 	console.log("this is the string value written", event);
	// 	const results: any = [];

	// 	const matchShipment = single_shipment_data?.container_details?.filter(
	// 		(single_shipment_data) => {
	// 			//prettier-ignore
	// 			return `${single_shipment_data?.container_number} ${single_shipment_data?.shipping_line_seal_number}`
	// 				.toLowerCase()
	// 				.includes(event.target.value.toLowerCase())
	// 		}
	// 	);

	// 	setFilteredContainers(results);
	// 	console.log("this is the results in handleSearch", results);
	// 	console.log("this is the filter in handleSearch", filteredContainers);
	// };

	const handleSearch = (event) => {
		let value = event;
		const results: any = [];

		single_shipment_data?.container_details?.filter((single_shipment_data) => {
			console.log(
				"seal number inside the filter",
				single_shipment_data?.container_number.toLowerCase()
			);
			if (
				//prettier-ignore
				single_shipment_data?.container_number.toLowerCase().includes(value.toLowerCase())
				// single_shipment_data?.shipping_line_seal_number.toLowerCase().includes(value.toLowerCase())
			) {
				results.push(single_shipment_data);
			}
		});
		setFilteredContainers(results);
	};

	// console.log("the single shipment", single_shipment_data);
	// console.log("the single result", single_shipment_data);
	// console.log("filtered results", filteredContainers);

	return (
		<div>
			<>
				<div className="desktop-only">
					<div className="flex items-center">
						<small className="ml-auto small-text">
							Update Container status button above disabled.
						</small>
					</div>
					<div className="flex items-center">
						<small className="ml-auto small-text">
							Select one or more containers to enable.
						</small>
					</div>
					<div className="flex items-center ">
						<>
							<input
								placeholder="Search By Container Number"
								className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
								onChange={(e) => handleSearch(e.target.value)}
							// onChange={(e) => handleSearch(e)}
							/>
						</>
						{/* Button to Update Multiple Status Should be disabled if the checkbox is not clicked */}
						<>
							{selected.length > 0 ? (
								<Link
									to=""
									className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
									onClick={() => {
										setStatusToUpdate(single_shipment_data?._id);
										setIsUpdateStatus(true);
									}}
								>
									Update Container Status
								</Link>
							) : (
								<Link
									to=""
									className="bg-grey solid-br py-2 px-3 rounded ml-auto text-sm black-text"
								>
									Update Container Status
								</Link>
							)}
						</>
					</div>
				</div>

				<div className="pt-3 solid-br desktop-only">
					<DataTable
						//@ts-ignore
						columns={columns}
						data={filteredContainers}
						pagination
						persistTableHead
						responsive
						customStyles={customStyles}
						selectableRows
						selectableRowsHighlight={false}
						onSelectedRowsChange={({ selectedRows }) => {
							updateContainerData(selectedRows);
							setSelected(selectedRows);
						}}
						paginationPerPage={30}
					// actions={
					// 	<ActionsMemo handleSearch={handleSearch} />
					// }
					/>
				</div>

				{/* Mobile View */}
				<div className="bg-grey py-2 mobile-only">
					{/* <div className="mobile-padding">
						<ActionsMemo
							handleSearch={handleSearch}
							data={filteredContainers}
						/>
					</div> */}
					{single_shipment_data?.container_details.map(
						(data: any, index: any) => {
							return (
								<div className="bg-white mb-3" key={index}>
									<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
										<div className="">
											<p className="grey-text text-sm">
												<span className="black-text">
													Job Number:{" "}
													{single_shipment_data?.job_number === null ? "N/A" : single_shipment_data?.job_number}
												</span>
											</p>
											<p className="black-text">
												Container Number:{" "}
												<span className="uppercase">{data?.["container_number"] === null
													? "N/A"
													: data?.container_number}{" "}
												</span>
											</p>
											<p className="black-text">
												Seal Number:{" "}
												<span className="uppercase">{data?.["shipping_line_seal_number"] === null
													? "N/A"
													: data?.shipping_line_seal_number}
												</span>
											</p>
											<p className="grey-text text-sm">
												<span className="black-text">
													B/L Number:{" "}
													{data?.["bl_number"] === null
														? "N/A"
														: data?.bl_number}
												</span>
											</p>
											<p className="grey-text text-sm">
												<span className="black-text">
													Continer Size:{" "}
													{data?.container_size === undefined
														? "Unavailable"
														: data?.container_size}
												</span>
											</p>
											<p className="grey-text text-sm">
												<span className="black-text">
													Continer Status:{" "}
													{data?.container_status === undefined
														? "Unavailable"
														: data?.container_status}
												</span>
											</p>
											<p className="grey-text text-sm">
												<span className="black-text">
													Last Updated:{" "}
													{moment(data?.createdAt).format("DD/MM/YYYY")}
												</span>
											</p>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
										<div
											className="bg-green p-1 rounded cursor-pointer"
											style={{ justifyContent: "center" }}
											onClick={() => {
												setDataToUpdate(data?._id);
												setSelectedContainer(data);
												setIsUpdateContainer(true);
											}}
										>
											<p className="text-xs text-center white-text font-semibold p-2">
												<small> Edit Details</small>
											</p>
										</div>

										<div
											className="solid-br p-1 rounded cursor-pointer"
											style={{ justifyContent: "center" }}
											onClick={() => {
												setSingleStatusRow(data);
												setSingleStatusToUpdate(data?._id);
												setIsSingleStatusUpdate(true);
											}}
										>
											<p className="text-xs text-center black-text font-semibold p-2">
												<small> Update Status</small>
											</p>
										</div>


									</div>
								</div>
							);
						}
					)}
				</div>
				{/* Mobile View */}
			</>
			<ContainerDetailsDrawer
				isOpen={isUpdateContainer}
				setIsOpen={setIsUpdateContainer}
				container_id={dataToUpdate}
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
				single_shipment={single_shipment}
			/>
			<ContainerStatusDrawer
				isOpen={isUpdateStatus}
				setIsOpen={setIsUpdateStatus}
				container_id={statusToUpdate}
				single_shipment={single_shipment}
				containerId={containerId}
				row_number={singleStatusRow}
			/>
			<SingleContainerStatus
				isOpen={isSingleStatusUpdate}
				setIsOpen={setIsSingleStatusUpdate}
				container_id={singleStatusToUpdate}
				single_shipment={single_shipment}
				row_number={singleStatusRow}
			/>

			<DeleteModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				id={dataToDelete}
				deleteContainer={props.deleteContainer}
				selectedContainer={selectedContainer}
				setSelectedContainer={setSelectedContainer}
			/>
		</div >
	);
};

// export default ContainerDetails

const mapStateToProps = (state: any) => {
	const { error, loading } = state.shipments;
	return { error, loading };
};

// Table actions
const ActionsMemo = (props: any): JSX.Element => {
	const { handleSearch } = props;
	return (
		<>
			<input
				placeholder="Search By Container Number"
				className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
				onChange={(e) => handleSearch(e.target.value)}
			// onChange={(e) => handleSearch(e)}
			/>
		</>
	);
};

export default connect(mapStateToProps, { deleteContainer })(ContainerDetails);
