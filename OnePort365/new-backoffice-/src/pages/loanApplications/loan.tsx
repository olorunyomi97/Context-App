import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DataTable from "react-data-table-component";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import ShipmentDropdown from "components/shipmentDropdown/shipmentDropdown";
import PrimaryButton from "components/buttons/PrimaryButton";
import "react-datepicker/dist/react-datepicker.css";
import { getLoanApplications } from "store/actions";
import { downloadCSV } from "helpers/jsonToCsv";
import CustomDateFilter from "components/customDateFilter/customDateFilter";
import moment from "moment";
import Moment from 'react-moment';

const Loan = (props: any) => {
	const { loan_applications, loading } = props
	console.log(loan_applications)
	const [openAside, SetOpenAside] = useState(false);
	const [filteredLoanApplications, setFilteredsetLoanApplications] = useState([]);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		props.getLoanApplications();
	}, [])

	useEffect(() => {
		setFilteredsetLoanApplications(loan_applications);
	}, [loan_applications]);


	useEffect(() => {
		const timeout = setTimeout(() => {
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);

	const customStyles = {
		// rows: {
		// 	style: {
		// 		minHeight: "72px",
		// 		maxWidth: "100%",
		// 	},
		// },

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
			name: "Invoice Number",
			selector: (row) => {
				return (
					<div
						className="green-text cursor-pointer"
						onClick={() => {
							// setSelectedShipment(row);
							window.location.href = `/loan-application-details/${row?.['_id']}`
						}}
					>
						<small>{row?.job_number}</small>
					</div>
				)
			},
			sortable: true,
		},
		{
			name: "Client Details",
			selector: (row) => {
				return (
					<div>
						<div className="mb-1">
							<small className="font-semibold capitalize">{row?.user_id?.firstname} {row?.user_id?.lastname}</small>
						</div>
						<div className="mb-1">
							<small className="capitalize">{row?.user_id?.company_name}</small>
						</div>

					</div>

				)
			},
			sortable: true,
		},

		{
			name: "Loan Provider",
			selector: (row) => {
				return (
					<div className="capitalize">
						<small className="font-semibold capitalize">{row?.loan_provider === undefined ? 'N/A' : row?.loan_provider}</small>
					</div>
				)
			},
			sortable: true,
		},

		{
			name: "Loan Status",
			selector: (row) => {
				return (
					<div className="bg-light-green green-text py-1 rounded-full mt-3 mb-3">
						<small className="px-2">{row?.loan_status}</small>
					</div>
				)
			},
			sortable: true,
		},

		{
			name: "Amount",
			selector: (row) => {
				return (
					<div className="grey-text py-1 rounded-full mt-3 mb-3">
						<small>₦{row?.loan_amount}</small>
					</div>
				)
			},
			sortable: true,
		},

		{
			name: "Date Requested",
			selector: (row) => {
				return (
					<div>
						<small className="grey-text">{moment(row?.createdAt).format("LL")}</small>
					</div>
				)
			},
			sortable: true,
		},




	];

	const handleSearch = (event) => {
		console.log(event)
		let value = event.toLowerCase();
		const results: any = []

		loan_applications.filter(loan_applications => {
			if (loan_applications._id.toLowerCase().includes(value.toLowerCase())
				|| loan_applications.job_number.toLowerCase().includes(value.toLowerCase())
				|| loan_applications.client_name.toLowercase().includes(value.toLowerCase())
			) {
				results.push(loan_applications)
			}
		});
		setFilteredsetLoanApplications(results)
	}

	// const handleFilter = (value: string, type: string) => {
	// 	let filteredData = loan_applications;
	// 	if (value) {
	// 		if (type === "loan_status") {
	// 			filteredData = loan_applications.filter((item) => {
	// 			return item.shipment_status.toLowerCase() === value.toLowerCase();
	// 		});
	// 		} else if (type === "loan_provider") {
	// 			filteredData =  loan_applications.filter((item) => {
	// 			return item.loan_provider.toLowerCase() === value.toLowerCase();
	// 		});
	// 		// }  else if (type === "shipment_transport_type") {
	// 		// 		filteredData = loan_applications.filter((item) => {
	// 		// 		return item.shipment_transport_type.toLowerCase() === value.toLowerCase();
	// 		// 	});
	// 		}

	// 	}
	// 	setFilteredsetLoanApplications(filteredData);
	// };

	const handleFilter = (filter: any, type: string) => {
		let filtered = [];
		// Dummy Status
		if (type === "loan_statuse") {
			filtered = loan_applications.filter((loan: any) => {
				return loan.loan_statuse.toLowerCase() === filter.toLowerCase();
			});

		} else if (type === "loan_status") {
			if (filter) {
				filtered = loan_applications.filter((loan: any) => {
					return loan.loan_status.toLowerCase() === filter.toLowerCase();
				});
			} else {
				filtered = loan_applications;
			}

		} else if (type === "loan_provider") {
			if (filter) {
				filtered = loan_applications.filter((loan: any) => {
					return loan.loan_provider.toLowerCase() === filter.toLowerCase();
				});
			} else {
				filtered = loan_applications;
			}

		} else if (type === "shipment_date") {
			if (filter.length) {
				const [startDate, endDate] = filter;

				if (startDate && endDate) {
					filtered = loan_applications.filter((shipment: any) => {
						console.log(moment(shipment.shipment_date));
						return (
							moment(shipment.createdAt).isSameOrAfter(startDate) &&
							moment(shipment.createdAt).isSameOrBefore(endDate)
						);
					});
				} else {
					filtered = loan_applications
				}
			}
		}

		setFilteredsetLoanApplications(filtered);
		console.log('filtered-Loan Applications', filtered)
	};


	return (
		<>
			<div className="lg:flex">
				<Aside
					activeTab="Loan Applications"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
				<div className="">
					<TopBar title={"Loan Applications"} SetOpenAside={SetOpenAside} />
					<div className="dashboard-content">
						<div className="lg:px-10 lg:pt-5 container mx-auto w-full">
							<CustomDateFilter handleFilter={handleFilter} />
							<div>
								<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
									<div className="mt-2">
										<p className='font-semibold text-lg pl-3 '>All Loan Applications </p>
									</div>
									<div className="mt-2 ml-auto" style={{ textAlign: 'right' }}>
										<small>Loan Applications </small><small style={{ color: 'grey' }}> / All Loan Applications</small>
									</div>
								</div>
							</div>

							{
								loading ?
									(
										<div className="text-center my-3">
											<Link to="#" className="text-success">
												{/* @ts-ignore */}
												<PrimaryButton title="Loading Loan Applications" loading={loading} />
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
																data={filteredLoanApplications}
																pagination
																persistTableHead
																responsive
																paginationPerPage={15}
																actions={
																	<ActionsMemo
																		handleFilter={handleFilter}
																		handleSearch={handleSearch}
																		filteredLoanApplications={filteredLoanApplications}
																	/>
																}
																customStyles={customStyles}
																progressPending={pending}
																dense
															/>
														</div>
													</div>

												</>
											</div>
										</>
									)

							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}



const mapStateToProps = (state: any) => {
	const { loan_applications, error, loading } = state.loanApplications;
	return { loan_applications, error, loading };
};

// Table actions
const ActionsMemo = (props: any): JSX.Element => {
	const { filteredLoanApplications, handleFilter, handleSearch } = props;
	return (
		<>

			<div className="mb-5 mr-3">
				<div className="">
					<select
						name=""
						id="loan_provider"
						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
						onChange={(e) => handleFilter(e.target.value, "loan_provider")}
					>
						<option value="">Loan Provider</option>
						<option value="extinversa">Exinversa</option>
						{/* <option value="air_freight">Air Freight</option>
					<option value="haulage">Haulage</option> */}
					</select>
				</div>
			</div>

			<div className="mb-5 mr-3">
				<div className="">
					<select
						name=""
						id="loan_status"
						className=" px-3 py-2 text-xs rounded custom-input  w-full black-text bg-grey"
						onChange={(e) => handleFilter(e.target.value, "loan_status")}
					>
						<option value="">Loan Status</option>
						<option value="pending">Pending</option>
						<option value="accepted">Accepted</option>
						<option value="rejected">Rejected</option>
					</select>
				</div>
			</div>

			{/* <div className="mb-5 mr-3">
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
			</div> */}

			<div className="mb-5 mr-3">
				<ExportCSV onExport={() => downloadCSV(filteredLoanApplications, "loanapplication.csv")} />
			</div>
			<input
				placeholder="Search Loan Applications"
				className="form-input px-3 py-1 custom-input w-full black-text w-52 mb-5"
				onChange={(e) => handleSearch(e.target.value)}
			/>

		</>
	);
};

const ExportCSV = ({ onExport }) => (
	<button
		className="bg-grey black-text text-xs w-32 py-2 px-3 text-center rounded solid-br"
		onClick={(e) => onExport(e["target"]["value"])}
	>
		Export CSV
	</button>
);

export default connect(mapStateToProps, { getLoanApplications })(Loan);
