import { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import DataTable from "react-data-table-component";
import CustomTabs from "components/customTabs/CustomTabs";
import PrimaryButton from "components/buttons/PrimaryButton";
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import { getSingleShipment } from "store/actions";
import { getContainerStatusHistory } from "store/actions";
import movement from "assets/icons/movement.svg";
import moment from "moment";
import ContainerDetailsDrawer from "./containerTab/containerTabPartials/containerDetailsDrawer";
import ContainerStatusDrawer from "./containerTab/containerTabPartials/containerStatusDrawer";
import ShipmentStandAloneDetailsTab from "./shipmentTab/ShipmentStandAloneDetailsTab";
import "../index.css";

function ShipmentStandaloneDetails(props: any) {
	const { loading, single_shipment } = props;
	const single_shipments = single_shipment?.data?.data;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	const single_shipment_customs =
		single_shipment?.data?.data?.customs_brokerage_data;
	console.log("single shpments", single_shipments);
	console.log("single shipment data", single_shipment_data);
	console.log("single shipment customs", single_shipment_customs);

	const [openAside, SetOpenAside] = useState(false);
	const [isUpdateContainer, setIsUpdateContainer] = useState(false);
	const [dataToUpdate, setDataToUpdate] = useState({});
	const [isUpdateStatus, setIsUpdateStatus] = useState(false);
	const [statusToUpdate, setStatusToUpdate] = useState({});
	const params = useParams();
	const location: any = useLocation();
	const urlParams = new URLSearchParams(location.search);

	const localTab = localStorage.getItem("tab");
	const [tab, setTab] = useState("");

	// store the tab state in the local storage on component mount
	// useEffect(() => {
	// 	setTab(localTab ? `${localTab}` : "Shipment Details");
	// }, []);

	// useEffect(() => {
	// 	localStorage.setItem("tab", `${tab}`);
	// }, [tab]);

	useEffect(() => {
		props.getSingleShipment(params.id, `format_containers=${true}`);
		// props.getSingleShipment(params.id, "");
	}, []);

	return (
		<>
			<div className="flex">
				<Aside
					activeTab="shipment"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
				<div className="">
					<TopBar title={"Shipments"} SetOpenAside={SetOpenAside} />
					<div className="dashboard-content">
						{loading ? (
							<div className="text-center my-3 ml-5">
								<Link to="#" className="text-success">
									{/* @ts-ignore */}
									<PrimaryButton
										title="Loading Shipment Details"
										loading={loading}
									/>
								</Link>
							</div>
						) : (
							<>
								<div className="lg:px-14 lg:pt-5 container mx-auto w-full">
									<div className="lg:px-7 py-4">
										<div className="bg-white" style={{ top: 20 }}>
											<div className="grid grid-cols-3 items-center p-5 bg-green lg:rounded-lg">
												<div className="flex items-center">
													<img
														src={
															single_shipment_data?.shipment_type === "export"
																? arrowUp
																: arrowDown
														}
														alt=""
														width={40}
														height={40}
														className="bg-light-green p-2 rounded-full"
													/>

													<p className="white-text text-sm ml-2 capitalize">
														{single_shipment_data?.shipment_type}
													</p>
												</div>

												<div className="text-center">
													<div className="flex items-center justify-center"></div>
													<div className="flex items-center justify-center mb-3">
														<div className="flex items-center">
															<p className="navigation-text capitalize">
																{/* {single_shipment_data.origin_port_code} */}
																{single_shipment_data?.shipment_type ===
																	"export" &&
																	single_shipment_data?.shipment_transport_type ===
																	"warehousing"
																	? "N/A"
																	: single_shipment_data?.shipment_type ===
																		"import" &&
																		single_shipment_data?.shipment_transport_type ===
																		"warehousing"
																		? single_shipment_data?.port_of_discharge
																		: single_shipment_data?.shipment_type ===
																			"export" &&
																			single_shipment_data?.shipment_transport_type ===
																			"customs_brokerage"
																			? single_shipment_data?.origin_port_code
																			: single_shipment_data?.shipment_type ===
																				"import" &&
																				single_shipment_data?.shipment_transport_type ===
																				"customs_brokerage"
																				? single_shipment_data?.pickup_location
																				: single_shipment_data?.origin_port_code}
															</p>
														</div>
														<p className="lg:pl-7 pl-3">
															<img src={movement} width="60%" height="50%" />
														</p>
														<div className="flex items-center ">
															<p className="navigation-text capitalize">
																{/* {single_shipment_data.destination_port_code} */}
																{single_shipment_data?.shipment_type ===
																	"export" &&
																	single_shipment_data?.shipment_transport_type ===
																	"warehousing"
																	? single_shipment_data?.port_of_loading
																	: single_shipment_data?.shipment_type ===
																		"import" &&
																		single_shipment_data?.shipment_transport_type ===
																		"warehousing"
																		? "N/A"
																		: single_shipment_data?.shipment_type ===
																			"export" &&
																			single_shipment_data?.shipment_transport_type ===
																			"customs_brokerage"
																			? single_shipment_data?.delivery_location
																			: single_shipment_data?.shipment_type ===
																				"import" &&
																				single_shipment_data?.shipment_transport_type ===
																				"customs_brokerage"
																				? single_shipment_data?.destination_port_code
																				: single_shipment_data?.destination_port_code}
															</p>
														</div>
													</div>

													<p className="white-text text-sm">
														{moment(single_shipment_data?.createdAt).format(
															"LL"
														)}
													</p>
												</div>
												<div className="text-right">
													<p className="white-text text-xs opacity-75">
														Job Number
													</p>
													<p className="white-text text-sm">
														{single_shipment_data?.job_number}
													</p>
												</div>
											</div>
										</div>

										<div className="flex items-center mb-2 mt-3 mobile-padding">
											<div className="flex items-center"></div>
											<h3 className="text-xl black-text font-semibold">
												Shipment Created By:
												{/* {
													single_shipment_data?.activity_status == "inactive" ? (
														<Link to="#" className="bg-light-red black-text-2 text-sm py-2 px-3 red-text mx-5 text-center rounded-full">
															Inactive
														</Link>
													) : (
														<Link to="#" className="bg-light-green black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full">
															Active
														</Link>
													)
												} */}
											</h3>
										</div>

										<div className="flex items-center mb-2 mobile-padding">
											<div className="flex items-center"></div>
											<h3 className="text-xl black-text font-semibold">
												Activity Status :
												{single_shipment_data?.activity_status == "inactive" ? (
													<Link
														to="#"
														className="bg-light-red black-text-2 text-sm py-2 px-3 red-text mx-5 text-center rounded-full"
													>
														Inactive
													</Link>
												) : (
													<Link
														to="#"
														className="bg-light-green black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full"
													>
														Active
													</Link>
												)}
											</h3>
										</div>

										<div className="mt-5">
											<ShipmentStandAloneDetailsTab
												single_shipment={single_shipment}
											/>
										</div>

										{/* <div className="mt-5">
                                            <CustomTabs
                                                tabs={[
                                                    "Shipment Details",
                                                    "Documents Upload",
                                                    "Uploaded Documents",
                                                ]}
                                                activeTab={tab}
                                                setActiveTab={setTab}
                                            />
                                        </div>
                                        <div className="mt-5">
                                            {tab === "Shipment Details" && (
                                                // <ShipmentDetailTab single_shipment={single_shipment} />
                                                <ShipmentStandAloneDetailsTab
                                                    single_shipment={single_shipment}
                                                />
                                            )}

                                            {tab === "Documents Upload" && (
                                                <DocumentUpload single_shipment={single_shipment} />
                                            )}

                                            {tab === "Uploaded Documents" && (
                                                <DocumentsView single_shipment={single_shipment} />
                                            )}
                                        </div> */}
									</div>
								</div>
							</>
						)}
					</div>
				</div>
				<ContainerDetailsDrawer
					isOpen={isUpdateContainer}
					setIsOpen={setIsUpdateContainer}
					container_id={dataToUpdate}
					single_shipment={single_shipment}
				/>
				<ContainerStatusDrawer
					isOpen={isUpdateStatus}
					setIsOpen={setIsUpdateStatus}
					container_id={statusToUpdate}
					single_shipment={single_shipment}
				/>
			</div>
		</>
	);
}

// export default ShipmentStandaloneDetails

const mapStateToProps = (state: any) => {
	const { single_shipment, loading } = state.shipments;
	return { single_shipment, loading };
};

export default connect(mapStateToProps, { getSingleShipment })(
	ShipmentStandaloneDetails
);
