import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomCheckBox from "components/checkBox/CustomCheckbox";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import { getSingleShipment, editShipmentDetails } from "store/actions";
import moment from "moment";
import { parseAllPorts } from "helpers/index";
const _Json = require("sea-ports");

const EditOceanExportForm = (props: any) => {
	const params = useParams();
	const navigate = useNavigate();
	const [openAside, SetOpenAside] = useState(false);
	const { loading, single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	const { handleSubmit, control, formState: { errors } } = useForm();
	const [customs, setCustoms] = useState(true);
	const [marine_insurance, setInsurance] = useState(true);
	const [warehousing, setWarehousing] = useState(true);
	const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
	const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
	const [haulage, setHaulage] = useState(false);
	const [showExportHaulage, setShowExportHaulage] = useState(false);
	const [tracker, setTracker] = useState(false);
	const [escort, setEscort] = useState(false);
	const [hazardous, setHazardous] = useState(false);

	useEffect(() => {
		const parsePorts = parseAllPorts(_Json.JSON);
		setDefaultPortsOfOrigin(parsePorts.origin);
		setDefaultPortsOfDestination(parsePorts.destination);
	}, []);

	useEffect(() => {
		// props.getSingleShipment(params.id);
		props.getSingleShipment(params.id, `format_containers=${true}`);
	}, []);

	// useEffect to render when a shipment_data changes
	useEffect(() => {
		if (single_shipment_data) {
			setCustoms(single_shipment_data?.customs_brokerage);
			setInsurance(single_shipment_data?.marine_insurance);
			setWarehousing(single_shipment_data?.warehousing);
			setTracker(single_shipment_data?.with_tracker);
			setHazardous(single_shipment_data?.is_product_hazardous);
			setEscort(single_shipment_data?.with_escort);
			setHaulage(single_shipment_data?.with_haulage);
		}
	}, [single_shipment_data]);

	useEffect(() => {
		if (!haulage) {
			setHazardous(false);
			setEscort(false);
			setTracker(false);
		}
	}, [haulage]);

	const goToShipmentDetails = () => {
		navigate(`/shipments/shipment-details/${params.id}`)
	}

	const onSubmit = (data: any) => {
		const newData = {
			id: params.id,
			// shipment_type: 'export',
			// shipment_transport_type: 'ocean_freight',
			customs,
			warehousing,
			marine_insurance,
			with_haulage: haulage,
			pickup_location: data?.pickup_location?.label,
			origin_port_code: data?.origin_port_code,
			destination_port_code: data?.destination_port_code,
			customer_id: data.customer_id.value,
			cargo_pickup_date: data?.cargo_pickup_date,
			branch: data?.branch,
			container_size: data?.container_size,
			container_type: data?.container_type,
			container_weight: data?.container_weight,
			container_count: data?.container_count,
			goods_value: data?.goods_value,
			goods_type: data?.goods_type,
			bl_number: data?.bl_number,
			dropoff_location_port: data?.dropoff_location_port,
			additional_comments: data?.additional_comments,
			with_tracker: tracker,
			with_escort: escort,
			is_product_hazardous: hazardous,
		};
		props.editShipmentDetails(newData, goToShipmentDetails);
	};

	return (
		<div className="flex">
			<Aside
				activeTab="Shipment"
				openAside={openAside}
				SetOpenAside={SetOpenAside}
			/>
			<div className="dashboard-content">
				<TopBar title={"Shipment"} SetOpenAside={SetOpenAside} />
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
						<div className="">
							<div>
								<div className="lg:px-14 lg:pb-5 lg:pt-5 grid grid-cols-2 gap-4 px-5">
									<div className="mt-2">
										<p className="font-semibold text-lg">
											Job Numbersssss : {single_shipment_data.job_number}
										</p>
									</div>
									<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
										<small>Shipments </small>
										<small style={{ color: "grey" }}>
											{" "}
											/ Edit Export Shipment & Ocean Freight
										</small>
									</div>
								</div>
							</div>
						</div>
						<div className="lg:px-10 px-5 mb-3">
							<div className="py-10 right-divider left-divider top-divider bottom-divider shadow-2xl">
								<form onSubmit={handleSubmit(onSubmit)} className="py-5 px-8">
									<div className="lg:px-8">
										<p className="add-shipment-text mb-5">
											Export Shipment & Ocean Freight
										</p>
										<div className="grid grid-cols-1 mb-3">
											<div className="mr-1">
												<p className="text-xs black-text mb-2 font-medium">
													Customer Name<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"customer_id"}
													id={"customer_id"}
													label={""}
													placeholder={"Select Company & Customer Name"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={`${single_shipment_data?.customer_details[0]?.firstname} ${single_shipment_data?.customer_details[0]?.lastname}`}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>
										<div className="mt-3 grid grid-cols-2 mb-2">
											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													Origin Port<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"origin_port_code"}
													id={"origin_port_code"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data.origin_port_code}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													Destination Port<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"destination_port_code"}
													id={"destination_port_code"}
													label={""}
													placeholder={""}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={
														single_shipment_data.destination_port_code
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="grid grid-cols-2">
											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													Pickup Date<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"cargo_pickup_date"}
													id={"cargo_pickup_date"}
													label={""}
													placeholder={"Cargo Pickup Date"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={
														single_shipment_data?.cargo_pickup_date
															? single_shipment_data?.cargo_pickup_date.slice(0, 10)
															: new Date().toISOString().slice(0, 10)
													}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Total Value of Goods(₦)
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"goods_value"}
													id={"goods_value"}
													label={""}
													placeholder={"Value of Goods"}
													isRequired={false}
													type={"number"}
													errors={errors}
													isDisabled={false}
													defaultValue={single_shipment_data.goods_value}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>
										{/* <p className="text-xs black-text font-medium">Number of Containers</p>
										<div className="solid-br p-3">
											{
												single_shipment_data?.container_details?.map((data: any) => {
													return (
														<>

															<div className="mt-3 grid grid-cols-3">
																<div className="">
																	<p className="text-xs black-text font-medium">
																		Size of Container<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_size"}
																		id={"container_size"}
																		label={""}
																		placeholder={""}
																		isRequired={true}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={data?.container_size}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>

																<div className="ml-1">
																	<p className="text-xs black-text font-medium">
																		Type of Container<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_type"}
																		id={"container_type"}
																		label={""}
																		placeholder={""}
																		isRequired={true}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={data?.container_type}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>

																<div className="ml-1">
																	<p className="text-xs black-text font-medium">
																		Weight of Goods (Metric Ton)
																		<span className="red-text">*</span>
																	</p>
																	<CustomInput
																		control={control}
																		name={"container_weight"}
																		id={"container_weight"}
																		label={""}
																		placeholder={"Weight"}
																		isRequired={true}
																		type={"number"}
																		errors={errors}
																		isDisabled={false}
																		defaultValue={data?.container_weight}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>
															</div>
														</>
													)
												})
											}
										</div> */}
										<div className="mt-3 grid grid-cols-4">
											<div className="">
												<p className="text-xs black-text font-medium">
													Size of Container<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_size"}
													id={"container_size"}
													label={""}
													placeholder={""}
													isRequired={true}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.container_details[0]?.container_size}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Type of Container<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_type"}
													id={"container_type"}
													label={""}
													placeholder={""}
													isRequired={true}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.container_details[0]?.container_type}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Weight of Goods (Metric Ton)
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_weight"}
													id={"container_weight"}
													label={""}
													placeholder={"Weight"}
													isRequired={true}
													type={"number"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.container_details[0]?.container_weight}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Number of Containers
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"container_count"}
													id={"container_count"}
													label={""}
													placeholder={"Container Count"}
													isRequired={true}
													type={"number"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data?.container_details[0]?.container_count?.toString()}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="mt-2">
											<div className="grid grid-cols-3">
												<div className="mr-1">
													<p className="text-xs black-text font-medium">
														Commodity Description
														<span className="red-text">*</span>
													</p>
													<CustomInput
														control={control}
														name={"goods_type"}
														id={"goods_type"}
														label={""}
														placeholder={"Type of Commodity"}
														isRequired={false}
														type={"text"}
														errors={errors}
														isDisabled={false}
														defaultValue={single_shipment_data.goods_type}
														min={""}
														max={""}
														icon={""}
													/>
												</div>

												<div className="">
													<p className="text-xs black-text font-medium">
														B/L Number<small>(optional)</small>
													</p>
													<CustomInput
														control={control}
														name={"bl_number"}
														id={"bl_number"}
														label={""}
														placeholder={""}
														isRequired={false}
														type={"text"}
														errors={errors}
														isDisabled={false}
														defaultValue={
															single_shipment_data.bl_number === undefined
																? "N/A"
																: single_shipment_data.bl_number
														}
														min={""}
														max={""}
														icon={""}
													/>
												</div>

												<div className="ml-1 ">
													<p className="text-xs black-text font-medium">
														Office / Branch<span className="red-text">*</span>
													</p>
													<CustomInput
														control={control}
														name={"branch"}
														id={"branch"}
														label={""}
														placeholder={""}
														isRequired={false}
														type={"text"}
														errors={errors}
														isDisabled={true}
														defaultValue={single_shipment_data.branch}
														min={""}
														max={""}
														icon={""}
													/>
												</div>
											</div>
										</div>

										<div className="mt-5">
											<p className="text-xs black-text mb-2 font-medium">
												Additional Services Provided{" "}
												<small>(Select all that apply)</small>
											</p>
											<div className="grid grid-cols-1">
												<div className="flex items-center mb-5">
													<div className="mr-3">
														<CustomCheckBox
															name="customs_brokerage"
															id="customs_brokerage"
															label="Customs Brokerage & Terminal"
															isRequired={false}
															isDisabled={false}
															onChange={(e: any) =>
																setCustoms(e.target.checked)
															}
															defaultChecked={single_shipment_data?.customs_brokerage}
														/>
													</div>

													<div className="mr-3">
														<CustomCheckBox
															name="marine_insurance"
															id="marine_insurance"
															label="Marine Insurance"
															isRequired={false}
															isDisabled={false}
															onChange={(e: any) => setInsurance(e.target.checked)}
															defaultChecked={single_shipment_data?.marine_insurance}
														/>
													</div>

													<div className="mr-3">
														<CustomCheckBox
															name="warehousing"
															id="warehousing"
															label="Warehousing"
															isRequired={false}
															isDisabled={false}
															onChange={(e: any) => setWarehousing(e.target.checked)}
															defaultChecked={single_shipment_data?.warehousing}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="lg:px-8 mb-5">
										<div>
											<p className="add-shipment-text py-1">
												Add Haulage to this Shipment?<small>(Disabled. As Changes here affects price)</small>
											</p>
											<div>
												<div className="grid grid-cols-3 mt-2">
													<div
														className="mr-3"
														onClick={() => { setShowExportHaulage(!showExportHaulage); }}
													>
														<CustomCheckBox
															name="haulage"
															id="haulage"
															label="Haulage"
															isRequired={false}
															isDisabled={true}
															onChange={(e: any) => setHaulage(e.target.checked)}
															defaultChecked={single_shipment_data?.with_haulage}
														/>
													</div>
												</div>
											</div>
										</div>
									</div>
									{single_shipment_data?.with_haulage === true ? (
										<>
											{!showExportHaulage ? (
												<>
													<div className="lg:px-8">
														<div className="grid grid-cols-1 mb-3">
															<div className="mt-3 grid grid-cols-2 mb-2">
																<div className="mr-1">
																	<p className="text-xs black-text font-medium">
																		{" "}
																		Pickup location{" "}
																	</p>
																	<CustomInput
																		control={control}
																		name={"pickup_location"}
																		id={"pickup_location"}
																		label={""}
																		placeholder={""}
																		isRequired={false}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={single_shipment_data.pickup_location}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>

																<div className="mr-1">
																	<p className="text-xs black-text font-medium">
																		Drop Off Location
																	</p>
																	<CustomInput
																		control={control}
																		name={"dropoff_location_port"}
																		id={"dropoff_location_port"}
																		label={""}
																		placeholder={""}
																		isRequired={false}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={single_shipment_data.destination_port_code}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>
															</div>
														</div>

														<div className="lg:grid grid-cols-3">
															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Do you require an Haulage Tracker ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={tracker}
																			label={"Yes"}
																			onClick={() => setTracker(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!tracker}
																			label={"No"}
																			onClick={() => setTracker(false)}
																		/>
																	</div>
																</div>
															</div>

															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Do you require an Haulage Escort ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={escort}
																			label={"Yes"}
																			onClick={() => setEscort(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!escort}
																			label={"No"}
																			onClick={() => setEscort(false)}
																		/>
																	</div>
																</div>
															</div>

															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Is the Shipped Product Hazardous ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={hazardous}
																			label={"Yes"}
																			onClick={() => setHazardous(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!hazardous}
																			label={"No"}
																			onClick={() => setHazardous(false)}
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</>
											) : (
												<></>
											)}
										</>
									) : (
										<>
											{showExportHaulage ? (
												<>
													<div className="lg:px-8">
														<div className="grid grid-cols-1 mb-3">
															<div className="mt-3 grid grid-cols-2 mb-2">
																<div className="mr-1">
																	<p className="text-xs black-text font-medium">
																		{" "}
																		Pickup location{" "}
																	</p>
																	<CustomInput
																		control={control}
																		name={"pickup_location"}
																		id={"pickup_location"}
																		label={""}
																		placeholder={""}
																		isRequired={false}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={single_shipment_data.pickup_location}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>

																<div className="mr-1">
																	<p className="text-xs black-text font-medium">
																		Drop Off Location
																	</p>
																	<CustomInput
																		control={control}
																		name={"dropoff_location_port"}
																		id={"dropoff_location_port"}
																		label={""}
																		placeholder={""}
																		isRequired={false}
																		type={"text"}
																		errors={errors}
																		isDisabled={true}
																		defaultValue={single_shipment_data.destination_port_code}
																		min={""}
																		max={""}
																		icon={""}
																	/>
																</div>
															</div>
														</div>

														<div className="lg:grid grid-cols-3">
															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Do you require an Haulage Tracker ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={tracker}
																			label={"Yes"}
																			onClick={() => setTracker(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!tracker}
																			label={"No"}
																			onClick={() => setTracker(false)}
																		/>
																	</div>
																</div>
															</div>

															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Do you require an Haulage Escort ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={escort}
																			label={"Yes"}
																			onClick={() => setEscort(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!escort}
																			label={"No"}
																			onClick={() => setEscort(false)}
																		/>
																	</div>
																</div>
															</div>

															<div className="mt-3">
																<p className="text-xs black-text font-medium mb-2">
																	Is the Shipped Product Hazardous ?
																	<span className="red-text">*</span>
																</p>
																<div className="grid grid-cols-3">
																	<div className="">
																		<CustomRadio
																			selected={hazardous}
																			label={"Yes"}
																			onClick={() => setHazardous(true)}
																		/>
																	</div>

																	<div className="ml-2">
																		<CustomRadio
																			selected={!hazardous}
																			label={"No"}
																			onClick={() => setHazardous(false)}
																		/>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</>
											) : (
												<></>
											)}
										</>
									)}

									<div className="lg:px-8 px-5 mb-5">
										<div className="grid grid-cols-1">
											<div className="mt-5">
												<p className="text-xs black-text mb-2 font-medium">
													Additional Comments <small>(Optional)</small>
												</p>
												<CustomTextarea
													control={control}
													name={"additional_comments"}
													id={"additional_comments"}
													label={""}
													placeholder={"Enter Comments here if necessary"}
													isRequired={false}
													errors={errors}
													isDisabled={false}
													defaultValue={single_shipment_data.additional_comments}
													icon=""
												/>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-3 mt-10 items-center">
										<div className="w-22">
										</div>
										<div></div>
										<div className="w-22" style={{ justifyContent: "left" }}>
											{" "}
											{/* @ts-ignore */}
											<PrimaryButton title="Submit" loading={loading} />
										</div>
									</div>
								</form>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

// export default EditOceanExportForm

const mapStateToProps = (state: any) => {
	const { single_shipment, loading } = state.shipments;
	return { single_shipment, loading };
};

export default connect(mapStateToProps, {
	getSingleShipment,
	editShipmentDetails,
})(EditOceanExportForm);
