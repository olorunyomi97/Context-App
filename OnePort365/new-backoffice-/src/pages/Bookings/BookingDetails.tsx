import React, { useEffect, useState } from "react";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import { Link, useParams } from "react-router-dom";
import { connect } from "react-redux";
import arrowUp from "assets/icons/arrow-up.svg";
import arrowDown from "assets/icons/arrow-down.svg";
import movement from "assets/icons/movement.svg";
import Moment from "react-moment";
import PrimaryButton from "components/buttons/PrimaryButton";
import { getSingleBooking } from "store/actions";
import CurrencyFormat from "react-currency-format";
import OceanFreightDetails from "./BookingDetailsPartials/OceanFreightDetails";
import AirFreightDetails from "./BookingDetailsPartials/AirFreightDetails";
import HaulageDetails from "./BookingDetailsPartials/HaulageDetails";
import WarehousingDetails from "./BookingDetailsPartials/WarehousingDetails";
import CBTDetails from "./BookingDetailsPartials/CBTDetails";

const BookingDetails = (props: any) => {
	const [openAside, SetOpenAside] = useState(false);
	const params = useParams();
	const { single_booking, loading } = props
	const [isOpen, setIsOpen] = useState(false);
	const single_booking_details = single_booking?.booking_details
	console.log(single_booking_details)
	console.log(single_booking?.booking_details?.container_details[0]?.container_count)

	useEffect(() => {
		props.getSingleBooking(params.id, `format_containers=${true}`);
		// props.getSingleBooking(params.id, "")
	}, []);

	return (
		<>
			<div className="lg:flex">
				<Aside
					activeTab="Bookings"
					openAside={openAside}
					SetOpenAside={SetOpenAside}
				/>
				<div className="">
					<TopBar title={"Booking Details"} SetOpenAside={SetOpenAside} />
					<div className="dashboard-content">
						<div className="lg:px-10 lg:pt-5 container mx-auto w-full">
							{
								loading ?
									(
										<div className="text-center my-3">
											<Link to="#" className="text-success">
												{/* @ts-ignore */}
												<PrimaryButton title="Loading Booking Details" loading={loading} />
											</Link>
										</div>
									) : (
										<>
											<div>
												<div className="lg:pb-3 lg:pt-3 grid grid-cols-2 gap-4">
													<div className="mt-2">
														<p className='font-semibold text-lg pl-3'>Job Number: {single_booking?.booking_details?.job_number}<span className="green-text"> </span></p>
													</div>
												</div>
											</div>
											<>
												<div
													className="bg-white"
													style={{ top: 20 }}
												>
													<div className="grid grid-cols-3 items-center p-5 bg-green lg:rounded-lg">
														<div className="flex items-center">
															<img
																src={single_booking?.booking_details?.shipment_type === "export" ? arrowUp : arrowDown}
																alt=""
																width={40}
																height={40}
																className="bg-light-green p-2 rounded-full"
															/>
															<p className="white-text text-sm ml-2 capitalize">
																{single_booking?.booking_details?.shipment_type}
															</p>
														</div>

														<div className="text-center">
															<div className="flex items-center justify-center"></div>
															<p className="white-text text-sm">Booking Date</p>

															<p className="white-text text-sm">
																<Moment format="DD-MM-YYYY">{single_booking?.booking_details?.createdAt}</Moment>
															</p>
														</div>
														<div className="text-right">
															<p className="white-text text-xs opacity-75">
																Job Number
															</p>
															<p className="white-text text-sm">
																{single_booking?.booking_details?.job_number}
															</p>
														</div>
													</div>
												</div>

												<div className="mt-5 container mx-auto w-full">
													<>
														<div className="flex items-center ml-auto">
															<h3 className="text-xl black-text font-semibold">
																Booking Status :
																{
																	single_booking?.booking_details?.shipment_status === "new booking" ? (
																		<Link to="#" className="capitalize bg-light-green green-text text-xs py-2 px-3 mx-5 text-center rounded-full">
																			{single_booking?.booking_details?.shipment_status}
																		</Link>
																	) : single_booking?.booking_details?.shipment_status === "awaiting quotes" ? (
																		<Link to="#" className="capitalize bg-light-purple purple-text text-xs py-2 px-3 mx-5 text-center rounded-full">
																			{single_booking?.booking_details?.shipment_status}
																		</Link>
																	) : single_booking?.booking_details?.shipment_status === "invoice accepted" ? (
																		<Link to="#" className="capitalize bg-light-green black-text-2 text-sm py-2 px-3 green-text mx-5 text-center rounded-full">
																			{single_booking?.booking_details?.shipment_status}
																		</Link>
																	) : single_booking?.booking_details?.shipment_status === "cancelled" ? (
																		<Link to="#" className="capitalize bg-light-red red-text text-sm py-2 px-3 green-text mx-5 text-center rounded-full">
																			Cancelled
																		</Link>
																	) : (
																		<></>
																	)
																}
															</h3>
															<div className="ml-auto">
																<div className="flex items-center">
																	<p className="white-text font-semibold text-sm">
																		Edit
																	</p>
																	<Link
																		to=""
																		onClick={() => {
																			window.location.href = `/bookings/booking-confirmation/${params.id}`
																		}}
																		className="solid-br py-2 px-3 rounded ml-auto text-sm black-text"
																	>
																		Edit Booking
																	</Link>
																	{/* <BookingEdits single_booking_details={single_booking_details} /> */}
																</div>
															</div>
														</div>
													</>
													<div>
														<p className="black-text text-base mt-3 font-semibold">
															Basic Shipment Details
														</p>
														<div className="mt-2 top-divider left-divider right-divider rounded-t-lg">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Service Type</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">
																	{
																		single_booking?.booking_details?.shipment_transport_type === "ocean_freight" ? (
																			<>Ocean Freight</>
																		) : single_booking?.booking_details?.shipment_transport_type === "air_freight" ? (
																			<>Air Freight</>
																		) : single_booking?.booking_details?.shipment_transport_type === "haulage" ? (
																			<>Haulage</>
																		) : single_booking?.booking_details?.shipment_transport_type === "warehousing" ? (
																			<>Warehousing</>
																		) : single_booking?.booking_details?.shipment_transport_type === "customs_brokerage" ? (
																			<>Customs Brokerage</>
																		) : (
																			<></>
																		)
																	}
																</p>
															</div>
														</div>
														{/* {
															single_booking?.booking_details?.shipment_transport_type === 'air_freight' ? (
																<>
																	<div className="top-divider left-divider right-divider">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Air Freight Type</p>
																			<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.air_freight?.air_freight_type}</p>
																		</div>
																	</div>
																</>
															) : (
																<></>
															)
														} */}

														<div className="top-divider left-divider right-divider">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Job Number</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.job_number === undefined ? 'N/A' : single_booking?.booking_details?.job_number}</p>
															</div>
														</div>
														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Booking Branch Code</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.branch == null ? 'N/A' : single_booking?.booking_details?.branch}</p>
															</div>
														</div>

														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Company Name</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.customer_details[0]?.company_name}</p>
															</div>
														</div>
														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Company Email</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.customer_details[0]?.email}</p>
															</div>
														</div>
														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Contact Person Fullname</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.customer_details[0]?.firstname} {single_booking?.booking_details?.customer_details[0]?.lastname}</p>
															</div>
														</div>
														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Contact Person Phone</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.customer_details[0]?.phone}</p>
															</div>
														</div>


														<div className="solid-br">
															<div className="grid grid-cols-2">
																<p className="black-text text-sm py-3 px-5 ">Commodity Description</p>
																<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.goods_type === undefined ? 'N/A' : single_booking?.booking_details?.goods_type}</p>
															</div>
														</div>

														{
															single_booking?.booking_details?.shipment_transport_type === 'air_freight' ? (
																<>
																	<AirFreightDetails />
																</>
															) : (
																<>
																	<div className="solid-br">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Container Count</p>
																			<p className="black-text text-sm left-divider py-3 px-5 capitalize">
																				{/* {single_booking?.booking_details?.container_details?.length === 0 ? "N/A" : single_booking?.booking_details?.container_details?.length} */}
																				{single_booking?.booking_details?.container_details[0]?.container_count === undefined ? "N/A" : single_booking?.booking_details?.container_details[0]?.container_count}
																			</p>
																		</div>
																	</div>
																	<div className="solid-br">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Container Size</p>
																			<p className="black-text text-sm left-divider py-3 px-5 capitalize">
																				{single_booking?.booking_details?.container_details[0]?.container_size === undefined ? "N/A" : single_booking?.booking_details?.container_details[0]?.container_size}
																			</p>
																		</div>
																	</div>
																	<div className="solid-br">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Container Type</p>
																			<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.container_details[0]?.container_type === undefined ? 'N/A' : single_booking?.booking_details?.container_details[0]?.container_type}</p>
																		</div>
																	</div>
																	<div className="solid-br">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Container Weight</p>
																			<p className="black-text text-sm left-divider py-3 px-5 capitalize">{single_booking?.booking_details?.container_details[0]?.container_weight === undefined ? 'N/A' : single_booking?.booking_details?.container_details[0]?.container_weight} (Metric Tons)</p>
																		</div>
																	</div>


																	<div className="solid-br ">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Hazadous Product</p>
																			<p className="black-text text-sm left-divider py-3 px-5 ">
																				{single_booking?.booking_details?.is_product_hazardous === true ? (
																					<p>Yes</p>
																				) : (
																					<p>No</p>
																				)}
																			</p>
																		</div>
																	</div>

																	<div className="solid-br ">
																		<div className="grid grid-cols-2">
																			<p className="black-text text-sm py-3 px-5 ">Additional Comments</p>
																			<p className="black-text text-sm left-divider py-3 px-5 ">
																				{single_booking?.booking_details?.additional_comments === "" ? 'No Additional Comments' : single_booking?.booking_details?.additional_comments}
																			</p>
																		</div>
																	</div>


																</>
															)
														}
													</div>

												</div>

												<div>

													{
														single_booking?.booking_details?.shipment_transport_type === 'ocean_freight' ? (

															<OceanFreightDetails />
														) : single_booking?.booking_details?.shipment_transport_type === 'haulage' ? (

															<HaulageDetails />
														) : single_booking?.booking_details?.shipment_transport_type === 'warehousing' ? (

															<WarehousingDetails />
														) : single_booking?.booking_details?.shipment_transport_type === 'customs_brokerage' ? (

															<CBTDetails />
														) : (
															<></>
														)
													}
												</div>




											</>
										</>
									)
							}
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// export default BookingDetails;

const mapStateToProps = (state: any) => {
	const { single_booking, loading } = state.bookings;
	return { single_booking, loading };
};

export default connect(mapStateToProps, { getSingleBooking })(BookingDetails);

