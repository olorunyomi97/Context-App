import React from "react";
import moment from "moment";
import DynamicShipmentEdit from "../../shipmentPlus/shipmentAndTransportCombination/dynamicShipmentEdit";
import CurrencyFormat from "react-currency-format";
import movement from "assets/icons/movement.svg";
import WarehousingDetails from "./ShipmentDetailsPartials/WarehousingDetails";
import CBTDetails from "./ShipmentDetailsPartials/CBTDetails";

function ShipmentStandAloneDetailsTab(props: any) {
	const { single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data;
	const single_shipment_warehouse =
		single_shipment?.data?.data?.warehousing_data;
	const single_shipment_customs =
		single_shipment?.data?.data?.customs_brokerage_data;

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
							{single_shipment_data?.shipment_data?.shipment_transport_type ===
								"ocean_freight" ? (
								<>Ocean Freight</>
							) : single_shipment_data?.shipment_data
								?.shipment_transport_type === "air_freight" ? (
								<>Air Freight</>
							) : single_shipment_data?.shipment_data
								?.shipment_transport_type === "haulage" ? (
								<>Haulage</>
							) : single_shipment_data?.shipment_data
								?.shipment_transport_type === "warehousing" ? (
								<>Warehousing</>
							) : single_shipment_data?.shipment_data
								?.shipment_transport_type === "customs_brokerage" ? (
								<>Customs Brokerage</>
							) : (
								<></>
							)}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Shipment Type</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.shipment_data?.shipment_type}
						</p>
					</div>
				</div>
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Job Numbers</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.job_number}
						</p>
					</div>
				</div>
				<div className="top-divider left-divider right-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Company Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{
								single_shipment_data?.shipment_data?.customer_details[0]
									?.company_name
							}
						</p>
					</div>
				</div>

				{/* customer name */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Customer Name</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{
								single_shipment_data?.shipment_data?.customer_details[0]
									?.firstname
							}{" "}
							{
								single_shipment_data?.shipment_data?.customer_details[0]
									?.lastname
							}
						</p>
					</div>
				</div>

				{/* bl/number */}
				{single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" && (
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">B/L Number</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.bl_number}
								</p>
							</div>
						</div>
					)}

				{/* nepc number */}
				{single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" &&
					single_shipment_data?.shipment_data?.shipment_type === "export" && (
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">NEPC Number</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_customs?.nepc_number}
								</p>
							</div>
						</div>
					)}

				{/* Origin airport */}
				{single_shipment_data?.shipment_data?.shipment_type === "import" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"warehousing" ? (
					<>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Port Of Discharge
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.port_of_discharge}
								</p>
							</div>
						</div>
					</>
				) : single_shipment_data?.shipment_data?.shipment_type === "export" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"warehousing" ? (
					<>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">Port Of Loading</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.port_of_loading}
								</p>
							</div>
						</div>

						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Pick up Location
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.pickup_location ===
										undefined
										? "Pick Up Was Not Selected"
										: single_shipment_data?.shipment_data?.pickup_location}
								</p>
							</div>
						</div>
					</>
				) : single_shipment_data?.shipment_data?.shipment_type === "import" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" ? (
					<>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Country of Origin
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.pickup_location}
								</p>
							</div>
						</div>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Destination Port
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.destination_port_code}
								</p>
							</div>
						</div>
					</>
				) : single_shipment_data?.shipment_data?.shipment_type === "export" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" ? (
					<>
						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">Origin Port</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.origin_port_code}
								</p>
							</div>
						</div>

						<div className="solid-br">
							<div className="grid grid-cols-2">
								<p className="black-text text-sm py-3 px-5 ">
									Destination Country
								</p>
								<p className="black-text text-sm left-divider py-3 px-5 capitalize">
									{single_shipment_data?.shipment_data?.delivery_location ===
										undefined
										? "N/A"
										: single_shipment_data?.shipment_data?.delivery_location}
								</p>
							</div>
						</div>
					</>
				) : (
					<></>
				)}

				{/* import custom brokerage */}
				{single_shipment_data?.shipment_data?.shipment_type === "import" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" && (
						<>
							{" "}
							<div className="solid-br">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Manufacturer/Supplier Name
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 capitalize">
										{single_shipment_customs?.sender_name}
									</p>
								</div>
							</div>
							<div className="solid-br">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Manufacturer/Supplier Address
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 capitalize">
										{single_shipment_customs?.sender_address}
									</p>
								</div>
							</div>
						</>
					)}

				{/* export customs brokerage */}
				{single_shipment_data?.shipment_data?.shipment_type === "export" &&
					single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" && (
						<>
							{" "}
							<div className="solid-br">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Consignee Name
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 capitalize">
										{single_shipment_customs?.consignee_name}
									</p>
								</div>
							</div>
							<div className="solid-br">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Consignee Address
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 capitalize">
										{single_shipment_customs?.consignee_address}
									</p>
								</div>
							</div>
						</>
					)}

				{/* height of cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Weight of Container(Metric Tons)
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{/* {single_shipment_data?.shipment_data?.container_details
								?.length === 0
								? "N/A"
								: single_shipment_data?.shipment_data?.container_details[0]?
									.container_weight} */}
							{
								single_shipment_data?.shipment_data?.container_details[0]
									?.container_size
							}
							(Metric Tons)
						</p>
					</div>
				</div>

				{/* width of cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Type of Container</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{
								single_shipment_data?.shipment_data?.container_details[0]
									?.container_type
							}
						</p>
					</div>
				</div>

				{/* weight (kg) */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">
							Size of Container(Metric Tons)
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{
								single_shipment_data?.shipment_data?.container_details[0]
									?.container_size
							}
						</p>
					</div>
				</div>

				{/* number of Cargo */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5">Number of Containers</p>
						<p className="black-text text-sm left-divider py-3 px-5">
							{
								single_shipment_data?.shipment_data?.container_details[0]
									?.container_count
							}
						</p>
					</div>
				</div>

				{/* commodity description */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Commodity Description
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 capitalize">
							{single_shipment_data?.shipment_data?.goods_type}
						</p>
					</div>
				</div>

				{/* office/branch */}
				<div className="solid-br">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 capitalize">
							Office/Branch
						</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.branch_code}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-2">
					<p className="black-text text-sm py-3 px-5 left-divider bottom-divider">
						Hazadous Product
					</p>
					<p className="black-text text-sm left-divider py-3 px-5 bottom-divider right-divider">
						{single_shipment_data?.shipment_data?.is_product_hazardous ===
							true ? (
							<p>Yes</p>
						) : (
							<p>No</p>
						)}
					</p>
				</div>

				{/* Additional Services */}
				{/* <p className="black-text text-base mt-10 mb-3 font-semibold">
					Additional Services
				</p> */}
				{single_shipment_data?.shipment_data?.shipment_transport_type ===
					"warehousing" ? (
					<>
						<WarehousingDetails single_shipment={single_shipment} />
					</>
				) : single_shipment_data?.shipment_data?.shipment_transport_type ===
					"customs_brokerage" ? (
					<>
						<CBTDetails single_shipment={single_shipment} />
					</>
				) : (
					<></>
				)}

				{/* <div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Air Freight</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.air_freight === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Ocean Freight</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.ocean_freight === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Customs Brokerage</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.customs_brokerage ===
								true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Terminal Handling</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.terminal_handling ===
								true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Haulage</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.with_haulage === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Warehousing</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.warehousing === true ? (
								<p>Yes</p>
							) : (
								<p>No</p>
							)}
						</p>
					</div>
				</div>

				{single_shipment_data?.shipment_data?.shipment_transport_type ===
					"warehousing" && (
						<>
							<div className="top-divider left-divider right-divider bottom-divider">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Is cargo bagged?
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										{single_shipment_warehouse.cargo_bagged === true ? (
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
										Total cargo bags
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										{single_shipment_warehouse?.total_cargo_bags}
									</p>
								</div>
							</div>
							<div className="top-divider left-divider right-divider bottom-divider">
								<div className="grid grid-cols-2">
									<p className="black-text text-sm py-3 px-5 ">
										Warehousing Duration
									</p>
									<p className="black-text text-sm left-divider py-3 px-5 ">
										{single_shipment_warehouse?.warehousing_duration}
									</p>
								</div>
							</div>
						</>
					)} */}

				<p className="black-text text-base mt-10 mb-3 font-semibold">
					Additional Comments
				</p>
				<div className="top-divider left-divider right-divider bottom-divider">
					<div className="grid grid-cols-2">
						<p className="black-text text-sm py-3 px-5 ">Additional Comments</p>
						<p className="black-text text-sm left-divider py-3 px-5 ">
							{single_shipment_data?.shipment_data?.additional_comments}
						</p>
					</div>
				</div>
			</>
		</div>
	);
}

export default ShipmentStandAloneDetailsTab;
