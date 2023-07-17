import React from "react";
import moment from "moment";
import DynamicShipmentEdit from "../../shipmentPlus/shipmentAndTransportCombination/dynamicShipmentEdit";
import CurrencyFormat from "react-currency-format";
import movement from "assets/icons/movement.svg";

const ShipmentAirDetailsTab = (props: any) => {
	const { single_shipment } = props;
	console.log(single_shipment?.data?.data);
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	const single_shipment_air_freight_data = single_shipment?.data?.data?.air_freight_data
	console.log(single_shipment?.data?.data?.air_freight_data)
	console.log("single-shipment-data", single_shipment_data);
	return (
		<div>
			<>
				{/* Dynamic Edit */}
				{/* <DynamicShipmentEdit single_shipment={single_shipment} /> */}
				{/* company name */}
				<div className="top-divider left-divider right-divider rounded-t-lg">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Transportation Type</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">

							{single_shipment_data?.shipment_transport_type ===
								"ocean_freight" ? (
								<>Ocean Freight</>
							) : single_shipment_data?.shipment_transport_type ===
								"air_freight" ? (
								<>Air Freight</>
							) : single_shipment_data?.shipment_transport_type ===
								"haulage" ? (
								<>Haulage</>
							) : single_shipment_data?.shipment_transport_type ===
								"warehousing" ? (
								<>Warehousing</>
							) : (
								<></>
							)}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Air Freight Type</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment?.data?.data?.air_freight_data?.air_freight_type}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Airline</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment?.data?.data?.air_freight_data?.airline}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Job Numbers</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.job_number}
						</p>
					</div>
				</div>
				<div className="top-divider left-divider right-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Company Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.customer_details[0]?.company_name}
						</p>
					</div>
				</div>

				{/* customer name */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Customer Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.customer_details[0]?.firstname}{" "}
							{single_shipment_data?.customer_details[0]?.lastname}
						</p>
					</div>
				</div>

				{/* Origin airport */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Origin Airport</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.origin_port_code}
						</p>
					</div>
				</div>

				{/* Destination Airport */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Destination Airport</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.destination_port_code}
						</p>
					</div>
				</div>



				{/* height of cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Height of Cargo</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.air_cargo_details?.length === 0
								? "N/A"
								: single_shipment_data?.air_cargo_details[0].container_height}
							(kg)
						</p>
					</div>
				</div>

				{/* width of cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Width of Cargo</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.air_cargo_details?.length === 0
								? "N/A"
								: single_shipment_data?.air_cargo_details[0].container_width}
							(kg)
						</p>
					</div>
				</div>

				{/* weight (kg) */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Weight(kg)</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.air_cargo_details?.length === 0
								? "N/A"
								: single_shipment_data?.air_cargo_details[0].container_weight}
							(kg)
						</p>
					</div>
				</div>

				{/* number of Cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5">Number of Cargo</p>
						<p className="black-text text-sm left-divider py-3 px-5">
							{single_shipment_data?.air_cargo_details?.length === 0
								? "N/A"
								: single_shipment_data?.air_cargo_details.length}
						</p>
					</div>
				</div>

				{/* value of Goods */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Value of Goods
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
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

				{/* commodity description */}
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

				{/* Harzardous Cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Harzardous Cargo
						</p>
						{single_shipment_data?.is_product_hazardous === true ? (
							<p className="black-text text-sm left-divider py-3 px-5 ">Yes</p>
						) : (
							<p className="black-text text-sm left-divider py-3 px-5 ">No</p>
						)}
					</div>
				</div>

				{/* office/branch */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Office/Branch
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.branch_code}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2">
					<p className="black-text text-sm py-3 px-5 left-divider bottom-divider">
						Hazadous Product
					</p>
					<p className="black-text text-sm left-divider py-3 px-5 bottom-divider right-divider">
						{single_shipment_data?.is_product_hazardous === true ? (
							<p>Yes</p>
						) : (
							<p>No</p>
						)}
					</p>
				</div>

				{/* Additional Services *}
				{/* <p className="black-text text-base mt-10 mb-3 font-semibold">
					Additional Services
				</p>


				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Hazadous Product
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.is_product_hazardous === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Haulage Tracker
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.with_tracker === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Haulage Escort
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.with_escort === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div> */}

				{single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "export" && single_shipment_air_freight_data?.air_freight_type === "door to door" ? (
					<>
						<p className="black-text text-base mt-10 mb-3 font-semibold">
							Consignee Details
						</p>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Consignee Name
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_air_freight_data?.consignee_name}
								</p>
							</div>
						</div>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Consignee Number
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_air_freight_data?.consignee_phone}
								</p>
							</div>
						</div>
						<p className="black-text text-base mt-10 mb-3 font-semibold">
							Locations
						</p>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Door 1 to Airport 1
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 ">
										{single_shipment_data?.pickup_location}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 ">
										{single_shipment_data?.origin_port_code}
									</p>
								</div>
							</div>
						</div>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Airport 1 to Airport 2
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.origin_port_code}{" "}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 capitalize">
										{" "}
										{single_shipment_data?.destination_port_code}
									</p>
								</div>
							</div>
						</div>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Airport 2 to Door 2
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.destination_port_code}{" "}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 ">
										{" "}
										{single_shipment_data?.delivery_location}
									</p>
								</div>
							</div>
						</div>
					</>
				) : (
					<></>
				)}

				{single_shipment_data?.shipment_transport_type === "air_freight" && single_shipment_data?.shipment_type === "import" && single_shipment_air_freight_data?.air_freight_type === "door to door" ? (
					<>
						<p className="black-text text-base mt-10 mb-3 font-semibold">
							Sender's Details
						</p>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Senders Name
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_air_freight_data?.sender_name}
								</p>
							</div>
						</div>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Senders Number
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 ">
									{single_shipment_air_freight_data?.sender_phone}
								</p>
							</div>
						</div>
						<p className="black-text text-base mt-10 mb-3 font-semibold">
							Locations
						</p>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Door 1 to Airport 1
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.pickup_location}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.origin_port_code}
									</p>
								</div>
							</div>
						</div>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Airport 1 to Airport 2
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.origin_port_code}{" "}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 capitalize">
										{" "}
										{single_shipment_data?.destination_port_code}
									</p>
								</div>
							</div>
						</div>
						<div className="top-divider left-divider right-divider bottom-divider">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 capitalize">
									Airport 2 to Door 2
								</p>
								<div className="grid grid-cols-3">
									<p className="left-divider black-text text-sm py-3 px-5 capitalize">
										{single_shipment_data?.destination_port_code}{" "}
									</p>
									<p className="pt-5">
										<img src={movement} width="10%" height="10%" />
									</p>
									<p className="black-text text-sm py-3 px-5 capitalize">
										{" "}
										{single_shipment_data?.delivery_location}
									</p>
								</div>
							</div>
						</div>
					</>
				) : (
					<></>
				)}

				<p className="black-text text-base mt-10 mb-3 font-semibold">
					Additional Comments
				</p>
				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Additional Comment</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.additional_comments}
						</p>
					</div>
				</div>
			</>
		</div>
	);
};

export default ShipmentAirDetailsTab;
