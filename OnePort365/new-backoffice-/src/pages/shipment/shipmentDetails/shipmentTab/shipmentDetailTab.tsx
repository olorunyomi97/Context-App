import React from "react";
import moment from "moment";
import DynamicShipmentEdit from "../../shipmentPlus/shipmentAndTransportCombination/dynamicShipmentEdit";
import CurrencyFormat from "react-currency-format";
import Moment from "react-moment";
import HaulageDetails from "./ShipmentDetailsPartials/HaulageDetails";
import OceanFreightDetails from "./ShipmentDetailsPartials/OceanFreightDetails";

const ShipmentDetail = (props: any) => {
	const { single_shipment } = props;
	console.log(single_shipment?.data?.data);
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	console.log("single-shipment-data", single_shipment_data);
	return (
		<div>
			<>
				{/* Dynamic Edit */}
				{/* <DynamicShipmentEdit single_shipment={single_shipment} /> */}
				<p className="black-text text-base mb-3 font-semibold">
					Basic Shipment Details
				</p>
				<div className="top-divider left-divider right-divider rounded-t-lg">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Transportation Type</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{
								single_shipment_data?.shipment_transport_type === "ocean_freight" ? (
									<>Ocean Freight</>
								) : single_shipment_data?.shipment_transport_type === "air_freight" ? (
									<>Air Freight</>
								) : single_shipment_data?.shipment_transport_type === "haulage" ? (
									<>Haulage</>
								) : single_shipment_data?.shipment_transport_type === "warehousing" ? (
									<>Warehousing</>
								) : single_shipment_data?.shipment_transport_type === "customs_brokerage" ? (
									<>Customs Brokerage</>
								) : (
									<></>
								)
							}
						</p>
					</div>
				</div>

				{/* BASIC DETAILS */}

				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Job Numbers</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.job_number}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Branch</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.branch}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Client Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{/* {single_shipment_data?.client_name} */}
							{`${single_shipment_data?.customer_details[0]?.firstname} ${single_shipment_data?.customer_details[0]?.lastname}`}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Client Company Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.customer_details[0]?.company_name}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Client Email</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.customer_details[0]?.email}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">B/L Number</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.bl_number === ""
								? "N/A"
								: single_shipment_data?.bl_number}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Container Details
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.container_details?.length} X {single_shipment_data?.container_details[0]?.container_size}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Commodity Description
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.goods_type}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Goods Value
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{/* ₦<NumericFormat value={single_shipment_data?.goods_value === undefined ? 'N/A' : single_shipment_data?.goods_value} />; */}
							{/* <CurrencyFormat thousandSeparator={true} prefix={'$'} /> */}
							<CurrencyFormat
								value={
									single_shipment_data?.goods_value === undefined
										? "N/A"
										: single_shipment_data?.goods_value
								}
								displayType={"text"}
								thousandSeparator={true}
								prefix={"₦"}
							/>
						</p>
					</div>
				</div>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5">
							Container Pickup Date
						</p>
						{
							single_shipment_data?.cargo_pickup_date === null ? (
								<p className="black-text text-sm left-divider py-3 px-5 ">
									Pick Up Data Unavailable
								</p>
							) : (
								<p className="black-text text-sm left-divider py-3 px-5 ">
									<Moment format="DD-MM-YYYY">{single_shipment_data?.cargo_pickup_date}</Moment>
								</p>

							)
						}
					</div>
				</div>

				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Customs Brokerage & Terminal
						</p>
						{
							single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>
											{
												single_shipment_data?.customs_brokerage === true ? 'Yes' : 'No'
											}
										</p>
									</p>
								</>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>
											{
												single_shipment_data?.customs_brokerage === true ? 'Yes' : 'No'
											}
										</p>
									</p>
								</>

							) : single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.customs_brokerage === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.customs_brokerage === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : (
								<></>
							)
						}
					</div>
				</div>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Marine Insurance</p>
						{
							single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>Not Applicable</p>
									</p>
								</>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>Not Applicable</p>
									</p>
								</>

							) : single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.marine_insurance === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.marine_insurance === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : (
								<></>
							)
						}
					</div>
				</div>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Warehousing</p>
						{
							single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>Not Applicable</p>
									</p>
								</>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "haulage" ? (
								<>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										<p>Not Applicable</p>
									</p>
								</>

							) : single_shipment_data?.shipment_type === "export" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.warehousing === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : single_shipment_data?.shipment_type === "import" && single_shipment_data?.shipment_transport_type === "ocean_freight" ? (

								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_data?.warehousing === true ? (
										<p>Yes</p>
									) : (
										<p>No</p>
									)}
								</p>
							) : (
								<></>
							)
						}
					</div>
				</div>
				{
					single_shipment_data?.shipment_type === 'export' && single_shipment_data?.shipment_transport_type === 'haulage' ? (
						<>

						</>
					) : single_shipment_data?.shipment_type === 'import' && single_shipment_data?.shipment_transport_type === 'haulage' ? (
						<>

						</>
					) : (
						<>
							<div className="solid-br ">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">Haulage</p>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										{single_shipment_data?.with_haulage === true ? (
											<p>Yes</p>
										) : (
											<p>No</p>
										)}
									</p>
								</div>
							</div>
						</>
					)
				}

				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Haulage Escort</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.with_escort === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Haulage Tracker</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.with_tracker === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Hazardous Product</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.is_product_hazardous === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				{/* ADDITIONAL DETAILS */}
				{
					single_shipment_data?.shipment_transport_type === "ocean_freight" ? (
						<>
							<OceanFreightDetails single_shipment={single_shipment} />
						</>
					) : single_shipment_data?.shipment_transport_type === "haulage" ? (
						<>
							<HaulageDetails single_shipment={single_shipment} />
						</>
					) : (
						<>
						</>
					)
				}


				{/* Additional Comments */}
				<p className="black-text text-base mt-10 mb-3 font-semibold">
					Additional Comments
				</p>
				<div className="solid-br ">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Additional Comments</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.additional_comments === "" ? "No Additional Comments" : single_shipment_data?.additional_comments}
						</p>
					</div>
				</div>

			</>
		</div>
	);
};

export default ShipmentDetail;
