import React from "react";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom";
import Aside from "components/partials/aside";
import TopBar from "components/partials/topBar";
import CustomInput from "components/textInputs/CustomInput";
import PrimaryButton from "components/buttons/PrimaryButton";
import CustomRadio from "components/selectInputs/CustomRadio";
import CustomTextarea from "components/textInputs/CustomTextarea";
import { getSingleShipment, editShipmentDetails } from "store/actions";
import { parseAllPorts } from "helpers/index";
import moment from "moment";
const _Json = require("sea-ports");

const EditExportHaulage = (props: any) => {
	const params = useParams();
	const navigate = useNavigate();
	const [openAside, SetOpenAside] = useState(false);
	const { loading, single_shipment } = props;
	const single_shipment_data = single_shipment?.data?.data?.shipment_data;
	console.log(single_shipment_data);

	const { handleSubmit, control, formState: { errors }, } = useForm();
	const [defaultPortsOfOrigin, setDefaultPortsOfOrigin] = useState([]);
	const [defaultPortsOfDestination, setDefaultPortsOfDestination] = useState([]);
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

	useEffect(() => {
		if (single_shipment_data) {
			//   setHaulage(single_shipment_data?.with_haulage);
			setTracker(single_shipment_data?.with_tracker);
			setHazardous(single_shipment_data?.is_product_hazardous);
			setEscort(single_shipment_data?.with_escort);
		}
	}, [single_shipment_data]);

	const goToShipmentDetails = () => {
		navigate(`/shipments/shipment-details/${params.id}`)
	}

	const onSubmit = (data: any) => {
		console.log(data.customer_id);
		const newData = {
			id: params.id,
			shipment_type: "export",
			shipment_transport_type: "haulage",
			customer_id: data.customer_id.value,
			destination_port_code: data?.destination_port?.value?.unlocs[0],
			stuffing_location: data?.stuffing_location,
			terminal_port: data?.terminal_port,
			origin_port_code: data?.origin_port_code,
			goods_value: data?.goods_value,
			goods_type: data?.goods_type,
			container_size: data?.container_size,
			container_type: data?.container_type,
			container_count: data?.container_count,
			container_weight: data?.container_weight,
			stuffing_date: data?.stuffing_date,
			bl_number: data?.bl_number,
			branch: data?.branch,
			with_tracker: tracker,
			with_escort: escort,
			is_product_hazardous: hazardous,
			additional_comments: data?.additional_comments,
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
											Job Number : {single_shipment_data.job_number}
										</p>
									</div>
									<div className="mt-2 ml-auto" style={{ textAlign: "right" }}>
										<small>Shipments </small>
										<small style={{ color: "grey" }}>
											{" "}
											/ Edit Export Shipment & Haulage
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
											Export Shipment & Haulage
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
										<div className="mt-3 grid grid-cols-3 mb-2">
											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													Stuffing Location<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"stuffing_location"}
													id={"stuffing_location"}
													label={""}
													placeholder={"Stuffing location"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data.stuffing_location}
													min={""}
													max={""}
													icon={""}
												/>
											</div>

											<div className="mr-1">
												<p className="text-xs black-text font-medium">
													Port of Loading<span className="red-text">*</span>
												</p>

												<CustomInput
													control={control}
													name={"origin_port_code"}
													id={"origin_port_code"}
													label={""}
													placeholder={"Port Of Loading"}
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
													Port Destination<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"terminal_port"}
													id={"terminal_port"}
													label={""}
													placeholder={"Stuffing location"}
													isRequired={false}
													type={"text"}
													errors={errors}
													isDisabled={true}
													defaultValue={single_shipment_data.terminal_port}
													min={""}
													max={""}
													icon={""}
												/>
											</div>
										</div>

										<div className="grid grid-cols-2">
											<div className="ml-1">
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

											<div className="ml-1">
												<p className="text-xs black-text font-medium">
													Total value of Goods (₦)
													<span className="red-text">*</span>
												</p>
												<CustomInput
													control={control}
													name={"goods_value"}
													id={"goods_value"}
													label={""}
													placeholder={"Type of Commodity"}
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
										<div className="solid-br p-3 mb-3">
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
													Number of Containers (Metric Ton)
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
														Stuffing Date<span className="red-text">*</span>
													</p>
													<CustomInput
														control={control}
														name={"stuffing_date"}
														id={"stuffing_date"}
														label={""}
														placeholder={"Stuffing Date"}
														isRequired={false}
														type={"date"}
														errors={errors}
														isDisabled={false}
														defaultValue={moment(
															single_shipment_data.stuffing_date
														).format("LLLL")}
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
									</div>
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
													defaultValue={""}
													icon=""
												/>
											</div>
										</div>
									</div>
									<div className="grid grid-cols-3 mt-10 items-center">
										<div className="w-22">
										</div>
										<div></div>
										<div
											className="w-22 mr-10"
											style={{ justifyContent: "center" }}
										>
											{" "}
											{/* @ts-ignore */}
											<PrimaryButton
												title="Submit"
												loading={loading}
											/>
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

// export default EditExportHaulage

const mapStateToProps = (state: any) => {
	const { single_shipment, loading } = state.shipments;
	return { single_shipment, loading };
};

export default connect(mapStateToProps, {
	getSingleShipment,
	editShipmentDetails,
})(EditExportHaulage);
