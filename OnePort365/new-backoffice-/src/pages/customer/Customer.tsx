import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import QuoteIcon from "assets/icons/quote.svg";
import PrimaryButton from "components/buttons/PrimaryButton";
import DataTable from "react-data-table-component";
import Moment from 'react-moment';
import ReactPaginate from "react-paginate";
import DeleteModal from "./customerPartials/deleteModal";
import { getCustomers, getSingleCustomer, deleteCustomer } from "store/actions";
import moment from "moment";
import "../../App.css"


const Customers = (props: any) => {
	const { customers, loading } = props;

	const [openAside, SetOpenAside] = useState(false);
	const [filteredCustomers, setFilteredCustomers] = useState([]);
	const [selectedCustomer, setSelectedCustomer] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [dataToDelete, setDataToDelete] = useState({});
	const [selectedContainer, setSelectedContainer] = useState({});

	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	console.log(admin_data)

	useEffect(() => {
		props.getCustomers();
	}, []);

	useEffect(() => {
		setFilteredCustomers(customers?.data?.data);
	}, [customers]);

	const customStyles = {
		rows: {
			style: {
				minHeight: "72px",
				maxWidth: "100%",
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
				paddingLeft: "1px",
				paddingRight: "10px",
			},
		},
	};


	const columns = [
		{
			name: "Company Name",
			selector: (row) => {
				return (
					<div
						className="py-2 px-3 mt-3 mb-3 capitalize"
					// style={{justifyContent: 'left'}}
					>
						{row.company_name}
					</div>
				);
			},
			sortable: true,
		},
		{
			name: "Contact Person Fullname",
			selector: (row) => {
				return (
					<div
						className="py-2 px-3 mt-3 mb-3 capitalize"
					// style={{justifyContent: 'left'}}
					>
						{row.firstname} {row.lastname}
					</div>
				);
			},
			sortable: true,
		},
		// {
		// 	name: "Lastname",
		// 	selector: (row) => {
		// 		return (
		// 			<div 
		// 				className="py-2 px-3 mt-3 mb-3"
		// 				// style={{justifyContent: 'left'}}
		// 			>
		// 				{row.lastname}{" "}
		// 			</div>
		// 		);
		// 	},
		// 	sortable: true,
		// },
		{
			name: "Email Address",
			selector: (row) => {
				return (
					<div
						className="py-2 px-3 mt-3 mb-3"
					// style={{justifyContent: 'left'}}
					>
						{row.email}
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Company Address",
			selector: (row) => {
				return (
					<div
						className="py-2 px-3 mt-3 mb-3"
					// style={{justifyContent: 'left'}}
					>
						{row.company_address}
					</div>
				);
			},
			sortable: true,
		},

		{
			name: "Phone Number",
			selector: (row) => {
				return (
					<div className="py-2 px-5 mt-3 mb-3">
						{row.phone}
					</div>
				);
			},
		},
		{
			name: "Registration Date",
			selector: (row) => {
				return (
					<div className="py-2 px-5 mt-3 mb-3">
						<Moment format="DD-MM-YYYY  hh:mmA">{row?.['createdAt']}</Moment>
					</div>
				);
			},
		},

		// {
		// 	name: "",
		// 	selector: (row) => {
		// 		return (
		// 			<div
		// 				className="bg-green p-1 rounded cursor-pointer"
		// 				style={{ justifyContent: 'center', }}
		// 				onClick={() => {
		// 					setSelectedCustomer(row);
		// 					window.location.href = `/customers/customer-shipment/${row?.['_id']}`
		// 				}}
		// 			>
		// 				<p className="text-xs text-center white-text font-semibold p-2">
		// 					Details
		// 				</p>
		// 			</div>
		// 		);
		// 	},
		// },

		{
			name: "",
			selector: (row) => {
				return (
					<div
						className="bg-grey solid-br p-1 rounded cursor-pointer"
						onClick={() => {
							setSelectedCustomer(row);
							window.location.href = `/customers/edit-customer/${row?.['_id']}`
						}}
					>
						<p className="text-xs text-center black-text font-semibold p-2">
							Edit
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
						{
							admin_data.role === 'super_admin' ? (
								<>
									<div
										className="bg-red p-1 rounded cursor-pointer"
										style={{ justifyContent: "center" }}
										onClick={() => {
											setDataToDelete(row?.['_id'])
											setIsOpen(true)
											setSelectedCustomer(row);
										}}
									>
										<p className="text-xs text-center white-text font-semibold p-2">
											Delete
										</p>
									</div>
								</>
							) : (
								<></>
							)
						}
					</>

				);
			},
		},


	];

	const handleSearch = (event) => {
		console.log(event)
		let value = event.toLowerCase();
		const results: any = []

		customers['data']?.['data'].filter(customers => {
			if (customers.firstname.toLowerCase().includes(value.toLowerCase())
				|| customers.lastname.toLowerCase().includes(value.toLowerCase())
				|| customers.company_name.toLowerCase().includes(value.toLowerCase())
				|| customers.email.toLowerCase().includes(value.toLowerCase())) {
				results.push(customers)
			}
		});

		setFilteredCustomers(results)


		// const endOffset = itemOffset + itemsPerPage;
		// setCurrentItems(results.slice(itemOffset, endOffset));
	}

	// const handleFilter = (value: string, type: string) => {
	// 	let filteredData = customers;
	// 	if (value) {
	// 		if (type === "search") {
	// 			filteredData = customers.filter((item) => {
	// 				return (
	// 					item.firstname.toLowerCase().includes(value.toLowerCase()) ||
	// 					item.lastname.toLowerCase().includes(value.toLowerCase()) ||
	// 					item.company_name.toLowerCase().includes(value.toLowerCase()) ||
	// 					item.phone.toLowerCase().includes(value.toLowerCase())
	// 				);
	// 			});
	// 		} else if (type === "status") {
	// 			filteredData = customers.filter((item) => {
	// 				return item.invoice_status.toLowerCase() === value.toLowerCase();
	// 			});
	// 		} else if (type === "currency") {
	// 				filteredData = customers.filter((item) => {
	// 				return item.invoice_currency.toLowerCase() === value.toLowerCase();
	// 			});
	// 		}
	// 	}
	// 	setFilteredCustomers(filteredData);
	// };

	return (
		<>
			<div className="flex">
				<Aside
					activeTab="customer"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
				<div className="dashboard-content">
					<TopBar title={"Customers"} SetOpenAside={SetOpenAside} />
					<div className="">
						<div className="lg:px-14 container mx-auto">
							<div className="flex items-center my-10 mobile-padding">
								<h3 className="text-xl white-text font-semibold">Quote Summary</h3>
								<>
									<div className="ml-auto">
										<Link
											style={{ textDecoration: 'none' }}
											to="/customers/customer-creation"
											className="bg-green white-text text-xs py-3 px-4 w-full rounded"
										>
											Add New Customer +
										</Link>
									</div>
								</>
							</div>
							<div>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<p className='font-semibold text-lg'>All Customers </p>
									</div>
									<div className="ml-auto" style={{ textAlign: 'right' }}>
										<small>Customers </small><small style={{ color: 'grey' }}> / All Customer</small>
									</div>
								</div>
							</div>


							{
								loading ?
									(
										<div className="text-center my-3">
											<Link to="#" className="text-success">
												{/* @ts-ignore */}
												<PrimaryButton title="Loading Customers" loading={loading} />
											</Link>
										</div>
									) : (
										<>
											<div style={{ marginTop: '30px' }}>
												<>
													<div className="mt-2 w-full">
														{/* Desktop view */}
														<div className="pt-3 desktop-only solid-br">
															<DataTable
																//@ts-ignore
																columns={columns}
																data={filteredCustomers}
																pagination
																persistTableHead
																responsive
																paginationPerPage={30}
																actions={
																	<ActionsMemo
																		handleSearch={handleSearch}
																	// filteredCustomers={filteredCustomers}
																	/>
																}
																customStyles={customStyles}
															// selectableRows

															// conditionalRowStyles={conditionalRowStyles}
															/>
														</div>
													</div>
												</>
												{/* Mobile View */}
												<div className="bg-grey py-2 mobile-only">
													{
														customers?.data?.data?.map((data: any, index: any) => {
															return (
																<div className="bg-white mb-3" key={index}>

																	<div className="grid grid-cols-1 gap-4 py-3 px-7 bottom-divider items-center ">
																		<div className="">
																			<p className="grey-text text-sm">
																				<span className="black-text">Fullname: {data?.['firstname']} {data?.['lastname']}</span>
																			</p>
																			<p className="grey-text text-sm">
																				<span className="black-text">Company Name: {data?.['company_name']}</span>
																			</p>
																			<p className="grey-text text-sm">
																				<span className="black-text">Contact Person Email: {data?.['email']}</span>
																			</p>
																			<p className="grey-text text-sm">
																				<span className="black-text">Contact Person Phone: {data?.['phone']}</span>
																			</p>
																		</div>
																	</div>

																	<div className="grid grid-cols-3 gap-4 py-3 px-7 bottom-divider items-center">
																		<Link
																			to=""
																			onClick={() => {
																				window.location.href = `/customers/customer-shipment/${data?.['_id']}`
																			}}
																			className="bg-white solid-br black-text text-xs py-2 text-center w-full rounded mr-3"
																		>
																			Shipments
																		</Link>

																		<div className="">
																			<p className="white-text font-semibold text-sm">{data?.['company_name']}</p>
																		</div>

																		<Link
																			to=""
																			onClick={() => {
																				window.location.href = `/customers/edit-customer/${data?.['_id']}`
																			}}
																			className="bg-green white-text text-xs py-2 text-center w-full rounded mr-3"
																		>
																			Edit
																		</Link>
																	</div>
																</div>
															);
														})
													}
												</div>
												{/* Mobile View */}
											</div>
										</>
									)
							}
						</div>
					</div>
				</div>
			</div>

			<DeleteModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				id={dataToDelete}
				deleteCustomer={props.deleteCustomer}
				selectedCustomer={selectedCustomer}
				customers={customers}
			/>

		</>
	);
};

// export default Customers;


const mapStateToProps = (state: any) => {
	const { customers, error, loading } = state.customers;
	return { customers, error, loading };
};

// Table actions
const ActionsMemo = (props: any): JSX.Element => {
	const { filteredCustomers, handleSearch } = props;
	return (
		<>

			<input
				placeholder="Search Customers"
				className="form-input px-4 py-1.5 custom-input w-full black-text w-52 mb-5"
				onChange={(e) => handleSearch(e.target.value)}
			/>

		</>
	);
};

export default connect(mapStateToProps, { getCustomers, getSingleCustomer, deleteCustomer })(Customers);

