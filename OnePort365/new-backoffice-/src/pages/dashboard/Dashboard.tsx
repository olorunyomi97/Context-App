import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import Quote from "assets/icons/quote-active.svg";
import Invoice from "assets/icons/invoice-active.svg";
import Shipment from "assets/icons/shipment-active.svg";
import Documents from "assets/icons/document-active.svg";
import Customers from "assets/icons/customer-active.svg";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getDashboardAnalytics } from "store/actions";
import './Dashboard.css'

const Dashboard = (props: any) => {
	const [openAside, SetOpenAside] = useState(false);
	let admin_data = useSelector((state: any) => state.auth.admin_data);
	// @ts-ignore
	admin_data = JSON.parse(localStorage.getItem("admin_data")) ? JSON.parse(localStorage.getItem("admin_data")) : JSON.parse(localStorage.getItem("admin_data"));
	// const role = (admin_data.role)
	// console.log(role);
	const { dashboard_analytics, loading } = props;
	console.log(dashboard_analytics)

	useEffect(() => {
		props.getDashboardAnalytics();
	}, [getDashboardAnalytics]);

	return (
		<>
			<div className="flex mobile-dashboard">
				<Aside
					activeTab="dashboard"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>

				<div>
					<TopBar title={"Dashboard"} SetOpenAside={SetOpenAside} />
					<div className="container">
						{
							loading ?
								(
									<div className="text-center my-3">
										<Link to="#" className="text-success">
											{/* @ts-ignore */}
											<PrimaryButton title="Loading Dashboard" loading={loading} />
										</Link>
									</div>
								) : (
									<>
										<div>
											<div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
												<div className="mt-2">
													<p className='font-semibold text-lg'>Welcome Back, <span className="green-text">{admin_data.firstname} {admin_data.lastname}</span></p>
												</div>
												{/* <div className="mt-2 ml-auto" style={{ textAlign: 'right' }}>
													<OperationsDashboardToggle />
												</div> */}
											</div>
										</div>
										<div className="lg:px-14 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
											{/* {
												role === "super_admin" ? (
													<>
														<div className="rounded overflow-hidden">
															<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
																<img src={Quote} alt="" width="30px" height="30px" />
																<div className="dashboard-text mb-1 mt-2">All Quotes</div>
																<p className="font-bold">{dashboard_summary?.all_quotes?.length}</p>
																<div className="ml-auto ">
																	<Link to="/new-quotes" className="text-sm green-text ">
																		View <i className="ion-ios-arrow-forward ml-1"></i>
																	</Link>
																</div>
															</div>
														</div>
													</>
												) : (
													<>
														<div className="rounded overflow-hidden">
															<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
																<img src={Quote} alt="" width="30px" height="30px" />
																<div className="dashboard-text mb-1 mt-2">All Quotes</div>
																<p className="font-bold">{dashboard_summary?.all_quotes?.length}</p>
																<div className="ml-auto ">
																	<Link to="/quotes" className="text-sm green-text ">
																		View <i className="ion-ios-arrow-forward ml-1"></i>
																	</Link>
																</div>
															</div>
														</div>
													</>
												)
											} */}

											<div className="rounded overflow-hidden">
												<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
													<img src={Quote} alt="" width="30px" height="30px" />
													<div className="dashboard-text mb-1 mt-2">Total Bookings</div>
													<p className="font-bold">{dashboard_analytics?.total_bookings}</p>
													<div className="ml-auto ">
														<Link to="/bookings" className="text-sm green-text ">
															View <i className="ion-ios-arrow-forward ml-1"></i>
														</Link>
													</div>
												</div>
											</div>

											<div className="rounded overflow-hidden">
												<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
													<img src={Shipment} alt="" width="30px" height="30px" />
													<div className="dashboard-text mb-1 mt-2">Total Shipments</div>
													<p className="font-bold">{dashboard_analytics?.total_shipments}</p>
													<div className="ml-auto ">
														<Link to="/shipments" className="text-sm green-text ">
															View <i className="ion-ios-arrow-forward ml-1"></i>
														</Link>
													</div>
												</div>
											</div>

											<div className="rounded overflow-hidden">
												<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
													<img src={Shipment} alt="" width="30px" height="30px" />
													<div className="dashboard-text mb-1 mt-2">Total Active Shipments</div>
													<p className="font-bold">{dashboard_analytics?.active_shipments}</p>
													<div className="ml-auto ">
														<Link to="/shipments" className="text-sm green-text ">
															View <i className="ion-ios-arrow-forward ml-1"></i>
														</Link>
													</div>
												</div>
											</div>

											<div className="rounded overflow-hidden right-divider top-divider bottom-divider left-divider rounded w-full">
												<div className="px-6 py-4">
													<img src={Customers} alt="" width="30px" height="30px" />
													<div className="dashboard-text mb-1 mt-2">Total Customers</div>
													<p className="font-bold">{dashboard_analytics?.total_users}</p>
													<div className="ml-auto ">
														<Link to="/customers" className="text-sm green-text ">
															View <i className="ion-ios-arrow-forward ml-1"></i>
														</Link>
													</div>
												</div>
											</div>



											<div className="rounded overflow-hidden">
												<div className="px-6 py-4 right-divider top-divider bottom-divider left-divider rounded w-full">
													<img src={Shipment} alt="" width="30px" height="30px" />
													<div className="dashboard-text mb-1 mt-2">Total Containers</div>
													<p className="font-bold">{dashboard_analytics?.total_containers}</p>
													<div className="ml-auto ">
														<Link to="/containers" className="text-sm green-text ">
															View <i className="ion-ios-arrow-forward ml-1"></i>
														</Link>
													</div>
												</div>
											</div>


										</div>
									</>
								)
						}

					</div>
				</div>
			</div>


		</>
	);
};

// export default Dashboard;


const mapStateToProps = (state: any) => {
	const { dashboard_analytics, error, loading } = state.dashboard;
	return { dashboard_analytics, error, loading };
};

export default connect(mapStateToProps, { getDashboardAnalytics })(Dashboard);

